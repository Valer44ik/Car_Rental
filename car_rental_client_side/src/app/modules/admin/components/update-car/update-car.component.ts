import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-car',
  standalone: false,
  
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.scss'
})
export class UpdateCarComponent {

  constructor(private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router) {}

  isSpinning = false;
  carId: number = this.activatedRoute.snapshot.params["id"];
  existingImage: string | null = null;
  imageChanged: boolean = false
  selectedFile: any;
  imagePreview: string | ArrayBuffer | null | undefined;
  updateForm!: FormGroup;
  listOfOption: Array<{label: string; value: string}> = [];
  listOfBrands = ["BMW", "AUDI", "MERCEDES", "FERRARI", "KIA", "VOLVO", "TOYOTA", "HONDA", "FORD"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Grey", "Black", "Yellow", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  ngOnInit() {
    this.updateForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      year: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required]
    })
    this.getCarById();
  }

  getCarById() {
    this.isSpinning = true;
    this.adminService.getCarById(this.carId).subscribe((res) => {
      // console.log(res);
      this.isSpinning = false;
      const carDto = res;
      this.existingImage = 'data:image/jpeg;base64' + res.returnedImage;
      console.log(carDto);
      console.log(this.existingImage);
      this.updateForm.patchValue(carDto);
    });
  }

  updateCar() {
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if (this.imageChanged && this.selectedFile) {
      formData.append('img', this.selectedFile!);
    }

    formData.append('brand', this.updateForm.get('brand')!.value);
    formData.append('name', this.updateForm.get('name')!.value);
    formData.append('type', this.updateForm.get('type')!.value);
    formData.append('color', this.updateForm.get('color')!.value);
    formData.append('year', this.updateForm.get('year')!.value);
    formData.append('transmission', this.updateForm.get('transmission')!.value);
    formData.append('description', this.updateForm.get('description')!.value);
    formData.append('price', this.updateForm.get('price')!.value.toString());
    console.log(formData);
    this.adminService.updateCar(this.carId, formData).subscribe((res) => {
      this.isSpinning = false;
      this.message.success("Car updated successfully", { nzDuration: 5000 });
      this.router.navigateByUrl("/admin/dashboard");
      console.log(res);
    }, error => {
      this.message.error("Error while updating car", { nzDuration: 5000 });
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.imageChanged = true; 
    this.existingImage = null;
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }
}
