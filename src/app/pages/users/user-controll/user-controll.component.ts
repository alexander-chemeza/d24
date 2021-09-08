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
    for (const item of this.cells) {
      item.style.overflow = 'hidden';
    }
    this.state = !this.state;

    if (this.state) {
      event.currentTarget.parentNode.parentNode.parentNode.style.overflow = 'visible';
    } else {
      event.currentTarget.parentNode.parentNode.parentNode.style.overflow = 'hidden';
    }
    console.log('STATE', this.state);

    const target = event.target.getAttribute('btntype');
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
