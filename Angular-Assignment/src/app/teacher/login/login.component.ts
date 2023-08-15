import { state } from '@angular/animations';
import { Component, OnInit} from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AlertifyService } from 'src/app/services/alertify.service';


@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  teachers:any;
  // exits:boolean=false;
  auth:boolean=false;
  submit:boolean=false;
  
  

  constructor(public router:Router,private teacher:DataService,public alert:AlertifyService)
  {
    teacher.TeacherData().subscribe((data:any)=>{this.teachers=data})
   
  }

  ngOnInit(): void 
  {
    localStorage.removeItem('Token');
  }
  loginForm=new FormGroup(
    {
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,Validators.required)
    }
  )

  get validationEmail()
  {
    return this.loginForm.get('email')
  }
  get validationPassword()
  {
    return this.loginForm.get('password')
  }
 


 OnSubmit()
  {
    this.submit=true;
    if(!this.loginForm.invalid)
    {
      for(let i = 0; i < this.teachers.length; i++)
      {
        if((this.teachers[i].email===this.loginForm.value.email) && (this.teachers[i].password===this.loginForm.value.password))
        {
          this.auth=true;
          this.router.navigate([`teacher/main/home`]);
          this.alert.success("Login Successfully");
  
          localStorage.setItem('Token', this.teachers[i].name);
          
        }
      }     
    } 
    if(this.auth===false && (this.validationEmail?.untouched===false && this.validationPassword?.untouched===false))
    {
      console.log(this.loginForm)
      this.alert.error("Invalid email or password");
    }   
  }
}
