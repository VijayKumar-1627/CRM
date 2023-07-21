import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../login/shared/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as xlsx from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-crud-app',
  templateUrl: './crud-app.component.html',
  styleUrls: ['./crud-app.component.css'],
})
export class CrudAppComponent implements OnInit {
  displayColumns = [
    'Name',
    'Address',
    'State',
    'District',
    'Pincode',
    'Phone',
    'skills',
    'Action',
  ];
  dataSource: MatTableDataSource<any>;
  hideaction:boolean =true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  @ViewChild('eptable', { static: false }) eptable: ElementRef;
  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getCustomersDetails();
  }
  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          this.getCustomersDetails();
        }
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getCustomersDetails() {
    this.api.getCustomer().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: 'Name', direction: 'asc' };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        alert('error in get');
      },
    });
  }
  editCustomersDetails(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'update') {
          this.getCustomersDetails();
        }
      });
  }
  deleteCustomersDetails(id: number) {
    this.api.deleteCustomer(id).subscribe({
      next: (res) => {
        alert('Deleted Successfully');
        this.getCustomersDetails();
      },
      error: () => {
        alert('Not Deleted');
      },
    });
  }
  exportExcel() {
    this. hideaction =false;
   
    console.log( this.epltable.nativeElement);
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(
      this.epltable.nativeElement
    );
    ws['!cols'] = [];
    ws['!cols'][8] = { hidden: true };
    delete (ws['H']);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Customertable.xlsx');
  }
  exportPdf(row : any) {
    //It is for pdf with pagination
  //   let pdf = new jsPDF('l','pt','a2');
  //   pdf.html(this.eptable.nativeElement,{
  //     callback:(pdf) =>  {
  //       pdf.save("CustomerDetails.pdf");

  //     },
  //   })

  let pdf = new jsPDF();

  pdf.rect(5, 12, 80, 80);


  pdf.text('Customer Details :',10,10);
  pdf.setTextColor(255, 0, 0);
  pdf.text(`Name: ${row.Name}`,10,20);
  pdf.text(`Address: ${row.Address}`,10,30);
  pdf.text(`State: ${row.State}`,10,40);
  pdf.text(`District: ${row.District}`,10,50);
  pdf.text(`Pincode: ${row.Pincode}`,10,60);
  pdf.text(`Phone: ${row.Phone}`,10,70);
  pdf.text(`Skills: ${row.skills}`,10,80);
  pdf.save('CustomersDetails.pdf');
  

   }  

}

