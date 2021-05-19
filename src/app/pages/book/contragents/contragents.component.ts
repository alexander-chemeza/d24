import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RestapiService, SaveUserCustomerAddress} from '../../../restapi.service';
import {AddressList} from '../book.component';

@Component({
  selector: 'app-contragents',
  templateUrl: './contragents.component.html',
  styleUrls: ['./contragents.component.scss']
})
export class ContragentsComponent implements OnInit {
  // Output decorator to send address list
  @Output() onUserAddressListUpdate: EventEmitter<AddressList> = new EventEmitter<AddressList>();
  @Output() onSelectCustomerId: EventEmitter<number> = new EventEmitter<number>();

  public gridApi: any;
  public gridColumnApi: any;
  public defaultColDef: any;
  public rowSelection: any;
  public paginationPageSize: any;
  public columnDefsContrAgent: any;
  public rowDataContrAgent: any;

  constructor(private service: RestapiService) {
    this.columnDefsContrAgent = [
      { headerName: 'Наименование', field: 'name', sortable: true, flex: 1, id: ''}
    ];
    this.rowDataContrAgent = [
      // { name: 'Верхнедвинская районная ветеринарная станция' },
      // { name: 'Верхнедвинская районная ветеринарная станция' },
      // { name: 'Верхнедвинская районная ветеринарная станция' },
      // { name: 'Верхнедвинская районная ветеринарная станция' },
      // { name: 'Верхнедвинская районная ветеринарная станция' },
      // { name: 'Верхнедвинская районная ветеринарная станция' },
      // { name: 'Верхнедвинская районная ветеринарная станция' },
      // { name: 'Верхнедвинская районная ветеринарная станция' },
      // { name: 'Верхнедвинская районная ветеринарная станция' },
      // { name: 'Верхнедвинская районная ветеринарная станция' },
      // { name: 'Верхнедвинская районная ветеринарная станция' },
      // { name: 'Верхнедвинская районная ветеринарная станция' },
      // { name: 'Верхнедвинская районная ветеринарная станция' },
      // { name: 'Верхнедвинская районная ветеринарная станция' },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
    this.rowSelection = 'single';
    this.paginationPageSize = 10;
  }

  ngOnInit(): void {
    this.service.getAllUserCustomerAddress(1).subscribe(response => {
      console.log('User 1 address', response.body);
    });

    this.service.getAllUserCustomerAddress(2).subscribe(response => {
      console.log('User 3 address', response.body);
    });

    this.service.getAllUserCustomerAddress(3).subscribe(response => {
      console.log('User 3 address', response.body);
    });
  }
  // AG Grid event
  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.service.getAllUserCustomer().subscribe(response => {
      if (response.status === 200) {
        for (const item of response.body) {
          this.rowDataContrAgent.push({
            name: item.customerName,
            id: item.id
          });
        }
        console.log(this.rowDataContrAgent);
        params.api.setRowData(this.rowDataContrAgent);
      }
    });
  }
  // Pagination event
  onPaginationChanged(event: any, space: string): void {
    if (this.gridApi) {
      setText(`#current-${space}`, this.gridApi.paginationGetCurrentPage() + 1);
      setText(`#total-${space}`, this.gridApi.paginationGetTotalPages());
    }
  }
  // Controls
  onBtNext(): void {
    this.gridApi.paginationGoToNextPage();
  }
  // Controls
  onBtPrevious(): void {
    this.gridApi.paginationGoToPreviousPage();
  }
  // Pagination event
  onUserPageGrid(event: any): void {
    this.gridApi.paginationSetPageSize(Number(event.target.value));
  }

  selectedRow(event: any): void{
    if (event.node.isSelected()) {
      const id = event.node.data.id;
      this.onSelectCustomerId.emit(id);
      console.log('Customer info', event.node.data);
      this.service.getAllUserCustomerAddress(id).subscribe(response => {
        if (response.status === 200) {
          console.log('We have got customer ID, sending this to the another table');
          console.log('Address list from contragent', response.body);
          this.onUserAddressListUpdate.emit(response.body);
        }
      });
    }
  }
}

function setText(selector: any, text: any): void {
  document.querySelector(selector).innerHTML = text;
}
