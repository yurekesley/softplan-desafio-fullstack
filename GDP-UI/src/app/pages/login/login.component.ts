import { MessegesService } from './../../core/messeges/messages.service';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private messegesService: MessegesService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router  ) { }

  user: User = new User();
  loginForm: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  public isFieldValid (field): boolean {
       return (
         this.loginForm.get(field).touched
         && this.loginForm.get(field).status === 'INVALID');
  }

  public login() {

    const login = this.loginForm.get('login').value;
    const password = this.loginForm.get('password').value;

    if (this.loginForm.valid) {
      this.loginService.authenticate(login, password).subscribe(
        () => this.router.navigate(['/']),
        error => {
          this.messegesService.error('login failed');
          console.log(error);
        }
      );
    }
  }

}
