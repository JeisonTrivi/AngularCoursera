import { NgModule, InjectionToken, Injectable, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap , Store, StoreModule as NgRxStoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinosViajesState, intializeDestinosViajesState, reducerDestinosViajes, DestinosViajesEffects, InitMyDataAction } from './modelos/destinos-viajes-state.model';

import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { AuthService } from './services/auth.service';
import { VuelosComponentComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { VuelosMainComponentComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component.component';
import { VuelosMasInfoComponentComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import { VuelosDetalleComponentComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';
import { ReservasModule } from './reservas/reservas.module';
import { DestinosApiClient } from './modelos/destinosApiClientModel';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http';

//app config
export interface AppConfig {
  apiEndpoint: string
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// fin app config express

// init routing
export const ChildrenRoutesVuelos: Routes = [
  { path: '',redirectTo: 'main', pathMatch: 'full'},
  { path: 'main',component: VuelosMainComponentComponent},
  { path: 'mas-info', component: VuelosMasInfoComponentComponent },
  { path: ':id', component: VuelosDetalleComponentComponent }
];

const routes: Routes = [
  { path: '',redirectTo: 'home', pathMatch: 'full'},
  { path: 'home',component: ListaDestinosComponent},
  { path: 'destino/:id', component: DestinoDetalleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'protected', component: ProtectedComponent, canActivate:[ UsuarioLogueadoGuard ] },
  { path: 'vuelos', component: VuelosComponentComponent, canActivate:[ UsuarioLogueadoGuard ],
   children: ChildrenRoutesVuelos }
];
// fin routing
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

//app init

export function init_app(appLoadService: AppLoadService): () => Promise<any> {
  return () => appLoadService.initializeDestinosViajesState();
}
@Injectable()
class AppLoadService {
  constructor(private store: Store<AppState>, private http: HttpClient) { }
  async initializeDestinosViajesState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'X-API-TOKEN': 'token-seguridad' });
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndpoint + '/my', { headers: headers });
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction( response.body ));
  }
}

//fin app 
@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponentComponent,
    VuelosMainComponentComponent,
    VuelosMasInfoComponentComponent,
    VuelosDetalleComponentComponent
  ],
  imports: [

    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    EffectsModule.forRoot([DestinosViajesEffects]),
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState }),
    StoreDevtoolsModule.instrument(),
    ReservasModule
  ],
  providers: [
    AuthService, 
    UsuarioLogueadoGuard ,
    DestinosApiClient,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    AppLoadService, 
    { provide: APP_INITIALIZER, useFactory: init_app, deps:[AppLoadService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
