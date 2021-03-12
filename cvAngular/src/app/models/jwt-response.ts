export interface JwtResponseI {
  dataUser: {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    accessToken: string;
    expiresIn: string;
  };
}
