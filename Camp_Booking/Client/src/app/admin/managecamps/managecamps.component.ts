import { Component, OnInit,TemplateRef} from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Camp } from 'src/app/models/Camp';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgToastService } from 'ng-angular-popup';

import { CampService } from 'src/app/services/camp.service';
import { ReadVarExpr } from '@angular/compiler';




@Component({
  selector: 'app-managecamps',
  templateUrl: './managecamps.component.html',
  styleUrls: ['./managecamps.component.css']
})
export class ManagecampsComponent implements OnInit {


  img:any='../../../assets/images/default.png';
  file!:File;
  editid:number=0
  submit:boolean=false;
  submit1:boolean=false;
  camps:Camp[]=[];
  modalRef?: BsModalRef;
  campeditform:any;




  constructor(private camp:CampService,private modalService: BsModalService,private toast:NgToastService) { }

  ngOnInit(): void {
    
    this.getCamps();
  }

  Onupdate(template: TemplateRef<any>,camp:any) {
   
    this.modalRef = this.modalService.show(template);  
  
    this.editid=camp.camp_id;
    // this.editimg=camp.camp_img;
    this.campeditform=new FormGroup(
      {
        camp_name:new FormControl(camp.camp_name,[Validators.required,Validators.pattern('[A-Za-z ]{2,}')]),
        camp_img:new FormControl(camp.camp_img,[Validators.required]),
        capacity:new FormControl(camp.capacity,[Validators.required]),
        description:new FormControl(camp.description,[Validators.required,Validators.pattern('[A-Za-z ]{2,}')]),
        camp_price:new FormControl(camp.camp_price,[Validators.required]),
        camp_avaliable_date:new FormControl(this.convertDate(camp.camp_avaliable_date) ,[Validators.required]),
        booked:new FormControl(camp.booked)
      }
    )
  }


  OnSave()
  {
    this.submit1=true;
    if(!this.campeditform.invalid)
    {
      this.camp.putCamp(this.editid,this.campeditform.value).subscribe(data=>this.getCamps());
      this.submit1=false
      this.modalRef?.hide()
      this.toast.success({"detail":"Success","summary":"Camp Successfully edited","duration":3000,"position":"br"})
  
    }
    
  }
  upload1(event:any)
{
  this.camp.uploadCamp(event.target.files[0]).subscribe();
  this.campeditform.value.camp_img='../../assets/images/'+event.target.files[0].name;  
}
 
  getCamps()
  {
    this.camp.getCamps()
    .subscribe((result:Camp[])=>
    {
      this.camps=result; 
    });
  }


  get validateName1()
  {
    return this.campeditform.get('camp_name');
  }

  get validateCapacity1()
  {
    return this.campeditform.get('capacity');
  }
  get validateDescription1()
  {
    return this.campeditform.get('description');
  }
  get validatePrice1()
  {
    return this.campeditform.get('camp_price');
  }

  get validateDate1()
  {
    return this.campeditform.get('camp_avaliable_date');
  }

  get validateImage1()
  {
    return this.campeditform.get('camp_img');
  }


  campform=new FormGroup(
    {
      camp_name:new FormControl('',[Validators.required,Validators.pattern('[A-Za-z ]{2,}')]),
      camp_img:new FormControl('',[Validators.required]),
      capacity:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required,Validators.pattern('[A-Za-z ]{2,}')]),
      camp_price:new FormControl('',[Validators.required]),
      camp_avaliable_date:new FormControl('',[Validators.required])
    }
  )

  get validateName()
  {
    return this.campform.get('camp_name');
  }

  get validateCapacity()
  {
    return this.campform.get('capacity');
  }
  get validateDescription()
  {
    return this.campform.get('description');
  }
  get validatePrice()
  {
    return this.campform.get('camp_price');
  }

  get validateDate()
  {
    return this.campform.get('camp_avaliable_date');
  }

  get validateImage()
  {
    return this.campform.get('camp_img')
  }

upload(event:any)
{

  
  let reader=new FileReader();
  this.file=event.target.files[0];


  reader.readAsDataURL(event.target.files[0]);
  reader.onload=()=>
  {
    this.img=reader.result;
  }
  this.camp.uploadCamp(this.file).subscribe();
  
}

OnDelete(id:any)
{
  let cfm=confirm("Are you sure you want to delete this camp");
  if(cfm)
  {
    this.camp.deleteCamp(id).subscribe(data=>this.getCamps());
    this.toast.success({"detail":"Success","summary":"Successfully deleted","duration":3000,"position":"br"})
    
  }

}
convertDate(date:any)
{
  return date.toString().replace('T00:00:00','');
}


campExists(name:any)
{
  for(let i=0;i<this.camps.length;i++)
  {
    if(name.toUpperCase()===this.camps[i].camp_name.toUpperCase())
    {
      return true
    }
  }
  return false
}
  onSubmit()
  {
    this.submit=true
    if(!this.campform.invalid)
    {
      if(!this.campExists(this.campform.value.camp_name))
      {
        this.campform.value.camp_img="../../assets/images/"+this.file.name;
        this.camp.postCamp(this.campform.value).subscribe(data=>this.getCamps());
        this.campform.reset();
        this.img='../../../assets/images/default.png';
        this.submit=false
        this.toast.success({"detail":"Success","summary":"Camp Successfully added","duration":3000,"position":"br"})
        

      }
      else
      {
        this.submit=false;
        this.toast.error({"detail":"error","summary":"Camp already exists","duration":3000,"position":"br"})
      }

    }
    
  }

}
