import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { AuthGuardService } from './auth.guard'; // Import Auth Guard
import { LoginGuardService } from './login.guard';
const loginData = localStorage.getItem('otp')

const routes: Routes = [
  {
    path: '',
    redirectTo: loginData ? 'seat-selection' : 'login',
    pathMatch: 'full',
},
{
  path: 'login',
  component: LoginComponent, canActivate:[LoginGuardService], 
  pathMatch: 'full',
},
  { path: 'seat-selection', component: SeatSelectionComponent, canActivate: [AuthGuardService] }, // Login Page
  { path: '**', redirectTo: '/login' } // Redirect unknown routes to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
