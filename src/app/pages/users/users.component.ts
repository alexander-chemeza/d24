import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Group, RestapiService, UserRegistration} from '../../restapi.service';
import {Router} from '@angular/router';
import {UserControllComponent} from './user-controll/user-controll.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  frameworkComponents: any;
  showGroupModal = false;
  userOldInfo: any = sessionStorage.getItem('currentUser');
  user: any;

  gridApi: any;
  gridColumnApi: any;
  columnDefs: any;
  rowData: any;
  defaultColDef: any;
  rowSelection: any;
  paginationPageSize: any;

  newUserForm: any;
  groupForm: any;
  passwordEquality: boolean;

  groupsList: any;
  selectedGroups = [];

  constructor(private service: RestapiService, private router: Router) {
    this.frameworkComponents = {
      userControl: UserControllComponent
    };

    this.passwordEquality = false;
    this.columnDefs = [
      // {
      //   headerName: 'Управление',
      //   pinned: 'right',
      //
      //   maxWidth: 150,
      // },
      {
        headerName: 'Логин',
        field: 'login',
        sortable: false,
        flex: 1,
        minWidth: 100,
        maxWidth: 250
      },
      {
        headerName: 'Название группы',
        field: 'groupName',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 400
      },
      {
        headerName: 'Имя',
        field: 'name',
        sortable: true,
        flex: 1,
        minWidth: 120,
        maxWidth: 370
      },
      {
        headerName: 'Email',
        field: 'email',
        sortable: true,
        flex: 1,
        minWidth: 200,
        maxWidth: 250
      },
      {
        headerName: 'Телефон',
        field: 'phone',
        sortable: true,
        flex: 1,
        minWidth: 200,
        maxWidth: 250
      },
      {
        headerName: 'Статус блокировки',
        field: 'status',
        cellRendererSelector: (params: any) => {
          return {
            component: 'userControl',
            params: {
              values: ['status']
            }
          };
        },
        cellRendererParams: {
          clicked: (target: any) => {
            console.log('settled');
          }
        },
        sortable: true,
        flex: 1,
        minWidth: 200,
        maxWidth: 220
      }
    ];
    this.rowData = [];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
    this.rowSelection = 'multiple';
    this.paginationPageSize = 10;

    this.getGroups();
  }

  ngOnInit(): void {
    if (this.userOldInfo) {
      this.user = JSON.parse(this.userOldInfo);
      delete this.user.password;
    } else {
      this.router.navigate(['login']);
    }

    this.newUserForm = new FormGroup({
      id: new FormControl('', []),
      agreement: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      phone: new FormControl('', [
        Validators.required
      ]),
      phone2: new FormControl('', [
        Validators.required
      ]),
      login: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      passwordRepeat: new FormControl('', [
        Validators.required
      ]),
      groupName: new FormControl('', [
        Validators.required
      ])
    });

    this.groupForm = new FormGroup({
      groupName: new FormControl('', [
        Validators.required
      ]),
      book: new FormControl('', [
        Validators.required
      ]),
      template: new FormControl('', [
        Validators.required
      ]),
    });
  }

  createNewUser(): void {
    const data: UserRegistration = {
      id: this.newUserForm.value.id as string,
      agreement: this.newUserForm.value.agreement as string,
      userName: this.newUserForm.value.name as string,
      email: this.newUserForm.value.email as string,
      phone: this.newUserForm.value.phone as string,
      phone2: this.newUserForm.value.phone2 as string,
      login: this.newUserForm.value.login as string,
      password: this.newUserForm.value.password as string,
      groupName: this.newUserForm.value.groupName as string
    };

    if (this.newUserForm.value.password === this.newUserForm.value.passwordRepeat) {
      this.passwordEquality = true;
    }

    console.log('Equal:', this.passwordEquality);

    if (this.newUserForm.valid && this.passwordEquality) {
      this.service.addManager(data).subscribe(response => {
        if (response.status === 200) {
          console.log('OK');
          this.clearAllManagers();
          this.getAllManagers();
        } else {
          console.log('Bad request');
        }
      });
    }

    this.hideModal('new-user');
    this.clearForm();
  }

  showModal(id: string): void {
    const modal: any = document.getElementById(id);
    modal.classList.remove('hide-modal');
    modal.classList.add('show-modal');
  }

  hideModal(id: string): void {
    const modal: any = document.getElementById(id);
    modal.classList.add('hide-modal');
    modal.classList.remove('show-modal');
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getAllManagers();
  }

  onPaginationChanged(): void {
    if (this.gridApi) {
      setText('#current', this.gridApi.paginationGetCurrentPage() + 1);
      setText('#total', this.gridApi.paginationGetTotalPages());
    }
  }

  onBtNext(): void {
    this.gridApi.paginationGoToNextPage();
  }

  onBtPrevious(): void {
    this.gridApi.paginationGoToPreviousPage();
  }

  onUserPageGrid(event: any): void {
    this.gridApi.paginationSetPageSize(Number(event.target.value));
  }

  onRowClicked(event: any): void {
    this.clearForm();
    this.getUser(event.data.id);
    this.showModal('new-user');
  }

  clearAllManagers(): void {
    this.rowData = [];
  }

  getUser(id: any) {
    let params = new HttpParams();
    params = params.set('id', id);

    this.service.getUserById(params).subscribe(response => {
      if (response.status === 200) {
        const user = response.body;

        this.newUserForm.patchValue({
          id: user.id,
          agreement: user.agreement,
          name: user.userName,
          email: user.email,
          phone: user.phone,
          phone2: user.phone2,
          login: user.login,
          password: user.password,
          passwordRepeat: user.passwordRepeat,
          groupName: user.groupName
        });
      }
    });
  }

  getAllManagers(): void {
    let params = new HttpParams();
    if (this.selectedGroups.length != 0) {
      let groupIds = this.groupsList.filter((g: any) => this.selectedGroups.find(s => s === g.name)).map((g: any) => g.id);
      params = params.set('groups', groupIds.join());
    }

    this.service.getAllManagers(params).subscribe(response => {
      if (response.status === 200) {
        for (const item of response.body) {
          this.rowData.push({
            id: item.id,
            login: item.login,
            groupName: item.groupName,
            name: item.userName,
            email: item.email,
            phone: item.phone,
            status: item.status
          });
        }
        this.gridApi.setRowData(this.rowData);
      }
    });
  }

  getGroups() {
    this.service.getGroups().subscribe(response => {
      if (response.status === 200) {
        this.groupsList = response.body;
        console.log(this.groupsList);
      }
    });
  }

  updateGroups(): void {
    let book: boolean;
    let template: boolean;

    if (this.groupForm.value.groupName) {
      book = true;
    } else {
      book = false;
    }

    if (this.groupForm.value.template) {
      template = true;
    } else {
      template = false;
    }
    const data: Group = {
      mainUserId: this.user.id,
      name: this.groupForm.value.groupName,
      addressBookAccess: book,
      templateAcces: template
    };

    console.log('OK', data);

    if (data.mainUserId && data.name) {
      this.service.updateGroups(data).subscribe(response => {
        if (response.status === 200) {
        }
      });
    }
  }

  changeGroup(e: any) {
    this.clearAllManagers();
    this.getAllManagers();
  }

  clearForm() {
    this.newUserForm.patchValue({
      id: '',
      agreement: '',
      name: '',
      email: '',
      phone: '',
      phone2: '',
      login: '',
      password: '',
      passwordRepeat: '',
      groupName: ''
    });
  }
}

function setText(selector: any, text: any): void {
  document.querySelector(selector).innerHTML = text;
}
