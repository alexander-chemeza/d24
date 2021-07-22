import {Component, OnChanges, OnInit} from '@angular/core';
import {JournalButtonsComponent} from './journal-buttons/journal-buttons.component';
import {RestapiService} from '../../restapi.service';
import {concat} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {DatePipe} from '@angular/common';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit, OnChanges {
  printSenderBlank = true;
  blankToType = '';
  selectedBlankArrays: any;
  pipe = new DatePipe('en-US');
  public gridApi: any;
  public gridColumnApi: any;
  public rowData: any;
  public columnDefs: any;
  public defaultColDef: any;
  public rowSelection: any;
  public paginationPageSize: any;
  public selectedDraftOrderRow: number[] = [];
  public selectedAppliedOrderRows: number[] = [];
  public storedTableResponse: any;
  public itemToShow: any;

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
          } else if (target === 'show') {
            const id = this.rowData[Number(this.gridApi.getFocusedCell().rowIndex)].id;
            this.itemToShow = this.storedTableResponse.find((item: any) => item.id === id);
            console.log('item to show', this.itemToShow);

            this.showModal('view-request');
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
    this.storedTableResponse = [];
    this.service.getAllUserOrders().subscribe(response => {
      if (response.status === 200) {
        this.storedTableResponse = response.body;
        for (const item of response.body) {
          if (item.status !== 'Отменен') {
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
        }
        this.gridApi.setRowData(this.rowData);
        this.selectedDraftOrderRow = [];
        this.selectedAppliedOrderRows = [];
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

  showModal(id: string): void {
    const modal: any = document.getElementById(id);
    modal.classList.remove('hide-modal');
    modal.classList.add('show-modal');
  }

  hideModal(id: string): void {
    const modal: any = document.getElementById(id);
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
    this.selectedDraftOrderRow = [];
    this.selectedAppliedOrderRows = [];
    for (const item of event.api.getSelectedNodes()) {
      if (item.data.status === 'Черновик') {
        this.selectedDraftOrderRow.push(item.data.id);
      } else if (item.data.status === 'Загружен') {
        this.selectedAppliedOrderRows.push(item.data.id);
      } else {
        this.gridApi.getRowNode(item.rowIndex).setSelected(false);
      }
    }
    console.log(event.api.getSelectedNodes());
    console.log('Selected rows', this.selectedDraftOrderRow);
  }

  sendOrders(event: any): void {
    const observables = this.selectedDraftOrderRow.map(x => this.service.sendOrder(x));

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

  showBlanks(): void {
    this.selectedBlankArrays = [];
    for (const item of this.selectedAppliedOrderRows) {
      const itemInfo = this.storedTableResponse.find((i: any) => i.id === item);
      this.selectedBlankArrays.push(itemInfo);
    }
    this.blankToType = this.selectedBlankArrays.map((item: any) => item.order_number).join(', ');
    this.showModal('report-blank');
  }

  showStickers(): void {
    this.selectedBlankArrays = [];
    for (const item of this.selectedAppliedOrderRows) {
      const itemInfo = this.storedTableResponse.find((i: any) => i.id === item);
      this.selectedBlankArrays.push(itemInfo);
    }
    this.blankToType = this.selectedBlankArrays.map((item: any) => item.order_number).join(', ');
    this.showModal('sticker-printing');
  }

  public openPDF(id: string): void {
    const DATA: any = document.getElementById(id);

    for (const item of DATA.children) {
      html2canvas(item).then(canvas => {
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        console.log(heightLeft);
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('p', 'mm', 'a4', true);
        let position = 0;

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, 'FAST');
        heightLeft -= pageHeight;


        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save( `${id}.pdf`);
      });
    }
  }
}


function setText(selector: any, text: any): void {
  document.querySelector(selector).innerHTML = text;
}


