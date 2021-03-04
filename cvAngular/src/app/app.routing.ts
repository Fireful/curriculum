//Importar módulos del router
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importar componentes a los cuales les quiero hacer una página exclusiva
import { HomeComponent } from './components/home/home.component';
import { CvComponent } from './components/cv/cv.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { LoginComponent } from './components/login/login.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { ErrorComponent } from './components/error/error.component';
import { TrabajoComponent } from './components/cv/trabajo/trabajo.component';

//Array de rutas
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cv', component: CvComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'acerca', component: AcercaComponent },
  { path: 'detalle', component: DetalleComponent },
  { path: 'cv/trabajo/:id', component: DetalleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cv/trabajo', component: TrabajoComponent },

  { path: 'peliculas', component: PeliculasComponent },
  { path: '**', component: ErrorComponent },
];

//Exportar módulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(
  appRoutes
);
