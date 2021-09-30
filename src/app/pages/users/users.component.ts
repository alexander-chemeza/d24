import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Group, RestapiService, UserRegistration} from '../../restapi.service';
import {Router} from '@angular/router';
import {UserControllComponent} from './user-controll/user-controll.component';
import {UserBlockControllComponent} from './user-block-controll/user-block-controll.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  currentGroupToDelete = -1;
  currentGroup = -1;
  userEditId = -1;
  editUser = false;
  activeUser = true;
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

  groupsList: any = [{id: -1, name: 'Все', addressBookAccess: true, templateAcces: true}];
  selectedGroups = [];

  constructor(private service: RestapiService, private router: Router) {
    this.frameworkComponents = {
      userControl: UserControllComponent,
      userBlockControl: UserBlockControllComponent
    };

    this.passwordEquality = true;
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
          const unblocked = {
            component: 'userControl',
            params: {
              values: ['status']
            }
          };

          const blocked = {
            component: 'userBlockControl',
            params: {
              values: ['status']
            }
          };

          if (params.data.status === true) {
            return unblocked;
          } else {
            return blocked;
          }
        },
        cellRendererParams: {
          clicked: (target: any): void => {
            this.editUser = !this.editUser;
            const block: any = document.getElementById('block');
            this.userEditId = this.rowData[Number(this.gridApi.getFocusedCell().rowIndex)].id;

            if (target.state === 'Заблокирован') {
              this.activeUser = false;
            } else {
              this.activeUser = true;
            }
            if (this.editUser) {
              block.style.display = 'block';
              block.style.top = `${Number(target.style.split('(')[1].split('p')[0]) + 96}px`;
            } else {
              block.style.display = 'none';
            }
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
      // id: new FormControl('', []),
      // agreement: new FormControl('', [
      //   Validators.required
      // ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.email
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(9)
      ]),
      phone2: new FormControl('', [
        Validators.minLength(9)
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ]),
      passwordRepeat: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
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

  get name(): any {
    return this.newUserForm.get('name');
  }

  get email(): any {
    return this.newUserForm.get('email');
  }

  get phone(): any {
    return this.newUserForm.get('phone');
  }

  get phone2(): any {
    return this.newUserForm.get('phone2');
  }

  get login(): any {
    return this.newUserForm.get('login');
  }

  get password(): any {
    return this.newUserForm.get('password');
  }

  get passwordRepeat(): any {
    return this.newUserForm.get('passwordRepeat');
  }

  get groupName(): any {
    return this.newUserForm.get('groupName');
  }

  editUserState(event: any): void {
    let state: boolean;
    if (event.target.value === 'locked') {
      state = false;
    } else {
      state = true;
    }
    this.service.getUserById(this.userEditId).subscribe(user => {
      if (user.status === 200) {
        const userObject = user.body;
        delete userObject.password;
        userObject.status = state;
        this.service.updateUser(userObject).subscribe(response => {
          if (response.status === 200) {
            const block: any = document.getElementById('block');
            this.getAllManagers();
            block.style.display = 'none';
            this.userEditId = -1;
          }
        });
      }
    });
  }

  createNewUser(): void {
    const group = this.groupsList.find((item: any) => item.id === this.newUserForm.value.groupName).name;
    const data: UserRegistration = {
      id: this.newUserForm.value.id as string,
      agreement: this.newUserForm.value.agreement as string,
      userName: this.newUserForm.value.name as string,
      email: this.newUserForm.value.email as string,
      phone: this.newUserForm.value.phone as string,
      phone2: this.newUserForm.value.phone2 as string,
      login: this.newUserForm.value.login as string,
      password: this.newUserForm.value.password as string,
      groupId: this.newUserForm.value.groupName as string,
      groupName: group
    };

    console.log('SENDING DATA', data);

    if ( this.newUserForm.value.password === this.newUserForm.value.passwordRepeat) {
      this.passwordEquality = true;
    } else if (this.newUserForm.value.password.length > 0 || this.newUserForm.value.passwordRepeat.length > 0 && this.newUserForm.value.password !== this.newUserForm.value.passwordRepeat) {
      this.passwordEquality = false;
    }

    if (this.newUserForm.valid) {
      this.service.addManager(data).subscribe(response => {
        if (response.status === 200) {
          console.log('OK');
          this.clearAllManagers();
          this.getAllManagers();
        } else {
          console.log('Bad request');
        }
      });
      this.hideModal('new-user');
      this.clearForm();
    }
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
    // this.getUser(event.data.id);
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
    this.rowData = [];

    this.service.getAllManagers(this.currentGroup).subscribe(response => {
      if (response.status === 200) {
        for (const item of response.body) {
          this.rowData.push({
            id: item.id,
            login: item.login,
            groupName: item.groupName,
            name: item.userName,
            email: item.email,
            phone: `+375${item.phone}`,
            status: item.status
          });
        }
        console.log('PURE ROW DATA', this.rowData);
        const group = this.groupsList.find((item: any) => item.id === this.currentGroup);
        console.log('GROUP', group);
        this.rowData = this.rowData.filter((item: any) => item.groupName === group.name);
        console.log('DATA', this.rowData);
        this.gridApi.setRowData(this.rowData);
      }
    });
  }

  groupChange(event: any): void {
    this.currentGroup = event.value;
    console.log('CURRENT GROUP', this.currentGroup);
    this.getAllManagers();
  }

  getGroups(): void {
    this.service.getGroups().subscribe(response => {
      if (response.status === 200) {
        this.groupsList = [{
          addressBookAccess: true,
          id: -1,
          name: 'Все',
          templateAcces: false
        }];
        for (let i = 0; i < response.body.length; i++) {
          this.groupsList.push(response.body[i]);
        }
        // this.currentGroup = this.groupsList[0].id;
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
          this.getGroups();
        }
      });
    }
  }

  changeGroup(e: any) {
    this.clearAllManagers();
    this.getAllManagers();
  }

  clearForm(): void {
    this.newUserForm.reset();
  }

  setCurrentGroupToDelete(event: any): void {
    this.currentGroupToDelete = Number(event.target.getAttribute('group'));
    this.showModal('ask-if-delete-group');
  }

  deleteGroup(event: any): void {
    if (this.currentGroupToDelete && this.currentGroupToDelete >= 0) {
      this.service.deleteGroup(this.currentGroupToDelete).subscribe(response => {
        if (response.status === 200) {
          // const btnToDelete: any = document.querySelector(`[group="${this.currentGroupToDelete}"]`);
          // if (btnToDelete) {
          //   btnToDelete.parentElement.remove();
          // }
          this.getGroups();
          this.hideModal('ask-if-delete-group');
        }
      });
    }
  }
}

function setText(selector: any, text: any): void {
  document.querySelector(selector).innerHTML = text;
}
