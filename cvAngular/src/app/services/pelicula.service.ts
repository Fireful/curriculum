import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula';

@Injectable()
export class PeliculaService {
  public peliculas: Pelicula[];
  constructor() {
    this.peliculas = [
      new Pelicula(
        'Spiderman',
        2003,
        'https://imagenes.20minutos.es/files/article_amp/uploads/2020/11/28/spiderman.jpeg'
      ),
      new Pelicula(
        'Vengadores, End Game',
        2015,
        'https://i.blogs.es/f14ba6/vengadores-endgame/450_1000.jpg'
      ),
      new Pelicula(
        'Batman vs Superman',
        2007,
        'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABVixGzDct56-tsHGWLZwtml5CejHjH2jjmxSag8NKtgyx7MNfqzhcC5192uzJoo-dpVg0SvdMiLqD37Sx4-MPCRgK0od.jpg?r=2a9'
      ),
    ];
  }
  holaMundo() {
    return 'Holita, pequeño mundo';
  }
  getPeliculas() {
    return this.peliculas;
  }
}
