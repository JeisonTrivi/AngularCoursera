import {v4 as uuid} from 'uuid';

export class DestinoViaje {
	selected:boolean;
	services:string[];
	id = uuid();
	constructor(public nombre:string, public imagenUrl:string) {
       this.services = ['pileta', 'desayuno'];
	}
	setSelected(s:boolean){
	  this.selected = s;
	}
	isSelected(){
	  return this.selected;
    }
}
