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
    public id,
    public nombre,
    public centro: string,
    public inicio: Date,
    public fin: Date,
    public info: string,
    public imagen: string
  ) {}
}
