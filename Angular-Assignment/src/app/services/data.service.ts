import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  Recordurl=" http://localhost:3000/records";
  Teacherurl=" http://localhost:3000/teachers"
  RecordsData()
  {
    return this.http.get(this.Recordurl)
  }
  SaveRecordsData(Data:any)
  {
    return this.http.post(this.Recordurl,Data)
  }
  DeleteRecordsData(id:any)
  {
    return this.http.delete(this.Recordurl+"/"+id)
  }

  UpdateRecordsData(id:any,Data:any)
  {
    return this.http.put(this.Recordurl+"/"+id,Data)
  }

  TeacherData()
  {
    return this.http.get(this.Teacherurl)
  }
}
