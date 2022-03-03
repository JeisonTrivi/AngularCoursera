import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from './../modelos/destinoViaje';
import { DestinosApiClient } from '../modelos/destinosApiClientModel';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../modelos/destinos-viajes-state.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  
  @Output() onItemAdded: EventEmitter<DestinoViaje>;   
  update:string[];

  constructor (public destinosApiClient:DestinosApiClient, private store : Store<AppState>) {
    this.onItemAdded = new EventEmitter();
    this.update=[];
    
  }  

  ngOnInit(): void {
    this.store.select(state => state.destinos)
      .subscribe(data => {
        let d = data.favorito;
        if (d != null) {
          this.update.push("Se eligió: " + d.nombre);
        }
      });
  }

  agregado(d: DestinoViaje){
    this.store.dispatch(new NuevoDestinoAction(d))
  }

  elegido (d: DestinoViaje){
    this.store.dispatch(new ElegidoFavoritoAction(d))
  }
  
}
