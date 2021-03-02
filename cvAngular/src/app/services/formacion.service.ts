import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formacion } from '../models/formacion';
import { Global } from './global';

@Injectable()
export class FormacionService {
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }
  pruebas() {
    return 'Soy el servicio de formaciones';
  }

  getFormaciones(): Observable<any> {
    return this._http.get(this.url + 'formaciones');
  }
}
