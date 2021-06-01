import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {RestapiService} from '../../../restapi.service';
import {ContragentButtonsComponent} from './contragent-buttons/contragent-buttons.component';

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
    { headerName: 'Наименование',
      field: 'name',
      sortable: true,
      flex: 1,
      id: ''
    },
    {
      headerName: 'Управление',
      pinned: 'right',
      cellRenderer: 'btnCellRenderer',
      cellRendererParams: {
        clicked: (field: any): void => {
          // alert(`${field} was clicked`);
          const id = this.rowDataContrAgent[Number(this.gridApi.getFocusedCell().rowIndex)].id;
          console.log(id);
          this.service.deleteUserCustomer(id).subscribe(response => {
            if (response.status === 200) {
              this.ngOnChanges();
            }
          });
        }
      },
      minWidth: 150,
    }
  ];
  rowDataContrAgent: Contragent[] = [];
  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
  rowSelection = 'single';
  paginationPageSize = 10;
  frameworkComponents: any;

  constructor(private service: RestapiService) {
    this.requestText = '';

    this.frameworkComponents = {
      btnCellRenderer: ContragentButtonsComponent
    };
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
          console.log(response.body);
          for (const item of response.body) {
            this.rowDataContrAgent.push({
              name: item.customerName,
              id: item.id
            });
          }
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
