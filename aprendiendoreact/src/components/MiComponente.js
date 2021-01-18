import React, { Component } from 'react'

class MiComponente extends Component {
    render() {
        let receta = {
            nombre: 'Pizza',
            ingredientes: ['Tomate', 'Queso', 'Jamón'],
            calorias: 400
        }
        return (
            <div className="mi-componente">
                <h1>{receta.nombre}</h1>

                <h3>{'Calorías: ' + receta.calorias}</h3>
                Ingredientes:
                <ol>
                    {
                        receta.ingredientes.map((ingrediente, i) => {
                            console.log(ingrediente);
                            return (
                                <li key={i}>{ingrediente}</li>
                            )

                        })
                    }
                </ol>


            </div>

        );
    }
}

export default MiComponente;