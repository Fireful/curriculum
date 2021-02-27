import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../models/pelicula';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss'],
  providers: [PeliculaService],
})
export class PeliculasComponent implements OnInit {
  public peliculas: Pelicula[];
  constructor(private _peliculaService: PeliculaService) {
    this.peliculas = this._peliculaService.getPeliculas();
  }

  ngOnInit(): void {
    console.log(this.peliculas);
    console.log(this._peliculaService.holaMundo());
    console.log(this._peliculaService.getPeliculas());
  }
}
