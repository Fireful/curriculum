import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';

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
  ],
  imports: [BrowserModule, NgbModule, routing],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
