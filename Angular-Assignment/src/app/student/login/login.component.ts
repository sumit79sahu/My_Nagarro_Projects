import { Component, OnInit} from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AlertifyService } from 'src/app/services/alertify.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  students:any;
  submit:boolean=false;
  auth:boolean=false;


  constructor(private router:Router,private student:DataService,public alert:AlertifyService )
   {
    student.RecordsData().subscribe((data:any)=>{this.students=data})
 
    }

  ngOnInit(): void {
    localStorage.removeItem('Token');
  }
  loginForm=new FormGroup(
    {
      id:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    }
  )
  get validationEmail()
  {
    return this.loginForm.get('id')
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
      for(let i=0;i<this.students.length;i++)
      {     
        if((this.students[i].id===this.loginForm.value.id) && (this.students[i].dob===this.loginForm.value.password))
        {
          this.auth=true;
          console.log('successfully login');
          this.router.navigate(['student/main/home']);
          this.alert.success("Successfully login")
          localStorage.setItem('Token', this.students[i].name);
         
        }
      }
    }
    if(this.auth===false && (this.validationEmail?.untouched===false && this.validationPassword?.untouched===false))
    {
      console.log(this.loginForm)
      this.alert.error("Invalid roll no or password");
    }   
   
  }

  
}
