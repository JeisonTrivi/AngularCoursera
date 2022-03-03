import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from './../modelos/destinoViaje';
import { AppState } from './../app.module';
import { Store } from '@ngrx/store';
import { ResetVoteAction, VoteDownAction, 
         VoteUpAction } from '../modelos/destinos-viajes-state.model';

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

  constructor(private store:Store<AppState>) {
    this.clicked = new EventEmitter();
    this.event = new EventEmitter();
  }

  ngOnInit(): void {
    
  }

  ir() {
    this.clicked.emit(this.destino);
    return false;
  }

  voteUp(){
    this.store.dispatch(new VoteUpAction(this.destino))
    return false;
  }
  voteDown(){
    this.store.dispatch(new VoteDownAction(this.destino))
    return false;
  }

  resetVote(){
    this.store.dispatch(new ResetVoteAction(this.destino))
    return false;
  }
  
}
