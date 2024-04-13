import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { empVM } from '../Models/employee';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }
  createDb(){
    let employees : empVM[] = [
    {id:1, department:'Account', empName:'Hasan', mobile:'032132324', gender:'Male', joinDate:'12-4-2023', email:'hasan@email.com', salary:400000, password:'123456', empStatus:true},
    {id:2, department:'Manager', empName:'asad', mobile:'0321432324', gender:'Male', joinDate:'13-4-2023', email:'asad@email.com', salary:500000, password:'123456', empStatus:true},
    {id:3, department:'Administator', empName:'Ali', mobile:'0321352324', gender:'Male', joinDate:'15-4-2023', email:'ali@email.com', salary:200000, password:'123456', empStatus:false},
  ]
  return {employees};
  }
}
