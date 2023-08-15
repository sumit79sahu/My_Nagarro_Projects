import { Injectable } from '@angular/core';
import { Camp } from '../models/Camp';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CampService {
  private url="Camp";
  camps:Camp[]=[];
  // filter:any;
  In:boolean=false;
  Out:Boolean=false;


  constructor(private http:HttpClient) { }
  
  public getCamps():Observable<Camp[]>
  {
    return this.http.get<Camp[]>(`${environment.Url}/${this.url}`);

  }

  public getCampById(id:any):Observable<Camp>
  {
    return this.http.get<Camp>(`${environment.Url}/${this.url}/${id}`);

  }


  public uploadCamp(file:File)
  {
    let formData:FormData=new FormData();
    formData.set('Image',file,file.name)    
    return this.http.post(`${environment.Url}/Image`,formData)
  }

  public filterCamps(In:any,Out:any,Cpty:any):Observable<Camp[]>
  {
    
    return this.http.get<Camp[]>(`${environment.Url}/${this.url}/${In}/${Out}/${Cpty}`);

  }

  public getStay(In:any,Out:any)
  {
    return this.http.get(`${environment.Url}/${this.url}/${In}/${Out}`);
  }




  public postCamp(data:any):Observable<Camp[]>
  {
       return this.http.post<Camp[]>(`${environment.Url}/${this.url}`,data);

  }

  public deleteCamp(id:any)
  {
    return this.http.delete(`${environment.Url}/${this.url}/${id}`);

  }

  public putCamp(id:any,data:Camp):Observable<Camp[]>
  {
    return this.http.put<Camp[]>(`${environment.Url}/${this.url}/${id}`,data);

  }
}
