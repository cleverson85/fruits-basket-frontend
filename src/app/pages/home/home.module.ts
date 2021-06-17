import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';

import { HomeRoutingModule } from './home-routing.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';
import { MenuListModule } from 'src/app/components/menu-list/menu-list.module';
import { AvatarModule } from 'ngx-avatar';
import { CardModule } from 'src/app/components/card/card.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PaginationModule,
    MenuListModule,
    AvatarModule,
    CardModule
  ]
})
export class HomeModule { }
