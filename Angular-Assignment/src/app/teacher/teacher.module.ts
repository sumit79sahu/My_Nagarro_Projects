import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { TeacherRoutingModule } from './teacher-routing.module';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import {MatInputModule} from '@angular/material/input';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    MainComponent,
    ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,ReactiveFormsModule,
    MatTableModule,
    MatInputModule,


  ]
})
export class TeacherModule { }
