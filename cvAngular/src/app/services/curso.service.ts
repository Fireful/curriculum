import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';
import { Global } from './global';

@Injectable()
export class CursoService {
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }
  pruebas() {
    return 'Soy el servicio de cursos';
  }

  getCursos(): Observable<any> {
    return this._http.get(this.url + 'cursos');
  }
}
