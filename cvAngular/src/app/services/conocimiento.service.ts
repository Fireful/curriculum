import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conocimiento } from '../models/conocimiento';
import { Global } from './global';

@Injectable()
export class ConocimientoService {
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }
  pruebas() {
    return 'Soy el servicio de conocimientos';
  }

  getConocimientos(): Observable<any> {
    return this._http.get(this.url + 'conocimientos');
  }
}
