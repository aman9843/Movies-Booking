import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from '../services/login.service'
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';  // to handle error gracefully
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  otpSent: boolean = false;
  attempts: number = 0;
  loginForm: FormGroup;
  otpForm: FormGroup;
  submitted: boolean = false;

  constructor(private router:Router,private fb: FormBuilder,private service:LoginService,private toastr: ToastrService) { 
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  loginErrors(){
    return this.loginForm.controls;
  }

  otpErros(){
    return this.otpForm.controls;
  }

  sendOtp() {
    this.submitted = true;

    if(!this.loginForm.valid){
      return;
    }

    this.toastr.success('Otp send sucessfully.');
    this.otpSent = true;
    
  }

  // OTP Verification
  verifyOtp() {

    
    
   const otp = this.otpForm.get('otp')?.value;
      this.service.verifyOtp(otp).pipe(
        catchError(error => {
          this.attempts++;
          console.log('err',error)
          // Handle any errors from the API call
          this.toastr.error(error);

          if (this.attempts >= 3) {
            this.loginForm?.get('mobile')?.setValue('');
            this.otpForm?.get('otp')?.setValue('');
            this.otpSent = false;
            this.attempts = 0;
          }
          return of(null);  // Return null to avoid breaking the flow
        })
      ).subscribe(response => {
        if (response) {
          console.log('res',response)
          // Handle successful OTP verification
          this.toastr.success(response.message)
          localStorage.setItem("otp",'Yes')
             // Success: Redirect to Seat Selection
            this.router.navigate(['/seat-selection']);
        }
      });
  }


 

}
