import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { LoginValidationService } from '../../services/login-validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private _registerForm: FormGroup = new FormGroup({});
  private _isSubmitted: boolean = false;

  public get registerForm(): any {
    return this._registerForm;
  }

  public get isSubmitted(): boolean {
    return this._isSubmitted;
  }

  public ngOnInit(): void {
    this._registerForm = this._fb.group(
      {
        email: new FormControl(null, [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
        ]),
        username: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      {
        validators: this._validationService.matchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _router: Router,
    private readonly _validationService: LoginValidationService,
    private readonly _fb: FormBuilder
  ) {}

  public register(): void {
    this._isSubmitted = true;
    if (this._registerForm.invalid) {
      return;
    }

    this._authService.register(this._registerForm.value).subscribe(() => {
      this._router.navigate(['auth/login']);
    });
  }
}
