import {Component, EventEmitter, Input, OnInit, OnChanges, Output} from '@angular/core';
import {RestapiService} from '../../../restapi.service';
import {AddressButtonsComponent} from './address-buttons/address-buttons.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnChanges {
  // Getter of customerID
  @Input() customerId: number;
  // Setter of addressID
  @Output() onSelectAddressId: EventEmitter<number> = new EventEmitter<number>();
  @Output() onCustomerAddressEdit: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  // AG Grid objects
  gridApi: any;
  gridColumnApi: any;
  noRowsTemplate = `<span>Для отображения адресов выберите контрагента</span>`;
  // Table description
  columnDefsAddress = [
    {
      headerName: 'Основной',
      field: 'main',
      sortable: true,
      flex: 1,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      minWidth: 150,
      maxWidth: 200
    },
    {
      headerName: 'Наименование',
      field: 'name',
      sortable: true,
      filter: true,
      flex: 3,
      id: ''
    },
    {
      headerName: 'Управление',
      pinned: 'right',
      cellRenderer: 'btnCellRenderer',
      cellRendererParams: {
        clicked: (target: any): void => {
          if (target === 'delete') {
            const id = this.rowDataAddress[Number(this.gridApi.getFocusedCell().rowIndex)].id;
            if (id) {
              this.service.deleteUserCustomerAddress(id).subscribe(response => {
                if (response.status === 200) {
                  this.ngOnChanges();
                }
              });
            }
          } else if (target === 'edit') {
            const id = this.rowDataAddress[Number(this.gridApi.getFocusedCell().rowIndex)].id;
            if (this.customerId) {
              this.service.getAllUserCustomerAddress(this.customerId).subscribe(response => {
                if (response.status === 200) {
                  const selectedAgentAddress = response.body.filter((item: any) => item.id === id);
                  this.onCustomerAddressEdit.emit(selectedAgentAddress);
                }
              });
            }
          }
        }
      },
      maxWidth: 150
    }
  ];
  rowDataAddress: any = [];
  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
  rowSelection = 'single';
  paginationPageSize = 10;
  frameworkComponents: any;

  constructor(private service: RestapiService) {
    // Default value of customerID --> if default - no access to create address popup
    this.customerId = 0;

    this.frameworkComponents = {
      btnCellRenderer: AddressButtonsComponent,
    };
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    // Clear rowDataAddress after previous user actions
    this.rowDataAddress = [];
    // Check if we've got customerID
    // Get data from database
    if (this.customerId) {
      this.service.getAllUserCustomerAddress(this.customerId).subscribe(response => {
        if (response.status === 200) {
          for (const item of response.body) {
            this.rowDataAddress.push({
              name: `${item.cityName}, ${item.streetName}`,
              id: item.id
            });
          }
          this.gridApi.setRowData(this.rowDataAddress);
        }
      });
    }
  }

  // Table build
  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    const totalPages = this.gridApi.paginationGetTotalPages();
    const nextBtn: any = document.getElementById('next');
    if (totalPages === 1) {
      nextBtn.classList.add('page-next-grey');
    } else {
      nextBtn.classList.remove('page-next-grey');
    }
  }
  // Pagination change event
  onPaginationChanged(event: any, space: string): void {
    if (this.gridApi) {
      setText(`#current-${space}`, this.gridApi.paginationGetCurrentPage() + 1);
      setText(`#total-${space}`, this.gridApi.paginationGetTotalPages());
    }
    const totalPages = this.gridApi.paginationGetTotalPages();
    const nextBtn: any = document.getElementById('next');
    nextBtn.classList.remove('page-next-grey');
    if (totalPages === 1) {
      nextBtn.classList.add('page-next-grey');
    } else {
      nextBtn.classList.remove('page-next-grey');
    }
  }
  // Controls event
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
  // Controls event
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
  // Pagination change event
  onUserPageGrid(event: any): void {
    this.gridApi.paginationSetPageSize(Number(event.target.value));
    const currentPage = this.gridApi.paginationGetCurrentPage();
    const totalPages = this.gridApi.paginationGetTotalPages();
    const nextBtn: any = document.getElementById('next');
    if (totalPages === 1) {
      nextBtn.classList.add('page-next-grey');
    } else {
      nextBtn.classList.remove('page-next-grey');
    }
  }
  // Emit address ID
  selectedRow(event: any): void{
    if (event.node.isSelected()) {
      const id = event.node.data.id;
      this.onSelectAddressId.emit(id);
    }
  }

  ifChanged(event: any): void {
    const totalPages = this.gridApi.paginationGetTotalPages();
    const nextBtn: any = document.getElementById('next');
    if (totalPages === 1) {
      nextBtn.classList.add('page-next-grey');
    } else {
      nextBtn.classList.remove('page-next-grey');
    }
  }

}

function setText(selector: any, text: any): void {
  document.querySelector(selector).innerHTML = text;
}
