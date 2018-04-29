import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { CanalRadio } from '../models/canalRadio';

@Injectable()
export class ServicioCanalRadio{
	public url: string;

	constructor(private _http: Http){
		this.url = GLOBAL.url;
	}


	crearCanalRadio(token, canalRadio: CanalRadio){

	    // el objeto json lo convierte en un string
		let params = JSON.stringify(canalRadio);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.post(this.url+'canalRadio', params, {headers: headers})
						 .map(res => res.json());
						 
	}




	dameCanalesRadio(token, page){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});
        //al ser por get configuramos el objeto options para añadirselo a la peticion http
		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'canalesRadio/'+page, options)
						 .map(res => res.json());
	}


	dameCanalRadio(token, id: string){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'canalRadio/'+id, options)
						 .map(res => res.json());
	}

	actualizarCanalRadio(token, id:string, canalRadio: CanalRadio){
		let params = JSON.stringify(canalRadio);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.put(this.url+'canalRadio/'+id, params, {headers: headers})
						 .map(res => res.json());
	}

	eliminarCanalRadio(token, id: string){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.delete(this.url+'canalRadio/'+id, options)
						 .map(res => res.json());
	}





}