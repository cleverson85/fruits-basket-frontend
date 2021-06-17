import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ConfigureImagePipe } from 'src/app/shared/pipe/configureImage.pipe';
import { CardComponent } from './card.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    CardComponent,
    ConfigureImagePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxMaskModule.forRoot(),
    SharedModule
  ],
  exports: [
    CardComponent,
    ConfigureImagePipe
  ]
})
export class CardModule { }
