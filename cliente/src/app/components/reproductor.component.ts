import {Component, OnInit} from '@angular/core';
import {Podcast} from '../models/podcast';
import {GLOBAL} from '../services/global';

@Component({
	selector: 'reproductor',
	template: `
	
	<div class="programa-imagen">
		<span *ngIf="podcast.programa">
			<img id="rep-logo-programa" src="{{ url + 'programa/logotipo/' + podcast.programa.imagen}}" />
		</span>

		<span *ngIf="!podcast.programa">
			<img id="rep-logo-programa" src="assets/imagenes/podcast.jpg" />
		</span>
	</div>

	<div class="fichero-podcast">
		<p>Reproduciendo podcast...</p>
		<span id="rep-podcast-descripcion">
			{{podcast.descripcion}}
		</span>
		|
		<span id="rep-podcast-canal">
			<span *ngIf="podcast.programa.canalradio">
				{{podcast.programa.canalradio.nombre}}
			</span>
		</span>
		<audio controls id="reproductor">
			<source id="mp3-source" src="{{ url + 'podcast/audio/' + podcast.file }}" type="audio/mpeg">
			Navegador no compatible con HTML5
		</audio>
	</div>

	`
})

export class ReproductorComponent implements OnInit{
	public url: string;
	public podcast;

	constructor(){
		this.url = GLOBAL.url;
	}

	ngOnInit(){
		console.log('reproductor funcionando');

		var podcast = JSON.parse(localStorage.getItem('reproduciendo_podcast'));
		if(podcast){
			this.podcast = podcast;
		}else{
			this.podcast = new Podcast('','', '', '', '');
		}
	}
}