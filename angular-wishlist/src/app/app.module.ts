import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap , StoreModule as NgRxStoreModule} from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinosViajesState, intializeDestinosViajesState, reducerDestinosViajes, DestinosViajesEffects } from './modelos/destinos-viajes-state.model';
import { DestinosApiClient } from './modelos/destinosApiClientModel';


const routes: Routes = [
  { path: '',redirectTo: 'home', pathMatch: 'full'},
  { path: 'home',component: ListaDestinosComponent},
  { path: 'destino',component: DestinoDetalleComponent},
  { path: 'destino/:id', component: DestinoDetalleComponent }
];

// Redux Init

export interface AppState {
  destinos: DestinosViajesState;
}

const reducers: ActionReducerMap<AppState> = { //Unión de todos los estados
  destinos: reducerDestinosViajes
};

const reducersInitialState = {
  destinos: intializeDestinosViajesState()
};
//Redux Fin
@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent
  ],
  imports: [
    
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    EffectsModule.forRoot([DestinosViajesEffects]),
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState })
  ],
  providers: [
    DestinosApiClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
