import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from './user-page.model';
import { ApiService } from 'src/app/login/shared/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { AuthService } from './auth.service';
import * as xlsx from 'xlsx';

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
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  formGroup: any;
  users: any;
  test: SubmittedFormData[];
  state: any = [];
  city: any = [];
  employeemodel: EmployeeModel = new EmployeeModel();
  employeeData: any;
  displayColumns = [
    'Name',
    'Address',
    'State',
    'District',
    'City',
    'Pincode',
    'skills',
  ];
  @ViewChild('paginator') paginator: MatPaginator;
  dataSource = new MatTableDataSource<EmployeeModel>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  constructor(private api: ApiService, private auth: AuthService) {
    this.formGroup = new FormGroup({
      Name: new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required),
      State: new FormControl('', Validators.required),
      District: new FormControl('', Validators.required),
      // City: new FormControl('', Validators.required),
      Pincode: new FormControl('', Validators.required),
      skills: new FormArray([new FormControl('', Validators.required)]),
    });
  }

  ngOnInit(): void {
    this.users = history.state;
    console.log(this.users);
    this.getAllemployee();
    this.state = this.auth.state();
    console.log(this.state);
    this.dataSource.sort = this.sort;
  }

  onSelectChange(state) {
    console.log(state);

    // console.log(this.city);
  }
  submitregistration(): void {
    if (this.formGroup.status === 'VALID') {
      console.log(this.formGroup.value);
      this.test = this.formGroup.value;
      console.log(this.test);
    }
  }
  // getValues(event) {
  //   console.log(event);
  //   this.complete = true;
  // }
  postDetails() {
    this.employeemodel.Name = this.formGroup.value.Name;
    this.employeemodel.Address = this.formGroup.value.Address;
    this.employeemodel.State = this.formGroup.value.State;
    this.employeemodel.District = this.formGroup.value.District;
    // this.employeemodel.City = this.formGroup.value.City;
    this.employeemodel.Pincode = this.formGroup.value.Pincode;
    this.employeemodel.skills = this.formGroup.value.skills;
    console.log(this.employeemodel);
    this.api.postCustomer(this.employeemodel).subscribe((resp) => {
      console.log(resp);
      this.getAllemployee();
    });
  }
  getAllemployee() {
    this.api.getCustomer().subscribe((resp) => {
      this.employeeData = resp;
      console.log(this.employeeData);
      this.dataSource = new MatTableDataSource(this.employeeData);

      // console.log(this.dataSource);
      // console.log(this.sort);
      this.dataSource.sort = this.sort;
      const sortState: Sort = { active: 'Name', direction: 'asc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
      this.dataSource.paginator = this.paginator;
    });
  }
  // delete(groupRow) {
  //   this.dataSource.data = this.dataSource.data.filter((i) => i !== groupRow);
  //   console.log(this.dataSource);
  // }
  // onEdit(row: any) {
  //   this.employeemodel.id = row.id;
  //   this.formGroup.controls['Name'].setValue(row.Name);
  //   this.formGroup.controls['Address'].setValue(row.Address);
  //   this.formGroup.controls['State'].setValue(row.State);
  //   this.formGroup.controls['District'].setValue(row.District);
  //   this.formGroup.controls['City'].setValue(row.City);
  //   this.formGroup.controls['Pincode'].setValue(row.Pincode);
  //   this.formGroup.controls['skills'].setValue(row.skills);
  //   console.log(this.formGroup);
  // }
  // updateEmployeeDetails() {
  //   this.employeemodel.Name = this.formGroup.value.Name;
  //   this.employeemodel.Address = this.formGroup.value.Address;
  //   this.employeemodel.State = this.formGroup.value.State;
  //   this.employeemodel.District = this.formGroup.value.District;
  //   this.employeemodel.City = this.formGroup.value.City;
  //   this.employeemodel.Pincode = this.formGroup.value.Pincode;
  //   this.employeemodel.skills = this.formGroup.value.skills;
  //   this.api
  //     .updateEmployee(this.employeeData, this.employeeData.id)
  //     .subscribe((resp) => {
  //       resp = this.employeeData;
  //       this.formGroup.reset();
  //       this.getAllemployee();
  //     });
  // }
  delete(employeeData) {
    this.api.deleteCustomer(employeeData.Id).subscribe((res) => {
      alert('employee deleted');
      this.getAllemployee();
    });
  }

  addSkills() {
    (<FormArray>this.formGroup.get('skills')).push(
      new FormControl('', Validators.required)
    );
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
  exportExcel() {
    console.log(this.epltable);
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(
      this.epltable.nativeElement
    );
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }
}
