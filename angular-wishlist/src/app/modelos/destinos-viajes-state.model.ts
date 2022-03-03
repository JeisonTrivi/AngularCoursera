import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoViaje } from '../modelos/destinoViaje';
import { HttpClientModule } from '@angular/common/http';

// Manejo de ESTADO a través de una interfaz 
export interface DestinosViajesState { //STORAGE
    items: DestinoViaje[]; //Lo que nos interesa
    loading: boolean; //TRUE para una consulta en AJAX y una ventana de acuerdo al resultado
    favorito: DestinoViaje; 
}

// Inicializar el estado (otra manera)
export function intializeDestinosViajesState() {
    return {
	    items: [],
	    loading: false,
	    favorito: null
    };
}

// ACCIONES de la aplicación del usuario que disparan un cambio de estado DEPATCH
export enum DestinosViajesActionTypes { //Hacer uso de esta constante para todos los strings
  NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
  ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
  VOTE_UP = '[Destinos Viajes] Vote Up',
  VOTE_DOWN = '[Destinos Viajes] Vote Down',
  RESET_VOTE = '[Destinos Viajes] Reset Vote',
  INIT_MY_DATA = '[Destinos Viajes] Init My Data'
}

export class NuevoDestinoAction implements Action {
  type = DestinosViajesActionTypes.NUEVO_DESTINO;
  constructor(public destino: DestinoViaje) {} //Toda la lógica
}

export class ElegidoFavoritoAction implements Action {
  type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
  constructor(public destino: DestinoViaje) {} //Toda la lógica
}

export class VoteUpAction implements Action {
	type = DestinosViajesActionTypes.VOTE_UP;
	constructor(public destino: DestinoViaje) {} //Toda la lógica
}

export class VoteDownAction implements Action {
	type = DestinosViajesActionTypes.VOTE_DOWN;
	constructor(public destino: DestinoViaje) {} //Toda la lógica
}

export class ResetVoteAction implements Action {
	type = DestinosViajesActionTypes.RESET_VOTE;
	constructor(public destino: DestinoViaje) {} //Toda la lógica
}
// Clase que recibe un array de Strings
export class InitMyDataAction implements Action {
	type = DestinosViajesActionTypes.INIT_MY_DATA;
	constructor(public destinos: string[]) {}
}

export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction
	| VoteUpAction | VoteDownAction | ResetVoteAction |InitMyDataAction; //Agrupar todos los tipos de datos (unión de tipos)

//REDUCERS: cada que se dispara una acción son llamados uno a uno
export function reducerDestinosViajes(
	//Recibe el estado anterior y la acción a disparar
	state: DestinosViajesState | undefined,
	action: DestinosViajesActions | Action //que tipo de clases se van a pasar
): DestinosViajesState { //Modificar el estado
	switch (action.type) {
		case DestinosViajesActionTypes.INIT_MY_DATA: {
			const destinos: string[] = (action as InitMyDataAction).destinos; //Casteo
			return { 
				...state!,
				items: destinos.map((d) => new DestinoViaje(d, '')) //Inicializar los datos 
			};
		}
		case DestinosViajesActionTypes.NUEVO_DESTINO: {
		  return {
		  		...state!,
		  		items: [...state!.items, (action as NuevoDestinoAction).destino ]
		  	};
		}
		case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
			state!.items.forEach(x => x.setSelected(false));			
		    let fav: DestinoViaje = (action as ElegidoFavoritoAction).destino;
		    fav.setSelected(true);
		    return {
		    	...state!,
		  		favorito: fav
		    };
		}
		case DestinosViajesActionTypes.VOTE_UP: {
			let d: DestinoViaje = (action as VoteUpAction).destino;
		    d.VoteUp();
		    return { ...state! }; 
		}
		case DestinosViajesActionTypes.VOTE_DOWN: {
			let d: DestinoViaje = (action as VoteDownAction).destino;
		    d.VoteDown();
		    return { ...state! }; 
		}
		case DestinosViajesActionTypes.RESET_VOTE: {
			let d: DestinoViaje = (action as ResetVoteAction).destino;
		    d.ResetVote();
		    return { ...state! }; 
		}
	}
	return state!; //Devolver el estado sin mutar
}

//EFFECTS: registrar una nueva acción como consecuencia de una nueva acción
@Injectable({
	providedIn: 'root'
  })
export class DestinosViajesEffects {
  @Effect()
  nuevoAgregado$: Observable<Action> = this.actions$.pipe(
    ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
  	map((action:NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
  );
  constructor(private actions$: Actions) {}
}