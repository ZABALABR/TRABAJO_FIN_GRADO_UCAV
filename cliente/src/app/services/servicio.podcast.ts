import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Podcast } from '../models/podcast';

@Injectable()
export class ServicioPodcast{
	public url: string;

	constructor(private _http: Http){
		this.url = GLOBAL.url;
	}

	damePodcasts(token, programaId = null){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options = new RequestOptions({headers: headers});

		if(programaId == null){
			return this._http.get(this.url+'podcasts', options)
				 .map(res => res.json());
		}else{
			return this._http.get(this.url+'podcasts/'+programaId, options)
				 .map(res => res.json());
		}
	}

	damePodcast(token, id: string){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options = new RequestOptions({headers: headers});
		return this._http.get(this.url+'podcast/'+id, options)
						 .map(res => res.json());
	}

	crearPodcast(token, podcast: Podcast){
		let params = JSON.stringify(podcast);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.post(this.url+'podcast', params, {headers: headers})
						 .map(res => res.json());
	}

	modificarPodcast(token, id:string, podcast: Podcast){
		let params = JSON.stringify(podcast);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.put(this.url+'podcast/'+id, params, {headers: headers})
						 .map(res => res.json());
	}

	eliminarPodcast(token, id: string){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options = new RequestOptions({headers: headers});
		return this._http.delete(this.url+'podcast/'+id, options)
						 .map(res => res.json());
	}


/*
	subscribirPodcast( programaId = null){
		let headers = new Headers({
			'Content-Type':'application/json'
			
		});

		let options = new RequestOptions({headers: headers});

		if(programaId == null){
			return this._http.get(this.url+'RSS', options);
				// .map(res => res.xml());
		}else{
			return this._http.get(this.url+'RSS/'+programaId, options);
				// .map(res => res.xml());
		}
	}

*/
}