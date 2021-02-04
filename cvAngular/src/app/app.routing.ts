//Importar módulos del router
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importar componentes a los cuales les quiero hacer una página exclusiva
import { HomeComponent } from './components/home/home.component';
import { CvComponent } from './components/cv/cv.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { ErrorComponent } from './components/error/error.component';

//Array de rutas
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cv', component: CvComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'acerca', component: AcercaComponent },
  { path: '**', component: ErrorComponent },
];

//Exportar módulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(
  appRoutes
);
