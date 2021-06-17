import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './pagination.component';

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, FormsModule, RouterModule, NgxPaginationModule],
  exports: [PaginationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaginationModule {}
