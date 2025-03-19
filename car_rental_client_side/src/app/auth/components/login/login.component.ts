import { Component } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzIconService } from 'ng-zorro-antd/icon';
import { UserOutline, LockOutline } from '@ant-design/icons-angular/icons';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  imports: [
    NzSpinModule, 
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    NzIconModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSpinning: boolean = false;
  loginForm!: FormGroup;

  constructor(private iconService: NzIconService, 
			private fb: FormBuilder,
    	private authService: AuthService, 
			private router: Router, 
			private message: NzMessageService) {
    this.iconService.addIcon(UserOutline, LockOutline);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email:[null, [Validators.email, Validators.required]],
      password:[null, [Validators.required]]
    })
  }

  login() {
    StorageService.logout();
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((res) => {
      console.log(res);
      if(res.userId != null) {
        const user = {
          id: res.userId,
          role: res.userRole,
        }
				StorageService.saveUser(user);
				StorageService.saveToken(res.jwt);
				if(StorageService.isAdminLoggedIn()) {
					this.router.navigateByUrl("/admin/dashboard"); 
				} else if(StorageService.isCustomerLoggedIn()) {
					this.router.navigateByUrl("/customer/dashboard");
				} else {
					this.message.error("Bad credentials", { nzDuration: 50000 });
				}
      }
    });
  }
}
