import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CustomerTableComponent } from './customer/customer-table/customer-table.component';
import { CustomerComponent } from './customer/customer.component';
import { UserTableComponent } from './user/user-table/user-table.component';
import { UserComponent } from './user/user.component';

const appRoutes: Routes = [
  {path:'',component: UserComponent},
  {path:'users/:id',component:UserTableComponent},
  {path:'customer',component:CustomerComponent,
  children:[
    {path:'',component:CustomerTableComponent},
    {path:':id',component:CustomerDetailComponent}
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
