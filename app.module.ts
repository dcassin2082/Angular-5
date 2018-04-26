import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2StickyModule } from 'ng2-sticky';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';

import { AdminModule } from './admin/admin.module';
import { ContactModule } from './contacts/contact.module';
import { CustomerModule } from './customers/customer.module';
import { EmployeeModule } from './employees/employee.module';
import { HomeModule } from './home/home.module';
import { ProductModule } from './products/product.module';
import { SupplierModule } from './suppliers/supplier.module';
import { UserModule } from './user/user.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './headers/header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { PageNotFoundComponent } from './not-found/page-not-found.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { UserService } from './user/shared/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SidenavModule } from './sidenav/sidenav.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ForbiddenComponent,
    PageNotFoundComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    Ng2StickyModule,
    ToastrModule.forRoot(),
    AdminModule,
    ContactModule,
    CustomerModule,
    EmployeeModule,
    HomeModule,
    ProductModule,
    SupplierModule,
    UserModule,
    BrowserAnimationsModule,
    RouterModule,
    SidenavModule,
    Ng4LoadingSpinnerModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    UserService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
