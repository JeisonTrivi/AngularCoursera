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
  constructor (public destinosApiClient:DestinosApiClient) {
    this.onItemAdded = new EventEmitter();
  }  

  ngOnInit(): void {
  }

  guardar(nombre:string, url:string):boolean{
    let d = new DestinoViaje(nombre,url);
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d)
    return false;
  }

  elegido (e: DestinoViaje){
    this.destinosApiClient.getAll().forEach(x => x.setSelected(false));
      e.setSelected(true);
  }

  
}
