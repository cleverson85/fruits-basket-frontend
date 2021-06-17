import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';

@NgModule({
  imports: [
    SharedModule,
    UsuarioRoutingModule
  ],
  declarations: [UsuarioComponent]
})
export class UsuarioModule { }
