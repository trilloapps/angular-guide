import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { canActivateTeam } from './guards/auth.guard';
import { userAccessGuard } from './guards/user-access.guard';


const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children:
    [
      { path:'' , redirectTo:'/auth/login' , pathMatch:'full'},
      {
        path:'auth',
        loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
      },
     
    ]
  },
  {
    path: '',
		component: FullComponent,canActivate: [canActivateTeam],
    children:
    [
      {
        path:'app',canActivate: [canActivateTeam],
        loadChildren: () => import('./modules/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path:'admin',canActivate: [canActivateTeam,userAccessGuard],
        loadChildren: () => import('./modules/usermanager/usermanager.module').then(m => m.UsermanagerModule)
      },
    ]
  },
  {
    path: "**",
    redirectTo: "auth/login",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
