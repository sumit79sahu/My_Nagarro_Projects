import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  students:any;
  result:{id:string,name:string,dob:string,score:string}={id:"",name:"",dob:"",score:""};
  exist:boolean=false;
  constructor(public student:DataService,public alert:AlertifyService) { 
    student.RecordsData().subscribe((data:any)=>{this.students=data})
  }
  search:boolean=false;

  ngOnInit(): void {
  }
  Search()
  {
    this.search=!this.search;
    this.searchForm.reset();
  }

  searchForm=new FormGroup(
    {
      id:new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
      name:new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z ]+$')])
    }
  )

  get validateName()
  {
    return this.searchForm.get('name');
  }
  get validateId()
  {
    return this.searchForm.get('id');
  }
  OnSubmit()
  {
    for(let i=0;i<this.students.length;i++)
    {
      if(this.students[i].id===this.searchForm.value.id && this.students[i].name.toUpperCase()===this.searchForm.value.name?.toUpperCase())
      {
        this.exist=true;
        this.result.name=this.students[i].name;
        this.result.id=this.students[i].id;
        this.result.dob=this.students[i].dob;
        this.result.score=this.students[i].score;
        this.Search();
      
      }
      
    }
    if( this.searchForm.invalid===false && this.exist===false)
    {
      this.alert.error("result not found");
    }
  }

}
