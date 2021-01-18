import logo from './assets/images/logo.svg';
import './assets/css/App.css';
import MiComponente from './components/MiComponente'

function holaMundo(nombre, edad) {
    var presentacion = (
        <div>
            <h2>Hola, soy {nombre}.</h2>
            <h3>Tengo {edad} años</h3>
        </div>
    );
    return presentacion;
}

function App() {
    var nombre = "Javier Casas";
    var edad = 41;


    return (
        <div className="App" >
            <header className="App-header" >
                <img src={logo}
                    className="App-logo"
                    alt="logo" />

                {holaMundo(nombre, edad)}

                <section className="componentes">
                    <MiComponente />
                </section>

            </header >
        </div>
    );
}

export default App;