import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../model/RegisterUser.model';

@Injectable({
  providedIn: 'root'
})
export class LoginAndRegisterService {

  constructor(private http:HttpClient) { }

  registerUser(user: RegisterUser){
    return this.http.post<RegisterUser>("http://localhost:3000/user",user);
  }
  loginUser(){
    return this.http.get<RegisterUser[]>("http://localhost:3000/user");
  }
}
