import { NgModule } from '@angular/core';

import { ConfirmModalComponent } from './confirm-modal.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ConfirmModalComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ConfirmModalComponent
  ],
  bootstrap: [
    ConfirmModalComponent
  ]
})
export class ConfirmModalModule { }
