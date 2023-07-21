import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import data from "employeeDetails.json"
import { ApiService } from '../login/shared/api.service';
import { AuthService } from '../user-page/user-page/auth.service';
import { EmployeeModel } from '../user-page/user-page/user-page.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface SubmittedFormData {
  id: string;
  Name: String;
  Address: String;
  State: String;
  District: String;
  City: String;
  Pincode: Number;
  skills: String[];
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  formGroup: any;
  users: any;
  test: SubmittedFormData[];
  state: any = [];
  city: any = [];
  pincode: any = [];
  actionButton: string = 'Save';
  skillsArray: any = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  dist: any;
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    this.formGroup = new FormGroup({
      Name: new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required),
      State: new FormControl('', Validators.required),
      District: new FormControl('', Validators.required),
      // City: new FormControl('', Validators.required),
      Pincode: new FormControl('', Validators.required),
      Phone: new FormControl('',Validators.required),
      skills: new FormArray([new FormControl('', Validators.required)]),
    });
  }

  ngOnInit(): void {
    this.users = history.state;
    this.state = this.auth.state();
    // this.pincode = this.auth.pincode();
    console.log(this.state);
    if (this.editData) {
      console.log('editdata:', this.editData);
      this.actionButton = 'Update';
      this.formGroup.controls['Name'].setValue(this.editData.Name);
      this.formGroup.controls['Address'].setValue(this.editData.Address);
      this.formGroup.controls['Phone'].setValue(this.editData.Phone);
      this.formGroup.controls['State'].setValue(this.editData.State);
      let districtList = this.state.filter(
        (e) => e.name == this.editData.State
      );
      this.city = districtList[0].district;
      this.formGroup.controls['District'].setValue(this.editData.District);
      // this.formGroup.controls['City'].setValue(this.editData.City);
      this.formGroup.controls['Pincode'].setValue(this.editData.Pincode);
      console.log('editskills:', this.editData.skills);
      this.formGroup.controls['Phone'].setValue(this.editData.Phone);
      console.log('phone number:' , this.formGroup.controls['Phone'].value);
      this.formGroup.controls['skills'].setValue(this.editData.skills);
      console.log('e', this.formGroup.controls['skills']);

      console.log(this.editData.Pincode);
      console.log(this.city);
    }
  }

  onSelectChange(state) {
    console.log(state);
    let districtList = this.state.filter((e) => e.name == state);
    // console.log(districtList[0].district);
    // this.city = districtList[0].district;
    let cityList = [];
    for (var i = 0; i < districtList.length; i++) {
      console.log(districtList[i].district);
      let ds = districtList[i].district;
      for (var j = 0; j < ds.length; j++) {
        cityList.push(ds[j]);
      }
    }
    console.log(cityList);
    this.city = cityList;
  }
  onSelectChangeDistrict(city) {
    let cityList = this.city.filter((e) => e.name == city);
    console.log(cityList);
    console.log(cityList[0]);
    console.log(cityList[0].city[0].pincode);
    this.formGroup.controls['Pincode'].setValue(cityList[0].city[0].pincode);
  }
  submitregistration(): void {
    if (this.formGroup.status === 'VALID') {
      console.log(this.formGroup.value);
      this.test = this.formGroup.value;
      console.log(this.test);
    }
  }
  onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
  
    // Remove any non-numeric characters from the input value using regex
    const numericValue = inputValue.replace(/\D/g, '');
  
    // Set the modified numeric value back to the input element
    input.value = numericValue;
  }
  addSkills() {
    (<FormArray>this.formGroup.get('skills')).push(
      new FormControl('', Validators.required)
    );
    console.log(this.formGroup.get('skills'));
  }
  keyDown(e) {
    const keyCode = e.keyCode;
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105) &&
      e.keyCode != 8
    ) {
      e.preventDefault();
    }
  }
  postCustomersDetails() {
    const customers = data.CustomersDetails;
    console.log(this.formGroup.value);
    console.log(this.formGroup.value.Phone);
    let DuplicateCustomer = customers.find(DuplicateCustomerPhoneNumber => DuplicateCustomerPhoneNumber.Phone ===this.formGroup.value.Phone)
    console.log(DuplicateCustomer)
     if(DuplicateCustomer){
    alert("Customer Details Already Exist");
    }else{
    if (!this.editData) {
      if (this.formGroup.valid) {
        this.api.postCustomer(this.formGroup.value).subscribe({
          next: (res) => {
            alert('Customer Details Added Successfully');
            this.formGroup.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Customer Details is not added');
          },
        });
      }
    } 
     }
  }
  updateCustomer() {
    console.log("in");
    this.api.updateCustomer(this.formGroup.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Customer Detail Is Updated');
        console.log(this.formGroup.value);
        this.formGroup.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert('error in update');
      },
    });
  }
}

