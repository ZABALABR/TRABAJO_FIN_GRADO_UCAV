import { Component } from '@angular/core';
import { Usuario } from './models/usuario';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
  
})
export class AppComponent {
  public title = 'PODCAST RADIO';
  public usuario: Usuario;
  public identity = false;     //propiedad para comprobar los datos del usuario logueado , y lo vamos a guardar en el local storage.
  public token; //tb lo vamos a guardar en el local storage

  constructor(){
  	this.usuario = new Usuario('','','','','','ROLE_USER','');
    //this.usuario_registrado = new Usuario('','','','','',ROLE_USER','');
    //this.url = GLOBAL.url;
  }

}
