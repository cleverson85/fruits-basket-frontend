import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Environment } from '../environment.service';
import { Base } from '../models/base';

@Injectable({
  providedIn: 'root',
})
export class GenericResolverGuard implements Resolve<Base> {

  protected readonly API = Environment.settings.api.url;

  constructor(private httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const resolverData = route.data.resolverData;
    return this.httpClient.get(`${this.API}${resolverData.url}${route.params['id']}`)
    .pipe(
      map((result: any) => {
        return result;
      })
    );
  }
}
