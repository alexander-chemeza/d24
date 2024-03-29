import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICellRendererParams} from 'ag-grid-community';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-user-controll',
  templateUrl: './user-controll.component.html',
  styleUrls: ['./user-controll.component.scss']
})
export class UserControllComponent implements ICellRendererAngularComp, OnDestroy {
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
