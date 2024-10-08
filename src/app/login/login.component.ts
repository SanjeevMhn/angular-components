import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  router = inject(Router);
  fb = inject(FormBuilder);
  submitBtnPressed:boolean = false;
  loginForm:FormGroup = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(6)]]
  });
  
  login(){
    this.submitBtnPressed = true;
    if(this.loginForm.invalid){
      return;
    }
    this.router.navigate(['home']);
  }

  errMsg(control:string, errors: any):string{
    let message:string = '';
    Object.keys(errors).map(key => {
      if(key == 'required'){
        message = `${control} is required`
      }

      if(key == 'email'){
        message = `${control} is not a valid`
      }

      if(key == 'minlength'){
        message = `${control} needs to be ${errors.minlength.requiredLength} characters long`
      }
    })

    return message;
  }
}
