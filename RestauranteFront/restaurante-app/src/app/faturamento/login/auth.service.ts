import { UsuarioModel } from './model/usuario.model';
import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class AuthService {

  private usuarioAutenticado: boolean = false;

  constructor() { }

  fazerLogin(usuario: UsuarioModel){

    if (usuario.nome === 'isabel' && 
      usuario.senha === 'admin') {

      this.usuarioAutenticado = true;

    } else {
      this.usuarioAutenticado = false;

    }
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

}
