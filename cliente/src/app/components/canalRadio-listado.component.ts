import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { ServicioUsuario } from  '../services/servicio.usuario';

import { ServicioCanalRadio } from  '../services/servicio.canalRadio';
import { CanalRadio } from '../models/canalRadio';
import { MyFilterPipe } from '../pipes/filtroCanales.pipe';

@Component({
	selector: 'canalRadio-listado',
	templateUrl: '../views/canalRadio-listado.html',

	providers: [ServicioUsuario,ServicioCanalRadio]
})

export class CanalRadioListadoComponent implements OnInit{
	public titulo: string;
	public canalesRadio: CanalRadio[];
	public identity;
	public token;
	public url: string;
	public pag_sig;
	public pag_ant;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		
		private _servicioUsuario: ServicioUsuario,
		private _servicioCanalRadio: ServicioCanalRadio,

	){
		this.titulo = 'Canales de Radio';
		this.identity = this._servicioUsuario.getIdentity();
    	this.token = this._servicioUsuario.getToken();
		this.url = GLOBAL.url;
		this.pag_sig = 1;
		this.pag_ant = 1;
	}

	ngOnInit(){
		console.log('canalRadio-listado.component.ts cargado');
		this.url = GLOBAL.url;

		//  el listado de Canales de Radio
	    this.dameCanalesRadio();
	}

	dameCanalesRadio(){
		this._route.params.forEach((params: Params) =>{
				let page = +params['page'];
				if(!page){
					page = 1;
				}else{
					this.pag_sig = page+1;
					this.pag_ant = page-1;

					if(this.pag_ant == 0){
						this.pag_ant = 1;
					}
				}

				this._servicioCanalRadio.dameCanalesRadio(this.token, page).subscribe(
					response => {
						if(!response.canales){
							this._router.navigate(['/']);
						}else{
							this.canalesRadio = response.canales;
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

	public confirmado;
	siConfirmarBorrado(id){
		this.confirmado = id;
	}

	siCancelarCanalRadio(){
		this.confirmado = null;
	}

	siBorrarCanalRadio(id){
		this._servicioCanalRadio.eliminarCanalRadio(this.token, id).subscribe(
			response => {
				if(!response.canal){
					alert('Error en el servidor al intentar borrar el canal');
				}
				this.dameCanalesRadio();
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
	}



}