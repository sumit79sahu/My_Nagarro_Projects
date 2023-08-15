import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthenticationService,private router: Router)
  {

  }
  canActivate():boolean {
    if(this.auth.isLoggedIn())
    {
  
      return true;
    }
    else
    {

      this.router.navigate(['admin/login'])
      return false;
    }
    
  }
  
}
