import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url='Authentication'
  constructor( private http:HttpClient) 
  {}

  adminAuthentication(admin:any)
  {
    return this.http.post(`${environment.Url}/${this.url}`,admin,{responseType: 'text'})
  }

  storeToken(tokenValue:string)
  {
    localStorage.setItem('backendToken',tokenValue)
  }
  getToken()
  {
    return localStorage.getItem('backendToken')
  }
  isLoggedIn():boolean
  {
    return !!localStorage.getItem('backendToken')
  }

}
