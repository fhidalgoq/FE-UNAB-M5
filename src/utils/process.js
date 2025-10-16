import 'core-js/stable'; // Polyfill para compatibilidad
import 'regenerator-runtime/runtime.js'; // Polyfill para async/await

// Simulación de carga asíncrona de datos (Promesa + async/await)
export const fetchEntregas = async (url = '../data/entregas.json') => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// Procesa entregas: elimina duplicados y suma paquetes
export const procesarEntregas = (entregas = []) => {
  // Map para sumar paquetes por dirección
  const mapa = new Map();
  for (const { direccion, paquetes } of entregas) { // Destructuring
    mapa.set(direccion, (mapa.get(direccion) ?? 0) + paquetes); // Nullish coalescing
  }
  // Convertir Map a array y ordenar por paquetes descendente
  const direcciones = Array.from(mapa, ([direccion, paquetes]) => ({ direccion, paquetes })); // Array.from + destructuring
  direcciones.sort((a, b) => b.paquetes - a.paquetes);
  return direcciones;
};

// Genera reporte con template literals y spread/rest
export const generarReporte = (direcciones = []) => {
  const totalPaquetes = direcciones.reduce((acc, { paquetes }) => acc + paquetes, 0);
  const top3 = direcciones.slice(0, 3).map(({ direccion }) => direccion).join(' | ');
  return `
Reporte de Rutas — ExpressGo
Fecha: ${new Date().toLocaleString()}
Total de direcciones: ${direcciones.length}
Total de paquetes: ${totalPaquetes}
Top 3 prioridades: ${top3}

${direcciones.map(
    ({ direccion, paquetes }, i) => `${i + 1}. ${direccion} — ${paquetes} paquetes`
  ).join('\n')}
`;
};
