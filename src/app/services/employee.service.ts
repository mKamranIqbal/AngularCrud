import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empVM } from '../../Models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private API_BASE_PATH : string = 'http://localhost:4200/api/';
  constructor(private _hc:HttpClient) { }

  getAllEmployees(){
   return this._hc.get(this.API_BASE_PATH+"employees");
  }

  getEmployee(empId: number)
  {
   return this._hc.get(`${this.API_BASE_PATH}employees/${empId}`);
  }

  addEmployee(empObj : empVM){
    return this._hc.post(`${this.API_BASE_PATH}employees/`, empObj);
  }

  updateEmployee(empObj : empVM){
    return this._hc.put(`${this.API_BASE_PATH}employees/${empObj.id}`, empObj);
  }
 
  EditEmployee(empId: number)
  {
   return this._hc.get(`${this.API_BASE_PATH}employees/${empId}`);
  }

  DeleteEmployee(empId: number)
  {
   return this._hc.delete(`${this.API_BASE_PATH}employees/${empId}`);
  }

}
