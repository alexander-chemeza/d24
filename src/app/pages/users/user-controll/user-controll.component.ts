import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICellRendererParams} from 'ag-grid-community';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-user-controll',
  templateUrl: './user-controll.component.html',
  styleUrls: ['./user-controll.component.scss']
})
export class UserControllComponent implements ICellRendererAngularComp, OnDestroy {
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler(event: any): void {
    const target = event.target.getAttribute('btntype');
    if (target) {
      this.params.clicked(target);
    } else {
      console.log('No attribute');
    }
  }

  constructor() { }

  ngOnDestroy(): void {
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

}
