import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Store } from 'src/app/models/store';
import { CartService } from 'src/app/providers/cart.service';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { StoreService } from 'src/app/providers/store.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @ViewChild('elementQtdRef') elementQtdRef: ElementRef;

  subscription = new Subscription();
  itemsInCart: Store[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  get quantityRef() {
    return this.elementQtdRef?.nativeElement.value;
  }

  constructor(
    private cartService: CartService,
    private storeService: StoreService,
    private toaster: ToasterService,
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.cartService.message$.subscribe((result: any) => {
        this.itemsInCart = result;

        console.log(this.itemsInCart);
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  configurePrice(item: Store): any {
    item.totalValue = (item.quantity * item.fruit.price).toFixed(2);
    return item.totalValue;
  }

  changeAvailableQuantity(item: Store) {
    if (this.quantityRef > item.totalQuantity) {
      this.toaster.showToastWarning(
        `Quantidade informada do item ${item.fruit.name} não pode ser maior que a quantidade disponível.`,
      );
      return;
    }

    item.quantity = this.quantityRef;
    item.fruit.availableQuantity = item.totalQuantity - this.quantityRef;
    this.configurePrice(item);
  }

  finalizarCompra() {
    this.storeService.salvar(this.itemsInCart);
  }
}
