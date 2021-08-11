import {Component, OnChanges, OnInit} from '@angular/core';
import {RestapiService} from '../../restapi.service';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {
  loading = false;
  userOldInfo: any = sessionStorage.getItem('currentUser');
  user: any;

  public gridApi: any;
  public gridColumnApi: any;
  public defaultColDef: any;
  public rowSelection: any;
  public paginationPageSize: any;
  public columnDefs: any;
  public rowData: any;

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

    this.columnDefs = [
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
        filter: true,
        flex: 3
      },
      {
        headerName: 'Отправитель',
        field: 'sender',
        sortable: true,
        filter: true,
        flex: 3
      },
      {
        headerName: 'Дата выдачи груза',
        field: 'date1',
        sortable: true,
        filter: true,
        flex: 3
      },
      {
        headerName: 'Получатель',
        field: 'recipient',
        sortable: true,
        filter: true,
        flex: 3
      },
      {
        headerName: 'Дата доставки груза',
        field: 'date2',
        sortable: true,
        filter: true,
        flex: 3
      },
      {
        headerName: 'Автор',
        field: 'author',
        sortable: true,
        filter: true,
        flex: 3
      }
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
    this.service.getAllUserOrders().subscribe(response => {
      if (response.status === 200) {
        for (const item of response.body) {
          if (item.status !== 'Черновик' && item.status !== 'Отменен' && item.status !== 'Исполнен') {
            this.rowData.push({
              number: item.order_number,
              status: item.status,
              sender: item.sender_name,
              date1: item.sender_delivery_from.split(' ')[0],
              recipient: item.recipient_name,
              date2: item.recipient_accept_from.split(' ')[0],
              author: item.userName,
            });
          }
        }
        this.gridApi.setRowData(this.rowData);
        this.loading = false;
      }
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getTable();
  }

  onPaginationChanged(event: any, space: string): void {
    if (this.gridApi) {
      setText(`#current-${space}`, this.gridApi.paginationGetCurrentPage() + 1);
      setText(`#total-${space}`, this.gridApi.paginationGetTotalPages());
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

}

function setText(selector: any, text: any): void {
  document.querySelector(selector).innerHTML = text;
}
