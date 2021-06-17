import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Fruit } from 'src/app/models/fruit';
import { CartService } from 'src/app/providers/cart.service';
import { ToasterService } from 'src/app/providers/common/toaster.service';

@Component({
  selector: 'app-card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @ViewChild('elementQtdRef') elementQtdRef: ElementRef;
  @Input() item: Fruit;

  tempValue: number;

  get quantityRef() {
    return this.elementQtdRef?.nativeElement.value;
  }

  constructor(
    private toaster: ToasterService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.tempValue = this.item.availableQuantity;
  }

  addItemsToCart(item: Fruit) {
    if (!this.quantityRef || this.quantityRef <= 0) {
      return;
    }

    if (this.quantityRef > this.tempValue) {
      this.toaster.showToastWarning(
        `Quantidade informada do item ${item.name} não pode ser maior que a quantidade disponível.`,
      );
      return;
    }

    item.availableQuantity = this.tempValue - this.quantityRef;
    this.cartService.addItemsToCart(item, this.quantityRef, this.tempValue);
  }

  changeAvailableQuantity(item: Fruit) {
    if (this.quantityRef > this.tempValue) {
      return;
    }

    item.availableQuantity = this.tempValue - this.quantityRef;
  }
}
