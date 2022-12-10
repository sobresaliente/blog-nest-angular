import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(private _authService: AuthenticationService) {
  }

  public login(): void {
    this._authService.login('dan.kapkov@gmail.com', 'myBlog2022').subscribe((data) => console.log('succesfully auth'));
  }
}
