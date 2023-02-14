import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../model/LoginUser.model';
import { RegisterUser } from '../model/RegisterUser.model';

@Injectable({
  providedIn: 'root'
})
export class LoginAndRegisterService {

  constructor(private http:HttpClient) { }

  registerUser(user: RegisterUser){
    return this.http.post<RegisterUser>("http://localhost:8098/elearning/api/register",user);
  }
  loginUser(user: LoginUser){
    return this.http.post("http://localhost:8098/elearning/api/signup",user);
  }
}
