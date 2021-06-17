import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Fruit } from '../models/fruit';
import { ApiRoutesFruit } from '../shared/enum/apiRoutesFruit.enum';
import BaseService from './common/base.service';

@Injectable({
  providedIn: 'root',
})
export class FruitService extends BaseService {

  getFruits(page?: number): Observable<Fruit[]> {
    return this.get<Fruit[]>(`${ApiRoutesFruit.FRUIT}?page=${page || 1}&ItemsByPage=${this.itemsPerPage}`).pipe(
      shareReplay(1),
      map((result: Fruit[]) => {
        return result;
      })
    );
  }

  getFruitByName(name: string, page?: number): Observable<Fruit[]> {
    page = page || 1;

    if (name) {
      return this.get<Fruit[]>(
        `${ApiRoutesFruit.NAME}${encodeURIComponent(name)}?page=${page}&ItemsByPage=${this.itemsPerPage}`
      ).pipe(
        map((result: Fruit[]) => {
          return result;
        })
      );
    }

    return this.getFruits(page);
  }

  salvar(formGroup: any, file: File) {
    file
      .arrayBuffer()
      .then((e: any) => {
        formGroup['picture'] = btoa(new Uint8Array(e).reduce((data, byte) => data + String.fromCharCode(byte), ''));

        this.httpClient
          .post(this.API + ApiRoutesFruit.SAVE, formGroup)
          .subscribe(
            (result: any) => {
              this.toasterService.showToastSuccess(
                'Operação efetuada com sucesso.'
              );
              this.router.navigate(['fruit']);
            },
            (err: HttpErrorResponse) => {
              const { error } = err;
              console.log('ERROR => ' + error);
              this.toasterService.showToastError(
                'Não foi possível exetuar a operação, tente novamente mais tarde.'
              );
            }
          );
      })
      .catch((e) => console.log(e));
  }
}
