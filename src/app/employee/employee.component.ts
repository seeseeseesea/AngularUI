import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../services/data.service';
import {EmployeeDialogComponent} from './employee-dialog/employee-dialog.component';
import {Employee} from '../models/employee';
import { Router } from '@angular/router';

export interface DialogData {
  id: number;
  Name: string;
  Password: string;
  Designation: string
}


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  EmployeeList : any[];
  InteractionList: any[];

  employee_current = {};
  int_dialog_info = {};

  constructor(public dialog: MatDialog, private _data: DataService, private router: Router) { }

  ngOnInit() {
    this._data.getEmployeeList().subscribe(
      data=> {
        this.EmployeeList = data;
        console.log(this.EmployeeList);
    }, error=>console.log(error))
  }

  RouteToInteractions(employee: any) {
    
    let _id = employee.id;
    this._data.getIntByEmpId(_id).subscribe(
      data => {
        this.InteractionList = data;
        this._data.setIntList(this.InteractionList);
        
        // load information for dialog information
        this.int_dialog_info['select'] = "Employee";
        this.int_dialog_info['id'] = _id;
        this._data.setIntDialogInfo(this.int_dialog_info);

        this.router.navigate(['int']);

      },
      error => console.log(error))
    
  }

  onCreateDialog() {

    console.log("add new employee");
    let dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '500px',
      data: {id: 0, name: "", password: "", designation: "", Operation: "Add"}
    });
    dialogRef.afterClosed().subscribe(
      result => {

        this.employee_current = result;
        console.log(this.employee_current);

      }
    )
  }

  UpdateEmp(employee: any) {

    console.log("update new employee");
    let dialogRef2 = this.dialog.open(EmployeeDialogComponent, {
      width: '500px',
      data: {id: employee.id, name: employee.name, password: employee.password, designation: employee.designation, Operation: "Update"}
    });
    dialogRef2.afterClosed().subscribe(
      result => {

        this.employee_current = result;
        console.log(this.employee_current);

      }
    )
  }

  DeleteEmp(id: number) {
    // remove employee row by id
    let response_status = "";
    console.log("delete employee");
    this._data.deleteEmployee(id).subscribe( response => {
      response_status = response['response']

      if(response_status=="Success") {
        alert("Delete Success");
      } else {
        alert("Delete Fail, Plz try again");
      }
    }, 
    error=> console.log(error))
    location.reload();
  }



}


