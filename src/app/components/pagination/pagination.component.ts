import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Environment } from 'src/app/environment.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Output() pageChange = new EventEmitter<number>();
  @Input() items: number;

  subscription = new Subscription();
  config: any;
  totalPages: number;
  pages = [];

  constructor() {}

  ngOnInit() {
    this.configurePageNumbers();
  }

  configurePageNumbers() {
    let index = 0;
    while (index < this.items) {
      this.pages.push(index);
      index++;
    }

    this.config = {
      itemsPerPage: Environment.settings.itensPerPage,
      currentPage: 1,
      totalItems: this.pages,
    };
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
    this.pageChange.emit(event);
  }
}
