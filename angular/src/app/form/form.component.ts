import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{9}")]],
        email: ['', [Validators.required, Validators.email]]
    });
}
    
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }
        let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        headers = headers.set('Access-Control-Allow-Origin', '*')
        headers = headers.set('header-name-2', 'header-value-2');
    
        this.http.post(`http://localhost:1337/api/v1/posts/`, JSON.stringify(this.registerForm.value), { headers: headers },).subscribe(res => {
          this.router.navigate(['/']);
        })
      
    }
}
