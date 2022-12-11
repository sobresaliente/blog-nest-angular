import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private _registerForm: FormGroup = new FormGroup({});

  public get registerForm(): FormGroup {
    return this._registerForm;
  }

  public ngOnInit(): void {
    this._registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
    });
  }

  constructor(private readonly _authService: AuthenticationService, private readonly _router: Router) {
  }

  public register(): void {
    if (this._registerForm.invalid) {
      return;
    }


    this._authService.register(this._registerForm.value).subscribe(() => {
        this._router.navigate(['auth/login']);
      },
    );

  }
}
