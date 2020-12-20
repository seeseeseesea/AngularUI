import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ClientDialogComponent } from './client-dialog/client-dialog.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  ClientList: any[];
  InteractionList: any[];

  client_current={};
  int_dialog_info = {};

  constructor(public dialog: MatDialog, private _data: DataService, private router: Router) { }

  ngOnInit() {
    this._data.getClientList().subscribe(
      data=> {
        this.ClientList = data;
        console.log(this.ClientList);
    }, error=>console.log(error))
  }

  RouteToInteractions(client: any) {
    
    let _id = client.id;
    this._data.getIntByClientId(_id).subscribe(
      data => {
        this.InteractionList = data;
        console.log(data);
        this._data.setIntList(this.InteractionList);

        // load information for dialog information
        this.int_dialog_info['select'] = "Client";
        this.int_dialog_info['id'] = _id;
        this._data.setIntDialogInfo(this.int_dialog_info);
        console.log(`Interaction by Client ${this.int_dialog_info}`);

        this.router.navigate(['int']);

      },
      error => console.log(error))
    
  }


  onCreateDialog() {

    console.log("add new client");
    let dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '500px',
      data: {id: 0, name: "", email: "", phones: "", address: "", addedOn: "", Operation: "Add"}
    });
    dialogRef.afterClosed().subscribe(
      result => {

        this.client_current = result;
        console.log(this.client_current);

      }
    )
  }

  UpdateClient(client: any) {
    console.log("update new client");
    let dialogRef2 = this.dialog.open(ClientDialogComponent, {
      width: '500px',
      data: {
        id: client.id, name: client.name, email: client.email, phones: client.phones, 
        address: client.address, addedOn: client.addedOn, 
        Operation: "Update"}
    });
    dialogRef2.afterClosed().subscribe(
      result => {

        this.client_current = result;
        console.log(this.client_current);

      }
    )
  }

  DeleteClient(id: number) {
    // remove employee row by id
    let response_status = "";
    console.log("delete employee");
    this._data.deleteClient(id).subscribe( response => {
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
