import {Component, OnDestroy} from '@angular/core';
import {ICellRendererParams} from 'ag-grid-community';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-contacts-buttons',
  templateUrl: './contacts-buttons.component.html',
  styleUrls: ['./contacts-buttons.component.scss']
})
export class ContactsButtonsComponent implements ICellRendererAngularComp, OnDestroy {
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

  constructor() {
  }

  ngOnDestroy(): void {
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

}
