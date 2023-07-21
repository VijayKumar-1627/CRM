import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudAppComponent } from './crud-app/crud-app.component';
import { LoginComponent } from './login/login.component';
import { SubmittedFormComponent } from './submitted-form/submitted-form.component';
import { UserPageComponent } from './user-page/user-page/user-page.component';
import { UsertableComponent } from './usertable/usertable.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'userpage',
    component: UserPageComponent,
  },
  {
    path: 'submit',
    component: SubmittedFormComponent,
  },
  {
    path: 'usertable',
    component: UsertableComponent,
  },
  {
    path: 'crud',
    component: CrudAppComponent,
  },
  {
    path: 'customer',
    component: CustomerComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
