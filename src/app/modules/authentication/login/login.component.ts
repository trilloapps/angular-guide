import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  resMessage: { message: any; responseType: any; color: any };
  DisplayErrorBlock: boolean = false;
  Loader: boolean = false;
  token: string|undefined;
  verificationSection: boolean = true;
  fireBaseConfirmationResult: firebase.auth.ConfirmationResult;
  loginStatusResult : any;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  constructor(private authservice: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.initializeLoginForm();
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebaseConfig);
    } else {
      firebase.app();
    }
    setTimeout(() => {
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container-login',{
        'size': 'invisible'
      });
      console.log("recaptchaVerifier", this.recaptchaVerifier);
    }, 2000)
  }

  //---------- INITIALIZE LOGIN FORM ----------
  initializeLoginForm() {
    this.loginForm = new FormGroup({
      userId: new FormControl(null, [Validators.required,]),
      password: new FormControl(null, [Validators.required]),
    });
  }


  //---------- LOGIN REQUEST ----------
  sendLoginRequest() {
    if (this.loginForm.valid) {
      this.Loader = true;  
      this.authservice.AuthService_Login({
        userId: this.loginForm.value.userId,
        password: this.loginForm.value.password,
      }).subscribe({
        next: (result) => {
          if (result.status == 'connected') {
            this.loginStatusResult = result
            this.sendSignUpRequestWithRecaptchaToken(result.user)
          } else {
            this.Loader = false;
            this.displayAlertMessage('Bad Credentials!', 'error', 'danger');
            console.error("SendLoginRequest: Error ===>>", result);
          }
        },
        error: (error) => {
          this.Loader = false;
          console.error("SendLoginRequest: ERROR ===>>", error);
          this.displayAlertMessage('Bad Credentials!', 'error', 'danger');
        },
        complete: () => {}
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  sendSignUpRequestWithRecaptchaToken(oIncomingDetails) {
    let phoneNumber: string = "";
    phoneNumber = oIncomingDetails.mobilePhone;
    // ------------ OTP -----------------------//
    firebase.auth().signInWithPhoneNumber(phoneNumber, this.recaptchaVerifier)
      .then(async (confirmationResult) => {
        if (this.recaptchaVerifier.verify()) {
          this.verificationSection = false;
          this.fireBaseConfirmationResult = confirmationResult;
          this.displayAlertMessage('OTP code has been sent to the phone', 'success', 'success');
          this.Loader = false;
        }
      },
        (error) => {
          console.log(error);
          this.Loader = false;
          this.displayAlertMessage(error.message, 'error', 'danger');
        })
      .catch((error) => {
        console.log("error===>>>>> ", error);
        this.Loader = false;
        this.displayAlertMessage(error.errors.message, 'error', 'danger');
      });
  }
  

  //---------- ALERT MESSAGES ----------
  displayAlertMessage(sIncommingMessage, sIncommingResponseType, sIncommingColor) {
    this.DisplayErrorBlock = true
    this.resMessage =
    {
      message: sIncommingMessage,
      responseType: sIncommingResponseType,
      color: sIncommingColor
    };
    setTimeout(() => { this.DisplayErrorBlock = false; }, 3000);
  }
}
