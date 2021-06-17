import { ApiRoutesStore } from './../../shared/enum/apiRoutesStore.enum';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from 'src/app/models/store';
import { StoreService } from 'src/app/providers/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  subscription = new Subscription();
  store: Store[] = [];
  pages: number;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.getStore();
  }

  getStore(page?: number) {
    this.subscription.add(
      this.storeService
        .get<Store[]>(`${ApiRoutesStore.STORE}?page=${page || 1}&ItemsByPage=${9}`)
        .subscribe((result: any) => {
          debugger;
          const { items, count } = result;
          this.store = items;
          this.pages = count;
        }),
    );
  }

  onPageChange(page: any) {
    this.getStore(page);
  }
}
