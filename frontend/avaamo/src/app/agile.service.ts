

import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AgileService {
  apiRoot = 'http://0.0.0.0:8080';
  private _headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
    this._headers = new HttpHeaders();
      this._headers.set('Content-Type', 'application/json');
      this._headers.set('cache-control', 'no-cache');
  }

  private extractData(res) {
    const body = res;
    return body || {};
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }

    getAllBoards(): Promise<any>  {

        const apiURL = `${this.apiRoot}/api/all`;
        return this.http.get(apiURL)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    saveBoard(params): Promise<any>  {
        const apiURL = `${this.apiRoot}/api/add`;
        return this.http.post(apiURL, JSON.stringify(params), {headers: this._headers})
          .toPromise()
          .then(this.extractData)
          .catch(this.handleError);
    }

    editBoard(params, id): Promise<any>  {
      const apiURL = `${this.apiRoot}/api/edit/${id}`;
      return this.http.put(apiURL, JSON.stringify(params), {headers: this._headers})
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    deleteBoard(id): Promise<any>  {
      const apiURL = `${this.apiRoot}/api/delete/${id}`;
      return this.http.delete(apiURL, {headers: this._headers})
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }


}
