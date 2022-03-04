import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinoViaje } from '../../modelos/destinoViaje';
import { DestinosApiClient } from '../../modelos/destinosApiClientModel';

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css']
})
export class DestinoDetalleComponent implements OnInit {

  destino:DestinoViaje;

  constructor(private route: ActivatedRoute, private destinosApiClient:DestinosApiClient) { }

  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('id');
    this.destino = null;//this.destinosApiClient.getById(id);

  }

}
