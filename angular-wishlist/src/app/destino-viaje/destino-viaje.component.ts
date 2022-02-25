import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from './../modelos/destinoViaje';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {   
  
  @HostBinding('attr.class') cssClass ='col-md-4'
  @Input() destino:DestinoViaje;
  @Input('idx') position:number;
  @Output() clicked: EventEmitter<DestinoViaje>;
  @Output() event: EventEmitter<DestinoViaje>;
  constructor() {
    this.clicked = new EventEmitter();
    this.event = new EventEmitter();
  }

  ngOnInit(): void {
    
  }

  ir() {
    this.clicked.emit(this.destino);
    return false;
  }

  go(){
    this.event.emit(this.destino);
  }
}
