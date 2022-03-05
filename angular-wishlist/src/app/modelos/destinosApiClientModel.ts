import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppConfig, AppState, APP_CONFIG } from '../app.module';
import { DestinoViaje } from './../modelos/destinoViaje';
import { NuevoDestinoAction, ElegidoFavoritoAction } from './destinos-viajes-state.model';

@Injectable()
export class DestinosApiClient {
	destinos: DestinoViaje[] = [];

	constructor(
        public store: Store<AppState>,
        @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
        private http: HttpClient) {
			this.store
			  .select(state => state.destinos)
			  .subscribe((data) => {
				this.destinos = data.items;
			  });
		  }
   
	add(d: DestinoViaje) {
		const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
		const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nuevo: d.nombre }, { headers: headers });
		this.http.request(req).subscribe((data: HttpResponse<{}>) => {
		  if (data.status === 200) {
			this.store.dispatch(new NuevoDestinoAction(d));
		  }
		});
	  }

	elegir(d:DestinoViaje){
	    this.store.dispatch(new ElegidoFavoritoAction(d))
    }	

	getById(id: String): DestinoViaje {
		return this.destinos.filter(function(d) { return d.id.toString() === id; })[0];
	}

	getAll() :DestinoViaje[] {
		return this.destinos;
	}

	


}
