import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';

import { ServicioUsuario } from  '../services/servicio.usuario';
import { ServicioCanalRadio } from  '../services/servicio.canalRadio';
import { CanalRadio } from '../models/canalRadio';


import { ServicioPrograma } from '../services/servicio.programa';

import { Programa } from '../models/programa';

@Component({
	selector: 'programa-crear',
	templateUrl: '../views/programa-crear.html',
	providers: [ServicioUsuario, ServicioCanalRadio,ServicioPrograma]
})

export class ProgramaCrearComponent implements OnInit{
	public titulo: string;
	public canalRadio: CanalRadio;
	public programa: Programa;
	public identity;
	public token;
	public url: string;
	public alertMensaje;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
        private _servicioUsuario: ServicioUsuario,
		private _servicioCanalRadio: ServicioCanalRadio,
		private _servicioPrograma: ServicioPrograma

	){
		this.titulo = 'Crear nuevo programa de radio';
		this.identity = this._servicioUsuario.getIdentity();
		this.token = this._servicioUsuario.getToken();
		this.url = GLOBAL.url;
		this.programa = new Programa('', '', 2018, '', '');

	}

	ngOnInit(){
		console.log('programa-crear.component.ts cargado');
	}

	onSubmit(){
		console.log(this.programa);
		
		this._route.params.forEach((params: Params) => {
			//recogemos de la url el parametro canalRadio que tienen el id del canal de radio, el nombre del parametro es el que esta definido en el app.routing para el path {path: 'crear-programa/:canalRadio', component: ProgramaCrearComponent},
			let canalRadio_id = params['canalRadio'];
			this.programa.canalradio = canalRadio_id;
            console.log(this.programa);
            
			this._servicioPrograma.crearPrograma(this.token, this.programa).subscribe(
				response => {
					
					if(!response.programa){
						this.alertMensaje = 'Error en el servidor';
					}else{
						this.alertMensaje = '¡El programa se ha creado correctamente!';
						this.programa = response.programa;
						
						this._router.navigate(['/editar-programa', response.programa._id]);
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