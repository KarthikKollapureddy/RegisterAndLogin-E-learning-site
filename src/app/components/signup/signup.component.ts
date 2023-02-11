import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterUser } from 'src/app/model/RegisterUser.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }
  form !: FormGroup;
  user = new RegisterUser;
  ngOnInit(): void {
    this.form = new FormGroup({
      name : new FormControl(this.user.name,[
        Validators.minLength(4),
        Validators.maxLength(18),
        Validators.required
      ]),

      email : new FormControl(this.user.email,[
        Validators.email,
        Validators.required,
      ]),
      password : new FormControl(this.user.password,[
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@$%^&)(}{][:;<>,.?/~_+-=|]).{8,32}$')
      ]),

  })
  }


  get name() { return this.form.get('name')!; }
  get email() { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }
}
