import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ManagecampsComponent } from './managecamps/managecamps.component';


const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'managecamps',
    component:ManagecampsComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
