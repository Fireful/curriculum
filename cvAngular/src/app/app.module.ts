import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { MatNativeDateModule } from '@angular/material/core';
import { EsParPipe } from './pipes/espar.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { PeliculaComponent } from './components/peliculas/pelicula/pelicula.component';
import { TrabajoComponent } from './components/cv/trabajo/trabajo.component';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { FormacionComponent } from './components/cv/formacion/formacion.component';
import { CursoComponent } from './components/cv/curso/curso.component';
import { ConocimientoComponent } from './components/cv/conocimiento/conocimiento.component';
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
    ConocimientoComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    routing,
    MatNativeDateModule,
    FormsModule,
  ],
  providers: [appRoutingProviders, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
