import {v4 as uuid} from 'uuid';

export class DestinoViaje {
	selected:boolean;
	services:string[];
	id = uuid();
	constructor(public nombre:string, public imagenUrl:string , public votes:number = 0) {
       this.services = ['Desayuno','Piscina','Almuerzo','Cena'];
	}
	setSelected(s:boolean){
	  this.selected = s;
	}
	isSelected(){
	  return this.selected;
    }
	VoteUp(){
		this.votes++;
	}

	VoteDown(){
		this.votes--;
	}
}
