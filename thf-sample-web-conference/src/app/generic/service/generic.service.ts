import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ObjectLength } from './../../model/objectLength';
import { TotvsResponse } from './../../model/totvs-response.interface';

@Injectable()
export class GenericService<T> {

  path: string;

  private host: string = 'http://localhost:';
  private port: number = 8080;
  private apiName: string = '/conference-api/api/v';
  private version: number = 1;

  private readonly urlApi: string = this.host + this.port + this.apiName + this.version;

  constructor(private http: HttpClient) { }

  delete(id: string): Observable<{}> {
    return this.http.delete<{}>(`${this.urlApi}/${this.path}/${id}`).pipe(map(() => (id), error => (error)));
  }

  get(): Observable<TotvsResponse> {
    return this.http.get<TotvsResponse>(`${this.urlApi}/${this.path}`);
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.urlApi}/${this.path}/${id}`);
  }

  getCount(): Observable<number> {
    return this.http.get<ObjectLength>(`${this.urlApi}/${this.path}/count/`).pipe(map(result => (result.length)));
  }

  post(entity: any): Observable<T> {
    return this.http.post<T>(`${this.urlApi}/${this.path}`, entity);
  }

  postWithPath(path: string, entity: any): Observable<T> {
    return this.http.post<T>(`${this.urlApi}/${this.path}/${path}`, entity);
  }

  put(entity: any): Observable<T> {
    return this.http.put<T>(`${this.urlApi}/${this.path}/${entity.id}`, entity);
  }

}
