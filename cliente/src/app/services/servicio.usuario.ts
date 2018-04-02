import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class ServicioUsuario{
	public identity;
	public token;
	public url: string;  //url de nuestra api_rest

	constructor(private _http: Http){
		this.url = GLOBAL.url;  //cogemos de la variable global y lo guardamos en la propiedad url
	}

	login(usuario_de_login, DameToken = null){
		//return 'prueba del servicio correcta';
		
		
		if(DameToken != null){
			usuario_de_login.DameToken = DameToken;
		}

		
		let json = JSON.stringify(usuario_de_login);
		let params = json;

		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'identificar', params, {headers: headers})
						 .map(res => res.json());
		
	}
/*
	register(user_to_register){
		let params = JSON.stringify(user_to_register);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'register', params, {headers: headers})
						 .map(res => res.json());
	}

	updateUser(user_to_update){
		let params = JSON.stringify(user_to_update);
		let headers = new Headers({
				'Content-Type':'application/json',
				'Authorization': this.getToken()
			});

		return this._http.put(this.url+'update-user/'+user_to_update._id, 
			params, {headers: headers})
						 .map(res => res.json());
	}

*/
	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
	}

	getToken(){
		let token = localStorage.getItem('token');

		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
	}

}