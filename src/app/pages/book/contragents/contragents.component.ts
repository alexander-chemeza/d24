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
  @Output() onCustomerEdit: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  // AG Grid objects
  gridApi: any;
  gridColumnApi: any;
  noRowsTemplate = `<span>Список контрагентов пуст</span>`;
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
        clicked: (target: any): void => {
          // alert(`${field} was clicked`);
          if (target === 'delete') {
            const id = this.rowDataContrAgent[Number(this.gridApi.getFocusedCell().rowIndex)].id;
            console.log(id);
            if (id) {
              this.service.deleteUserCustomer(id).subscribe(response => {
                if (response.status === 200) {
                  this.getTable();
                }
              });
            }
          } else if (target === 'edit') {
            console.log('edit');
            const id = this.rowDataContrAgent[Number(this.gridApi.getFocusedCell().rowIndex)].id;
            this.service.getAllUserCustomer().subscribe(response => {
              if (response.status === 200) {
                const selectedAgent = response.body.filter((item: any) => item.id === id);
                console.log('Selected user info', selectedAgent);
                if (selectedAgent){
                  this.onCustomerEdit.emit(selectedAgent);
                }
              }
            });
          }
        }
      },
      maxWidth: 150,
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
      btnCellRenderer: ContragentButtonsComponent,
    };
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  getTable(): void {
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
    this.getTable();
    const totalPages = this.gridApi.paginationGetTotalPages();
    const nextBtn: any = document.getElementById('next');
    if (totalPages === 1) {
      nextBtn.classList.add('page-next-grey');
    } else {
      nextBtn.classList.remove('page-next-grey');
    }
  }
  // Pagination event
  onPaginationChanged(event: any, space: string): void {
    if (this.gridApi) {
      setText(`#current-${space}`, this.gridApi.paginationGetCurrentPage() + 1);
      setText(`#total-${space}`, this.gridApi.paginationGetTotalPages());
    }
    const totalPages = this.gridApi.paginationGetTotalPages();
    const nextBtn: any = document.getElementById('next');
    if (totalPages === 1) {
      nextBtn.classList.add('page-next-grey');
    } else {
      nextBtn.classList.remove('page-next-grey');
    }
  }
  // Controls
  onBtNext(): void {
    const currentPage = this.gridApi.paginationGetCurrentPage();
    const totalPages = this.gridApi.paginationGetTotalPages();
    const prevBtn: any = document.getElementById('prev');
    const nextBtn: any = document.getElementById('next');
    this.gridApi.paginationGoToNextPage();
    if (currentPage + 1 !== totalPages) {
      if (currentPage === 0) {
        prevBtn.classList.add('page-prev-white');
      } else if (currentPage === totalPages - 2) {
        nextBtn.classList.add('page-next-grey');
      }
    }
  }
  // Controls
  onBtPrevious(): void {
    const currentPage = this.gridApi.paginationGetCurrentPage();
    const totalPages = this.gridApi.paginationGetTotalPages();
    const prevBtn: any = document.getElementById('prev');
    const nextBtn: any = document.getElementById('next');
    this.gridApi.paginationGoToPreviousPage();
    if (currentPage + 1 !== totalPages) {
      if (currentPage === totalPages - 1) {
        nextBtn.classList.remove('page-next-grey');
      } else if (currentPage === 1) {
        prevBtn.classList.remove('page-prev-white');
      }
    }
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
