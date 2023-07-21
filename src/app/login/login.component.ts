import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('myForm') form: NgForm;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.form.value);
    if(this.form.value.email ==='admin@gmail.com'  && this.form.value.password === 'Relevantz'){
    this.router.navigateByUrl('/crud', { state: this.form.value });
    console.log(this.form);
    }
    
  }
}
