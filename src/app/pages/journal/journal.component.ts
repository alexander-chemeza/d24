import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {
  public gridApi: any;
  public gridColumnApi: any;
  public rowData: any;
  public columnDefs: any;
  public defaultColDef: any;
  public rowSelection: any;
  public paginationPageSize: any;

  constructor() {
    this.columnDefs = [
      {
        headerName: 'Выбрать',
        field: 'select',
        sortable: false,
        flex: 1,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        minWidth: 150,
        maxWidth: 200
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
        headerName: 'Статусы',
        field: 'status',
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
        headerName: 'Дата доставки груза',
        field: 'date2',
        sortable: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200
      },
      {
        headerName: 'услуга',
        field: 'service',
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
        headerName: 'Адрес выдачи груза',
        field: 'address1',
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
      }
    ];
    this.rowData = [
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
      {
        number: 1234567890,
        status: 'Груз',
        date1: '21.10.2020',
        date2: '25.10.2020',
        service: 'Экспресс-доставка грузов',
        sender: 'ООО "НТТ Импорт"',
        address1: 'МИНСКАЯ ОБЛАСТЬ, Минский, д. Большое Стиклево, ТЕР. РАЙОН Д. БОЛЬШОЕ СТИКЛЕВО, д. 40, корп. 2',
        address2: 'г. Брест, УЛ. КАТИН БОР, д. 103'
      },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
    this.rowSelection = 'multiple';
    this.paginationPageSize = 20;
  }

  ngOnInit(): void {
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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
    modal.classList.add('show-modal');

  }

  hideModal(event: any): void {
    const targetId = event.target.getAttribute('modal');
    const modal: any = document.getElementById(targetId);
    modal.classList.add('hide-modal');
    modal.classList.remove('show-modal');
  }

}

function setText(selector: any, text: any): void {
  document.querySelector(selector).innerHTML = text;
}
