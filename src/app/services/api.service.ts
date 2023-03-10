import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeleteIncome } from '../interfaces/deleteIncome';
import { DownloadImage } from '../interfaces/downloadImage';
import { ListIncome } from '../interfaces/listIncome';
import { LoginUser } from '../interfaces/loginUser';
import { RegisterIncome } from '../interfaces/registerIncome';
import { RegisterUser } from '../interfaces/registerUser';
import { UpdateIncome } from '../interfaces/updateIncome';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private utils: UtilsService) {}

  registerUser(user: any): Observable<RegisterUser> {
    const formData = new FormData();

    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('age', user.age);
    formData.append('image', user.image);
    formData.append('password', user.password);
    formData.append('confirmPassword', user.confirmPassword);

    return this.http
      .post<RegisterUser>(
        environment.BASE_URL + '/auth/register/user',
        formData
      )
      .pipe(
        catchError((err) => {
          if (err.status === 0 && err.status !== 404) {
            this.utils.showError(
              'Ocorreu um erro na aplicação, tente novamente.'
            );
          } else if (err.status === 404) {
            this.utils.showError(err.error.message);
          } else {
            this.utils.showError(
              'Ocorreu um erro no servidor, tente mais tarde.'
            );
          }

          return throwError(() => err);
        })
      );
  }

  loginUser(user: any): Observable<LoginUser> {
    return this.http
      .post<LoginUser>(environment.BASE_URL + '/auth/login', user)
      .pipe(
        retry(2),
        catchError((err) => {
          if (err.status === 0 && err.status !== 404) {
            this.utils.showError(
              'Ocorreu um erro na aplicação, tente novamente.'
            );
          } else if (err.status === 404) {
            this.utils.showError(err.error.message);
          } else {
            this.utils.showError(
              'Ocorreu um erro no servidor, tente mais tarde.'
            );
          }
          return throwError(() => err);
        })
      );
  }

  downloadImage(imgName: string): Observable<DownloadImage> {
    const headers = new HttpHeaders().set('imgName', imgName);

    return this.http
      .get<DownloadImage>(environment.BASE_URL + '/download/image', { headers })
      .pipe(
        catchError((err) => {
          if (err.status === 0 && err.status !== 404) {
            this.utils.showError(
              'Ocorreu um erro na aplicação, tente novamente.'
            );
          } else if (err.status === 404) {
            this.utils.showError(err.error.message);
          } else {
            this.utils.showError(
              'Ocorreu um erro no servidor, tente mais tarde.'
            );
          }
          return throwError(() => err);
        })
      );
  }

  addIncome(value: any): Observable<RegisterIncome> {
    return this.http
      .post<RegisterIncome>(environment.BASE_URL + '/auth/revenues', value)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  getIncomeEntry(param: any, user: any): Observable<ListIncome> {
    let headers = new HttpHeaders();
    headers = headers.set('month', param).set('user', user);

    return this.http
      .get<ListIncome>(environment.BASE_URL + '/list/revenues', {
        headers: headers,
      })
      .pipe(
        first(),
        catchError((err) => {
          if (err.status === 0 && err.status !== 404) {
            this.utils.showError(
              'Ocorreu um erro na aplicação, tente novamente.'
            );
          } else if (err.status === 404) {
            this.utils.showError(err.error.message);
          } else {
            this.utils.showError(
              'Ocorreu um erro no servidor, tente mais tarde.'
            );
          }
          return throwError(() => err);
        })
      );
  }

  deleteIncome(id: string): Observable<DeleteIncome> {
    return this.http
      .delete<DeleteIncome>(environment.BASE_URL + '/delete/revenue/' + id)
      .pipe(
        catchError((err) => {
          if (err.status === 0 && err.status !== 404) {
            this.utils.showError(
              'Ocorreu um erro na aplicação, tente novamente.'
            );
          } else if (err.status === 404) {
            this.utils.showError(err.error.message);
          } else {
            this.utils.showError(
              'Ocorreu um erro no servidor, tente mais tarde.'
            );
          }
          return throwError(() => err);
        })
      );
  }

  updateIncome(id: string, payload: any): Observable<UpdateIncome> {
    return this.http
      .put<UpdateIncome>(
        environment.BASE_URL + '/update/revenues' + id,
        payload
      )
      .pipe(
        catchError((err) => {
          if (err.status === 0 && err.status !== 404) {
            this.utils.showError(
              'Ocorreu um erro na aplicação, tente novamente.'
            );
          } else if (err.status === 404) {
            this.utils.showError(err.error.message);
          } else {
            this.utils.showError(
              'Ocorreu um erro no servidor, tente mais tarde.'
            );
          }
          return throwError(() => err);
        })
      );
  }
}
