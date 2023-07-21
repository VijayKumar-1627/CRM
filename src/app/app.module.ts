import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { UserPageComponent } from './user-page/user-page/user-page.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { SubmittedFormComponent } from './submitted-form/submitted-form.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsertableComponent } from './usertable/usertable.component';
import { UserService } from './user.service';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

import { DialogComponent } from './dialog/dialog.component';
import { CrudAppComponent } from './crud-app/crud-app.component';
import { CustomerComponent } from './customer/customer.component';
// import { PasswordPatternDirective } from './directives/password-pattern.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserPageComponent,
    SubmittedFormComponent,
    UsertableComponent,
    DialogComponent,
    CrudAppComponent,
    CustomerComponent,
    // PasswordPatternDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    
    MatPaginatorModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    DragDropModule,
    MatDialogModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
