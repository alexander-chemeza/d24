import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor() {
    this.columnDefs = [
      {
        headerName: 'Логин',
        field: 'login',
        sortable: false,
        flex: 1,
        minWidth: 100,
        maxWidth: 150
      },
      {
        headerName: 'Название группы',
        field: 'groupName',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'Имя',
        field: 'name',
        sortable: true,
        flex: 1,
        minWidth: 120,
        maxWidth: 170
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
      },
      {
        headerName: 'Статус блокировки',
        field: 'status',
        sortable: true,
        flex: 1,
        minWidth: 200,
        maxWidth: 220
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
    this.rowData = [
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
      {
        login: 'drunya13',
        groupName: 'Группа 1',
        name: 'Andrey',
        email: 'bartashevich.s@ntt.by',
        phone: '+375 29 342-5554',
        status: 'Заблокирован'
      },
    ];
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
