import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-user-block-controll',
  templateUrl: './user-block-controll.component.html',
  styleUrls: ['./user-block-controll.component.scss']
})
export class UserBlockControllComponent implements ICellRendererAngularComp, OnDestroy {
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
