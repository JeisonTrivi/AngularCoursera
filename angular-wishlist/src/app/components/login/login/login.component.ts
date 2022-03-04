import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mensajeError: string;
  constructor(public authService: AuthService) {
    this.mensajeError = '';
  }

  ngOnInit(): void {
  }

  login(username: string, password: string): boolean {
    this.mensajeError = '';
    if (!this.authService.login(username, password)) { //Un login sincrónico
      this.mensajeError = 'Login incorrecto!';
      setTimeout(() => {
        this.mensajeError = '';
      }, 2500); //Después de 2 segundos y medio se limpia el mensaje de error
    }
    return false;//funcion con click se deja asi.
  }

  logout(): boolean {
    this.authService.logout();
    return false;
  }
}
