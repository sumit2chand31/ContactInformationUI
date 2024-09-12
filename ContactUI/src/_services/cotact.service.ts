import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment.development';
import { APIResponse } from '../_model/APIResponse';

@Injectable({
  providedIn: 'root'
})
export class CotactService {

  constructor(private httpClient:HttpClient) { }

  private apiURL =environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
  }

  getALL(path:string) {
    return this.httpClient.get<APIResponse>(this.apiURL+path);
  }

  Create(modal:any, path:string):Observable<APIResponse>{
    return this.httpClient.post<APIResponse>(this.apiURL+path, JSON.stringify(modal), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  Delete( path:string): Observable<any> {
    return this.httpClient.delete<any>(this.apiURL +path, this.httpOptions);
  }

  getById(path:string): Observable<any> {
    return this.httpClient.get<APIResponse>(this.apiURL+path);
  }

  Update(modal:any,path:string):Observable<APIResponse>{
    return this.httpClient.post<APIResponse>(this.apiURL +path+'/', JSON.stringify(modal), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}
