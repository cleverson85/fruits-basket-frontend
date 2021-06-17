import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Fruit } from 'src/app/models/fruit';
import { AuthService } from 'src/app/providers/auth.service';
import { CartService } from 'src/app/providers/cart.service';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { FruitService } from 'src/app/providers/fruit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('valueToSearch') valueToSearch: ElementRef;

  subscription = new Subscription();
  fruits: Fruit[];
  pages: number;

  constructor(
    private cartService: CartService,
    private fruitService: FruitService,
  ) { }

  ngOnInit() {
    this.subscription.add(
      this.fruitService.getFruits(1).subscribe((result: any) => {
        this.configureItens(result);
      }
    ));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  find(page?: number) {
    this.subscription.add(
      this.fruitService.getFruitByName(this.valueToSearch.nativeElement.value, page)
        .subscribe((result: any) => {
          this.configureItens(result);
        })
    );
  }

  configureItens(result: any) {
    if (result) {
      const { count, items } = result;
      this.fruits = items;
      this.pages = count;
    }
  }

  onPageChange(page: any) {
    this.find(page);
  }
}
