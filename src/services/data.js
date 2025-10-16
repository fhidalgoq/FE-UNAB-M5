import data from '../data/entregas.json';

// Función flecha con parámetro por defecto (ES6)
export const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

// Simulamos carga asíncrona de un JSON (Promesa + async/await)
export async function loadEntregas() {
  await delay(); // pequeña espera para simular IO
  const entregas = Array.isArray(data) ? data : data.entregas ?? [];
  return { entregas };
}
