import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { MatNativeDateModule } from '@angular/material/core';
import { EsParPipe } from './pipes/espar.pipe';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AcercaComponent } from './components/acerca/acerca.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { CvComponent } from './components/cv/cv.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { LoginComponent } from './components/login/login.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { TrabajoComponent } from './components/trabajo/trabajo.component';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { FormacionComponent } from './components/formacion/formacion.component';
import { CursoComponent } from './components/curso/curso.component';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    SidebarComponent,
    FooterComponent,
    ContenidoComponent,
    AcercaComponent,
    PortfolioComponent,
    CvComponent,
    HomeComponent,
    ErrorComponent,
    DetalleComponent,
    PeliculasComponent,
    LoginComponent,
    PeliculaComponent,
    TrabajoComponent,
    FormacionComponent,
    CursoComponent,
    EsParPipe,
  ],
  imports: [BrowserModule, NgbModule, routing, MatNativeDateModule],
  providers: [appRoutingProviders, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
