import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry,map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  public postRequest(payload: any, apiUrl: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-ACCESS-TOKEN': this.cookieService.get('jwtToken'),
      })
    };

    return this.httpClient.post((environment.SERVER_ENDPOINT + apiUrl), payload, httpOptions).pipe(map(response => {
      if (response && response['data'] && response['data']['jwtToken']) {
        this.cookieService.set('jwtToken', response['data']['jwtToken'], 1);
      }
      return response;
    }) );
}

public getRequest(params: any, apiUrl): Observable<any>{
  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-ACCESS-TOKEN': this.cookieService.get('jwtToken'),
    }),
    params :new HttpParams(params)
  };
  
  return this.httpClient.get((environment.SERVER_ENDPOINT + apiUrl), httpOptions).pipe(map(response => {
    if (response && response['data'] && response['data']['jwtToken']) {
      this.cookieService.set('jwtToken', response['data']['jwtToken'], 1,'/');
    }
    return response;
  }));
}
  
}
