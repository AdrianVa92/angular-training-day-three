import { Login } from '../pages/home/login-model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tokenName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  onHttpLogin = new Subject();
  isLogged = new Subject();
  onHttpGetProfile = new Subject();
  onHttpUpdateProfile = new Subject();

  constructor(private http: HttpClient) { 
    
  }

  httpLogin(logins: Login){
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/auth/login'

    this.http.post(url, logins).subscribe(
      (response: any)=>{
        console.log('success response', response);
        if(response.status == 'success'){
          this.onHttpLogin.next(response.data);
          this.isLogged.next(true);
        } 
      },
      (error)=>{
        console.log('error response', error);
      }
    )
  }

  httpGetProfile():void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.get(url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }).subscribe(
      (response: any) => {
        console.log('this is the httpGetProfile Service', response);
        if (response.status === 'success'){
          this.onHttpGetProfile.next(response.data);
        }
      },
      (error) => {
        console.log('this is the httpGetProfile Service', error);
      } 
    );
  }

  httpUpdateProfile(data: any): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.put(url, data,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }).subscribe(
      (response: any) =>{
        console.log('this is from http update profile service', response);
        if (response.status === 'success'){
          this.onHttpGetProfile.next(response.data)
        }
      },
      (error) => {
        console.log('this is the httpUpdateProfile Service', error);
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

  checkLogStatus(): void{
    const token = localStorage.getItem('token');

    if (token) {
      this.isLogged.next(true);
    } else {
      this.isLogged.next(false);
    }
  }

  deleteToken(): void {
    localStorage.removeItem('token');
    this.isLogged.next(false);
  }
}
