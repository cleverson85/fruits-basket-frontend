import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './menu.component';
import { CartComponent } from '../cart/cart.component';
import { CartModule } from '../cart/cart.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CartModule
  ],
  declarations: [
    MenuComponent,
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
