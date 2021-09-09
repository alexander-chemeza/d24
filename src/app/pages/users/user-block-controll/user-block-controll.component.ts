import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-user-block-controll',
  templateUrl: './user-block-controll.component.html',
  styleUrls: ['./user-block-controll.component.scss']
})
export class UserBlockControllComponent implements ICellRendererAngularComp, OnDestroy {
  state = false;
  private params: any;
  cells: any = document.getElementsByClassName('ag-cell');

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler(event: any): void {
    const target = {
      state: event.target.innerText,
      style: event.currentTarget.parentNode.parentNode.parentNode.style.transform
    };
    if (target) {
      this.params.clicked(target);
    } else {
      console.log('No attribute');
    }
  }

  constructor() {
  }

  ngOnDestroy(): void {
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

}
