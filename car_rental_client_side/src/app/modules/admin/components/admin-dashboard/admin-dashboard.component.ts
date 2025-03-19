import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    NgFor,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  cars: any = [];

  constructor(private adminService: AdminService,
    private message: NzMessageService) { }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe((res) => {
      console.log(res);
  
      // Reset cars array to avoid duplicates
      this.cars = res.map((element: any) => {
        return {
          ...element,
          processedImg: element.returnedImage 
            ? `data:image/jpeg;base64,${element.returnedImage}` 
            : 'assets/default-car.jpg' // Provide a fallback image
        };
      });
    }, (error) => {
      console.error("Error fetching cars:", error);
    });
  }

  deleteCar(id: number) {
    console.log(id);
    this.adminService.deleteCar(id).subscribe((res) => {
      this.getAllCars();
      this.message.success("Car deleted successfully", { nzDuration: 5000 });
    })
  }
}
