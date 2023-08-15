import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  url="FeedBack"
  constructor(private http:HttpClient) { }


    public postFeedback(data:any)
    {

      return this.http.post(`${environment.Url}/${this.url}`,data);
  
    }

    public getFeedback(id:any)
    {
      return this.http.get(`${environment.Url}/${this.url}/${id}`,{responseType: 'json'});
  
    }

    public putFeedback(id:any,data:any)
    {
      return this.http.put(`${environment.Url}/${this.url}/${id}`,data);
    }
}
