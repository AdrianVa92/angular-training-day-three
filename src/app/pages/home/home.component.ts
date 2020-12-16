import { GlobalService } from '../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { Login } from './login-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  logins: Login = {
    username: '',
    password: ''
  };

  constructor(private _globalService: GlobalService ) { }

  ngOnInit(): void {

    
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
}
