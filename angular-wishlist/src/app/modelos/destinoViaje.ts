import {v4 as uuid} from 'uuid';

export class DestinoViaje {
	selected:boolean;
	services:string[];
	id = uuid();
	constructor(public nombre:string, public imagenUrl:string) {
       this.services = ['Desayuno','Piscina','Almuerzo','Cena'];
	}
	setSelected(s:boolean){
	  this.selected = s;
	}
	isSelected(){
	  return this.selected;
    }
}
