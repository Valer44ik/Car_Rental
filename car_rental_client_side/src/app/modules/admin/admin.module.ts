import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroImportsModule } from '../../NgZorroImportsModule';
import { AdminRoutingModule } from './admin-routing.module';
import { PostCarComponent } from './components/post-car/post-car.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LOCALE_ID } from '@angular/core';
import { UpdateCarComponent } from './components/update-car/update-car.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    PostCarComponent,
    UpdateCarComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'zh-cn' }
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgZorroImportsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
