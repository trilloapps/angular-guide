import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { MustMatch } from 'src/app/services/must-match.validator';
import { SessionService } from 'src/app/services/session.service';
import { UsermanagerService } from 'src/app/services/usermanager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDetails: any;
  userProfileImage: any;
  resetPasswordForm : FormGroup;
  filesToUpload: any = [];
  filename: any;
  file: File | null;
   // alerts
   bDisplayErrorBlock: boolean;
   resMessage: { message: any, responseType:  any, color: any};

constructor(private router : Router, private modalService: NgbModal, private DataService: DataService, private sessionService : SessionService,private formBuilder : FormBuilder,private UMService : UsermanagerService){
}
  ngOnInit(): void {
    this.userDetails = this.sessionService.SessionService_GetUserDetails();
    this.UsersComponent_InitializeResetUserPasswordForm();
    this.getUserDetails()
    console.log("User Details Will be looks like",this.userDetails)
  }

  UsersComponent_InitializeResetUserPasswordForm(){
    this.resetPasswordForm = this.formBuilder.group({
      userId: [null],
      password: [null, [Validators.required, Validators.minLength(8)]],
      rptPassword: [null, [Validators.required, Validators.minLength(8)]],
      accessCount: [null],
      createdAt: [null],
      deleted: [null],
      deletedAt: [null],
      email: [null],
      emailVerifyKey: [null],
      firstName: [null],
      id: [null],
      inactive: [null],
      inactiveStr: [null],
      lastAccessTS: [null],
      lastName: [null],
      orgName: [null],
      role: [null],
      tenantId: [null],
      uid: [null],
      updatedAt: [null],
      verifyLinkSentAt: [null],
      _parentUid_: [null],
      _selected_: [null],
      _uid_: [null],
    },
    { validator: MustMatch('password', 'rptPassword') })
  }
  // ------------------------------************************************************************------------------------------

  getUserDetails(){
    let body = {
      userId: this.userDetails.id.toString()
    }
    this.DataService.GetUserDetails(body).subscribe({
      next :(result) => {
          this.userProfileImage = result.data.pictureUrl
      }
    })
  }

 loadAvatar() {
  this.userProfileImage = '../../../assets/images/profile-img.png'
}

  onFileSelect(event) {    
    const selectedFiles: FileList = event.target.files as FileList;
    const validFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    const invalidFiles = Array.from(selectedFiles).filter(
      (file) => !validFileTypes.includes(file.type)
    );
    this.filesToUpload = event.target.files;
    this.uploadFiles();
    this.filename = "";
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.filename = this.file.name;
    }
  }
  uploadFiles() {
    let functionParam = {
      userId : this.userDetails.id
    }
    for (const file of this.filesToUpload) {
      const formData: FormData = new FormData();
      formData.append("file", file);
      formData.append("folder", "public/images");
      formData.append("makePublic", "false");
      formData.append("functionName", "AddUserImage");
      formData.append("functionParam", JSON.stringify(functionParam));
      this.DataService.ProfileFileUpload(formData).subscribe({
        next: (response) => {
          this.getUserDetails()
        },
        error: (error) => {
          console.error(error)
          console.error(error);
        },
        complete: () => { },
      });
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/auth/login')
   }

profileModal(content) {
  this.modalService.open(content, { centered: true });}

ResetPasswordModal(resetpassword: any) {
    this.modalService.open(resetpassword, {
      backdrop: 'static',
      size: 'md',
      centered: true,
      windowClass: 'custom-modal-classtwo'
    });
  }
  NavigateToUserModule()
  {
    this.router.navigateByUrl('/admin')
  }
  DismissModal(){
    this.modalService.dismissAll();
    this.resetPasswordForm.reset()
  }

    // -------------------- RESET PASSWORD VALUE --------------------
  ResetPasswordValue(resetPasswordModal) {
    let oIncomingUserDetails = this.sessionService.SessionService_GetUserDetails();
      this.resetPasswordForm.patchValue({
        userId: oIncomingUserDetails.userId,
        role: oIncomingUserDetails.role,
        email: oIncomingUserDetails.email,
        mobilePhone: oIncomingUserDetails.mobilePhone,
        firstName: oIncomingUserDetails.firstName,
        lastName: oIncomingUserDetails.lastName,
        companyName: oIncomingUserDetails.companyName,
        deptName: oIncomingUserDetails.deptName,
        accessCount: oIncomingUserDetails.accessCount,
        createdAt: oIncomingUserDetails.createdAt,
        deleted: oIncomingUserDetails.deleted,
        deletedAt: oIncomingUserDetails.deletedAt,
        emailVerifyKey: oIncomingUserDetails.emailVerifyKey,
        id: oIncomingUserDetails.id,
        inactive: oIncomingUserDetails.inactive,
        lastAccessTS: oIncomingUserDetails.lastAccessTS,
        orgName: oIncomingUserDetails.orgName,
        tenantId: oIncomingUserDetails.tenantId,
        uid: oIncomingUserDetails.uid,
        updatedAt: oIncomingUserDetails.updatedAt,
        verifyLinkSentAt: oIncomingUserDetails.verifyLinkSentAt,
      });
      this.ResetPasswordModal(resetPasswordModal)
    }

  // -------------------- RESET PASSWORD --------------------
ResetPassword() {
  if(this.resetPasswordForm.valid){
    this.UMService.DataService_ResetPassword(this.resetPasswordForm.value).subscribe({
      next:(result: any) => {
      if (result.status === "success") {
        this.modalService.dismissAll();
        this.DisplayAlertMessage(result.message,'success','success');
      }
      else {
        this.DisplayAlertMessage(result.message,'failed','danger');
      }
    },
      error:(error) => {
        this.DisplayAlertMessage(error.message,'failed','danger' );
      },
      complete: () => {}
    });
  }
  else
  {
    this.resetPasswordForm.markAllAsTouched()
  }
}
  // ------------------------------************************************************************------------------------------

     // -------------------- ALERT MESSAGES --------------------
 DisplayAlertMessage(sIncommingMessage, sIncommingResponseType,sIncommingColor) {
  this.bDisplayErrorBlock = true
  this.resMessage = 
  {
    message: sIncommingMessage,
    responseType : sIncommingResponseType,
    color :  sIncommingColor
  };

  setTimeout(() => { this.bDisplayErrorBlock = false; }, 3000);
}

}
