// Genera un reporte renovado usando Bootstrap 5 con un look & feel más contemporáneo
export const crearReporte = ({ prioridades = [], totalPaquetes = 0, direccionesUnicas = new Set() } = {}) => {
  const fecha = new Date().toLocaleString('es-CL');
  const listaPriorizada = Array.isArray(prioridades) ? prioridades : [];
  const topPrioridades = listaPriorizada.slice(0, 3);
  const totalDirecciones = direccionesUnicas instanceof Set
    ? direccionesUnicas.size
    : Array.isArray(direccionesUnicas)
      ? new Set(direccionesUnicas).size
      : new Set(listaPriorizada.map(({ direccion }) => direccion)).size;

  const numberFormatter = new Intl.NumberFormat('es-CL');

  const metricas = [
    { label: 'Direcciones únicas', value: numberFormatter.format(totalDirecciones) },
    { label: 'Total de paquetes', value: numberFormatter.format(totalPaquetes) },
    { label: 'Prioridades activas', value: numberFormatter.format(listaPriorizada.length) },
  ];

  const metricMarkup = metricas.map(({ label, value }) => `
    <div class="report-metric">
      <span class="label">${label}</span>
      <span class="value">${value}</span>
    </div>
  `).join('');

  const topBadgeMarkup = topPrioridades.length
    ? topPrioridades
        .map(({ direccion }, index) => `<span class="pill">${index + 1}. ${direccion}</span>`)
        .join('')
    : '<span class="text-white-50">Sin destinos destacados</span>';

  const tablaPrioridades = listaPriorizada.length
    ? listaPriorizada.map(({ direccion, paquetes }, index) => `
        <tr>
          <td class="rank">${index + 1}</td>
          <td class="address">${direccion}</td>
          <td class="text-end fw-semibold">${numberFormatter.format(paquetes)}</td>
        </tr>
      `).join('')
    : `
        <tr>
          <td colspan="3">
            <div class="report-empty">
              No hay entregas registradas por el momento. Importa nuevos datos para ver el panorama actualizado.
            </div>
          </td>
        </tr>
      `;

  return `
    <div class="report-shell">
      <section class="report-hero">
        <div class="container">
          <div class="row align-items-center g-4">
            <div class="col-lg-7">
              <span class="badge rounded-pill text-uppercase fw-semibold mb-3">ExpressGo Insights</span>
              <h1 class="display-5 fw-semibold mb-3">Panel de rutas y prioridades</h1>
              <p class="lead text-white-50 mb-0">
                Visualiza el rendimiento de tus entregas y reorganiza tus rutas en minutos con datos confiables.
              </p>
            </div>
            <div class="col-lg-5">
              <div class="report-panel p-4">
                <h2 class="mb-3">Resumen ejecutivo</h2>
                <div class="d-flex flex-column gap-3">
                  ${metricMarkup}
                </div>
                <div class="mt-4">
                  <span class="text-uppercase small text-white-50 d-block mb-2">Top prioridades</span>
                  <div class="report-toplist">
                    ${topBadgeMarkup}
                  </div>
                </div>
                <div class="mt-4 small text-white-50">
                  Última actualización: <span class="text-white">${fecha}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="report-body">
        <div class="container">
          <div class="row g-4">
            <div class="col-12">
              <div class="card report-card border-0">
                <div class="card-header px-4 py-4">
                  <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                    <div>
                      <h2 class="h4 fw-semibold mb-1 text-dark">Detalle de entregas</h2>
                      <p class="text-secondary mb-0">Ordenadas por prioridad según el volumen de paquetes.</p>
                    </div>
                    <span class="badge text-bg-primary-subtle text-primary-emphasis px-3 py-2">
                      Total paquetes: ${numberFormatter.format(totalPaquetes)}
                    </span>
                  </div>
                </div>
                <div class="card-body px-0">
                  <div class="table-responsive">
                    <table class="table align-middle mb-0 report-table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Dirección</th>
                          <th scope="col" class="text-end">Paquetes</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${tablaPrioridades}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
};
