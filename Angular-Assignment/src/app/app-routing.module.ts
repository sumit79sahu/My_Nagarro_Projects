import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role/role.component';
// import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path:'student',loadChildren:()=>import('./student/student.module')
    .then(mod=>mod.StudentModule)
  },
  {
    path:'teacher',loadChildren:()=>import('./teacher/teacher.module')
    .then(mod=>mod.TeacherModule)
  },
  {
    path:'',
    component:RoleComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
