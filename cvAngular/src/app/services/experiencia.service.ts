import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia';
import { Global } from './global';

@Injectable()
export class ExperienciaService {
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }
  pruebas() {
    return 'Soy el servicio de experiencias';
  }

  getJobs(): Observable<any> {
    return this._http.get(this.url + 'jobs');
  }
}
