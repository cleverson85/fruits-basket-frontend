import { PaginationModule } from './../../components/pagination/pagination.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';

@NgModule({
  imports: [SharedModule, StoreRoutingModule, PaginationModule],
  declarations: [StoreComponent],
})
export class StoreModule {}
