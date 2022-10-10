import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  observe: 'response' as 'body'
}

@Injectable({
  providedIn: 'root'
})
export class ConnApiService {
  private urlApi: string = 'https://www.svp-api.com/api/public/index.php/'
  private urlServer: string = 'https://www.svp-api.com/'

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get<HttpResponse<any>>(`${this.urlApi}${url}`, httpOptions);
  }

  post(url: string, json: any) {
    console.log(url);
    return this.http.post<HttpResponse<any>>(`${this.urlApi}${url}`, json, httpOptions);
  }

  getFile(url: string): any {
    return this.http.get(`${this.urlApi}${url}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      responseType: 'blob'
    });
  }
}
