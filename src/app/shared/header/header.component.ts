import { Binary } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDetails: any;
  imageUrl: any;
  fProfileUpload: FormGroup
  userProfileImage: any;
  profileImg: any;
  oUserdetails: any;
  filesToUpload: any = [];
  filename: any;
  file: File | null;
  uploadImage: boolean;
  navProfileImage: boolean = false;

constructor(private router : Router, private modalService: NgbModal, private DataService: DataService, private sessionService: SessionService,){
  this.userDetails = JSON.parse(localStorage.getItem('userDetail'));
  this.oUserdetails = {};
}
  ngOnInit(): void {
    this.initializefProfileUploadForm()
    this.uploadFiles()
    if (this.navProfileImage == true || this.oUserdetails && this.oUserdetails.pictureUrl) {
      this.profileImg = this.oUserdetails.pictureUrl;
    }

  }
 logout(){
  localStorage.clear();
  this.router.navigateByUrl('/auth/login')
 }

 loadAvatar() {
  this.imageUrl = '../../../assets/images/profile-img.png'
}
initializefProfileUploadForm() {
  let regex = /^[^\s].*[^\s]$/;
  this.fProfileUpload = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.pattern(regex)]),
    lastName: new FormControl(null, [Validators.required, Validators.pattern(regex)]),
    id: new FormControl(),
    createdAt: new FormControl(),
    updatedAt: new FormControl(),
    deleted: new FormControl(),
    userId: new FormControl(),
    role: new FormControl(),
    orgName: new FormControl(),
    emailVerified: new FormControl(),
    tenantId: new FormControl(),
    termsAgreed: new FormControl(),
    privacyAgreed: new FormControl(),
    fullName: new FormControl(),
    uid: new FormControl(),
  });

  this.fProfileUpload.get('firstName').valueChanges.subscribe(() => {
    this.updateFullName();
  });
  this.fProfileUpload.get('lastName').valueChanges.subscribe(() => {
    this.updateFullName();
  });
}
updateFullName() {
  const firstname = this.fProfileUpload.get('firstName').value;
  const lastname = this.fProfileUpload.get('lastName').value;
  const fullName = `${firstname} ${lastname}`;
  this.fProfileUpload.get('fullName').setValue(fullName);
}
  patchFormWithUserDetails() {
    this.fProfileUpload.setValue({
      firstName: this.oUserdetails.firstName,
      lastName: this.oUserdetails.lastName,
      id: this.oUserdetails.id,
      createdAt: this.oUserdetails.createdAt,
      updatedAt: this.oUserdetails.updatedAt,
      deleted: this.oUserdetails.deleted,
      userId: this.oUserdetails.userId,
      role: this.oUserdetails.role,
      orgName: this.oUserdetails.orgName,
      emailVerified: this.oUserdetails.emailVerified,
      tenantId: this.oUserdetails.tenantId,
      termsAgreed: this.oUserdetails.termsAgreed,
      privacyAgreed: this.oUserdetails.privacyAgreed,
      fullName: this.oUserdetails.firstName + ' ' + this.oUserdetails.lastName,
      uid: this.oUserdetails.uid,
    });
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
      console.log('File Name', this.filename);

    }
  }
  uploadFiles() {
    this.uploadImage = true;
    console.log(this.filesToUpload);
    for (const file of this.filesToUpload) {
      const formData: FormData = new FormData();
      formData.append("file", file);
      formData.append("folder", "public/images");
      formData.append("makePublic", "true");
      this.DataService.ProfileFileUpload(formData).subscribe({
        next: (response) => {
          this.oUserdetails.pictureUrl= "https://storage.googleapis.com/" + response.bucketName + "/" + response.folderName + "/" + response.fileName;
          this.fProfileUpload.addControl('pictureUrl', new FormControl(this.userProfileImage));
          console.log('Updated picture URL:', this.oUserdetails.pictureUrl);
          this.profileImg = this.oUserdetails.pictureUrl;
          this.uploadImage = false;
        },
        error: (error) => {
          console.error(error)
          console.error(error);
        },
        complete: () => { },
      });
    }
  }


open(content) {
  this.modalService.open(content, { centered: true });
  if (this.oUserdetails && this.oUserdetails.pictureUrl) {
    this.userProfileImage = this.oUserdetails.pictureUrl;
  }
	}

}
