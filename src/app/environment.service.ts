import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from './app-config.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class Environment {
    public static settings: AppConfig = null;

    constructor(private http: HttpClient) { }

    load() {
        const jsonFile = `assets/config/config.json`;
        return this.http
            .get(jsonFile)
            .pipe(
                tap((response: AppConfig) => {
                    Environment.settings = response as AppConfig;
                }),
            )
            .toPromise();
    }
}

export default Environment.settings;
