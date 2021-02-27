export class Experiencia {
  /* public titulo: string;
  public year: number;
  public image: string;

  constructor(titulo, year, image) {
    this.titulo = titulo;
    this.year = year;
    this.image = image;
  } */
  constructor(
    public id: number,
    public logo: string,
    public empresa: string,
    public inicio: Date,
    public fin: Date,
    public puesto: string,
    public descripcion: string
  ) {}
}
