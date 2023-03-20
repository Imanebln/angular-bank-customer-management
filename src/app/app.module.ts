import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutRouteComponent } from './pages/about-route/about-route.component';
import { NotFoundRouteComponent } from './pages/not-found-route/not-found-route.component';
import { CreateCustomerRouteComponent } from './pages/create-customer-route/create-customer-route.component';
import { CustomerListRouteComponent } from './pages/customer-list-route/customer-list-route.component';
import { NavComponent } from './components/nav/nav.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { CustomerDetailsRouteComponent } from './pages/customer-details-route/customer-details-route.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { EditComponent } from './pages/edit/edit.component';
import { ContactComponent } from './components/contact/contact.component';
import { PopUpModalComponent } from './components/pop-up-modal/pop-up-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutRouteComponent,
    NotFoundRouteComponent,
    CreateCustomerRouteComponent,
    CustomerListRouteComponent,
    NavComponent,
    CustomerCardComponent,
    CustomerDetailsRouteComponent,
    FooterComponent,
    StatisticsComponent,
    EditComponent,
    ContactComponent,
    PopUpModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
