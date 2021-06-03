import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {RestapiService} from '../../../restapi.service';
import {ContactsButtonsComponent} from './contacts-buttons/contacts-buttons.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnChanges {
  @Input() customerAddressId: number;
  @Output() onCustomerContactEdit: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  // Ag Grid objects
  public gridApi: any;
  public gridColumnApi: any;
  noRowsTemplate = `<span>Для отображения контактов выберите контрагента и его адрес</span>`;
  // Table description
  columnDefsContacts = [
    { headerName: 'Имя контакта',
      field: 'contactNameCheck',
      sortable: true,
      flex: 1,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      minWidth: 200,
      maxWidth: 250,
      id: ''
    },
    {
      headerName: 'Имя контакта',
      field: 'contactName',
      sortable: true,
      flex: 1,
      minWidth: 250,
      maxWidth: 400
    },
    {
      headerName: 'Должность',
      field: 'employee',
      sortable: true,
      flex: 1,
      minWidth: 250,
      maxWidth: 400
    },
    {
      headerName: 'Телефон',
      field: 'phone',
      sortable: true,
      flex: 1,
      minWidth: 200,
      maxWidth: 400
    },
    {
      headerName: 'Телефон 1',
      field: 'tel1',
      sortable: true,
      flex: 1,
      minWidth: 200,
      maxWidth: 400
    },
    {
      headerName: 'Телефон 2',
      field: 'tel2',
      sortable: true,
      flex: 1,
      minWidth: 200,
      maxWidth: 400
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      flex: 1,
      minWidth: 250,
      maxWidth: 400
    },
    {
      headerName: 'Управление',
      pinned: 'right',
      cellRenderer: 'btnCellRenderer',
      cellRendererParams: {
        clicked: (target: any): void => {
          const id = this.rowDataContacts[Number(this.gridApi.getFocusedCell().rowIndex)].id;
          console.log('Contact id', id);
          if (target === 'delete') {
            this.service.deleteUserCustomerContact(id).subscribe(response => {
              if (response.status === 200) {
                this.ngOnChanges();
              }
            });
          } else if (target === 'edit') {
            this.service.getAllUserCustomerContact(this.customerAddressId).subscribe(response => {
              if (response.status === 200) {
                const selectedAgentContact = response.body.filter((item: any) => item.id === id);
                console.log(selectedAgentContact);
                this.onCustomerContactEdit.emit(selectedAgentContact);
              }
            });
          }
        }
      }
    }
  ];
  rowDataContacts: any = [];
  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
  rowSelection = 'multiple';
  paginationPageSize = 10;
  frameworkComponents: any;

  constructor(private service: RestapiService) {
    this.customerAddressId = -1;

    this.frameworkComponents = {
      btnCellRenderer: ContactsButtonsComponent,
    };
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    // Clear table after previous user actions
    this.rowDataContacts = [];
    // Check if we've got addressId
    console.log('Reading from contacts', this.customerAddressId);
    // Get row data
    this.service.getAllUserCustomerContact(this.customerAddressId).subscribe(response => {
      if (response.status === 200) {
        for (const item of response.body) {
          this.rowDataContacts.push({
            contactName: item.name,
            employee: item.position,
            phone: '',
            tel1: item.phone,
            tel2: item.phone2,
            email: item.email,
            id: item.id
          });
        }
        this.gridApi.setRowData(this.rowDataContacts);
      }
    });
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
  // Controls event
  onBtNext(): void {
    this.gridApi.paginationGoToNextPage();
  }
  // Controls event
  onBtPrevious(): void {
    this.gridApi.paginationGoToPreviousPage();
  }
  // Pagination event
  onUserPageGrid(event: any): void {
    this.gridApi.paginationSetPageSize(Number(event.target.value));
  }

}

function setText(selector: any, text: any): void {
  document.querySelector(selector).innerHTML = text;
}
