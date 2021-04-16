import { Router } from '@angular/router';
import { UsuarioModel } from './model/usuario.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = {} as UsuarioModel; 

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  fazerLogin(){
    this.authService.fazerLogin(this.usuario)
    if(this.authService.usuarioEstaAutenticado() == true){
      this.router.navigate(['faturamento']);
     }else {
       alert("Credenciais Invalidas");
     }
}
}
