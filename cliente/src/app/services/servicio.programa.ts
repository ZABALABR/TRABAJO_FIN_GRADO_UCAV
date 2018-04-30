import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Programa } from '../models/programa';

@Injectable()
export class ServicioPrograma{
	public url: string;

	constructor(private _http: Http){
		this.url = GLOBAL.url;
	}


	crearPrograma(token, programa: Programa){
		//el objeto programa recibido por parametro es el que enviamos al API para guardar el programa en bd
		let params = JSON.stringify(programa);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.post(this.url+'programa', params, {headers: headers})
						 .map(res => res.json());
	}


	damePrograma(token, id: string){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options = new RequestOptions({headers:headers});
		return this._http.get(this.url+'programa/'+id, options)
						 .map(res => res.json());
	}

	actualizarPrograma(token, id:string, programa: Programa){
		let params = JSON.stringify(programa);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.put(this.url+'programa/'+id, params, {headers: headers})
						 .map(res => res.json());
	}

	dameProgramas(token, canalRadioId = null){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});
		let options = new RequestOptions({headers:headers});

		if(canalRadioId == null){
			return this._http.get(this.url+'programas', options)
						 .map(res => res.json());
		}else{
			return this._http.get(this.url+'programas/'+canalRadioId, options)
						 .map(res => res.json());
		}

	}


	eliminarPrograma(token, id: string){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options = new RequestOptions({headers:headers});
		return this._http.delete(this.url+'programa/'+id, options)
						 .map(res => res.json());
	}


/*
	getAlbum(token, id: string){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options = new RequestOptions({headers:headers});
		return this._http.get(this.url+'album/'+id, options)
						 .map(res => res.json());
	}



	editAlbum(token, id:string, album: Album){
		let params = JSON.stringify(album);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.put(this.url+'album/'+id, params, {headers: headers})
						 .map(res => res.json());
	}

	deleteAlbum(token, id: string){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options = new RequestOptions({headers:headers});
		return this._http.delete(this.url+'album/'+id, options)
						 .map(res => res.json());
	}

*/
}