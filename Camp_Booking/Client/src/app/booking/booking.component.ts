import { Component, OnInit, TemplateRef } from '@angular/core';
import { Camp } from '../models/Camp';
import { CampService } from '../services/camp.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl,Validators } from '@angular/forms'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { NgToastService } from 'ng-angular-popup';
import { BillingService } from '../services/billing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  

  camps:Camp[]=[];
  submit:boolean=false;
  show:boolean=false;
  modalRef?: BsModalRef;
  Stay:any;
  amount:any=0;
  weekDay:any=0;
  WeekEnd:any=0;

  weekD:number=0;
  weekE:number=0;


 
  constructor(private camp:CampService,private bill:BillingService,private route:ActivatedRoute,private modalService: BsModalService,private router:Router ,private toast:NgToastService) { }

  ngOnInit(): void {


    this.WeekEnd= this.bill.getWeekEndDays();
    this.weekDay=this.bill.getWeekDays();
  
    this.Stay=  parseInt(this.WeekEnd)+parseInt(this.weekDay);  
    this.getCampsDetails(this.route.snapshot.paramMap.get('id'));
  }
  getCampsDetails(id:any)
  {
 
    this.camp.getCampById(id)
    .subscribe((result:any)=>
    {
      this.weekD=(result.camp_price)* parseInt(this.weekDay)
      this.weekE=((result.camp_price+500)* parseInt(this.WeekEnd))
      this.amount= this.weekD+this.weekE;
      this.camps.push(result);   
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    
  }
  confirmBill()
  {
    this.modalRef?.hide()
    this.bill.postBill(this.billingForm.value).subscribe();
    this.camps[0].Booked=true;
    this.camp.putCamp(this.route.snapshot.paramMap.get('id'),this.camps[0]).subscribe();
    this.toast.success({"detail":"Success","summary":"Camp book successfully","duration":3000,"position":"br"})
    this.router.navigate([''])
  }

  randomStr(arr:any) {
    var ans = '';
    for (var i = 8; i > 0; i--) {
        ans += 
          arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
}


applyCoupon(coupon:string)
{
  if(coupon.toUpperCase()==="DISC1000" && this.Stay===3)
  {
    this.billingForm.value.total_Amount=this.amount-1000

  }
  else if(coupon.toUpperCase()==="DISC1500" && this.Stay===5)
  {
   
    this.billingForm.value.total_Amount=this.amount-1500

  }
  else
  {

    this.toast.error({"detail":"Error","summary":"invalid coupon","duration":3000,"position":"br"})
  }
}


  billingForm=new FormGroup
  (   
    {
      camp_Id:new FormControl(this.route.snapshot.paramMap.get('id')),
      booking_Id:new FormControl(this.randomStr('0a1b2c3d4e5f6g7h8i9jklmnopqrsuvwxyz')),
      billing_Address:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]{4,}')]),
      state:new FormControl('',[Validators.required]),
      country:new FormControl('',[Validators.required]),
      zipcode:new FormControl('',[Validators.required]),
      cellphone:new FormControl('',[Validators.required,Validators.pattern('[0-9]{10,11}')]),
      total_Amount:new FormControl(0,[Validators.required]),
      total_Stay:new FormControl(0,[Validators.required])
    }
  )

  
  get validateBillingAddress()
  {
    return this.billingForm.get('billing_Address');
  }
  get validateState()
  {
    return this.billingForm.get('state');
  }
  get validateCountry()
  {
    return this.billingForm.get('country');
  }
  get validateZipcode()
  {
    return this.billingForm.get('zipcode');
  }
  get validateCellphone()
  {
    return this.billingForm.get('cellphone');
  }
  onSubmit(temp:any)
  {
    this.submit=true;
    if(!this.billingForm.invalid)
    {
      this.billingForm.value.total_Amount=this.amount
      this.billingForm.value.total_Stay=parseInt(this.WeekEnd)+parseInt(this.weekDay);
      localStorage.removeItem('WeekDays');
      localStorage.removeItem('Weekend');
      this.submit=false;
      this.openModal(temp)
    }
  }

}
