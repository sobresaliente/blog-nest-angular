import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Token } from '../../models/token';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private _loginForm: FormGroup = new FormGroup({});
  private _isSubmitted: boolean = false;

  public get loginForm(): FormGroup {
    return this._loginForm;
  }

  public get isSubmitted(): boolean {
    return this._isSubmitted;
  }

  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _router: Router
  ) {}

  public ngOnInit(): void {
    this._loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  public login(): void {
    this._isSubmitted = true;
    if (this._loginForm.invalid) {
      return;
    }
    this._authService
      .login(this._loginForm.value)
      .pipe(map((token) => this._router.navigate(['admin'])))
      .subscribe(
        () => {
          console.log('succesfully logged in');
        },
        (error) => console.log(error)
      );
  }
}
