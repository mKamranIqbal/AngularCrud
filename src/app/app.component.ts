import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './services/employee.service';
import { empVM } from '../Models/employee';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { validateHeaderValue } from 'http';
import { DBOpreation } from '../Helpers/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HR-Management';
  btnText : string = "Save";
  employeeForm : FormGroup = new FormGroup({});
  employees : empVM[] = [];
  operation : DBOpreation | undefined;

  constructor(private _fb:FormBuilder, private _empService: EmployeeService, private _toastr : ToastrService ){}

  ngOnInit(){
    this.SetEmpForm();
    this.allEmployees();
  }

  SetEmpForm(){
    this.btnText = "Save";
    this.operation = DBOpreation.create;
    this.employeeForm = this._fb.group({ 
      id: [0],
      department:['', Validators.required],
      empName:['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      mobile:['', Validators.required],
      gender:['', Validators.required],
      joinDate:['', Validators.required],
      email:['',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]],
      salary:['', Validators.required],
      password:['', Validators.required],
      confirmPass:['', Validators.required],
      empStatus:[false, Validators.requiredTrue]
    })
  }

formSubmit(){
  console.log(this.employeeForm.value)
  if(this.employeeForm.invalid)
  {
    return;
  }

  switch(this.operation)
  {
    case DBOpreation.create:
    this._empService.addEmployee(this.employeeForm.value).subscribe(res => {
      this._toastr.success("Employee added successfully","Employee Registration");
      this.allEmployees();
      this.resetBtn();
    });
    break;

    case DBOpreation.update:
      this._empService.updateEmployee(this.employeeForm.value).subscribe(res => {
        this._toastr.success("Employee updated successfully","Employee Registration");
        this.allEmployees();
        this.resetBtn();
      });
    break;

  }

}

get f(){
  return this.employeeForm.controls;
}

resetBtn(){
  this.employeeForm.reset();
  this.btnText = "Save";
}
cancelBtn(){
  this.employeeForm.reset();
  this.btnText = "Save";
}

allEmployees(){
  this._empService.getAllEmployees().subscribe((response: any) => {
    this.employees = response;
  })
}

Edit(empId: number){
  this.btnText = "Update";
  this.operation = DBOpreation.update;
  let empData = this.employees.find((e: empVM)=> e.id === empId);
  if(empData !== undefined){
    this.employeeForm.patchValue(empData);
  }
  
}

Delete(empId: number)
{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result: any) => {
    if (result.isConfirmed) {
      this._empService.DeleteEmployee(empId).subscribe(res =>{
        this.allEmployees();
        this._toastr.success("Employee Deleted successfully!","Employee Registration")
      });
      // swalWithBootstrapButtons.fire({
      //   title: "Deleted!",
      //   text: "Your file has been deleted.",
      //   icon: "success"
      // });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });

}

}
