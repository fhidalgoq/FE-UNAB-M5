// Polyfills para navegadores antiguos (con .babelrc -> useBuiltIns: 'entry')
import 'core-js/stable';
import 'regenerator-runtime/runtime.js';

import { loadEntregas } from './services/data.js';
import { procesarEntregas } from './utils/process.js';
import { crearReporte } from './utils/report.js';

(async () => {
  try {
    const { entregas } = await loadEntregas();
  const prioridades = procesarEntregas(entregas);
  const totalPaquetes = prioridades.reduce((acc, { paquetes }) => acc + paquetes, 0);
  const direccionesUnicas = new Set(prioridades.map(({ direccion }) => direccion));
  const html = crearReporte({ prioridades, totalPaquetes, direccionesUnicas });

  const app = document.getElementById('app');
  if (app) app.innerHTML = html;
  console.log('Reporte generado:', { prioridades, totalPaquetes, direccionesUnicas: [...direccionesUnicas] });
  } catch (error) {
    console.error('Error al generar el reporte:', error);
    const app = document.getElementById('app');
    if (app) app.textContent = 'Ocurrió un error al generar el reporte.';
  }
})();
