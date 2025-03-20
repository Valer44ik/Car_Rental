import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-dashboard',
  imports: [
    CommonModule,
  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {

  cars: any = [];

  constructor(private service: CustomerService) { }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.service.getAllCars().subscribe((res) => {
      console.log(res);
  
      // Reset cars array to avoid duplicates
      this.cars = res.map((element: any) => {
        return {
          ...element,
          processedImg: element.returnedImage 
            ? 'data:image/jpeg;base64,${element.returnedImage}'
            : 'assets/default-car.jpg' // Provide a fallback image
        };
      });
    }, (error) => {
      console.error("Error fetching cars:", error);
    });
  }
}
