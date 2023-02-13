import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginUser } from 'src/app/model/LoginUser.model';
import { RegisterUser } from 'src/app/model/RegisterUser.model';
import { LoginAndRegisterService } from 'src/app/services/login-and-register.service';
import {MatSnackBar, MatSnackBarRef,MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:LoginAndRegisterService,private router:Router,private snackBar: MatSnackBar) { }


  userLogin = new LoginUser;
  userSignup = new RegisterUser;
  regUsers:RegisterUser[]=[]
  form !: FormGroup;
  form1 !: FormGroup;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
verticalPosition: MatSnackBarVerticalPosition = 'top';
  ngOnInit(): void {


    this.form = new FormGroup(
      {
        email:new FormControl(this.userLogin.email,[
          Validators.email,
          Validators.required
        ]),
        password:new FormControl(this.userLogin.password,[
          Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@$%^&)(}{][:;<>,.?/~_+-=|]).{8,15}$')

        ])
      }
    )
    
    this.form1 = new FormGroup({
      fname : new FormControl(this.userSignup.fname,[
        Validators.minLength(4),
        Validators.maxLength(18),
        Validators.required
      ]),
      lname : new FormControl(this.userSignup.lname,[
        Validators.minLength(4),
        Validators.maxLength(18),
        Validators.required
      ]),

      email : new FormControl(this.userSignup.email,[
        Validators.email,
        Validators.required,
      ]),
      password : new FormControl(this.userSignup.password,[
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@$%^&)(}{][:;<>,.?/~_+-=|]).{8,32}$')
      ]),

  })


  }

  roleStudent(){
    this.userSignup.role=3;
  }
  roleTrainer(){
    this.userSignup.role=2;
  }

  snackBarLogin(){
    if(this.form.valid){
      
      this.snackBar.open("user registerted you can now Log In","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition})
    }
    else{
      this.snackBar.open("err","X",{duration:this.durationInSeconds*1000})
    }
  }
  submitReg(){
    this.service.registerUser(this.userSignup).subscribe(
      data=>{
        console.table(data);
        
        
      },
      error=>{
        console.log(error);
        this.snackBar.open("error registering the user ","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition})

        
      }
    )
  }

  submitLogin(){
    this.service.loginUser().subscribe(
      data=>{
        this.regUsers=data;
        for(let i = 0;i<this.regUsers.length;i++){

          if(this.userLogin.email==this.regUsers[i].email && this.userLogin.password==this.regUsers[i].password){
              // this.router.navigate(["path"])
              console.log(this.regUsers[i]);
              
              this.snackBar.open("login succesfull","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,})
          }
        }
      },
      error=>{
        console.log(error);
        this.snackBar.open("login failed.","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,})
        
      }
      
    )

  }


  get email() { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }

  get fname() { return this.form1.get('fname')!; }
  get lname() { return this.form1.get('lname')!; }
  get regEmail() { return this.form1.get('email')!; }
  get regPassword() { return this.form1.get('password')!; }

}
