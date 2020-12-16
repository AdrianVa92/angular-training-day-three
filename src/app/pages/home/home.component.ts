import { GlobalService } from '../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { Login } from './login-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLogged: any;

  logins: Login = {
    username: '',
    password: ''
  };

  constructor(private _globalService: GlobalService ) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this._globalService.isLogged.subscribe(
      (logged: any) => {
        console.log('isLogged', logged);
        this.isLogged = logged;
      }
    );

    this._globalService.checkLogStatus();
  }
  onLogin(): void {
    this._globalService.httpLogin(this.logins);
    this._globalService.onHttpLogin.subscribe(
      (response: any) => {
        const token = response.token;
        this._globalService.setToken(token);
        console.log('token',token);
      }
    );
  }
  onLogout(): void {
    this._globalService.deleteToken();
  }
}
