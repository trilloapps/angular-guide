import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from 'src/interceptors/headers.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: HeadersInterceptor, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
