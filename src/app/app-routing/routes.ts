import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { LoanComponent } from '../loan/loan.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'aboutus', component: AboutComponent},
    { path: 'contactus', component: ContactComponent},
    { path: 'loan', component: LoanComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];