import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr'


@Injectable({
    providedIn: 'root'
})


export class LoginService {

    private apiUrl = 'https://movie-seat-booking-c3mduek49-amans-projects-866d9b2b.vercel.app/verify-otp'; 
    private httpOptions: any;

    constructor(private http: HttpClient, private router: Router,private toastr: ToastrService) {


    }

    getBasicHeader() {
        this.httpOptions = new HttpHeaders();
        this.httpOptions.append('Content-Type', 'multipart/form-data');
        this.httpOptions.append('Accept', 'application/json');
        return {headers: this.httpOptions};
    }

    verifyOtp(otp: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, { otp }).pipe(
        catchError((err) => {
        console.log('err',err)
    
          // Return a user-friendly error observable
          return throwError(() => new Error(err.error.message));
        })
      );
    }
    
    
}
