import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestapiService, UserRegistration} from '../../restapi.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  gridApi: any;
  gridColumnApi: any;
  columnDefs: any;
  rowData: any;
  defaultColDef: any;
  rowSelection: any;
  paginationPageSize: any;

  newUserForm: any;
  passwordEquality: boolean;

  constructor(private service: RestapiService) {
    this.passwordEquality = false;
    this.columnDefs = [
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
  }

  ngOnInit(): void {
    this.newUserForm = new FormGroup({
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
  }

  createNewUser(): void {
    const data: UserRegistration = {
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
      console.log(data);

      this.service.addManager(data).subscribe(response => {
        if (response.status === 200) {
          console.log('OK');
          this.hideModal('new-user');
        } else {
          console.log('Bad request');
        }
      });
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
    this.service.getAllManagers().subscribe(response => {
      if (response.status === 200) {
        for (const item of response.body) {
          this.rowData.push({
            login: item.login,
            groupName: item.groupName,
            name: item.userName,
            email: item.email,
            phone: item.phone,
            status: item.status
          });
        }
        params.api.setRowData(this.rowData);
      }
    });
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

}

function setText(selector: any, text: any): void {
  document.querySelector(selector).innerHTML = text;
}
