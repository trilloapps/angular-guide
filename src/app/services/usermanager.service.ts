import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UsermanagerService {
  constructor(private http: HttpClient,private ohttp: HttpClient,private oSessionService: SessionService,private handler: HttpBackend)
  {}
  userDetails = this.oSessionService.SessionService_GetUserDetails();

  //users list
  DataService_GetUsersList(body): Observable<any> {
  return this.ohttp.post<any>(environment.BaseURL + '/ds/page/auth/vault', body);
  }
  // new user role
  DataService_GetNewUserRole(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/_service/um/saveRole', body);
  }
  DataService_DeleteRole(body): Observable<any> {
    return this.http.delete<any>(environment.BaseURL + '/_service/um/deleteRole?roleName='+body);
  }
  //create user
  DataService_CreateUser(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/_service/um/newUser', body);
  }
  //edit user
  DataService_EditUser(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/_service/um/editUser', body);
  }
  //suspend user
  DataService_SuspendUser(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/_service/um/toggleSuspendActive', body);
  }
  //delete user
  DataService_DeleteUser(id : any): Observable<any> {
    return this.http.delete<any>(environment.BaseURL + '/_service/um/deleteUser' + "?id="+ id);
  }
  DataService_ResetPassword(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/_service/um/resetPassword', body);
  }
  //upload  users
  DataService_UploadUsers(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/authds/uploadUsers', body);
  }
  DataService_GetUsersGroup(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/ds/function/shared/GroupList', body);
  }
  DataService_GetGroupData(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/ds/function/shared/GroupDetail', body);
  }
  DataService_AddNewGroup(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/ds/function/shared/newGroup', body);
  }
  DataService_DeleteGroup(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/foldersvc/cloudstorage/group/delete', body);
  }
  DataService_AddMember(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/ds/function/shared/addMember', body);
  }
  DataService_DeleteMember(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/ds/function/shared/deleteMember', body);
  }
  DataService_EditMember(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/ds/function/shared/updateMember', body)
  }

  //logs list
  DataService_GetLogsList(body): Observable<any> 
  {
    return this.http.post<any>(environment.BaseURL + '/ds/page/AuditLog', body);
  }
  //logs details list
  DataService_GetLogsDestailsList(id : any): Observable<any> 
  {
  return this.http.get<any>(environment.BaseURL + '/ds/object/shared/common/AuditLog' + "?id="+id );
  }
   //roles list
   DataService_GetRolesList(body): Observable<any> {
    return this.http.get<any>(environment.BaseURL + '/_service/um/getRoles');
  }
  DataService_DownloadCSVRolesList (body): Observable<any> 
  {
    return this.http.post<any>(environment.BaseURL +'/ds/function/shared/GetRolesCSV' , body)
  }
  // edit  role
  DataService_GetEditRole(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/_service/um/saveRole', body);
  }

  // Team Member APIs 
  //users list
  DataService_GetMembersList(body): Observable<any> {
  return this.http.post<any>(environment.BaseURL + '/_service/mm/members', body);
  }
  //create Member
  DataService_CreateMember(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/_service/mm/newUser', body);
  }
  //edit Member
  DataService_EditTeamMember(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/_service/mm/editUser', body);
  }
  //suspend Member
  DataService_SuspendMember(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/_service/mm/toggleSuspendActive', body);
  }
  //delete Member
  DataService_DeleteTeamMember(id : any): Observable<any> {
    return this.http.delete<any>(environment.BaseURL + '/_service/mm/deleteUser' + "?id="+ id);
  }
  DataService_ResetTeamMemberPassword(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/_service/mm/resetPassword', body);
  }
  DataService_GetRolesForTeamMembers(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/_service/mm/Role',body);
  }
  DataService_GetRolesForNonSaasEnv(body): Observable<any> {
    return this.http.post<any>(environment.BaseURL + '/ds/page/auth/vault/Role',body);
  }
}
