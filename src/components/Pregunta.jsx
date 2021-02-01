import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import Error from './Error';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {

    // Definir el state
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    // Función que lee el presupuesto
    const definirPresupuesto = e => {
        guardarCantidad(parseInt(e.target.value, 10));
    }

    // Submit para definir el presupuesto
    const agregarPresupuesto = e => {
        e.preventDefault();

        // Validar
        if(cantidad < 0 || isNaN(cantidad)) {
            guardarError(true);
            return;
        }

        // Confirmación
        guardarError(false);
        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false);
    }

    return (
        <Fragment>
            <div className="row text-center">
                <div className="col-12">
                    <h2>Ingresa tu presupuesto</h2>
                    {error 
                        ? <Error mensaje='El presupuesto es incorrecto'/>
                        : null
                    }
                    <form onSubmit={agregarPresupuesto} className="form-group">
                        <input
                            type="number"
                            className="form-control mb-3"
                            placeholder="Presupuesto"
                            onChange={definirPresupuesto}
                        />
                        <input
                            type="submit"
                            className="btn btn-primary "
                            value="Definir Presupuesto"
                        />
                    </form>
                </div>
            </div>
            
        </Fragment>
    );
}

Pregunta.propTypes = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
}
 
export default Pregunta;