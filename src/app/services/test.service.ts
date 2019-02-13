import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestResult } from 'app/models/dataModel';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class testService {
  base_url:any;
  constructor(private httpClient: HttpClient) {
    this.base_url = 'https://flask-app.azurewebsites.net';
    console.log('Base Service: ',this.base_url);
  }

  async TestIt() {
    let r: RequestResult = { status: 200, message: '' };
    await this.httpClient.get(this.base_url + '/todos').toPromise()
      .then(
        (d) => {
          r.data = d;
          // console.log(d);
        }
      )
      .catch((err) => {
        r.status = err.status;
        r.message = err.statusText;
      });
    return r;
  }

}
