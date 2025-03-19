import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-car',
  standalone: false,
  
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss'
})
export class PostCarComponent {
  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  listOfOption: Array<{label: string; value: string}> = [];
  listOfBrands = ["BMW", "AUDI", "MERCEDES", "FERRARI", "KIA", "VOLVO", "TOYOTA", "HONDA", "FORD"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Grey", "Black", "Yellow", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];
  
  constructor(private fb: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router) {}

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      year: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required]
    })
  }

  postCar() {
    console.log(this.postCarForm.value);
    this.isSpinning = true;
    const formData: FormData = new FormData();
    console.log(this.selectedFile);
    formData.append('img', this.selectedFile!);
    formData.append('brand', this.postCarForm.get('brand')!.value);
    formData.append('name', this.postCarForm.get('name')!.value);
    formData.append('type', this.postCarForm.get('type')!.value);
    formData.append('color', this.postCarForm.get('color')!.value);
    formData.append('year', this.postCarForm.get('year')!.value);
    formData.append('transmission', this.postCarForm.get('transmission')!.value);
    formData.append('description', this.postCarForm.get('description')!.value);
    formData.append('price', this.postCarForm.get('price')!.value.toString());
    console.log(formData);
    this.adminService.postCar(formData).subscribe((res) => {
      this.isSpinning = false;
      this.message.success("Car posted successfully", { nzDuration: 5000 });
      this.router.navigateByUrl("/admin/dashboard");
      console.log(res);
    }, error => {
      this.message.error("Error while posting car", { nzDuration: 5000 });
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event?.target?.files[0];
    this.previewImage();
  }

  onYearChange(result: any): void {
    if (result && result instanceof Date) {
      const year = result.getFullYear();
      this.postCarForm.get('year')?.setValue(year);
    }
  }

  previewImage() {
    if (this.selectedFile instanceof Blob) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
