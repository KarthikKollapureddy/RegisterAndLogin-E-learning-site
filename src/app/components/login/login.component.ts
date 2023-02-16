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

  constructor(private service:LoginAndRegisterService,private router:Router,private snackBar: MatSnackBar) { 
    
  }


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
        email:new FormControl(this.userLogin.userName,[
          Validators.email,
          Validators.required
        ]),
        password:new FormControl(this.userLogin.pass,[
          Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@$%^&)(}{][:;<>,.?/~_+-=|]).{8,15}$')

        ])
      }
    )
    
    this.form1 = new FormGroup({
      fname : new FormControl(this.userSignup.firstName,[
        Validators.minLength(4),
        Validators.maxLength(18),
        Validators.required
      ]),
      lname : new FormControl(this.userSignup.lastName,[
        Validators.minLength(4),
        Validators.maxLength(18),
        Validators.required
      ]),

      email : new FormControl(this.userSignup.userName,[
        Validators.email,
        Validators.required,
      ]),
      password : new FormControl(this.userSignup.pass,[
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@$%^&)(}{][:;<>,.?/~_+-=|]).{8,32}$')
      ]),

  })


  }

  roleStudent(){
    this.userSignup.role=3;
    console.log("role:"+3);
    
    
    
  }
  roleTrainer(){
    this.userSignup.role=2;
    console.log("role:"+2);
    

  }

  submitReg(){
    if(this.userSignup.role==-1){
      this.form1.reset();
      this.snackBar.open("Signup failed, choose a role and sign up again.","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition})
    }
    else{

    this.service.registerUser(this.userSignup).subscribe(
      data=>{
        
        
        console.table(data);
        this.snackBar.open("User registered sucesfully, You can now login.","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition})
        
        
      },
      error=>{

        let myJsonErr = JSON.parse(JSON.stringify(error))
        console.log(error);
        this.snackBar.open(error["error"],"X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition})

        
      }
    )
  }
}

  submitLogin(){
    this.service.loginUser(this.userLogin).subscribe(
      data=>{
        // let notFound = true
        // this.regUsers=data;
        // for(let i = 0;i<this.regUsers.length;i++){

        //   if(this.userLogin.userName==this.regUsers[i].userName && this.userLogin.pass==this.regUsers[i].pass){
        //     console.log("user logged in:" + this.regUsers[i]);
        //     notFound = false
        //     this.snackBar.open("login succesfull","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
        //       verticalPosition: this.verticalPosition,})
        //       // this.router.navigate(["path"])
        //   }
        //   if(notFound){
        //     this.snackBar.open("login error","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
        //       verticalPosition: this.verticalPosition,})
        //   }
          
        // }
        // console.log(data)
        let myJson = JSON.parse(JSON.stringify(data))
        console.log(data)
        console.log(myJson[0]["token"]);
        
        this.snackBar.open("login succesfull","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,})

      },
      error=>{
        console.log(error);
        this.snackBar.open(error["error"],"X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
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
