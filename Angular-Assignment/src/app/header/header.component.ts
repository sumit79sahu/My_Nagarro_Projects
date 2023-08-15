import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title:string=''



  constructor(public router:Router,public alert:AlertifyService) 
  {
   
  }

  ngOnInit(): void{


  }
  onLogout()
  {
    localStorage.removeItem('Token');
    this.router.navigate([''])
    this.alert.success("Successfully logout")
  }

  loggedin()
  {
    return localStorage.getItem('Token')

  }





}
