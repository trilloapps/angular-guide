import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-phone-verification',
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.scss']
})
export class PhoneVerificationComponent implements OnInit{
verificationCodeForm: FormGroup;
@Input() confirmationResult: any;
@Input() loginStatusResult;
@Output() verificationProcess = new EventEmitter<boolean>();
resMessage: { message: any, responseType: any, color: any };
bDisplayErrorBlock: boolean;
Loader : boolean = false;
constructor(private router : Router, private authservice : AuthService,private sessionService  :SessionService){}
ngOnInit(): void {
  this.initializeVerificationCodeForm();
}
// ****************************************** Form ***************************************

initializeVerificationCodeForm() {
  this.verificationCodeForm = new FormGroup({
    verificationCode: new FormControl('', [Validators.required ,Validators.minLength(6)]),
  });
}

// ****************************************** Api ***************************************

verifyToken() {  
  if(this.verificationCodeForm.valid){
    this.Loader = true;
    let pin= this.verificationCodeForm.get('verificationCode').value
    this.confirmationResult.confirm(pin).then(async (result) => {
       if(this.loginStatusResult?.accessToken)
       {
         localStorage.setItem("lsSampleAppAccessToken", JSON.stringify(this.loginStatusResult.accessToken));
         this.sessionService.SessionService_SetUserDetails(this.loginStatusResult.user)
         this.router.navigateByUrl('/app/customers');
       }
       else
       {
        this.CallSignUpAPI();
       }
    },
      (error) => {
        console.log("Error catched===>>>>>", error);
        this.Loader = false;
        this.displayAlertMessage('Invalid code!', 'error', 'danger');
      })
      .catch((error) => {
        console.log("error: ", error);
        this.Loader = false;
        this.displayAlertMessage('An internal server error occured. Please try again later.', 'error', 'danger');
      });
  }
  else
  {
    this.verificationCodeForm.markAllAsTouched();
  }
}

CallSignUpAPI()
{
  this.authservice.AuthService_Signup(this.loginStatusResult).subscribe({
    next: (result) => {
      if (result.status == 'success') {
        this.displayAlertMessage(result.message,'success', 'success');
        setTimeout(() => {
          this.Loader = false;
          this.router.navigateByUrl('/auth/login');
        }, 1500);
      } else {
        this.displayAlertMessage(result.message, 'error', 'danger');
        setTimeout(() => {
          this.verificationProcess.emit(true);
          this.Loader = false;
        }, 2000);
      }
    },
    error: (error) => {
      this.Loader = false;
      console.error("SendLoginRequest: ERROR ===>>", error);
      this.displayAlertMessage('Bad Credentials!', 'error', 'danger');
    },
    complete: () => {}
  });
}
// ****************************************** ALERT MESSAGES ***************************************

displayAlertMessage(sIncommingMessage, sIncommingResponseType, sIncommingColor) {
  this.bDisplayErrorBlock = true
  this.resMessage =
  {
    message: sIncommingMessage,
    responseType: sIncommingResponseType,
    color: sIncommingColor
  };
  setTimeout(() => { this.bDisplayErrorBlock = false; }, 5000);
}
}

