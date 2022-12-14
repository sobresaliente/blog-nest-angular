import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [CommonModule, RouterLink],
  exports: [FormsModule, ReactiveFormsModule, HeaderComponent],
})
export class SharedModule {}
