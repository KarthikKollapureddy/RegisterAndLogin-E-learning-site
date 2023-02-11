import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from 'src/app/model/LoginUser.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  user = new LoginUser;
  form !: FormGroup;
  ngOnInit(): void {

    this.form = new FormGroup(
      {
        email:new FormControl(this.user.email,[
          Validators.email,
          Validators.required
        ]),
        password:new FormControl(this.user.password,[
          Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@$%^&)(}{][:;<>,.?/~_+-=|]).{8,15}$')

        ])
      }
    )

  }




  get email() { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }

}
