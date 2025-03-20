import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-book-car',
  standalone: false,
  
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.scss'
})
export class BookCarComponent {

  constructor(private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router) {

  }

  carId: number = this.activatedRoute.snapshot.params["id"];
  car: any;
  processedImage: any;
  validateForm!: FormGroup;
  isSpinning = false;
  dateFormat = "DD-MM-YYYY"

  ngOnInit() {
    this.validateForm = this.fb.group({
        toDate: [null, Validators.required],
        fromDate: [null, Validators.required],

    })
    this.getCarById();
  }

  getCarById() {
     this.service.getCarById(this.carId).subscribe((res) => {
      console.log(res);
      this.processedImage = 'data:image/jpeg;base64,' + res.returnedImage;
      this.car = res;
     })
  }

  bookACar(data: any) {
    console.log(data);
    this.isSpinning = true;
    let bookACarDto = {
      toDate: data.toDate,
      fromDate: data.fromDate,
      userId: StorageService.getUserId(),
      carId: this.carId
    }
    this.service.bookACar(bookACarDto).subscribe((res) => {
      console.log(res);
      this.message.success("Booking request submitted successfully", { nzDuration: 5000 });
      this.router.navigateByUrl("/customer/dashboard");
    }, error => {
      this.message.error("Error during the book request occured", { nzDuration: 5000 });

    })
  }
}
