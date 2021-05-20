import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {RestapiService} from '../../../restapi.service';

export interface Contragent {
  name: string;
  id: number;
}

@Component({
  selector: 'app-contragents',
  templateUrl: './contragents.component.html',
  styleUrls: ['./contragents.component.scss']
})
export class ContragentsComponent implements OnInit, OnChanges {
  @Input() requestText: string;
  // Output decorator to store id
  @Output() onSelectCustomerId: EventEmitter<number> = new EventEmitter<number>();
  // AG Grid objects
  gridApi: any;
  gridColumnApi: any;
  // Table description
  columnDefsContrAgent = [
    { headerName: 'Наименование', field: 'name', sortable: true, flex: 1, id: ''}
  ];
  rowDataContrAgent: Contragent[] = [];
  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
  rowSelection = 'single';
  paginationPageSize = 10;

  constructor(private service: RestapiService) {
    this.requestText = '';
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.requestText !== '') {
      this.rowDataContrAgent = this.rowDataContrAgent.filter(item => item.name.includes(this.requestText));
    } else {
      this.rowDataContrAgent = [];
      this.service.getAllUserCustomer().subscribe(response => {
        if (response.status === 200) {
          for (const item of response.body) {
            this.rowDataContrAgent.push({
              name: item.customerName,
              id: item.id
            });
          }
          console.log(this.rowDataContrAgent);
          // Set new data
          this.gridApi.setRowData(this.rowDataContrAgent);
        }
      });
    }
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
        // Set new data
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
