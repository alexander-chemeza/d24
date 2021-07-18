import {Component, OnChanges, OnInit} from '@angular/core';
import {RestapiService} from '../../restapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {
  public gridApi: any;
  public gridColumnApi: any;
  public defaultColDef: any;
  public rowSelection: any;
  public paginationPageSize: any;
  public columnDefs: any;
  public rowData: any;

  constructor(private service: RestapiService) {
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
    this.getTable();
  }

  ngOnInit(): void {
  }

  getTable(): void {
    this.rowData = [];
    this.service.getAllUserOrders().subscribe(response => {
      if (response.status === 200) {
        for (const item of response.body) {
          if (item.status === 'Загружен') {
            this.rowData.push({
              number: item.order_number,
              status: item.status,
              sender: item.sender_name,
              date1: item.sender_delivery_from.split(' ')[0],
              recipient: item.recipient_name,
              date2: item.recipient_accept_from.split(' ')[0],
              author: item.userId,
            });
          }
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

  onPaginationChanged(event: any, space: string): void {
    if (this.gridApi) {
      setText(`#current-${space}`, this.gridApi.paginationGetCurrentPage() + 1);
      setText(`#total-${space}`, this.gridApi.paginationGetTotalPages());
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

}

function setText(selector: any, text: any): void {
  document.querySelector(selector).innerHTML = text;
}
