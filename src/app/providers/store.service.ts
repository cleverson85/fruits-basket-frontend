import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutesStore } from '../shared/enum/apiRoutesStore.enum';
import BaseService from './common/base.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService extends BaseService {
  private readonly SAVE_STORE_LIST = ApiRoutesStore.SAVE_LIST;

  salvar(stores: any) {
    this.httpClient.post(this.API + this.SAVE_STORE_LIST, stores).subscribe(
      (result: any) => {
        this.cartService.setMessage({});
        this.toasterService.showToastSuccess('Operação efetuada com sucesso.');
        this.router.navigate(['home']);
      },
      (err: HttpErrorResponse) => {
        const { error } = err;
        console.log('ERROR => ' + error);
        this.toasterService.showToastError(
          'Não foi possível exetuar a operação, tente novamente mais tarde.',
        );
      },
    );
  }
}