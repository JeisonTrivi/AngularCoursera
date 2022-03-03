import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppState } from '../app.module';
import { DestinoViaje } from './../modelos/destinoViaje';
import { NuevoDestinoAction, ElegidoFavoritoAction } from './destinos-viajes-state.model';

@Injectable()
export class DestinosApiClient {

	destino:DestinoViaje[]=[];
	all:any;

	constructor(private store: Store<AppState>) {
       this.store.select(state => state.destinos)
	   .subscribe((data) =>{
		   console.log("destinos Store");
		   console.log(data);
		   this.destino=data.items;
	   });
	   store.select(state => state.destinos.items).subscribe(items => this.all = items);
	}

	add(d:DestinoViaje){
	  this.store.dispatch(new NuevoDestinoAction(d));
	}

	getAll():DestinoViaje[]{
        return this.destino;
      }
	  
    getById(id:any):DestinoViaje{
        return this.destino.filter(function(d){return d.id.toString() === id;})[0];
      }

	
	elegir(d:DestinoViaje){
	    this.store.dispatch(new ElegidoFavoritoAction(d))
    }
}