import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import empDetails from "employeeDetails.json"

interface Employee {
  Name: string,
      Address: string,
      State: string,
      District: string,
      Pincode: number,
      skills: [],
      id:number
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-submitted-form',
  templateUrl: './submitted-form.component.html',
  styleUrls: ['./submitted-form.component.css'],
})
export class SubmittedFormComponent implements OnInit {
  popup = false;
  constructor(private dailog: MatDialog) {}
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  ngOnInit(): void {}

  employees : any = empDetails;
  public employeeItems = this.employees;
  public pageSlice = this.employeeItems.slice(0, 3);
  searchText: any;
  @Input() submit: any;
  @Output() myOutput: EventEmitter<string> = new EventEmitter();
  outputMessage: string = 'submit';
  hobbiesArray = new FormArray([new FormControl('', Validators.required)]);

  clickedButton() {
    this.myOutput.emit(this.submit);
    // console.log(this.myOutput);
    // console.log(this.outputMessage);
  }

  onPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.employeeItems.length) {
      console.log(this.employeeItems);
      endIndex = this.employeeItems.length;
      console.log(endIndex);
    }
    this.pageSlice = this.employeeItems.slice(startIndex, endIndex);
  }
  addInputControl() {
    this.hobbiesArray.push(new FormControl('', Validators.required));
  }
  removeInputControl(idx: number) {
    this.hobbiesArray.removeAt(idx);
  }
}
