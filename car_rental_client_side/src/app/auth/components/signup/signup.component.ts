import { Component } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-signup',
  imports: [
    NzSpinModule, 
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    NgIf,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  isSpinning:boolean=false;
  signupForm!:FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name:[null,[Validators.required]],
      email:[null,[Validators.required, Validators.email]],
      password:[null,[Validators.required]],
      checkPassword:[null,[Validators.required, this.confirmationValidate]],
    })
  }

  confirmationValidate = (control: FormControl): { [s: string]: boolean } =>{
    if (!control.value) {
      return { required: true };
    }
    else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true}
    }
    return {};
  };

  register() {
    console.log(this.signupForm.value);
    this.authService.register(this.signupForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id != null){
        this.message.success("Signup successful", { nzDuration: 5000 });
        this.router.navigateByUrl("/login");
      } else {
        this.message.error("Something went wrong", { nzDuration: 5000 });
      }
    });
  }
}
