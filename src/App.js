import React, {useState, useEffect} from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  // Crear states
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [preguntaPresupuesto, actualizarPregunta] = useState(true);
  const [gastos, guardarGastos] = useState([]);
  const [gasto, guardarGasto] = useState({});
  const [crearGasto, guardarCrearGasto] = useState(false);

  // UseEffect que actualiza el restante
  useEffect(() => {
    if(crearGasto) {

      // Agrega el nuevo presupuesto
      guardarGastos([
        ...gastos,
        gasto
      ]);

      // Resta del presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad;
      guardarRestante(presupuestoRestante);

      // Resetear a false
      guardarCrearGasto(false);
    }
  }, [gasto, crearGasto, gastos, restante]);

  return (
    <div className="container">
      <header>
        <h1>Presupuesto</h1>
      </header>
      <div className="contenido contenido-principal">
        {preguntaPresupuesto ?
          <Pregunta
            guardarPresupuesto = {guardarPresupuesto}
            guardarRestante = {guardarRestante}
            actualizarPregunta = {actualizarPregunta}
          />
        :
          <div className="row">
            <div className="col-12 col-md-6">
              <Formulario
                guardarGasto = {guardarGasto}
                guardarCrearGasto = {guardarCrearGasto}
              />
            </div>
            <div className="col-12 col-md-6">
              <Listado
                gastos = {gastos}
              />
              <ControlPresupuesto
                presupuesto = {presupuesto}
                restante = {restante}
              />
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
