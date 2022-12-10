  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { LoginComponent } from '../login/components/login/login.component';
  import { RegisterComponent } from '../login/components/register/register.component';

  const routes: Routes = [
    {
      path: 'admin',
      loadChildren: () => import('../admin/admin.module').then(module => module.AdminModule)
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
