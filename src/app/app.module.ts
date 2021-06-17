import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule
} from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppConfig } from './app-config.model';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmModalModule } from './components/confirm-modal/confirm-modal.module';
import { MenuModule } from './components/menu/menu.module';
import { Environment } from './environment.service';
import { AuthService } from './providers/auth.service';
import { HttpRequestInterceptor } from './shared/httprequest.interceptor';

export function initializeApp(environmentConfig: Environment) {
  return (): Promise<AppConfig> => environmentConfig.load();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MenuModule,
    ConfirmModalModule,
    ToastrModule.forRoot(),
    NgbModule,
  ],
  providers: [
    Environment,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Environment],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
