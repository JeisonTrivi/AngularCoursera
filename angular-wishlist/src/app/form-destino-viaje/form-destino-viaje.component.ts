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
  searchResults:any[];

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
        debounceTime(120),
        distinctUntilChanged(),
        switchMap(() => ajax('/assets/datos.json'))
      ).subscribe(ajaxResponse => {        
        console.log(ajaxResponse.response)
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

