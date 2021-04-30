import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contragents',
  templateUrl: './contragents.component.html',
  styleUrls: ['./contragents.component.scss']
})
export class ContragentsComponent implements OnInit {

  public gridApi: any;
  public gridColumnApi: any;
  public defaultColDef: any;
  public rowSelection: any;
  public paginationPageSize: any;
  public columnDefsContrAgent: any;
  public rowDataContrAgent: any;

  constructor() {
    this.columnDefsContrAgent = [
      { headerName: 'Наименование', field: 'name', sortable: true, flex: 1}
    ];
    this.rowDataContrAgent = [
      { name: 'Верхнедвинская районная ветеринарная станция' },
      { name: 'Верхнедвинская районная ветеринарная станция' },
      { name: 'Верхнедвинская районная ветеринарная станция' },
      { name: 'Верхнедвинская районная ветеринарная станция' },
      { name: 'Верхнедвинская районная ветеринарная станция' },
      { name: 'Верхнедвинская районная ветеринарная станция' },
      { name: 'Верхнедвинская районная ветеринарная станция' },
      { name: 'Верхнедвинская районная ветеринарная станция' },
      { name: 'Верхнедвинская районная ветеринарная станция' },
      { name: 'Верхнедвинская районная ветеринарная станция' },
      { name: 'Верхнедвинская районная ветеринарная станция' },
      { name: 'Верхнедвинская районная ветеринарная станция' },
      { name: 'Верхнедвинская районная ветеринарная станция' },
      { name: 'Верхнедвинская районная ветеринарная станция' },
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
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onPaginationChanged(event: any, space: string): void {
    if (this.gridApi) {
      setText(`#current-${space}`, this.gridApi.paginationGetCurrentPage() + 1);
      setText(`#total-${space}`, this.gridApi.paginationGetTotalPages());
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
