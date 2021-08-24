import {Component, OnChanges, OnInit} from '@angular/core';
import {JournalButtonsComponent} from './journal-buttons/journal-buttons.component';
import {RestapiService} from '../../restapi.service';
import {concat} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {DatePipe} from '@angular/common';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {JournalOnlyCopyComponent} from './journal-only-copy/journal-only-copy.component';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit, OnChanges {
  sidebarItems: any = [];
  loading = false;
  userOldInfo: any = sessionStorage.getItem('currentUser');
  user: any;
  printSenderBlank = true;
  blankToType = '';
  selectedBlankArrays: any;
  selectedBlanksArraysForSticker: any;
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
  public sidebarShow = false;

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

  constructor(private service: RestapiService, private router: Router) {
    // @ts-ignore
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.frameworkComponents = {
      journalButtons: JournalButtonsComponent,
      journalOnlyCopy: JournalOnlyCopyComponent
    };

    this.columnDefs = [
    {
      headerName: 'Управление',
      pinned: 'right',
      // cellRenderer: 'btnCellRenderer',
      cellRendererSelector: (params: any): any => {
        const draft = {
          component: 'journalButtons',
          params: {
            values: ['status']
          }
        };

        const other = {
          component: 'journalOnlyCopy',
          params: {
            values: ['status']
          }
        };
        if (params.data.status === 'Черновик') {
          return draft;
        } else {
          return other;
        }
      },
      cellRendererParams: {
        clicked: (target: any): void => {
          // alert(`${field} was clicked`);`
          if (target === 'delete') {
            this.showModal('ask-if-delete');
          } else if (target === 'edit') {
            const id = this.rowData[Number(this.gridApi.getFocusedCell().rowIndex)].id;
            const journalItem = this.storedTableResponse.find((item: any) => item.id === id);
            this.router.navigate(['order'], {queryParams: {data: JSON.stringify(journalItem)}});
          } else if (target === 'show') {

          } else if (target === 'copy') {
            // Get copied order data
            const itemToCopy = this.storedTableResponse
              .find((item: any) => item.id === this.rowData[Number(this.gridApi.getFocusedCell().rowIndex)].id);
            let deliveryType = '';
            let placingType = '';
            // Detect correct value of delivery type
            if (itemToCopy.delivery_type === 'Дверь/Дверь') {
              deliveryType = 'dt0';
            } else if (itemToCopy.delivery_type === 'Терминал/Дверь') {
              deliveryType = 'dt1';
            } else if (itemToCopy.delivery_type === 'Дверь/Терминал') {
              deliveryType = 'dt2';
            } else if (itemToCopy.delivery_type === 'Терминал/Терминал') {
              deliveryType = 'dt3';
            }
            // Detect correct value of placing type
            if (itemToCopy.delivery_placing_type === 'Короб') {
              placingType = 'pt0';
            } else if (itemToCopy.delivery_placing_type === 'Паллета') {
              placingType = 'pt1';
            } else if (itemToCopy.delivery_placing_type === 'Негабарит') {
              placingType = 'pt2';
            }else if (itemToCopy.delivery_placing_type === 'Документы') {
              placingType = 'pt3';
            } else if (itemToCopy.delivery_placing_type === 'Мешок') {
              placingType = 'pt4';
            }
            const data = {
              deal_type: 1,
              delivery_type: deliveryType,
              senderCustomerId: itemToCopy.senderCustomerId,
              senderCustomerAddressId: itemToCopy.senderCustomerAddressId,
              senderCustomerContactId: itemToCopy.senderCustomerContactId,
              recipientCustomerId: itemToCopy.recipientCustomerId,
              recipientCustomerAddressId: itemToCopy.recipientCustomerAddressId,
              recipientCustomerContactId: itemToCopy.recipientCustomerContactId,
              sender_delivery_from: itemToCopy.sender_delivery_from,
              sender_delivery_to: itemToCopy.sender_delivery_to,
              sender_lunch_break_start: itemToCopy.sender_lunch_break_start,
              sender_lunch_break_finish: itemToCopy.sender_lunch_break_finish,
              sender_description: itemToCopy.sender_description,
              recipient_accept_from: itemToCopy.recipient_accept_from,
              recipient_accept_to: itemToCopy.recipient_accept_to,
              recipient_description: itemToCopy.recipient_description,
              recipient_email: itemToCopy.recipient_email,
              recipient_lunch_break_start: itemToCopy.recipient_lunch_break_start,
              recipient_lunch_break_finish: itemToCopy.recipient_lunch_break_finish,
              description_delivery: itemToCopy.description_delivery,
              delivery_placing_type: placingType,
              delivery_weight: itemToCopy.delivery_weight,
              delivery_volume: itemToCopy.delivery_volume,
              delivery_size_x: itemToCopy.delivery_size_x,
              delivery_size_y: itemToCopy.delivery_size_y,
              delivery_size_z: itemToCopy.delivery_size_z,
              amount_packages: itemToCopy.amount_packages,
            };
            const ok = !Object.values(data).every(o => o === null && o === '');
            if (ok) {
              this.service.placeNewOrder(data).subscribe(response => {
                if (response.status === 200) {
                  this.getTable();
                }
              });
            }
          }
        }
      },
      maxWidth: 150,
    },
      {
        headerName: '',
        field: 'select',
        sortable: false,
        flex: 1,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        minWidth: 50,
        maxWidth: 50,
        id: '',
      },
      {
        headerName: 'Номер',
        field: 'number',
        sortable: true,
        flex: 1,
      },
      {
        headerName: 'Статус',
        field: 'status',
        sortable: true,
        flex: 1,
      },
      {
        headerName: 'Дата и время изменения статуса',
        field: 'orderDate',
        sortable: true,
        sort: ['desc'],
        sortingOrder: ['asc', 'desc'],
        flex: 1,
      },
      // {
      //   headerName: 'Время изменения статуса',
      //   field: 'orderTime',
      //   sortable: false,
      //   flex: 1,
      //   id: '',
      //   minWidth: 220
      // },
      {
        headerName: 'Услуга',
        field: 'service',
        sortable: true,
        flex: 1,
      },
      {
        headerName: 'Тип доставки',
        field: 'delivery',
        sortable: true,
        flex: 1,
      },
      {
        headerName: 'ТТН',
        field: 'ttn',
        sortable: true,
        flex: 1,
      },
      {
        headerName: 'Отправитель',
        field: 'sender',
        sortable: true,
        flex: 1,
      },
      {
        headerName: 'Получатель',
        field: 'recipient',
        sortable: true,
        flex: 1,
      },
      {
        headerName: 'Тип грузового места',
        field: 'place',
        sortable: true,
        flex: 1,
      },
      {
        headerName: 'Количество',
        field: 'amount',
        sortable: true,
        flex: 1,
      },
      {
        headerName: 'Адрес выдачи груза',
        field: 'address1',
        sortable: true,
        flex: 1,
        maxWidth: 700
      },
      {
        headerName: 'Дата выдачи груза',
        field: 'date1',
        sortable: true,
        sort: ['desc'],
        sortingOrder: ['asc', 'desc'],
        flex: 1,
      },
      {
        headerName: 'Время выдачи груза с',
        field: 'time11',
        sortable: true,
        flex: 1,
      },
      {
        headerName: 'Время выдачи груза по',
        field: 'time12',
        sortable: true,
        flex: 1,
      },
      {
        headerName: 'Адрес доставки груза',
        field: 'address2',
        sortable: true,
        flex: 1,
        maxWidth: 700
      },
      {
        headerName: 'Дата доставки груза',
        field: 'date2',
        sortable: true,
        sort: ['desc'],
        sortingOrder: ['asc', 'desc'],
        flex: 1,
      },
      {
        headerName: 'Время доставки груза с',
        field: 'time21',
        sortable: true,
        flex: 1,
      },
      {
        headerName: 'Время доставки груза по',
        field: 'time22',
        sortable: true,
        flex: 1,
      },
      {
        headerName: 'Автор документа',
        field: 'author',
        sortable: true,
        flex: 1,
      },
    ];
    this.rowData = [];
    this.defaultColDef = {
      flex: 1,
      resizable: true,
      sortingOrder: ['desc', 'asc'],
      maxWidth: 500
    };
    this.rowSelection = 'multiple';
    this.paginationPageSize = 10;
  }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
    if (this.userOldInfo) {
      this.user = JSON.parse(this.userOldInfo);
      delete this.user.password;
    } else {
      this.router.navigate(['login']);
    }
  }

  getTable(): void {
    this.loading = true;
    this.rowData = [];
    this.storedTableResponse = [];
    this.service.getAllUserOrders().subscribe(response => {
      if (response.status === 200) {
        this.storedTableResponse = response.body.reverse();
        for (const item of response.body) {
          if (item.deal_type === 1) {
            item.deal_type = 'Экспресс-доставка грузов';
          }
          this.rowData.push({
            number: item.order_number,
            status: item.status,
            orderDate: `${item.orderDate.split(' ')[0]}; ${item.orderDate.split(' ')[1].substr(0, 5)}`,
            // orderTime: item.orderDate.split(' ')[1].substr(0, 5),
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
            author: item.userName,
            id: item.id
          });
        }
        this.gridApi.setRowData(this.rowData);
        this.selectedDraftOrderRow = [];
        this.selectedAppliedOrderRows = [];
        this.loading = false;
      }
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getTable();
    if (!localStorage.getItem('journal')) {
      localStorage.setItem('journal', JSON.stringify(this.gridColumnApi.getColumnState()));
    } else {
      const journalSetting = localStorage.getItem('journal');
      if(journalSetting) {
        const journalState = JSON.parse(journalSetting);
        this.gridColumnApi.applyColumnState({
          state: journalState,
          applyOrder: true
        });
      }
    }
    this.prepareSidebar();
  }

  onPaginationChanged(): void {
    if (this.gridApi) {
      setText('#current', this.gridApi.paginationGetCurrentPage() + 1);
      setText('#total', this.gridApi.paginationGetTotalPages());
    }
  }

  onBtNext(): void {
    const currentPage = this.gridApi.paginationGetCurrentPage();
    const totalPages = this.gridApi.paginationGetTotalPages();
    const prevBtn: any = document.getElementById('prev');
    const nextBtn: any = document.getElementById('next');
    this.gridApi.paginationGoToNextPage();
    if (currentPage === 0) {
      prevBtn.classList.add('page-prev-white');
    } else if (currentPage === totalPages - 2) {
      nextBtn.classList.add('page-next-grey');
    }
  }

  onBtPrevious(): void {
    const currentPage = this.gridApi.paginationGetCurrentPage();
    const totalPages = this.gridApi.paginationGetTotalPages();
    const prevBtn: any = document.getElementById('prev');
    const nextBtn: any = document.getElementById('next');
    this.gridApi.paginationGoToPreviousPage();
    if (currentPage === totalPages - 1) {
      nextBtn.classList.remove('page-next-grey');
    } else if (currentPage === 1) {
      prevBtn.classList.remove('page-prev-white');
    }
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
      if (item.data.status === 'Черновик' || item.data.status === 'Ошибка отправки заявки') {
        this.selectedDraftOrderRow.push(item.data.id);
      } else if (item.data.status === 'Загружен') {
        this.selectedAppliedOrderRows.push(item.data.id);
      } else {
        this.gridApi.getRowNode(item.rowIndex).setSelected(false);
      }
    }
  }

  sendOrders(event: any): void {
    this.loading = true;
    const observables = this.selectedDraftOrderRow.map(x => this.service.sendOrder(x));

    concat(...observables).pipe(toArray()).subscribe(response => this.getTable());
    // this.loading = false;
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
    this.selectedBlanksArraysForSticker = [];
    for (const item of this.selectedAppliedOrderRows) {
      const itemInfo = this.storedTableResponse.find((i: any) => i.id === item);
      this.selectedBlankArrays.push(itemInfo);
    }
    for (let i = 0; i < this.selectedBlankArrays.length; i++) {
      for (let j = 0; j < this.selectedBlankArrays[i].amount_packages; j++) {
        this.selectedBlanksArraysForSticker.push(this.selectedBlankArrays[i]);
      }
    }
    this.blankToType = this.selectedBlankArrays.map((item: any) => item.order_number).join(', ');
    this.showModal('stickers-modal');
  }

  public openPDF(id: string): void {
    const DATA: any = document.getElementById(id);

    html2canvas(DATA, {scale: 2}).then(canvas => {
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      const imgData = canvas.toDataURL('image/jpeg');
      const doc = new jsPDF('p', 'mm', 'a4', true);
      let position = 0;

      doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight, 'FAST');
      heightLeft -= pageHeight;


      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save( `${id}.pdf`);
    });
  }

  printBlanks(): void {
    // window.print();
    const mydiv: any = document.getElementById('blanks');
    const placeBlanks: any = document.getElementById('pdf-blanks');
    let content: any;
    if (mydiv && placeBlanks) {
      content = mydiv.innerHTML;
      placeBlanks.innerHTML = content;
      window.print();
    }
  }

  updateView(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.gridColumnApi.setColumnVisible(event.target.getAttribute('id'), event.target.checked);
    const state = this.gridColumnApi.getColumnState();
    localStorage.setItem('journal', JSON.stringify(state));
    this.prepareSidebar();
  }

  prepareSidebar(): void {
    this.sidebarItems = [];
    const names = this.columnDefs.map((item: any) => item.headerName).splice(2);
    let tableState: any = [];
    if (!localStorage.getItem('journal')) {
      tableState = this.gridColumnApi.getColumnState().splice(2);
    } else {
      const setting = localStorage.getItem('journal');
      if (setting) {
        tableState = JSON.parse(setting).splice(2);
      }
    }
    for (let i = 0; i < names.length; i++) {
      this.sidebarItems.push({
        colId: tableState[i].colId,
        headerName: names[i],
        hide: tableState[i].hide
      });
    }
  }

  changedWidth(event: any): void {
    localStorage.setItem('journal', JSON.stringify(this.gridColumnApi.getColumnState()));
    this.prepareSidebar();
  }

  hideOnTimeout(): void {
    this.sidebarShow = !this.sidebarShow;
  }

  delete(): void {
    const id = this.rowData[Number(this.gridApi.getFocusedCell().rowIndex)].id;
    if (id) {
      this.service.cancelOrder(id).subscribe(response => {
        if (response.status === 200) {
          this.getTable();
          this.hideModal('ask-if-delete');
        }
      });
    }
  }
}


function setText(selector: any, text: any): void {
  document.querySelector(selector).innerHTML = text;
}


