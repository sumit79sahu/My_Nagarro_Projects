import { Injectable } from '@angular/core';
import * as alert from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  success(msg:string)
  {
    alert.success(msg)
  }
  error(msg:string)
  {
    alert.error(msg)
  }
}
