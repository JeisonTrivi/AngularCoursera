import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { DestinoViaje } from './../modelos/destinoViaje';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {   
  
  @HostBinding('attr.class') cssClass ='col-md-4'

  // Iniciallizar el Objeto con {} , por que genera error  **@Input() destino:DestinoViaje;** dice que hay que inicializarlo en el costructor!!
  @Input() destino:DestinoViaje={};
  constructor() { 
  }

  ngOnInit(): void {
    
  }


}
