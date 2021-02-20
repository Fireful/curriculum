export class Trabajo {
  /* public titulo: string;
  public year: number;
  public image: string;

  constructor(titulo, year, image) {
    this.titulo = titulo;
    this.year = year;
    this.image = image;
  } */
  constructor(
    public empresa: string,
    public inicio: Date,
    public fin: Date,
    public descripcion: string
  ) {}
}
