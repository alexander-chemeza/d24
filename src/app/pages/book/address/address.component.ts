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
            console.log(id);
            this.service.deleteUserCustomerAddress(id).subscribe(response => {
              if (response.status === 200) {
                this.ngOnChanges();
              }
            });
          } else if (target === 'edit') {
            const id = this.rowDataAddress[Number(this.gridApi.getFocusedCell().rowIndex)].id;
            console.log('Address id', id);
            this.service.getAllUserCustomerAddress(this.customerId).subscribe(response => {
              if (response.status === 200) {
                const selectedAgentAddress = response.body.filter((item: any) => item.id === id);
                this.onCustomerAddressEdit.emit(selectedAgentAddress);
              }
            });
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
    console.log('Reading from addressbook: ' + this.customerId);
    // Get data from database
    this.service.getAllUserCustomerAddress(this.customerId).subscribe(response => {
      if (response.status === 200) {
        console.log('Addresslisting', response.body);
        for (const item of response.body) {
          this.rowDataAddress.push({
            name: `${item.cityName}, ${item.streetName}`,
            id: item.id
          });
        }
        console.log('We have got', this.rowDataAddress);
        this.gridApi.setRowData(this.rowDataAddress);
      }
    });
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
  // Emit address ID
  selectedRow(event: any): void{
    if (event.node.isSelected()) {
      const id = event.node.data.id;
      this.onSelectAddressId.emit(id);
    }
  }

}

function setText(selector: any, text: any): void {
  document.querySelector(selector).innerHTML = text;
}
