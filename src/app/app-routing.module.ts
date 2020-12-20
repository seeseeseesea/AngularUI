import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { EmployeeComponent } from './employee/employee.component';
import { InteractionComponent } from './interaction/interaction.component';

const routes: Routes = [
  {path: '', component: EmployeeComponent},
  {path: 'client', component: ClientComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'int', component: InteractionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
