import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  private readonly authService = inject(AuthService) // inject() = f° d'Angular pr injecter des dépendances
  form: FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    })
  }

  onSubmitForm() {
    if(this.form.valid){
      const { username, password } =  this.form.value
      this.authService.login(username,password)
    }
  }
}
