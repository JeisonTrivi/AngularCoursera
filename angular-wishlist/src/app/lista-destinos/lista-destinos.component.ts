import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from './../modelos/destinoViaje';
import { DestinosApiClient } from '../modelos/destinosApiClientModel';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  
  @Output() onItemAdded: EventEmitter<DestinoViaje>;   
  update:DestinoViaje[];

  constructor (public destinosApiClient:DestinosApiClient) {
    this.onItemAdded = new EventEmitter();
    this.update=[];
    this.destinosApiClient.subscribeOnChange((d:DestinoViaje) =>{
      if (d != null){
        this.update.push(d);
      }
    })
  }  

  ngOnInit(): void {
  }

  agregado(d: DestinoViaje){
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d)
  }

  elegido (d: DestinoViaje){
    this.destinosApiClient.elegir(d);
  }
  
}
