import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormGroupDirective,NgForm, Validators } from '@angular/forms'
import { AlertifyService } from 'src/app/services/alertify.service';
import { ignoreElements } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  records: any;
  count: number = 0;
  add: boolean = false;
  edit: boolean = false;
  Id: string = '';
  exist:boolean=false;
  constructor(public record: DataService, public router: Router ,public alert:AlertifyService) {
  }

  ngOnInit(): void {
    this.showRecords()

  }
  Add() {
    this.add = !this.add;
    this.recordForm.reset();
  }
  Edit(Id: string) {
    this.edit = !this.edit;
    this.Id = Id;
  }
  Delete(id: any) {
    let r = confirm("Are you sure you want to delete is result");
    if (r == true) {
      this.record.DeleteRecordsData(id).subscribe(data => this.showRecords());
      this.alert.success("Successfully deleted");
    }
    
  }

  Save(name: string, dob: string, score: string) {
    this.record.UpdateRecordsData(this.Id, { name, dob, score }).subscribe(data => this.showRecords())
    this.Edit(this.Id);
    this.alert.success("Result Successfully Updated");
  }

  recordForm = new FormGroup(
    {
      name: new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z ]+$')]),
      id: new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
      dob: new FormControl('',Validators.required),
      score: new FormControl('',[Validators.required,Validators.pattern('[0-9]+')])
    }
  )

  get validateName()
  {
    return this.recordForm.get('name');
  }
  get validateId()
  {
    return this.recordForm.get('id');
  }
  get validateDate()
  {
    return this.recordForm.get('dob');
  }
  get validateScore()
  {
    return this.recordForm.get('score');
  }

  showRecords() {
    this.record.RecordsData().subscribe((data: any) => { this.records = data; this.count = data.length; })
  }

  OnSubmit() {
    console.log(this.recordForm)
    for(let i=0;i<this.records.length;i++)
    {
      if(this.records[i].id!==this.recordForm.value.id)
      {
        this.exist=true;
        break
      }
    }
    if(!this.exist)
    {
      this.alert.error("Result already present");
    }
    else    
    {
      if(!this.recordForm.invalid)
      {
        this.record.SaveRecordsData(this.recordForm.value).subscribe((res) => this.showRecords());
        this.recordForm.reset();
        this.Add()
        this.alert.success("Successfully added");
      }
    }

  }

}
