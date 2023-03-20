import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutRouteComponent } from './pages/about-route/about-route.component';
import { CreateCustomerRouteComponent } from './pages/create-customer-route/create-customer-route.component';
import { CustomerDetailsRouteComponent } from './pages/customer-details-route/customer-details-route.component';
import { CustomerListRouteComponent } from './pages/customer-list-route/customer-list-route.component';
import { EditComponent } from './pages/edit/edit.component';
import { NotFoundRouteComponent } from './pages/not-found-route/not-found-route.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListRouteComponent,
  },
  {
    path: 'about',
    component: AboutRouteComponent,
  },
  {
    path: 'create',
    component: CreateCustomerRouteComponent,
  },
  {
    path: 'details/:id',
    component: CustomerDetailsRouteComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
  {
    path: 'not-found',
    component: NotFoundRouteComponent,
  },
  {
    path: '**',
    component: NotFoundRouteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
