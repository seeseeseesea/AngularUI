import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {

  data = {};
  enable_add = false;
  enable_update = false;
  response_status = '';

  constructor(@Inject(MAT_DIALOG_DATA) public employee: any, private _data: DataService) { }

  ngOnInit() {
    if(this.employee.Operation=="Add") {
      this.enable_add = true;
      this.enable_update = false;
    } else if (this.employee.Operation=="Update") {
      this.enable_update = true;
      this.enable_add = false;
    }
    this.data = this.employee;
    console.log(this.data);
    console.log(this.enable_update);
    console.log(this.enable_add);
  }

  addNewEmployee() {
    console.log(this.data);
    this._data.addNewEmployee(this.data).subscribe(
      response => {
        this.response_status = response['response'];
        console.log(response);

        if(this.response_status=="Success") {
          alert("Adding New Employee Success");
        } else {
          alert("Adding New Employee Failed, Plz try again");
        }

      }, error=>console.log(error))
    location.reload();
  }

  updateNewEmployee() {

    console.log(this.data);
    this._data.updateEmployee(this.data).subscribe(
      response => {
        this.response_status = response['response'];
        console.log(response);

        if(this.response_status=="Success") {
          alert("Update Employee Success");
        } else {
          alert("Update Employee Failed, Plz try again");
        }
      }, error=>console.log(error))
    
    location.reload();
  }

}
