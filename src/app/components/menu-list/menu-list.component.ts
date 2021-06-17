import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import BaseService from 'src/app/providers/common/base.service';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { ModalService } from 'src/app/providers/modal.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit, OnDestroy {
  @Input() route: string;
  @Input() delete: any;
  @Input() routeApi: string;
  @Output() modelEmitter = new EventEmitter();
  @Output() detalhe = new EventEmitter();
  subscription = new Subscription();

  constructor(
    private router: Router,
    private modalService: ModalService,
    private toaster: ToasterService,
    private baseService: BaseService
  ) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editar() {
    this.router.navigate([this.route]);
  }

  deletar() {
    if (this.delete) {
      this.subscription = this.modalService
        .showConfirm(
          'Atenção',
          `Confirma exclusão do item?`
        )
        .subscribe((result: boolean) => {
          if (result) {
            this.baseService
              .delete<any>(this.delete.id, this.routeApi)
              .subscribe(
                (res: any) => {
                  this.toaster.showToastSuccess(
                    `Operação efetuada com sucesso!`
                  );
                  this.modelEmitter.emit(res);
                },
                (e: HttpErrorResponse) => {
                  const { error } = e;
                  this.toaster.showToastError(error.message);
                }
              );
          }
        });
    }
  }

  detalhar() {
    this.detalhe.emit();
  }
}
