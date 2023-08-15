import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CampBilling } from '../models/CampBilling';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private url="Booking";
  constructor(private http:HttpClient) { }

  public getBill():Observable<CampBilling[]>
  {
    return this.http.get<CampBilling[]>(`${environment.Url}/${this.url}`)
  }


  public getBillById(id:any):Observable<CampBilling[]>
  {
    return this.http.get<CampBilling[]>(`${environment.Url}/${this.url}/${id}`)
  }


  public postBill(bill:any):Observable<CampBilling[]>
  {
    bill.camp_Id=parseInt(bill.camp_Id)
    return this.http.post<CampBilling[]>(`${environment.Url}/${this.url}`,bill)
  }

  public deleteBill(id:any):Observable<CampBilling[]>
  {
    return this.http.delete<CampBilling[]>(`${environment.Url}/${this.url}/${id}`)
  }


  public setDetails(stay:any)
  {
     localStorage.setItem('WeekDays',stay.weekDays);
     localStorage.setItem('Weekend',stay.weekendDays)

  }

  public getWeekDays()
  {
    return localStorage.getItem('WeekDays');
  }
  public getWeekEndDays()
  {
    return localStorage.getItem('Weekend')
  }


  }
