import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';


import { ServicioUsuario } from  '../services/servicio.usuario';

import { CanalRadio } from '../models/canalRadio';
import { ServicioPrograma } from '../services/servicio.programa';
import { Programa } from '../models/programa';
import { ServicioSubirFichero } from '../services/servicio.subirFichero';




@Component({
	selector: 'programa-editar',  // etiqueta donde se va a cargar este componente
	templateUrl: '../views/programa-crear.html',
	providers: [ServicioUsuario, ServicioPrograma,ServicioSubirFichero]
})

export class ProgramaEditarComponent implements OnInit{
	public titulo: string;
	public programa: Programa;
	public identity;
	public token;
	public url: string;
	public alertMensaje;
	public editable;


	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
        private _servicioUsuario: ServicioUsuario,
		
		private _servicioPrograma: ServicioPrograma,

		private _servicioSubirFichero: ServicioSubirFichero


	){
		this.titulo = 'Modificar programa';
		this.identity = this._servicioUsuario.getIdentity();
		this.token = this._servicioUsuario.getToken();
		this.url = GLOBAL.url;
		this.programa = new Programa('', '', 2018, '', '');
		this.editable = true;
	}

	ngOnInit(){
		console.log('programa-editar.component.ts cargado');

		// obtener los datos del programa de la base de datos
		this.damePrograma();
	}


	damePrograma(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._servicioPrograma.damePrograma(this.token, id).subscribe(
				response => {
					
					if(!response.programa){
						this._router.navigate(['/']);
					}else{
						this.programa = response.programa;
					}

				},
				error => {
					var errorMessage = <any>error;

			        if(errorMessage != null){
			          var body = JSON.parse(error._body);

			          console.log(error);
			        }
				}	
			);
		});
	}

	onSubmit(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._servicioPrograma.actualizarPrograma(this.token, id, this.programa).subscribe(
				response => {
					
					if(!response.programa){
						this.alertMensaje = 'Error en el servidor';
					}else{
						
						this.alertMensaje = '¡El programa se ha actualizado correctamente!';
						if(!this.ficherosASubir){
							// Redirigir
							this._router.navigate(['/canalRadio', response.programa.canalradio]);
						}else{
							
							this._servicioSubirFichero.makeFileRequest(this.url+'programa/logotipo/subir/'+id, [], this.ficherosASubir, this.token, 'logotipo')
								.then(
									(result) => {
										this._router.navigate(['/canalRadio', response.programa.canalradio]);
									},
									(error) => {
										console.log(error);
									}
								);
						}
						
					}

				},
				error => {
					var errorMessage = <any>error;

			        if(errorMessage != null){
			          var body = JSON.parse(error._body);
			          this.alertMensaje = body.message;

			          console.log(error);
			        }
				}	
			);
		});
	}

	public ficherosASubir: Array<File>;
	fileChangeEvent(fileInput: any){
		this.ficherosASubir = <Array<File>>fileInput.target.files;
	}

}