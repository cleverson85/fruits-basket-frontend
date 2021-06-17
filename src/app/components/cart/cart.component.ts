import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fruit } from 'src/app/models/fruit';
import { CartService } from 'src/app/providers/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  itemsInsideCart: Fruit[] = [];
  quantityInsideCart = 0;

  constructor(private cartService: CartService,
              private router: Router) { }

  ngOnInit() {
    this.subscription.add(
      this.cartService.message$.subscribe((result: any) => {
        this.quantityInsideCart = result?.length || 0;
        this.itemsInsideCart = result;

        console.log(this.itemsInsideCart);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkOut() {
    if (this.quantityInsideCart > 0) {
      this.router.navigate(['/checkout']);
    }
  }
}
