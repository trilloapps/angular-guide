import { Component, OnInit,OnDestroy,ViewChild  } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { MustMatch } from 'src/app/services/must-match.validator';
import { DatePipe } from '@angular/common';
import { SortingService } from 'src/app/services/sorting.service';
import { SessionService } from 'src/app/services/session.service';
import { UtilService } from 'src/app/services/util.service';
import { UsermanagerService } from 'src/app/services/usermanager.service';
import { Router } from '@angular/router';
import { phoneNumberValidator } from 'src/app/services/phone-number-validators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit,OnDestroy {
  // -------------------- VARIABLES --------------------
  bLoading: boolean = false;
  // alerts
  bDisplayErrorBlock: boolean;
  resMessage: { message: any, responseType:  any, color: any};

  roles:any=[]
  lUsersList : any[] = [];
  lNewUsersList: any[] = new Array;
  temp : any[] = [];
  closeResult = '';
  selected = [];
  // forms groups
  newUserForm: FormGroup;
  editForm: FormGroup;
  resetPasswordForm: FormGroup;
  lSelectedUser: any = [];
  nSelectedId: any;
  sSelectedUserStatus: any;
  sSelectedUserId: any;
  sCheckUserStatus: string = "Suspend";
  suspendedText: any = [];
  nSelectedOptions: any = 100;
  sSelectedUserName: any;
  nSelectedUserId: any;
  size: any = 100;
  start: any = 1;
  page: number = 1;
  nCurrentPage = 1;
  pageSize: number = 20
  sFilename: string = "";
  files: any[] = [];
  nFailedCount: any;
  nSuccessCount: any;
  bShowUploadBtn: boolean = false;
  file: any;
  sortBy: string = "name";
  sortOrder: string = "asc";
  selectedCar:number
  sortName:any=" ";
  unSortedList: any;
  columns=[{name:"userId", displayName:"User ID",direction:" "},
  {name:"email", displayName:"Email",direction:" "},
  {name:"firstName", displayName:"First Name",direction:" "},
  {name:"lastName", displayName:"Last Name",direction:" "},
  {name:"role", displayName:"Role",direction:" "},
  {name:"lastAccessTS", displayName:"Last Access",direction:" "},
  {name:"accessCount", displayName:"Logins",direction:" "},
  {name:"inactive", displayName:"Suspended",direction:" "},

]
  modeCheck: any;
  rowSelected: any;
  searchInput: any;



  

  // -------------------- CONSTRUCTOR --------------------
  constructor(config: NgbModalConfig,private utilService:UtilService, private sortingService:SortingService, private modalService: NgbModal,private UMService: UsermanagerService, private fb: FormBuilder,private oDatePipe : DatePipe, private router : Router) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  // -------------------- ngOnInit --------------------
  ngOnInit(): void {
    this.UsersComponent_InitializeNewUserForm()
    this.UsersComponent_InitializeEditUserForm()
    this.UsersComponent_InitializeResetUserPasswordForm()
    this.UsersComponent_GetUsersList(this.size, this.start);
    this.UsersComponent_GetUsersRolesList();
  }
  ngOnDestroy(): void {
    this.modalService.dismissAll()
    
  }
  UsersComponent_InitializeNewUserForm(){
    let oTextRejex = /^(?! )(.*)$/;
    this.newUserForm = this.fb.group({
      userId: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
      role: ['user',Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]],
      rptPassword: [null, [Validators.required, Validators.minLength(8)]],
      email: [null, [Validators.required, Validators.email]],
      mobilePhone: [null, [Validators.required,phoneNumberValidator()]],
      firstName: [null, [Validators.required,Validators.pattern(oTextRejex)]],
      lastName: [null, [Validators.required,Validators.pattern(oTextRejex)]],
      companyName: [null],
      deptName: [null],
    },
      { validator: MustMatch('password', 'rptPassword') })
  }
  UsersComponent_InitializeEditUserForm(){
    let oTextRejex = /^(?! )(.*)$/;
    this.editForm = this.fb.group({
      userId: [null],
      role: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      mobilePhone: [null, [Validators.required,phoneNumberValidator()]],
      firstName: [null, [Validators.required,Validators.pattern(oTextRejex)]],
      lastName: [null, [Validators.required,Validators.pattern(oTextRejex)]],
      companyName: [null],
      deptName: [null],
      accessCount: [null],
      createdAt: [null],
      deleted: [null],
      deletedAt: [null],
      emailVerifyKey: [null],
      id: [null],
      inactive: [null],
      lastAccessTS: [null],
      orgName: [null],
      tenantId: [null],
      uid: [null],
      updatedAt: [null],
      verifyLinkSentAt: [null],
    })
  }
  UsersComponent_InitializeResetUserPasswordForm(){
    this.resetPasswordForm = this.fb.group({
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

  // ------------------------------****************************** MODALS ******************************------------------------------
  UsersComponent_AddNewUserModal(addnew: any) {
    this.modalService.open(addnew, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal-classtwo'
    });
  }
  UsersComponent_AddNewUser(newUser) {
    let options: NgbModalOptions = {
      size: 'lg', ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: 'static',
    };
    this.modalService.open(newUser, options)
  }
  UsersComponent_EditUserModal(edit: any) {
    this.modalService.open(edit, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal-classtwo'
    });
  }
  UsersComponent_SuspendUserModal(oIncomingUserDetails, suspend) {
    this.suspendedText = oIncomingUserDetails;
    this.modalService.open(suspend, {
      backdrop: 'static',
      size: 'md',
      centered: true,
      windowClass: 'custom-modal-classtwo'
    });
  }
  UsersComponent_ResetPasswordModal(resetpassword: any) {
    this.modalService.open(resetpassword, {
      backdrop: 'static',
      size: 'md',
      centered: true,
      windowClass: 'custom-modal-classtwo'
    });
  }
  UsersComponent_DeleteUserModal(oIncomingUserDetails, deleteUserModal) {
    this.sSelectedUserName = oIncomingUserDetails.userId
    this.nSelectedUserId = oIncomingUserDetails.id
    this.modalService.open(deleteUserModal, {
      backdrop: 'static',
      size: 'md',
      centered: true,
      windowClass: 'custom-modal-classtwo'
    });
  }
  UsersComponent_UploadModal(target: any) {
    this.modalService.open(target, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal-classtwo'
    });
  }
  // ------------------------------************************************************************------------------------------
   // -------------------- EDIT USER PATCH VALUE --------------------
   UsersComponent_EditUser(oIncomingUserDetails, edit) {
    this.editForm.patchValue({
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
    this.UsersComponent_EditUserModal(edit)
  }
  // -------------------- RESET PASSWORD VALUE --------------------
  UsersComponent_ResetPasswordValue(oIncomingUserDetails, resetPasswordModal) {
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
    this.UsersComponent_ResetPasswordModal(resetPasswordModal)
  }
  // ------------------------------****************************** OBSERVABLES ******************************------------------------------
  // get users lists
  UsersComponent_GetUsersList(size, start) {
    this.searchInput=''
    let body = {
      className: "User",
      start: 1,
      size: 20000,
      orderBy: "userId"
    }
    this.UMService.DataService_GetUsersList(body).subscribe({
      next: (result: any) => {
      this.lUsersList = result.items;
      this.temp = [...result.items];
      this.unSortedList=JSON.parse(JSON.stringify(this.lUsersList))

    },
    error: (error) => {
      console.error("getUsersList : ERROR ==> ", error);
    },
    complete: () => { },
    }
  )
  }
  UsersComponent_GetUsersRolesList()
  {
    let body={
      size:500,
      start:1,
    }
    this.UMService.DataService_GetRolesForNonSaasEnv(body).subscribe(
    {
      next: (result) => {
        this.roles = this.RoleArray(result?.items);
        if (this.roles.length == 0) {
          this.roles = [{ name: "Admin", id: "admin", roleId: 2 }, { name: "User", id: "user", roleId: 3 }, { name: "User(UI)", id: "userUI", roleId: 4 }, { name: "User(SFTP)", id: "userSFTP", roleId: 5 }, { name: "Viewer", id: "viewer", roleId: 6 }]
        }
        this.roles.forEach((element,index) => {
          if (element.name==='*' || element.name==='editor'){
            this.roles.splice(index,1)
          }
        });
      },
      error: (error) => {
        this.UsersComponent_DisplayAlertMessage(error.message, "danger", "danger")
      },
      complete: () => { },
    })
  }
  RoleArray(oIncomingArray)
  {
    let tempRoles=[];
    oIncomingArray.forEach(role => {
          if(role.name != '*' && role.name != 'editor')
          {
            tempRoles.push({
              name:role.name,
              id:role.name,
              roleId:role.id
            })
          }
    });
    return tempRoles;
  }
  // -------------------- SUSPEND CURRENT USER --------------------
  async UsersComponent_SuspendSelectedUser() {
      let body =
      {
        id: this.suspendedText.id,
        inactive: this.suspendedText.inactive === false ? true : false,
      }
      this.bLoading=true
      this.UMService.DataService_SuspendUser(body).subscribe({
        next: (result) => {
          if (result.status == "failed") {
            this.UsersComponent_DisplayAlertMessage(result.message,'failed','danger')
          }
          else  {
            this.modalService.dismissAll();
            this.UsersComponent_GetUsersList(this.nSelectedOptions, 1),
            this.UsersComponent_DisplayAlertMessage(result.message,'success','success')
            this.utilService.checkValidity(this.suspendedText.id,'logOut')
          }
          this.bLoading=false
        },
        error: (error) => {
          this.bLoading=false
          this.UsersComponent_DisplayAlertMessage(error.message,'failed','danger', )
          console.error("suspendSelectedUser : ERROR ==> ", error);
        },
        complete: () => { },
        }
      )
  }

  // -------------------- DELETE SELECTED USER --------------------
  UsersComponent_DeleteSelectedUser() {
    this.bLoading=true
      this.UMService.DataService_DeleteUser(this.nSelectedUserId).subscribe({
      next : (result: any) => {
        if (result.status == "failed") {
          this.UsersComponent_DisplayAlertMessage(result.message,'failed','danger')
        }
        else {
          this.modalService.dismissAll();
          this.UsersComponent_GetUsersList(this.nSelectedOptions, 1);
          this.UsersComponent_DisplayAlertMessage('User deleted successfully','success', 'success')
          this.utilService.checkValidity(this.nSelectedUserId,'logOut')
        }
        this.bLoading=false
      },
        error: (error)=> {
          this.UsersComponent_DisplayAlertMessage(error.message,'failed','danger')
          this.bLoading=false
          console.error("UsermanagerComponent_DeleteSelectedUser : Error ==> ", error);
        },
        complete: () => { },
        })
  }

  // -------------------- EDIT USER VALUE --------------------
  UsersComponent_EditUserValue() {
    if(this.editForm.valid)
    {
      this.bLoading = true;
        this.UMService.DataService_EditUser(this.editForm.value).subscribe({
          next:(result: any) => {
          if (result.status === "failed") {
            this.UsersComponent_DisplayAlertMessage( result.message,'failed','danger');
          }
          else {
            this.modalService.dismissAll();
            this.UsersComponent_GetUsersList(this.nSelectedOptions, 1),
            this.UsersComponent_DisplayAlertMessage(result.message,'success','success' );
            this.utilService.checkValidity(result?.props?.user,'edit')
          }
          this.bLoading = false;
        },
         error: (error) => {
          this.UsersComponent_DisplayAlertMessage( error.message,'failed','danger')
          this.bLoading=false
          console.error("UsermanagerComponent_editUserValue : Error ==> ", error);
          },
          complete: () => {}
        }
        )
    }
    else
    {
      this.editForm.markAllAsTouched()
    }
  }

 // -------------------- CREATE USER --------------------
 UsersComponent_AddUser(modal) {
  if(this.newUserForm.valid){
    this.bLoading = true;
    this.UMService.DataService_CreateUser(this.newUserForm.value).subscribe({
      next:(result: any) => {
        this.modalService.dismissAll();
      if (result.status === "success") {
        this.newUserForm.reset();
        this.UsersComponent_DisplayAlertMessage(result.message,'success', 'success');
        this.UsersComponent_GetUsersList(this.size, this.start);
      }
      else {
        this.UsersComponent_DisplayAlertMessage(result.namedMessages[0].message,'failed','danger',);
        setTimeout(() => {
          this.modalService.open(modal,{centered:true , size:'lg'})
        }, 1000);
      }
      this.bLoading = false;
    },
    error:(error) => {
        this.bLoading = false;
        this.UsersComponent_DisplayAlertMessage(error.message,'failed','danger');
      },
      complete: () =>{}
    })
  }
  else
  {
    this.newUserForm.markAllAsTouched()
  }
}

// -------------------- RESET PASSWORD --------------------
UsersComponent_ResetPassword() {
  if(this.resetPasswordForm.valid){
    this.bLoading = true
    this.UMService.DataService_ResetPassword(this.resetPasswordForm.value).subscribe({
      next:(result: any) => {
      if (result.status === "success") {
        this.modalService.dismissAll();
        this.UsersComponent_GetUsersList(this.nSelectedOptions, 1);
        this.UsersComponent_DisplayAlertMessage(result.message,'success','success');
        this.utilService.checkValidity(this.resetPasswordForm.value.id,'logOut')
      }
      else {
        this.UsersComponent_DisplayAlertMessage(result.message,'failed','danger');
      }
      this.bLoading = false;
    },
      error:(error) => {
        this.bLoading = false;
        this.UsersComponent_DisplayAlertMessage(error.message,'failed','danger' );
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

  // -------------------- DOWNLOAD CSV --------------------
  UsersComponent_DownloadCSV() {
    let csvData = JSON.parse(JSON.stringify(this.lUsersList))
    csvData.forEach(element => {
      element.lastAccessTS =element.lastAccessTS==0?'':this.oDatePipe.transform(element.lastAccessTS, 'MM/dd/YY - HH:mm a');
      element.inactive=element.inactive?'Yes':'No';
      delete element.companyName,
        delete element.createdAt,
        delete element.deleted,
        delete element.deletedAt,
        delete element.deptName,
        delete element.emailVerifyKey,
        delete element.id,
        delete element.mobilePhone,
        delete element.orgName,
        delete element.tenantId,
        delete element.uid,
        delete element.updatedAt,
        delete element.verifyLinkSentAt,
        delete element.privacyAgreed,
        delete element.termsAgreed
        delete element.emailVerified
    });
    const replacer = (key, value) => (value === null ? '' : value);
    let header = [];
    for (const row of csvData) {
      if (row.hasOwnProperty("firstName") && row.hasOwnProperty("lastName") && row.hasOwnProperty("email")) {
        header = Object.keys(row);
        break; // Found the header, exit the loop
      }
      else
      {
        header = Object.keys(csvData[0]);
      }
    }
    
     // Rename column names
  const columnMapping = {
    'inactive': 'suspended',
    'accessCount': 'login',
    "lastAccessTS":'lastAccess',
  };
    const updatedHeader = header.map(fieldName => columnMapping[fieldName] || fieldName);
    const csv = csvData.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(updatedHeader.join(','));
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'users.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }


  // -------------------- SEARCH FILTER --------------------
  UsersComponent_UserSearchFilter(event: any) {
    this.searchInput=event.target.value
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.userId.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.lUsersList = temp;
    this.unSortedList=JSON.parse(JSON.stringify(this.lUsersList))

  }
    // -------------------- SORTING TABLES DATA--------------------
    UsersComponent_SortData(item) {
      if (this.sortName === item.name) {
        item.direction = item.direction === " " ? "asc" : item.direction === "asc" ? "desc" : " ";
      } else {
        this.columns.forEach(element => element.direction = ' ');
        this.sortName = item.name;
        item.direction = "asc";
      }
      
      if (item.direction === 'asc' || item.direction === 'desc') {
        this.sortingService.sortData(this.lUsersList, item);
      } else {
        this.lUsersList = [...this.unSortedList];
      }
    }
    UsersComponent_DismissModal(){
      this.modalService.dismissAll();
      this.resetPasswordForm.reset()
    }
    selectedRow(comingItem){
      this.rowSelected =comingItem
     }

     BackToCustomers()
     {
      this.router.navigateByUrl('/app/customers')
     }

   // -------------------- ALERT MESSAGES --------------------
 UsersComponent_DisplayAlertMessage(sIncommingMessage, sIncommingResponseType,sIncommingColor) {
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
  // ------------------------------************************************************************------------------------------
