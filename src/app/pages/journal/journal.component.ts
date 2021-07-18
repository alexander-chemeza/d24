import {Component, OnChanges, OnInit} from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import {JournalButtonsComponent} from './journal-buttons/journal-buttons.component';
import {RestapiService} from '../../restapi.service';
import {concat} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit, OnChanges {
  pipe = new DatePipe('en-US');
  public gridApi: any;
  public gridColumnApi: any;
  public rowData: any;
  public columnDefs: any;
  public defaultColDef: any;
  public rowSelection: any;
  public paginationPageSize: any;
  public selectedOrderRows: number[] = [];

  // columnDefs = [
  //   { headerName: 'Наименование',
  //     field: 'name',
  //     sortable: true,
  //     flex: 1,
  //     id: ''
  //   },
  //   {
  //     headerName: 'Управление',
  //     pinned: 'right',
  //     cellRenderer: 'btnCellRenderer',
  //     cellRendererParams: {
  //       clicked: (target: any): void => {
  //         // alert(`${field} was clicked`);
  //         if (target === 'delete') {
  //           const id = this.rowData[Number(this.gridApi.getFocusedCell().rowIndex)].id;
  //           console.log(id);

  //         } else if (target === 'edit') {
  //           console.log('edit');
  //           const id = this.rowData[Number(this.gridApi.getFocusedCell().rowIndex)].id;
  //         }
  //       }
  //     },
  //     maxWidth: 150,
  //   }
  // ];

  frameworkComponents: any;

  constructor(private service: RestapiService) {
    this.frameworkComponents = {
      btnCellRenderer: JournalButtonsComponent,
    };

    this.columnDefs = [
    {
      headerName: 'Управление',
      pinned: 'right',
      cellRenderer: 'btnCellRenderer',
      cellRendererParams: {
        clicked: (target: any): void => {
          // alert(`${field} was clicked`);`
          if (target === 'delete') {
            const id = this.rowData[Number(this.gridApi.getFocusedCell().rowIndex)].id;
            console.log('delete id = ', id);
            this.service.cancelOrder(id).subscribe(response => {
              if (response.status === 200) {
                console.log('Order id = ' + id + ' is deleted');
                this.getTable();
              }
            });
          } else if (target === 'edit') {
            const id = this.rowData[Number(this.gridApi.getFocusedCell().rowIndex)].id;
            console.log('edit id = ', id);
          }
        }
      },
      maxWidth: 150,
    },
      {
        headerName: 'Выбрать',
        field: 'select',
        sortable: false,
        flex: 1,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        minWidth: 150,
        maxWidth: 200,
        id: '',
      },
      {
        headerName: 'Номер',
        field: 'number',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'Статус',
        field: 'status',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'Дата изменения статуса',
        field: 'orderDate',
        sortable: false,
        flex: 1,
        minWidth: 200,
        maxWidth: 300,
      },
      {
        headerName: 'Время изменения статуса',
        field: 'orderTime',
        sortable: false,
        flex: 1,
        minWidth: 210,
        maxWidth: 350,
        id: '',
      },
      {
        headerName: 'Услуга',
        field: 'service',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'Тип доставки',
        field: 'delivery',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'ТТН',
        field: 'ttn',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'Отправитель',
        field: 'sender',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'Получатель',
        field: 'recipient',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'Тип грузового места',
        field: 'place',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'Количество',
        field: 'amount',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'Адрес выдачи груза',
        field: 'address1',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'Дата выдачи груза',
        field: 'date1',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'Время выдачи груза с',
        field: 'time11',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'Время выдачи груза по',
        field: 'time12',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'Адрес доставки груза',
        field: 'address2',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'Дата доставки груза',
        field: 'date2',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'Время доставки груза с',
        field: 'time21',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'Время доставки груза по',
        field: 'time22',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'Автор документа',
        field: 'author',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
    ];
    this.rowData = [];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
    this.rowSelection = 'multiple';
    this.paginationPageSize = 10;
  }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
  }

  getTable(): void {
    this.rowData = [];
    this.service.getAllUserOrders().subscribe(response => {

      if (response.status === 200) {
        for (const item of response.body) {
          this.rowData.push({
            number: item.order_number,
            status: item.status,
            orderDate: this.pipe.transform(item.orderDate.split('T')[0], 'dd.MM.yyyy'),
            orderTime: item.orderDate.split('T')[1].substr(0, 5),
            service: item.deal_type,
            delivery: item.delivery_type,
            ttn: '',
            sender: item.sender_name,
            recipient: item.recipient_name,
            place: item.delivery_placing_type,
            amount: item.amount_packages,
            address1: item.sender_address,
            date1: item.sender_delivery_from.split(' ')[0],
            time11: item.sender_delivery_from.split(' ')[1],
            time12: item.sender_delivery_to.split(' ')[1],
            address2: item.recipient_address,
            date2: item.recipient_accept_from.split(' ')[0],
            time21: item.recipient_accept_from.split(' ')[1],
            time22: item.recipient_accept_to.split(' ')[1],
            author: item.userId,
            id: item.id
          });
        }
        this.gridApi.setRowData(this.rowData);
      }
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getTable();
  }

  onPaginationChanged(): void {
    if (this.gridApi) {
      setText('#current', this.gridApi.paginationGetCurrentPage() + 1);
      setText('#total', this.gridApi.paginationGetTotalPages());
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

  showModal(event: any): void {
    const targetId = event.target.getAttribute('modal');
    const modal: any = document.getElementById(targetId);
    modal.classList.toggle('show-modal');
  }

  hideModal(event: any): void {
    const targetId = event.target.getAttribute('modal');
    const modal: any = document.getElementById(targetId);
    modal.classList.add('hide-modal');
    modal.classList.remove('show-modal');
  }

  selectAll(event: any): void {
    this.gridApi.selectAll();
  }

  changeStage(event: any): void {
    const stageBtns = document.getElementsByClassName('stage-btn') as HTMLCollection;
    let currentForm: any;
    const currentStage: string = event.target.getAttribute('stage');
    const forms = document.getElementsByClassName('form') as HTMLCollection;

    if (currentStage === '1') {
      currentForm = document.getElementById('form-0');
    } else if (currentStage === '2') {
      currentForm = document.getElementById('form-02');
    } else {
      currentForm = document.getElementById('form-03');
    }

    for (let i = 0; i < forms.length; i++) {
      forms[i].classList.add('another-form');
    }
    console.log(currentForm);

    currentForm.classList.remove('another-form');

    for (let i = 0; i < stageBtns.length; i++) {
      stageBtns[i].classList.remove('active-btn');
    }
    event.target.classList.add('active-btn');
  }

  selectedRows(event: any): void {
    this.selectedOrderRows = [];
    for (const item of event.api.getSelectedNodes()) {
      if (item.data.status === 'Черновик') {
        this.selectedOrderRows.push(item.data.id);
      } else {
        this.gridApi.getRowNode(item.rowIndex).setSelected(false);
      }
    }
    console.log(event.api.getSelectedNodes());
    console.log('Selected rows', this.selectedOrderRows);
  }

  sendOrders(event: any): void {
    const observables = this.selectedOrderRows.map(x => this.service.sendOrder(x));

    concat(...observables).pipe(toArray()).subscribe(response => this.getTable());
    // for (const item of this.selectedOrderRows) {
    //   console.log('ITEM:', item);
    //   this.service.sendOrder(item).subscribe(response => {
    //     if (response.status === 200) {
    //       console.log('Order id ' + item + ' is sent');
    //     }
    //   });
    // }

  }

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'https://www.test.com/';

}


function setText(selector: any, text: any): void {
  document.querySelector(selector).innerHTML = text;
}


