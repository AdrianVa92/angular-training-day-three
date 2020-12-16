import { Login } from '../pages/home/login-model'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tokenName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  onHttpLogin = new Subject();
  isLogged = new Subject();
  
  constructor(private http: HttpClient) { 

  }

  httpLogin(logins: Login){
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/auth/login'

    this.http.post(url, logins).subscribe(
      (response: any)=>{
        console.log('success response', response);
        if(response.status == 'success'){
          this.onHttpLogin.next(response.data);
        } 
      },
      (error)=>{
        console.log('error response', error);
      }
    )
  }
  setToken(token: string): string{
    localStorage.setItem('token', token);
    return token;
  }

  getToken(): string{
    const token = localStorage.getItem('token');
    return token.toString() || '';
  }
}
