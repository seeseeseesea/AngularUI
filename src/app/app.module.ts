import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientComponent } from './client/client.component';
import { InteractionComponent } from './interaction/interaction.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule} from '@angular/material/dialog';
import { EmployeeDialogComponent } from './employee/employee-dialog/employee-dialog.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IntDialogComponent } from './interaction/int-dialog/int-dialog.component';
import { ClientDialogComponent } from './client/client-dialog/client-dialog.component';
import { TopBarComponent } from './top-bar/top-bar.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ClientComponent,
    InteractionComponent,
    EmployeeDialogComponent,
    IntDialogComponent,
    ClientDialogComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule
  ],
  entryComponents: [
    EmployeeDialogComponent,
    ClientDialogComponent,
    IntDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
