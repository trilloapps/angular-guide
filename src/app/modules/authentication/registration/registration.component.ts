import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/services/must-match.validator';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { phoneNumberValidator } from 'src/app/services/phone-number-validators';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  fireBaseConfirmationResult: firebase.auth.ConfirmationResult;
  autenticationForm: FormGroup;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier | null = null;
  resMessage: { message: any; responseType: any; color: any };
  bDisplayErrorBlock: boolean = false;
  verificationSection: boolean = true;
  newUserForm: FormGroup;
  isValid: boolean = false;
  Loader : boolean = false;
  constructor(private formBuilder: FormBuilder){}

  ngOnInit(){
    this.UsersComponent_InitializeNewUserForm();
    this.intializeFirbase();
  }

  UsersComponent_InitializeNewUserForm(){
    let oTextRejex = /^(?! )(.*)$/;
    const phoneNumberPattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    this.newUserForm = this.formBuilder.group({
      userId: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
      role: ['user'],
      tenantName: ['cloud'],
      password: [null, [Validators.required, Validators.minLength(8)]],
      rptPassword: [null, [Validators.required, Validators.minLength(8)]],
      email: [null, [Validators.required, Validators.email]],
      mobilePhone: [null, [Validators.required,phoneNumberValidator()]],
      firstName: [null, [Validators.required,Validators.pattern(oTextRejex)]],
      lastName: [null, [Validators.required,Validators.pattern(oTextRejex)]],
    },
      { validator: MustMatch('password', 'rptPassword') })
  }

  intializeFirbase(){
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebaseConfig);
    } else {
      firebase.app();
    }
    setTimeout(() => {
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container-login', {
        'size': 'invisible' // Set to 'invisible' for an invisible reCAPTCHA
      });
      console.log("recaptchaVerifier", this.recaptchaVerifier);
    }, 2000);
  }

  sendSignUpRequestWithRecaptchaToken() {
    if (this.newUserForm.valid) {
      this.Loader = true;
      let phoneNumber: string = this.newUserForm.controls['mobilePhone'].value;
      phoneNumber = phoneNumber.replaceAll(/-/g, '');
      // ------------ OTP -----------------------//
      firebase.auth().signInWithPhoneNumber(phoneNumber, this.recaptchaVerifier)
        .then(async (confirmationResult) => {
          if (this.recaptchaVerifier.verify()) {
            this.verificationSection = false;
            this.fireBaseConfirmationResult = confirmationResult;
            this.Loader = false;
            this.displayAlertMessage('OTP code has been sent to the phone', 'success', 'success');
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
    else {
      this.newUserForm.markAllAsTouched();
    }
  }

  SignupFailed(event)
  {
    this.verificationSection = event;
  }


  
    // -------------------- ALERT MESSAGES -------------------

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
