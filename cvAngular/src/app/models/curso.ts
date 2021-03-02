export class Curso {
  /* public titulo: string;
  public year: number;
  public image: string;

  constructor(titulo, year, image) {
    this.titulo = titulo;
    this.year = year;
    this.image = image;
  } */
  constructor(
    public _id,
    public nombre: string,
    public centro: string,
    public fecha: Date,
    public duracion: string,
    public imagen: string
  ) {}
}
