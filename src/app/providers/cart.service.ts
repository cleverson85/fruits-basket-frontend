import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Fruit } from '../models/fruit';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  messageSource$ = new BehaviorSubject<any>({});
  message$ = this.messageSource$.asObservable();

  itemsInCart: Store[] = [];

  setMessage(value: any) {
    this.messageSource$.next(value);
  }

  addItemsToCart(item: Fruit, quantity: number, totalQuantity: number) {
    const deletedValue = this.itemsInCart.findIndex(
      (e) => e.fruit.id == item.id,
    );
    if (deletedValue >= 0) {
      this.itemsInCart.splice(deletedValue, 1);
    }

    this.itemsInCart.push({
      fruitId: item.id,
      fruit: item,
      quantity,
      totalQuantity,
      totalValue: 0,
    });
    this.setMessage(this.itemsInCart);
  }
}
