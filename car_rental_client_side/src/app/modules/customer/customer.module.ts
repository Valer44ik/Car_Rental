import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroImportsModule } from '../../NgZorroImportsModule';
import { CustomerRoutingModule } from './customer-routing.module';
import { BookCarComponent } from './components/book-car/book-car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';


@NgModule({
  declarations: [
    BookCarComponent,
    MyBookingsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroImportsModule,
  ]
})
export class CustomerModule { }
