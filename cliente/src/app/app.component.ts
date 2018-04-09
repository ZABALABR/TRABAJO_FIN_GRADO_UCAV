import { Component, OnInit } from '@angular/core';
import { ServicioUsuario } from  './services/servicio.usuario';
import { Usuario } from './models/usuario';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ServicioUsuario]
  
})
export class AppComponent implements OnInit{
  public title = 'PODCAST RADIO';
  public usuario: Usuario;
  public usuario_reg: Usuario;
  public identity ;     //propiedad para comprobar los datos del usuario logueado , y lo vamos a guardar en el local storage.
  public registrar = true;
  public errorMessage;
  public token; //tb lo vamos a guardar en el local storage

  constructor(
    private _servicioUsuario:ServicioUsuario
    ){
  	this.usuario = new Usuario('','','','','','ROLE_USER','');
    this.usuario_reg = new Usuario('','','','','','ROLE_USER','');
    //this.url = GLOBAL.url;
  }

  ngOnInit(){
     this.identity = this._servicioUsuario.getIdentity();  //regemos datos del localStorage
    this.token = this._servicioUsuario.getToken();

    console.log(this.identity);
    console.log(this.token);
  }


  public onSubmit(){
    console.log(this.usuario);
    //datos del usuario identificado
    this._servicioUsuario.login(this.usuario).subscribe(
          response => {
               let identity = response.usuario;
               this.identity = identity; //usuario logueado que nos devuelve el API
               console.log(this.identity);
               if(!this.identity._id){
                          alert("No se ha podido identificar el usuario");
                      }else{
                          // Guardar en el localstorage para tener al usuario sesión
                          localStorage.setItem('identity', JSON.stringify(identity));

                          // Conseguir el token para enviarselo a cada petición http
                          this._servicioUsuario.login(this.usuario, 'true').subscribe(
                              response => {
                                  let token = response.token;
                                  this.token = token;

                                  if(this.token.length <= 0){
                                      alert("Error al generar el token");
                                  }else{
                                      // Guardar en el localstorage con el  token 
                                      localStorage.setItem('token', token);
                                      this.usuario = new Usuario('','','','','','ROLE_USER','');
                                  }
                              },
                              error => {
                                var errorMessage = <any>error;

                                if(errorMessage != null){
                                  var body = JSON.parse(error._body);
                                  this.errorMessage = body.message;

                                  console.log(error);
                                }
                              }
                            );


              }



          },
         error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;

          console.log(error);
          }
          }
      );
  }
  



  logout(){
    //eliminamos todo del localStorage
      
     localStorage.removeItem('identity');
     localStorage.removeItem('token');
     localStorage.clear();
     this.identity = null;
     this.token = null;
     //this._router.navigate(['/']);
  }

  registro(){

  if (this.registrar == null){
   this.registrar = false;
 }
        var element = document.getElementById("content");
        //var check = document.getElementById("reg");
console.log(this.registrar)
        if (this.registrar) {
            element.style.display='block';
        }
        else {
            element.style.display='none';
        }


   if (this.registrar){
      this.registrar = false;

    }else{
      this.registrar = true;  
    }



  }

  onSubmitRegister(){
    console.log(this.usuario_reg);
  }
}


