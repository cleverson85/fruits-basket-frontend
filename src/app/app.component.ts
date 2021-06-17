import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './providers/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  mostrarMenu = false;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.subscription.add(
      this.authService.mostrarMenuEmitter.subscribe((mostrar: boolean) => {
        this.mostrarMenu = mostrar;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
