import { Component, OnInit } from '@angular/core';

import { GLOBAL } from '../services/global';  //para poder acceder a la url
import { ServicioUsuario } from  '../services/servicio.usuario';
import { Usuario } from '../models/usuario';

@Component({
	selector: 'usuario-edicion',
	templateUrl: '../views/usuario-edicion.html',
	providers: [ServicioUsuario]
})

export class UsuarioEdicionComponent implements OnInit{
	public titulo: string;
	public usuario:Usuario;
	public identity;
	public token;
	public msgActualizar;
	public url:string;

	constructor(
		private _servicioUsuario:ServicioUsuario
	){
		this.titulo = 'Actualizar datos del usuario';
		//this.usuario = new Usuario('','','','','','ROLE_USER','');

		// recogemos del local storage los datos del usuario logado
		this.identity = this._servicioUsuario.getIdentity();
    	this.token = this._servicioUsuario.getToken();
    	this.usuario = this.identity;
    	this.url = GLOBAL.url;
	}

	ngOnInit(){
		console.log('usuario-edicion.component.ts cargado');
	}

	onSubmit(){
		//console.log(this.usuario);
		
		
		this._servicioUsuario.actualizaUsuario(this.usuario).subscribe(
			response => {
				if(!response.usuario){
					this.msgActualizar = 'No se ha actualizado el usuario';
				}else{
					//this.usuario = response.usuario;
					localStorage.setItem('identity', JSON.stringify(this.usuario));
					document.getElementById("nombre_de_usuario").innerHTML = this.usuario.nombre;

					if(!this.filesToUpload){
						// Redireccion
					}else{
						this.makeFileRequest(this.url+'subir-logo-usuario/'+this.usuario._id, [], this.filesToUpload).then(
							(result: any) => {

								this.usuario.imagen = result.fichero;
								localStorage.setItem('identity', JSON.stringify(this.usuario));
								console.log(this.usuario);
								let image_path = this.url+'obtener-logo-usuario/'+this.usuario.imagen;
								document.getElementById('logo-usuario').setAttribute('src', image_path);
							}
						);
					}

					this.msgActualizar = 'Usuario actualizado correctamente';	
				}
			},
	        error => {
	            var errorMessage = <any>error;

	            if(errorMessage != null){
	              var body = JSON.parse(error._body);
	              this.msgActualizar = body.message;

	              console.log(error);
	            }
	        }	
		);
	}


	public filesToUpload: Array<File>;

	fileChangeEvent(fileInput: any){
		//recogemos los archivos seleccionado en el input
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}

	makeFileRequest(url: string, params: Array<string>, files: Array<File>){
        //Recogemos el token ya que el  metodo de subida necesita autentificación 
		var token = this.token;

		return new Promise(function(resolve, reject){

			//para simular el comportamiento de un formulario normal
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++){
				formData.append('fichero', files[i], files[i].name);
			}
            //aqui recogemos la respuesta del servidor
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
					
				}
			}
            //aqui hacemos una peticion ajax para subir los ficheros
			xhr.open('POST', url, true);
			xhr.setRequestHeader('Authorization', token);
			xhr.send(formData);
		});

	}

}