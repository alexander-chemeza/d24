import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RestapiService} from '../../../restapi.service';

@Component({
  selector: 'app-contragents',
  templateUrl: './contragents.component.html',
  styleUrls: ['./contragents.component.scss']
})
export class ContragentsComponent implements OnInit {
  // Output decorator to store id
  @Output() onSelectCustomerId: EventEmitter<number> = new EventEmitter<number>();
  // AG Grid objects
  public gridApi: any;
  public gridColumnApi: any;
  // Table description
  columnDefsContrAgent = [
    { headerName: 'Наименование', field: 'name', sortable: true, flex: 1, id: ''}
  ];
  rowDataContrAgent: any = [];
  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
  rowSelection = 'single';
  paginationPageSize = 10;

  constructor(private service: RestapiService) {
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
  // Table build
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
  // Pagination
  onUserPageGrid(event: any): void {
    this.gridApi.paginationSetPageSize(Number(event.target.value));
  }
  // Emit customerID
  selectedRow(event: any): void{
    if (event.node.isSelected()) {
      const id = event.node.data.id;
      this.onSelectCustomerId.emit(id);
    }
  }
}

function setText(selector: any, text: any): void {
  document.querySelector(selector).innerHTML = text;
}
