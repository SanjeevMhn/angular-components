import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {
  dialog = inject(MatDialog);

  openMultiFormDialog() {
    this.dialog.open(MultiColumnForm, {
      width: '900px',
      maxWidth: '100%'
    })
  }

  openRegisterDialog() {
    this.dialog.open(RegisterForm, {
      width: '800px'
    })
  }

  openLoginDialog() {
    this.dialog.open(LoginForm, {
      width: '800px'
    })
  }
}

@Component({
  selector: 'multi-column-form',
  templateUrl: 'multi-column-form.html',
  styleUrl: './forms.component.scss',
  standalone: true,
})
export class MultiColumnForm {

}

@Component({
  selector: 'register-form',
  templateUrl: 'register-form.html',
  styleUrl: './forms.component.scss',
  standalone: true,
})
export class RegisterForm {

}

@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html',
  styleUrl: './forms.component.scss',
  standalone: true,
})
export class LoginForm {

}
