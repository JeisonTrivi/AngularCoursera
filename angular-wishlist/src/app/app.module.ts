import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap , StoreModule as NgRxStoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinosViajesState, intializeDestinosViajesState, reducerDestinosViajes, DestinosViajesEffects } from './modelos/destinos-viajes-state.model';
import { DestinosApiClient } from './modelos/destinosApiClientModel';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { AuthService } from './services/auth.service';


const routes: Routes = [
  { path: '',redirectTo: 'home', pathMatch: 'full'},
  { path: 'home',component: ListaDestinosComponent},
  { path: 'destino/:id', component: DestinoDetalleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'protected', component: ProtectedComponent, canActivate:[ UsuarioLogueadoGuard ] }
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
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent
  ],
  imports: [
  
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    EffectsModule.forRoot([DestinosViajesEffects]),
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    DestinosApiClient , AuthService, UsuarioLogueadoGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
