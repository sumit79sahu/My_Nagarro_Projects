import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';



const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'booking/:id',
    component:BookingComponent
  },
  {
    path:'admin',loadChildren:()=>import('./admin/admin.module')
    .then(mod=>mod.AdminModule)
  }
] ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
