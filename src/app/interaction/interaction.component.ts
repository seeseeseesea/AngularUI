import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { IntDialogComponent } from './int-dialog/int-dialog.component';


@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.css']
})
export class InteractionComponent implements OnInit {


  interactionList: any[];

  int_current = {};
  Int_role_info = {};

  constructor(public dialog: MatDialog, private _data: DataService, private router: Router) { }

  ngOnInit() {
    this.interactionList = this._data.getIntList();
    console.log(this.interactionList);
  }

  onCreateDialog() {

    console.log("add new client");
    let dialogRef = this.dialog.open(IntDialogComponent, {
      width: '500px',
      data: {
        id: 0, 
        clientId: 0, 
        empId: 0, 
        intType: "", 
        intDate: "", 
        remarks: "", 
        Operation: "Add"}
    });
    dialogRef.afterClosed().subscribe(
      result => {

        
        // need to assign value for interaction list
        this.Int_role_info = this._data.getIntDialogInfo();
        this._data.getIntByInfo(this.Int_role_info);

        setTimeout(
          () => {
            console.log("out side adding int");
            this.int_current = result;
            this.interactionList = this._data.getIntList();
            console.log(this.interactionList);
          }, 1000)

      }
    )
  }

  UpdateInt(interaction: any) {
    console.log("update new client");
    let dialogRef2 = this.dialog.open(IntDialogComponent, {
      width: '500px',
      data: {
        id: interaction.id, 
        clientId: interaction.ClientId, 
        empId: interaction.EmpId, 
        intType: interaction.IntType, 
        intDate: interaction.IntDate, 
        remarks: interaction.Remarks, 
        Operation: "Update"}
    });
    dialogRef2.afterClosed().subscribe(
      result => {
        //!! need to assign value for interaction list
        this.Int_role_info = this._data.getIntDialogInfo();
        this._data.getIntByInfo(this.Int_role_info);
        setTimeout(
          () => {
            this.int_current = result;
            this.interactionList = this._data.getIntList();
            console.log(this.interactionList);
          }, 1000)

      }
    )
  }

  DeleteInt(id: number) {
    // remove interaction row by id
    let response_status = "";
    console.log("delete employee");
    this._data.deleteInteraction(id).subscribe( response => {
      response_status = response['response']

      if(response_status=="Success") {
        alert("Delete Success");
      } else {
        alert("Delete Fail, Plz try again");
      }

      this.Int_role_info = this._data.getIntDialogInfo();
      this._data.getIntByInfo(this.Int_role_info);
      setTimeout(
        () => {
          this.interactionList = this._data.getIntList();
          console.log(this.interactionList);
        }, 1000)
    }, 
    error=> console.log(error))
    // location.reload();
  }



  

}
