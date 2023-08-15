import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submit=false;
  constructor(private auth:AuthenticationService,private route:Router,private toast:NgToastService ) { }

  ngOnInit(): void {
  }

  adminForm=new FormGroup(
    {
      admin_Name:new FormControl('sumit'),
      admin_Email:new FormControl('',[Validators.required,Validators.email]),
      admin_Password:new FormControl('',Validators.required)
    }
  )
  get validationEmail()
  {
    return this.adminForm.get('admin_Email')
  }
  get validationPassword()
  {
    return this.adminForm.get('admin_Password')
  }

 

  OnSubmit()
  {
    this.submit=true;
    if(!this.adminForm.invalid)
    {
      this.auth.adminAuthentication(this.adminForm.value).subscribe(data=>{
        if(data==='invalid')
        {
         
          this.toast.error({"detail":"Error","summary":"Invalid email or password","duration":3000,"position":"br"})
          this.submit=false;

        }
        else
        {
          this.toast.success({"detail":"Success","summary":"LoginSuccessfully","duration":3000,"position":"br"})
          this.adminForm.reset();
          this.route.navigate(['']);
          this.auth.storeToken(data);
          
        }
      })
   

    }
  }

    

}
