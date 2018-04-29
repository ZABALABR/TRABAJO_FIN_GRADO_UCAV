import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { ServicioUsuario } from  '../services/servicio.usuario';
import { ServicioCanalRadio } from  '../services/servicio.canalRadio';
import { CanalRadio } from '../models/canalRadio';










@Component({
	selector: 'canalRadio-detalle',
	templateUrl: '../views/canalRadio-detalle.html',
	providers: [ServicioUsuario, ServicioCanalRadio]
})

export class CanalRadioDetalleComponent implements OnInit{
	
	public canalRadio: CanalRadio;
	public identity;
	public token;
	public url: string;
	public alertMensaje;
	

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _servicioUsuario: ServicioUsuario,
		private _servicioCanalRadio: ServicioCanalRadio

		
		
		
	){
		
		this.identity = this._servicioUsuario.getIdentity();
		this.token = this._servicioUsuario.getToken();
		this.url = GLOBAL.url;
		
		
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

						//solicitamos los programas de este canal de radio.
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








}