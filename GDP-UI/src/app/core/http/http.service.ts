import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { TokenService } from 'src/app/core/token/token.service';
import { MassegesService } from '../messeges/messages.service';
import { API_URL } from '../const';
import { UserDTO } from 'src/app/model/user.dto';

@Injectable({ providedIn: 'root'})
export class HttpService<T> {
    constructor (
        private http: HttpClient,
        private messageService: MassegesService,
        private router: Router,
        private tokenService: TokenService) {

    }

    public handlerError (error: HttpErrorResponse) {
            if (error.status === 404) {
              this.messageService.error('Internal Error');
            } else if (error.status === 404) {
                this.messageService.error('Not Found');
            } else if (error.status === 401) {
                this.messageService.error('Authentication field');
            } else if (error.status === 403) {
                this.messageService.error('Forbidden');
            } else if (error.status === 501) {
                this.messageService.error('Internal Error');
            } else {
                this.tokenService.removeToken();
                this.router.navigate(['login']);
                console.log(error.message);
                this.messageService.error('Error');
            }

    }

    public salve(item: T, endpoint): Observable<T> {
        return this.http
          .post<T>(`${API_URL}/${endpoint}`, item)
          .pipe(tap(data => {
              return data;
            }, (error: HttpErrorResponse) => {
                 this.handlerError(error);
            }));
      }

      public post(item: any, endpoint): Observable<any> {
        return this.http
          .post<T>(`${API_URL}/${endpoint}`, item)
          .pipe(tap(data => {
              return data;
            }, (error: HttpErrorResponse) => {
                 this.handlerError(error);
            }));
      }

      public put(item: T, endpoint): Observable<T> {
        return this.http
          .put<T>(`${API_URL}/${endpoint}`, item)
          .pipe(tap(data => {
              return data;
            }, (error: HttpErrorResponse) => {
                 this.handlerError(error);
            }));
      }

      public get(endpoint): Observable<T[]> {
        return this.http
          .get<T[]>(`${API_URL}/${endpoint}`)
          .pipe(tap(data => {
              return data;
            }, (error: HttpErrorResponse) => {
                 this.handlerError(error);
           }));
    }

    public getOne(endpoint): Observable<T> {
      return this.http
        .get<T>(`${API_URL}/${endpoint}`)
        .pipe(tap(data => {
            return data;
          }, (error: HttpErrorResponse) => {
               this.handlerError(error);
         }));
    }
     public delete(endpoint: string, id: number): Observable<any> {
        return this.http.delete(`${API_URL}/${endpoint}/${id}`)
        .pipe(tap(data => {
          return data;
        }, (error: HttpErrorResponse) => {
            this.handlerError(error);
       }));
      }


      public login(item: T, endpoint): Observable<UserDTO> {
        return this.http
          .post<UserDTO>(`${API_URL}/${endpoint}`, item)
          .pipe(tap(data => {
              return data;
            }, (error: HttpErrorResponse) => {
              this.handlerError(error);
              console.log(error);
            }));
      }
}
