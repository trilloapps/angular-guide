import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userDetails: any;

constructor(private router : Router){
  this.userDetails = JSON.parse(localStorage.getItem('userDetail'));
}
 logout(){
  localStorage.clear();
  this.router.navigateByUrl('/auth/login')
 }
}
