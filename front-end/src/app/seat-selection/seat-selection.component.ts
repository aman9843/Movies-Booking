import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {


  seatGrid: any[][] = [];
  selectedSeats: any[] = [];
  showPopup: boolean = false;
  showSuccessPage: boolean = false;
  userName: string = '';
  userEmail: string = '';
  formattedSeats: string = ''; 
  constructor(private router:Router,private toastr: ToastrService) {
this.initializeSeats()

   }

  ngOnInit(): void {
  }


  initializeSeats() {
    const rows = 6;
    const cols = 6;
    this.seatGrid = [];

    // Initialize seats
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const seat = {
          seatNumber: `${i + 1}-${j + 1}`,
          isVIP: i === 0, // First row is VIP
          isTaken: Math.random() < 0.2 && i !== 0, // 20% chance for taken seats
          isSelected: false,
        };
        row.push(seat);
      }
      this.seatGrid.push(row);
    }
  }

  selectSeat(seat: any) {
    if (seat.isVIP || seat.isTaken) return;

    // Select or deselect a seat
    if (this.selectedSeats.length < 2 && !seat.isSelected) {
      seat.isSelected = true;
      this.selectedSeats.push(seat);
    } else if (seat.isSelected) {
      seat.isSelected = false;
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
    }

    // Update the formatted seats string whenever a seat is selected/deselected
    this.formattedSeats = this.selectedSeats.map(s => s.seatNumber).join(', ');
  }

  showConfirmPopup() {
    if (this.selectedSeats.length === 0 || this.selectedSeats.length > 2) {
      alert('You must select 1 or 2 seats.');
    } else {
      this.showPopup = true;
    }
  }

  confirmBooking() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (this.userName && this.userEmail && emailPattern.test(this.userEmail)) {
      // After confirmation, show success page
      this.showSuccessPage = true;
      this.showPopup = false;
    } else {
      if (!this.userName || !this.userEmail) {
        this.toastr.error('You must fill name & email.');
      } else {
        this.toastr.error('Please enter a valid email address.');
      }
    }
  }
  

  closePopup() {
    this.showPopup = false;
  }

  goToHome() {
    // Logic to go back to home page (resetting the state)
    this.selectedSeats = [];
    this.showSuccessPage = false;
    this.userName = '';
    this.userEmail = '';
    this.formattedSeats = '';  // Reset formatted seats
  }

  logout(){
    localStorage.removeItem('otp');
  this.router.navigate(['/login']);
  }
}
