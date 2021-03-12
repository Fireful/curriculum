import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user_old';
import { Global } from './global';

@Injectable()
export class UserService {
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }
  pruebas() {
    return 'Soy el servicio de usuarios';
  }

  getUsers(): Observable<any> {
    return this._http.get(this.url + 'users');
  }
}
