import { Component,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { FormGroup, FormControl, Validators,NgModel } from '@angular/forms'
import {FeedbackService} from './services/feedback.service'
import { BillingService } from './services/billing.service';
import { CampService } from './services/camp.service';
import { Router } from '@angular/router';

import { NgToastService } from 'ng-angular-popup';
// import { Camp } from './models/Camp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UIlayer';
  isCollapsed = true;

  enter:boolean=false;
  modalRef?: BsModalRef;
  modalRef1?: BsModalRef;
  modalRef2?: BsModalRef;
  bills:any;
  camps:any;
  past:boolean=false;
  rating=0;
  feed:any;

  constructor(private modalService: BsModalService,private bill:BillingService,private camp:CampService,private feedback:FeedbackService ,private route:Router,private toast:NgToastService){}
  
  ngOnInit(): void {
    
  }

  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template);   
  }

  openModal1(template: TemplateRef<any>) {

    if(this.bills!==null && new Date(this.camps.camp_avaliable_date.toString().replace('T00:00:00',''))<new Date(new Date().toISOString().slice(0, 10).toString()) )
    {
      this.past=true;
     
    }
    this.modalRef1 = this.modalService.show(template);   
  }

  openModal2(template: TemplateRef<any>) {

    this.close1();
   
    
    this.modalRef2 = this.modalService.show(template);   
  }


  close()
  {
    this.modalRef?.hide();
    this.enter=false
    this.bookingForm.reset();
  }
  close1()
  {
    this.modalRef1?.hide();
    this.past=false
  }
  close2()
  {
    this.modalRef2?.hide();
  }


  getbill(temp:any)
  {
     this.bill.getBillById(this.bookingForm.value.booking_Id).subscribe(data=>{
      this.bills=data;
        });
        // console.log(this.bookingForm.value.booking_Id);
        this.feedback.getFeedback(this.bookingForm.value.booking_Id).subscribe(data=>{
          this.feed=data;        
          if(this.feed!=null)
          {
            this.rating=this.feed.rating
          }
          else
          {
            this.rating=0
          }  
        });


     this.close();
     setTimeout(()=>this.getCamp(temp),100)
     
  }
  getCamp(temp:any)
  {
    if(this.bills!==null)
    {
      this.camp.getCampById(this.bills.camp_Id).subscribe(data=>{this.camps=data});
      setTimeout(()=>this.openModal1(temp),100)
    }
    if(this.bills===null)
    {
      setTimeout(()=>this.openModal1(temp),100)
    }

  }

  cancelBooking()
  {
    var i= confirm("Are you sure you want to cancel booking"); 
    if(i)
    {
      this.camps.Booked=false;
      this.camp.putCamp(this.bills.camp_Id,this.camps).subscribe();
      this.bill.deleteBill(this.bills.booking_Id).subscribe();
      this.toast.success({"detail":"Success","summary":"Booking Cancel Successfully","duration":3000,"position":"br"})
      this.modalRef1?.hide()
      this.route.navigate(['']);
    }
  }

  convertDate(date:any)
  {
    return date.toString().replace('T00:00:00','');
  }

  bookingForm=new FormGroup
  (   
    {
      booking_Id:new FormControl('',[Validators.required])
    }
  )

  get validateBillId()
  {
    return this.bookingForm.get('booking_Id');
  }


  onEnter(temp1:any)
  {
    this.enter=true;
    if(!this.bookingForm.invalid)
    {
      this.getbill(temp1);
    }
  }

  adminLoggedIn()
  {
    return localStorage.getItem('backendToken')
  }

  adminLogout()
  {
    localStorage.clear();
    this.toast.success({"detail":"Success","summary":"Successfully logout","duration":3000,"position":"br"})
  }


  sendFeedback()
  {
    // console.log(this.rating);

    if(this.feed==null)
    {
      this.feedback.postFeedback({"camp_id":this.bills.camp_Id,"booking_id":this.bills.booking_Id,"rating":this.rating}).subscribe();
      this.close2();
    }
    else
    {
      this.feedback.putFeedback(this.feed.feedback_Id,{"camp_id":this.bills.camp_Id,"booking_id":this.bills.booking_Id,"rating":this.rating}).subscribe();
      this.close2();
    }
    this.toast.success({"detail":"Success","summary":"Feedback successfull share","duration":3000,"position":"br"})

  }

}
