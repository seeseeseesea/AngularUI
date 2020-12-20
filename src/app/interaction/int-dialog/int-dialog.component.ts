import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-int-dialog',
  templateUrl: './int-dialog.component.html',
  styleUrls: ['./int-dialog.component.css']
})
export class IntDialogComponent implements OnInit {

  data = {};
  enable_add = false;
  enable_update = false;
  response_status = '';

  constructor(@Inject(MAT_DIALOG_DATA) public interaction: any, private _data: DataService) { }

  ngOnInit() {
    if(this.interaction.Operation=="Add") {
      this.enable_add = true;
      this.enable_update = false;
    } else if (this.interaction.Operation=="Update") {
      this.enable_update = true;
      this.enable_add = false;
    }
    this.data = this.interaction;

  }

  addNewInt() {
    console.log(this.data);
    this._data.addNewInteraction(this.data).subscribe(
      response => {
        this.response_status = response['response'];

        if(this.response_status=="Success") {
          alert("Adding New Interaction Success");
        } else {
          alert("Adding New Interaction Failed, Plz try again");
        }

      }, error=>console.log(error))
    // location.reload();
  }

  updateNewInt() {
    console.log(this.data);
    this._data.updateInteraction(this.data).subscribe(
      response => {
        this.response_status = response['response'];

        if(this.response_status=="Success") {
          alert("Update Interaction Success");
        } else {
          alert("Update Interaction Failed, Plz try again");
        }
      }, error=>console.log(error))
    
    // location.reload();
  }


}
