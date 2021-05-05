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

  create(experiencia): Observable<any> {
    let params = JSON.stringify(experiencia);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'save', params, { headers: headers });
  }

  update(id, experiencia): Observable<any> {
    let params = JSON.stringify(experiencia);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url + 'job/' + id, params, { headers: headers });
  }

  delete(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete(this.url + 'job/' + id, { headers: headers });
  }
}
