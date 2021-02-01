import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    const shortid = require('shortid');

    // Agregar gasto
    const agregarGasto = e => {
        e.preventDefault();

        // Validar
        if(cantidad < 0 || isNaN(cantidad) || nombre.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        // Construir gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        // Pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true);

        // Resetear el form
        guardarNombre('');
        guardarCantidad(0);

    }

    return (
        <form onSubmit={agregarGasto}>
            <div className="form-group">
                <h2>Agrega tus gastos</h2>
                {error
                    ? <Error mensaje='El gasto es incorrecto'/>
                    : null
                }
                <div className="campo">
                    <label><strong>Nombre Gasto</strong></label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Ej. Ahorros"
                        value={nombre}
                        onChange={e => guardarNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label><strong>Cantidad Gasto</strong></label>
                    <input 
                        type="number"
                        className="form-control"
                        placeholder="200000"
                        value={cantidad}
                        onChange={e => guardarCantidad(parseInt(e.target.value, 10))}
                    />
                </div>
                <div className="text-center">
                    <input 
                        type="submit" 
                        className="btn btn-primary" 
                        value="Agregar Gasto"
                    />
                </div>
            </div>
            
        </form>
    );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;