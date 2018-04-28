import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'inicio',
	templateUrl: '../views/inicio.html'
})

export class InicioComponent implements OnInit{
	public titulo: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router
	){
		this.titulo = 'Canales de Radio';
	}

	ngOnInit(){
		console.log('inicio.component.ts cargado');
	}

}