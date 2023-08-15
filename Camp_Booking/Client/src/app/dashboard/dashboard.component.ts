import { Component, OnInit } from '@angular/core';
import { Camp } from '../models/Camp';
import { CampService } from '../services/camp.service';
import { FormGroup, FormControl,FormGroupDirective,NgForm, Validators } from '@angular/forms'
import { BillingService } from '../services/billing.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  page:any;
  totalCamps:any;
  camps:Camp[]=[];
  search:boolean=false;
  checkIn:Date=new Date();
  checkOut:Date=new Date(new Date().setDate(this.checkIn.getDate() + 1));

 
  constructor(private camp:CampService,private bill:BillingService,private toast:NgToastService) {
    
   }

  ngOnInit(): void {

    this.filterCamps();
    this.camp.getStay(this.checkIn.toISOString().slice(0, 10),this.checkOut.toISOString().slice(0, 10)).subscribe(data=>{this.bill.setDetails(data)})
  }
  filterCamps()
  {
    this.camp.filterCamps(this.searchForm.value.CheckIn,this.searchForm.value.CheckOut,this.searchForm.value.cpty)
    .subscribe(data=>{
      this.camps=data;
      this.totalCamps=this.camps.length;  
    });
  }

  convertDate(date:any)
  {
    return date.toString().replace('T00:00:00','');
  }
  searchForm=new FormGroup
  (   
    {
      CheckIn:new FormControl(this.checkIn.toISOString().slice(0, 10),[Validators.required]),
      CheckOut:new FormControl(this.checkOut.toISOString().slice(0, 10),[Validators.required]),
      cpty:new FormControl('0',[Validators.required])
    }
  )

  
  get validateCheckIn()
  {
    return this.searchForm.get('CheckIn');
  }
  get validateCheckOut()
  {
    return this.searchForm.get('CheckOut');
  }
  get validateCpty()
  {
    return this.searchForm.get('cpty');
  }
  onSearch()
  {
    this.search=true;
    if(!this.searchForm.invalid)
    {
      if(new Date(this.convertDate(this.searchForm.value.CheckIn))>=new Date(this.convertDate(this.searchForm.value.CheckOut)))
      {

        this.toast.error({"detail":"Error","summary":"Invalid Checkin And Checkout Date","duration":3000,"position":"br"})
    
      }
      else
      {
        this.filterCamps(); 
        this.camp.getStay(this.searchForm.value.CheckIn,this.searchForm.value.CheckOut).subscribe(data=>this.bill.setDetails(data));
      }
      this.search=false

    }
  }

}
