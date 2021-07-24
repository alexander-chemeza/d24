import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  userOldInfo: any = sessionStorage.getItem('currentUser');
  user: any;

  gridApi: any;
  gridColumnApi: any;
  rowData: any;
  columnDefs: any;
  defaultColDef: any;
  paginationPageSize: any;

  constructor(private router: Router) {
    this.columnDefs = [
      {
        field: 'document',
        flex: 1,
        minWidth: 500,
        maxWidth: 1900,
        cellRenderer: (params: any) => {
          return '<span class="table-icon">' +
            '<img class="list-icon-white" src="../../../assets/img/documents/file.svg" alt="ico">' +
            '<img src="../../../assets/img/documents/file-dark.svg" alt="ico" class="list-icon-dark">' + params.value + '</span>';
        }
      },
      {
        field: 'buttons',
        flex: 1,
        minWidth: 100,
        maxWidth: 125
      }
    ];

    this.rowData = [
      {
        document: 'Документ',
        buttons: 'Кнопки'
      },
      {
        document: 'Документ',
        buttons: 'Кнопки'
      },
      {
        document: 'Документ',
        buttons: 'Кнопки'
      },
    ];

    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };

    this.paginationPageSize = 10;
  }

  ngOnInit(): void {
    if (this.userOldInfo) {
      this.user = JSON.parse(this.userOldInfo);
      delete this.user.password;
    } else {
      this.router.navigate(['login']);
    }
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

  onUserPageGrid(event: any): void {
    this.gridApi.paginationSetPageSize(Number(event.target.value));
  }

}

function setText(selector: any, text: any): void {
  document.querySelector(selector).innerHTML = text;
}
