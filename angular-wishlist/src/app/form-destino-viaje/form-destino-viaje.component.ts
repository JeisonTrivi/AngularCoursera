import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DestinoViaje } from '../modelos/destinoViaje';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';



@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<DestinoViaje>;

  minLongitud = 3;
  searchResults: string[];

  fg: FormGroup = this.fb.group({
    'nombre': ['', Validators.compose([
      Validators.required,
      this.nombreValidator,
      this.nombreValidadorParametrizable(this.minLongitud)
    ])],
    'url': ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.searchResults = [''];
    this.fg.valueChanges.subscribe((form: any) => {
      console.log(form)
    })
  }


  ngOnInit() {
    const elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
      .pipe(
        map((e) => (e.target as HTMLInputElement).value),
        filter(text => text.length > 2),
        debounceTime(200), //Detener 200 milisegundos
        distinctUntilChanged(), //Hasta que sea algo distinto avanzar la sugerencia
        switchMap(() => ajax('/assets/datos.json'))//Consulta de web services API de búsqueda -será un archivo de prueba-
      ).subscribe((ajaxResponse:any) => { // Explicitamente :any por que genera error si no se expecifica en tipo
        this.searchResults = ajaxResponse.response;
      });
  }

  guardar(nombre: string, url: string): boolean {
    let d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }
  /**
   * 
   * @param control :FormControl
   * @returns 
   */

  nombreValidator(control: FormControl): { [s: string]: boolean } | null {
    let l = control.value.toString().trim().length;
    if (l >= 0 && l < 5) {
      return { invalidNombre: true };
    }
    return {};
  }
  /**
   * 
   * @param minLong 
   * @control :AbstractControl
   * @returns :ValidatorFn
   */
  nombreValidadorParametrizable(minLong: number): ValidatorFn {
    return (control: AbstractControl): { [s: string]: boolean } | null => {
      let l = control.value.toString().trim().length;
      if (l >= 0 && l < minLong) {
        return { minLongNombre: true };
      }
      return null;
    }
  }

  
}

