import {Component, OnInit} from '@angular/core';
import {RestapiService} from '../../../restapi.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  // AG Grid objects
  gridApi: any;
  gridColumnApi: any;
  // Table description
  columnDefsAddress = [
    {headerName: 'Основной',
      field: 'main',
      sortable: true,
      flex: 1,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      minWidth: 150,
      maxWidth: 200
    },
    {headerName: 'Наименование', field: 'name', sortable: true, filter: true, flex: 3}
  ];
  rowDataAddress: any = [
    {name: 'г. Брест, УЛ. СОВЕТСКИХ ПОГРАНИЧНИКОВ, д. 1, оф. 1'},
    {name: 'г. Брест, УЛ. СОВЕТСКИХ ПОГРАНИЧНИКОВ, д. 1, оф. 1'},
    {name: 'г. Брест, УЛ. СОВЕТСКИХ ПОГРАНИЧНИКОВ, д. 1, оф. 1'},
    {name: 'г. Брест, УЛ. СОВЕТСКИХ ПОГРАНИЧНИКОВ, д. 1, оф. 1'},
  ];
  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
  rowSelection = 'multiple';
  paginationPageSize = 10;

  constructor(private service: RestapiService) {
  }

  ngOnInit(): void {
  }
  // Table build
  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  // Pagination change event
  onPaginationChanged(event: any, space: string): void {
    if (this.gridApi) {
      setText(`#current-${space}`, this.gridApi.paginationGetCurrentPage() + 1);
      setText(`#total-${space}`, this.gridApi.paginationGetTotalPages());
    }
  }
  // Controls event
  onBtNext(): void {
    this.gridApi.paginationGoToNextPage();
  }
  // Controls event
  onBtPrevious(): void {
    this.gridApi.paginationGoToPreviousPage();
  }
  // Pagination change event
  onUserPageGrid(event: any): void {
    this.gridApi.paginationSetPageSize(Number(event.target.value));
  }

}

function setText(selector: any, text: any): void {
  document.querySelector(selector).innerHTML = text;
}
