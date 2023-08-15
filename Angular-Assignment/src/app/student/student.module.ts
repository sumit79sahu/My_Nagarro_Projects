import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component'
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,ReactiveFormsModule,
    MatInputModule
  ]
})
export class StudentModule { }
