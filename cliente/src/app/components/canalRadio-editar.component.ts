import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';

import { ServicioUsuario } from  '../services/servicio.usuario';
import { ServicioCanalRadio } from  '../services/servicio.canalRadio';

import { CanalRadio } from '../models/canalRadio';



import { ServicioSubirFichero } from '../services/servicio.subirFichero';


@Component({
	selector: 'canalRadio-editar',
	templateUrl: '../views/canalRadio-crear.html',
	providers: [ServicioUsuario, ServicioCanalRadio,ServicioSubirFichero]
})

export class CanalRadioEditarComponent implements OnInit{
	public titulo: string;
	public canalRadio: CanalRadio;
	public identity;
	public token;
	public url: string;
	public alertMensaje;
	public editada;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _servicioUsuario: ServicioUsuario,
		private _servicioCanalRadio: ServicioCanalRadio,

		
		private _servicioSubirFichero: ServicioSubirFichero,
		
	){
		this.titulo = 'Modificar canal de Radio';
		this.identity = this._servicioUsuario.getIdentity();
		this.token = this._servicioUsuario.getToken();
		this.url = GLOBAL.url;
		this.canalRadio = new CanalRadio('','','');
		this.editada = true;
	}

	ngOnInit(){
		console.log('canalRadio-editar.component.ts cargado');

		// Llamar al metodo del api para sacar un canal de Radio en base a su id getCanalRadio
		this.dameCanalRadio();
	}

	dameCanalRadio(){
		//llama al metodo del servicio, este a su vez llama al metodo de la api y esta ya interactua con la bd.

		//recogemos el id que nos llega por parámetros en la url
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
              
			this._servicioCanalRadio.dameCanalRadio(this.token, id).subscribe(
				response => {
					if(!response.canal){
						this._router.navigate(['/']);
					}else{
						this.canalRadio = response.canal;
					}
				},
				error => {
					var errorMessage = <any>error;

			        if(errorMessage != null){
			          var body = JSON.parse(error._body);
			          //this.alertMessage = body.message;

			          console.log(error);
			        }
				}	
			);

		});
	}

	onSubmit(){
		console.log(this.canalRadio);
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._servicioCanalRadio.actualizarCanalRadio(this.token, id, this.canalRadio).subscribe(
				response => {
					
					if(!response.canal){
						this.alertMensaje = 'Error en el servidor';
					}else{
						this.alertMensaje = '¡Canal de Radio actualizado correctamente!';

						
						if(!this.ficherosASubir){
							this._router.navigate(['/canalesRadio', response.canal._id ]);
						}else{
							//Subir el fichero con logotipo/imagen del canal de radio
							//alert('imagen subida' + this.ficherosASubir);
							this._servicioSubirFichero.makeFileRequest(this.url+'subir-fichero-canal/'+id, [], this.ficherosASubir, this.token, 'image')
								.then(

									(result) => {
										//alert('imagen subida' + this.canalRadio.imagen);
										this._router.navigate(['/canalesRadio', response.canal._id]);
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




/*

onSubmit(){
		
		console.log(this.canalRadio);

		
		this._servicioCanalRadio.crearCanalRadio(this.token, this.canalRadio).subscribe(
			response => {
				
				if(!response.canal){
					this.alertMensaje = 'Error en el servidor';
					//alert('Error en el servidor');
				}else{
					this.alertMensaje = '¡Creado canal de Radio correctamente!';
					this.canalRadio = response.canal;
					//this._router.navigate(['/editar-canalRadio', response.canalRadio._id]);
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
	 	
	}

*/

	public ficherosASubir: Array<File>;
	fileChangeEvent(fileInput: any){
		this.ficherosASubir = <Array<File>>fileInput.target.files;
	}

}