import { Component, OnInit } from '@angular/core';

import { GLOBAL } from '../services/global';
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
	public alertMessage;
	public url:string;

	constructor(
		private _servicioUsuario:ServicioUsuario
	){
		this.titulo = 'Actualizar datos del usuario';
		this.identity = this._servicioUsuario.getIdentity();
    	this.token = this._servicioUsuario.getToken();
    	this.usuario = this.identity;
    	this.url = GLOBAL.url;
	}

	ngOnInit(){
		console.log('usuario-edicion.component.ts cargado');
	}
/*
	onSubmit(){
		this._userService.updateUser(this.user).subscribe(
			response => {
				if(!response.user){
					this.alertMessage = 'El usuario no se ha actualizado';
				}else{
					//this.user = response.user;
					localStorage.setItem('identity', JSON.stringify(this.user));
					document.getElementById("identity_name").innerHTML = this.user.name;

					if(!this.filesToUpload){
						// Redireccion
					}else{
						this.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload).then(
							(result: any) => {

								this.user.image = result.image;
								localStorage.setItem('identity', JSON.stringify(this.user));

								let image_path = this.url+'get-image-user/'+this.user.image;
								document.getElementById('image-logged').setAttribute('src', image_path);
							}
						);
					}

					this.alertMessage = 'Datos actualizados correctamente';	
				}
			},
	        error => {
	            var errorMessage = <any>error;

	            if(errorMessage != null){
	              var body = JSON.parse(error._body);
	              this.alertMessage = body.message;

	              console.log(error);
	            }
	        }	
		);
	}

	public filesToUpload: Array<File>;

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	makeFileRequest(url: string, params: Array<string>, files: Array<File>){
		var token = this.token;

		return new Promise(function(resolve, reject){
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++){
				formData.append('image', files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
					
				}
			}

			xhr.open('POST', url, true);
			xhr.setRequestHeader('Authorization', token);
			xhr.send(formData);
		});

	}
*/
}