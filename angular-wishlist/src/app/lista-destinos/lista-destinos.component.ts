import { Component, OnInit } from '@angular/core';
import { DestinoViaje } from './../modelos/destinoViaje';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {

  destination: DestinoViaje[];

  constructor() {
    this.destination = [];
   }

  ngOnInit(): void {
  }

  guardar(nombre:string, url:string):boolean{
    this.destination.push(new DestinoViaje (nombre, url))
    console.log(this.destination)
    return false;
  }
}
