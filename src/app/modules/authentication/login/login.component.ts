import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  resMessage: { message: any; responseType: any; color: any };
  bDisplayErrorBlock: boolean = false;
  bLoader: boolean = false;

  constructor(private authservice: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.initializeLoginForm()
  }

  
  initializeLoginForm() {
    this.loginForm = new FormGroup({
      j_username: new FormControl(null, [Validators.required,]),
      j_password: new FormControl(null, [Validators.required]),
    });
  }

  
  sendLoginRequest() {
    if (this.loginForm.valid) {
      this.bLoader = true;
      this.authservice.AuthService_Login({
        j_username: this.loginForm.value.j_username,
        j_password: this.loginForm.value.j_password,
      }).subscribe({
        next: (result) => {
          if (result.status == 'connected') {
            localStorage.setItem("lsSampleAppAccessToken", result.accessToken)
            localStorage.setItem("userDetail", JSON.stringify(result.user))

            this.router.navigateByUrl('/app/customers');
          } else {
            console.error("cLoginComponent_SendLoginRequest: Error ===>>", result);
            this.bLoader = false;
          }
        },
        error: (error) => {
          {
            this.bLoader = false;
            console.error("cLoginComponent_SendLoginRequest: ERROR ===>>", error);
            this.displayAlertMessage('Bad Credentials!', 'error', 'danger');
          }

        }



      });
     
    } else {
      this.loginForm.markAllAsTouched();
    }
    this.displayAlertMessage
  }
  displayAlertMessage(sIncommingMessage, sIncommingResponseType, sIncommingColor) {
    this.bDisplayErrorBlock = true
    this.resMessage =
    {
      message: sIncommingMessage,
      responseType: sIncommingResponseType,
      color: sIncommingColor
    };
    setTimeout(() => { this.bDisplayErrorBlock = false; }, 3000);
  }
}
