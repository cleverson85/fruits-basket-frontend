import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';

@NgModule({
  imports: [
    SharedModule,
    CheckoutRoutingModule,
  ],
  declarations: [CheckoutComponent]
})
export class CheckoutModule { }
