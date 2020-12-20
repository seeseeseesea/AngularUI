import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.css']
})
export class ClientDialogComponent implements OnInit {

  data = {};
  enable_add = false;
  enable_update = false;
  response_status = '';

  constructor(@Inject(MAT_DIALOG_DATA) public client: any, private _data: DataService) { }

  ngOnInit() {
    if(this.client.Operation=="Add") {
      this.enable_add = true;
      this.enable_update = false;
    } else if (this.client.Operation=="Update") {
      this.enable_update = true;
      this.enable_add = false;
    }
    this.data = this.client;
    console.log(this.data);
    console.log(this.enable_update);
    console.log(this.enable_add);
  }

  addNewClient() {
    console.log(this.data);
    this._data.addNewClient(this.data).subscribe(
      response => {
        this.response_status = response['response'];
        console.log(response);

        if(this.response_status=="Success") {
          alert("Adding New Client Success");
        } else {
          alert("Adding New Client Failed, Plz try again");
        }

      }, error=>console.log(error))
    location.reload();
  }

  updateNewClient() {
    console.log(this.data);
    this._data.updateClient(this.data).subscribe(
      response => {
        this.response_status = response['response'];
        console.log(response);

        if(this.response_status=="Success") {
          alert("Update Client Success");
        } else {
          alert("Update Client Failed, Plz try again");
        }
      }, error=>console.log(error))
    
    location.reload();
  }

}
