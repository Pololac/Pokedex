import { Component, inject } from '@angular/core';
import { LoginFormComponent, LoginFormContent } from "../../components/login-form/login-form.component";
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginFormComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService) // inject() = f° d'Angular pr injecter des dépendances
  private readonly routeur = inject(Router) // inject° du routeur pour redirection

  errMsg?: string

  async onSubmitLogin (creds: LoginFormContent): Promise<void> {
    try {
      await this.authService.login(creds.username,creds.password)

      // redirection vers la page d'accueil
      this.routeur.navigateByUrl('/')
    }
    catch (e: unknown) {
      // this.errMsg = e as string      méthode rapide mais pas forcément sécure mais okay
      this.errMsg = typeof e === 'string' ? e : 'Une erreur est survenue'
    }
  }
}
