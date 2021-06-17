import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartComponent } from './cart.component';


@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CartComponent,
  ]
})
export class CartModule { }
