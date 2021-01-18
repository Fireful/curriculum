class Coche {
    constructor(modelo, velocidad, antiguedad) {
        this.modelo = modelo;
        this.velocidad = velocidad;
        this.antiguedad = antiguedad
    }

    acelerar() {
        this.velocidad += 10;
    }
    frenar() {
        this.velocidad -= 20;
    }
}

class Autobus extends Coche {
    constructor(modelo, velocidad, antiguedad) {
        super(modelo, velocidad, antiguedad);
    }
}

var autobus1 = new Autobus("Pegasus", 150, 2005);
autobus1.frenar();
console.log(autobus1);

var coche1 = new Coche('BMW', 200, 2017);
var coche2 = new Coche('Audi', 200, 2017);
var coche3 = new Coche('Mercedes', 200, 2017);
var coche4 = new Coche('Renault', 200, 2017);

document.write("<h1>Velocidad: " + coche1.velocidad + "</h1>")
coche1.acelerar();
coche1.acelerar();
coche1.acelerar();

console.log(coche1);
