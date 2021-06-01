import {Component, OnDestroy} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-contragent-buttons',
  templateUrl: './contragent-buttons.component.html',
  styleUrls: ['./contragent-buttons.component.scss']
})
export class ContragentButtonsComponent implements ICellRendererAngularComp, OnDestroy {

  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler(event: any): void {
    this.params.clicked(event);
  }

  constructor() { }

  ngOnDestroy(): void {
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

}
