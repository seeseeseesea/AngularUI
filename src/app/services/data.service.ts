import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Employee} from '../models/employee';
import { Interaction } from '../models/interaction';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  employee_send = {};
  employee_id = 0;
  client_id = 0;
  interactionList: any[];
  int_dialog_info = {};

  constructor(private _http: HttpClient) { }

  // Employee section CRUD
  getEmployeeList() {
    const _url = "http://localhost:50596/employee/getEmpList";
    return this._http.get<any[]>(_url);
  }

  addNewEmployee(employee: any) {
    const _url = "http://localhost:50596/employee/addEmp";

    let _data = {};

    _data["Name"] = employee["name"];
    _data["Password"] = employee["password"];
    _data["Designation"] = employee["designation"];
    
    console.log(_data);
    return this._http.post(_url, _data);
  }

  updateEmployee(employee: any) {
    const _url = "http://localhost:50596/employee/updateEmp";
    
    let _data = {};
    _data["Id"] = employee["id"];
    _data["Name"] = employee["name"];
    _data["Password"] = employee["password"];
    _data["Designation"] = employee["designation"];
    console.log(_data);

    return this._http.post(_url, _data);
  }

  deleteEmployee(id: number) {
    const _url = `http://localhost:50596/employee/deleteEmp/${id}`;

    return this._http.get(_url);
  }

  // Client Section CRUD
  getClientList() {
    const _url = "http://localhost:50596/client/getClientList";


    return this._http.get<Client[]>(_url);
  }

  addNewClient(client: any) {
    const _url = "http://localhost:50596/client/addClient";

    let _data = {};

    _data["Name"] = client["name"];
    _data["Email"] = client["email"];
    _data["Phones"] = client["phones"];
    _data["Address"] = client["address"];
    _data["AddedOn"] = client["addedOn"];

    console.log(_data);
    return this._http.post(_url, _data);
  }

  updateClient(client: any) {
    const _url = "http://localhost:50596/client/updateClient";
    let _data = {};

    _data["Id"] = client["id"];
    _data["Name"] = client["name"];
    _data["Email"] = client["email"];
    _data["Phones"] = client["phones"];
    _data["Address"] = client["address"];
    _data["AddedOn"] = client["addedOn"];

    console.log(_data);
    return this._http.post(_url, _data);
  }

  deleteClient(id: number) {
    const _url = `http://localhost:50596/client/deleteClient/${id}`;
    return this._http.get(_url);
  }

  // interactions section
  getIntByEmpId(id: number) {
    const _url = `http://localhost:50596/employee/getIntEmp/${id}`;
    return this._http.get<Interaction[]>(_url);
  }

  getIntByClientId(id: number) {
    const _url = `http://localhost:50596/client/getIntClient/${id}`;
    return this._http.get<Interaction[]>(_url);
  }

  setIntList(intList: any[]) {
    this.interactionList = intList;
  }

  getIntList() {
    return this.interactionList;
  }

  // interaction section CRUD

  addNewInteraction(interaction: any) {
    const _url = "http://localhost:50596/interaction/addInt";
    
    let _data = {};

    _data["ClientId"] = interaction["clientId"];
    _data["EmpId"] = interaction["empId"];
    _data["IntType"] = interaction["intType"];
    _data["IntDate"] = interaction["intDate"];
    _data["Remarks"] = interaction["remarks"];


    return this._http.post(_url, _data);
  }

  updateInteraction(interaction: any) {
    const _url = "http://localhost:50596/interaction/updateInt";
    let _data = {};

    _data["Id"] = interaction["id"];
    _data["ClientId"] = interaction["clientId"];
    _data["EmpId"] = interaction["empId"];
    _data["IntType"] = interaction["intType"];
    _data["IntDate"] = interaction["intDate"];
    _data["Remarks"] = interaction["remarks"];
    return this._http.post(_url, _data);
  }

  deleteInteraction(id: number) {
    const _url = `http://localhost:50596/interaction/deleteInt/${id}`;
    return this._http.get(_url);
  }

  // set info included -> select: "Client" or "Employee", id: 
  setIntDialogInfo(int_info: any) {
    this.int_dialog_info = int_info;
  }

  getIntDialogInfo() {
    return this.int_dialog_info;
  }

  getIntByInfo(info: any) {
    let select_role = info["select"];
    let _id = info["id"];

    if(select_role == "Client") {
      this.getIntByClientId(_id).subscribe(
        data => {
          console.log("send back int list");
          console.log(data);
          this.setIntList(data);
          console.log("update Int by ClientId");
          
        }
      )

    } else if(select_role == "Employee") {
      this.getIntByEmpId(_id).subscribe(
        data => {
          console.log("send back int list");
          console.log(data);
          this.setIntList(data);
          console.log("update Int by EmpId");
        })
    } else {
      alert("no Client or Employee select");
    }
    setTimeout(()=> {
      console.log("int list after updating")
      this.interactionList = this.getIntList();
    }, 1000);
    
  }






}
