import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuListComponent } from './menu-list.component';

@NgModule({
  declarations: [MenuListComponent],
  imports: [SharedModule],
  exports: [MenuListComponent],
  bootstrap: [MenuListComponent],
})
export class MenuListModule {}
