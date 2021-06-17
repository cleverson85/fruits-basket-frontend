import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Environment } from 'src/app/environment.service';
import { User } from 'src/app/models/usuario';
import { ApiRoutesAuth } from '../shared/enum/apiRoutesAuth.enum';
import { Token } from '../shared/enum/token.enum';
import { ToasterService } from './common/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  mostrarMenuEmitter = new EventEmitter<boolean>();

  private API = Environment.settings.api.url;
  private readonly LOGIN = ApiRoutesAuth.LOGIN;

  tokenHelper = new JwtHelperService();
  tempUser = false;
  authToken = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toaster: ToasterService,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
  };

  login(user: User) {
    console.log(`${this.API}${this.LOGIN}`);
    this.httpClient.post(`${this.API}${this.LOGIN}`, user).subscribe(
      (result: any) => {
        this.configureSession(result);
      },
      (e: HttpErrorResponse) => {
        const { error } = e;
        this.toaster.showToastError('Email ou senha incorretos.');
      },
    );
  }

  logOut() {
    this.removeToken();
    this.mostrarMenuEmitter.emit(false);
    this.router.navigate(['']);
  }

  removeToken() {
    localStorage.removeItem(Token.Key);
  }

  setToken(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getToken(key: string): string {
    return localStorage.getItem(key);
  }

  configureSession(result: any) {
    const { token, isAuthenticaded } = result;

    if (isAuthenticaded) {
      this.setToken(Token.Key, token);
      this.router.navigate(['/home']);
    } else {
      this.logOut();
    }
  }

  tokenIsExpired(): boolean {
    const isExpired = this.tokenHelper.isTokenExpired(this.getToken(Token.Key));
    this.mostrarMenuEmitter.emit(!isExpired);

    if (isExpired) {
      this.logOut();
    }

    return isExpired;
  }
}
