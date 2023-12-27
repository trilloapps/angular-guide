import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDetails: any;
  userProfileImage: any;
  filesToUpload: any = [];
  filename: any;
  file: File | null;

constructor(private router : Router, private modalService: NgbModal, private DataService: DataService){
  this.userDetails = JSON.parse(localStorage.getItem('userDetail'));
}
  ngOnInit(): void {
    this.getUserDetails()
  }

  getUserDetails(){
    let body = {
      userId: this.userDetails.id.toString()
    }
    this.DataService.GetUserDetails(body).subscribe({
      next :(result) => {
          this.userProfileImage = result.data[0].pictureUrl
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
      formData.append("makePublic", "true");
      formData.append("functionName", "AddUserImage");
      formData.append("functionParam", JSON.stringify(functionParam));
      this.DataService.ProfileFileUpload(formData).subscribe({
        next: (response) => {
          this.userProfileImage= response.pictureUrl
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

}
