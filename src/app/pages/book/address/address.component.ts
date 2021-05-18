import { Component, OnInit } from '@angular/core';
import {RestapiService} from '../../../restapi.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  public gridApi: any;
  public gridColumnApi: any;
  public defaultColDef: any;
  public rowSelection: any;
  public paginationPageSize: any;
  public columnDefsAddress: any;
  public rowDataAddress: any;

  constructor(private service: RestapiService) {
    this.columnDefsAddress = [
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
    this.rowDataAddress = [
      {name: 'г. Брест, УЛ. СОВЕТСКИХ ПОГРАНИЧНИКОВ, д. 1, оф. 1'},
      {name: 'г. Брест, УЛ. СОВЕТСКИХ ПОГРАНИЧНИКОВ, д. 1, оф. 1'},
      {name: 'г. Брест, УЛ. СОВЕТСКИХ ПОГРАНИЧНИКОВ, д. 1, оф. 1'},
      {name: 'г. Брест, УЛ. СОВЕТСКИХ ПОГРАНИЧНИКОВ, д. 1, оф. 1'},
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
    // this.service.getAllUserCustomerAddress().subscribe(response => {
    //   if (response.status === 200) {
    //     for (const item of response.body) {
    //       this.rowDataAddress.push({
    //         name: item.cityName
    //       });
    //     }
    //     params.api.setRowData(this.rowDataAddress);
    //   }
    // });
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
