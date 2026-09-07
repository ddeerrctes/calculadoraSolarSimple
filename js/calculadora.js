// ============================================================
// CALCULADOR SOLAR ON GRID - PROVINCIA DE CORRIENTES, ARGENTINA
// ============================================================

// --- Datos de radiación solar de localidades de Corrientes (kWh/m²/día promedio anual) ---
const LOCALIDADES = {
    'corrientes': { nombre: 'Corrientes Capital', radiacion: 4.8 },
    'goya': { nombre: 'Goya', radiacion: 4.7 },
    'paso-de-los-libres': { nombre: 'Paso de los Libres', radiacion: 4.9 },
    'santo-tome': { nombre: 'Santo Tomé', radiacion: 4.8 },
    'mercedes': { nombre: 'Mercedes', radiacion: 4.7 },
    'curuzu-cuatia': { nombre: 'Curuzú Cuatiá', radiacion: 4.7 },
    'monte-caseros': { nombre: 'Monte Caseros', radiacion: 4.8 },
    'esquina': { nombre: 'Esquina', radiacion: 4.6 },
    'bella-vista': { nombre: 'Bella Vista', radiacion: 4.7 },
    'saladas': { nombre: 'Saladas', radiacion: 4.7 },
    'itati': { nombre: 'Itatí', radiacion: 4.8 },
    'ituzaingo': { nombre: 'Ituzaingó', radiacion: 4.8 },
    'empedrado': { nombre: 'Empedrado', radiacion: 4.8 },
    'san-luis-del-palmar': { nombre: 'San Luis del Palmar', radiacion: 4.8 },
    'general-paz': { nombre: 'General Paz', radiacion: 4.7 },
    'sauce': { nombre: 'Sauce', radiacion: 4.6 },
    'la-cruz': { nombre: 'La Cruz', radiacion: 4.8 },
    'alvear': { nombre: 'Alvear', radiacion: 4.8 },
    'virasoro': { nombre: 'Virasoro', radiacion: 4.7 },
    'mburucuya': { nombre: 'Mburucuyá', radiacion: 4.7 }
};

// --- Factores de orientación ---
const ORIENTACION_FACTOR = {
    'norte': 1.0,
    'noreste': 0.95,
    'noroeste': 0.95,
    'este': 0.90,
    'oeste': 0.90,
    'sur': 0.70
};

// --- Factores de inclinación (óptimo ~27° para Corrientes) ---
const INCLINACION_FACTOR = {
    '0': 0.92, '10': 0.97, '15': 0.99, '20': 1.0, '25': 1.0,
    '30': 0.99, '35': 0.97, '40': 0.94, '45': 0.90
};

// --- Factores de tipo de techo ---
const TECHO_FACTOR = {
    'chapa': 1.0,
    'teja': 0.95,
    'membrana': 0.98,
    'fibrocemento': 0.97
};

// ============================================================
// NOTA: no se listan equipos individuales de stock.
// Los resultados se expresan en totales: kWp de paneles solares
// y kW de inversor on grid recomendado.
// ============================================================

// --- Radiación solar mensual de Corrientes (kWh/m²/día por mes) ---
const RADIACION_MENSUAL = {
    'corrientes': [5.2, 4.9, 4.6, 4.2, 3.8, 3.5, 3.6, 4.0, 4.5, 5.0, 5.4, 5.5],
    'goya': [5.1, 4.8, 4.5, 4.1, 3.7, 3.4, 3.5, 3.9, 4.4, 4.9, 5.3, 5.4],
    'paso-de-los-libres': [5.3, 5.0, 4.7, 4.3, 3.9, 3.6, 3.7, 4.1, 4.6, 5.1, 5.5, 5.6],
    'santo-tome': [5.2, 4.9, 4.6, 4.2, 3.8, 3.5, 3.6, 4.0, 4.5, 5.0, 5.4, 5.5],
    'mercedes': [5.1, 4.8, 4.5, 4.1, 3.7, 3.4, 3.5, 3.9, 4.4, 4.9, 5.3, 5.4],
    'curuzu-cuatia': [5.1, 4.8, 4.5, 4.1, 3.7, 3.4, 3.5, 3.9, 4.4, 4.9, 5.3, 5.4],
    'monte-caseros': [5.2, 4.9, 4.6, 4.2, 3.8, 3.5, 3.6, 4.0, 4.5, 5.0, 5.4, 5.5],
    'esquina': [5.0, 4.7, 4.4, 4.0, 3.6, 3.3, 3.4, 3.8, 4.3, 4.8, 5.2, 5.3],
    'bella-vista': [5.1, 4.8, 4.5, 4.1, 3.7, 3.4, 3.5, 3.9, 4.4, 4.9, 5.3, 5.4],
    'saladas': [5.1, 4.8, 4.5, 4.1, 3.7, 3.4, 3.5, 3.9, 4.4, 4.9, 5.3, 5.4],
    'itati': [5.2, 4.9, 4.6, 4.2, 3.8, 3.5, 3.6, 4.0, 4.5, 5.0, 5.4, 5.5],
    'ituzaingo': [5.2, 4.9, 4.6, 4.2, 3.8, 3.5, 3.6, 4.0, 4.5, 5.0, 5.4, 5.5],
    'empedrado': [5.2, 4.9, 4.6, 4.2, 3.8, 3.5, 3.6, 4.0, 4.5, 5.0, 5.4, 5.5],
    'san-luis-del-palmar': [5.2, 4.9, 4.6, 4.2, 3.8, 3.5, 3.6, 4.0, 4.5, 5.0, 5.4, 5.5],
    'general-paz': [5.1, 4.8, 4.5, 4.1, 3.7, 3.4, 3.5, 3.9, 4.4, 4.9, 5.3, 5.4],
    'sauce': [5.0, 4.7, 4.4, 4.0, 3.6, 3.3, 3.4, 3.8, 4.3, 4.8, 5.2, 5.3],
    'la-cruz': [5.2, 4.9, 4.6, 4.2, 3.8, 3.5, 3.6, 4.0, 4.5, 5.0, 5.4, 5.5],
    'alvear': [5.2, 4.9, 4.6, 4.2, 3.8, 3.5, 3.6, 4.0, 4.5, 5.0, 5.4, 5.5],
    'virasoro': [5.1, 4.8, 4.5, 4.1, 3.7, 3.4, 3.5, 3.9, 4.4, 4.9, 5.3, 5.4],
    'mburucuya': [5.1, 4.8, 4.5, 4.1, 3.7, 3.4, 3.5, 3.9, 4.4, 4.9, 5.3, 5.4]
};

// ============================================================
// TARIFAS REALES - CUADRO TARIFARIO DPEC
// Resolución Nº 148/2026 - Cuadro Nº 108-D
// ============================================================

// --- Tarifas de energía ($/kWh) - Cargo Variable ---
const TARIFAS_ENERGIA = {
    'urbano-no-bonif': { nombre: 'Residencial Urbano - Sin Subsidios', tarifa: 181.928, tarifaExcedente: 219.771, inyeccion: 93.703 },
    'rural-no-bonif': { nombre: 'Residencial Rural - Sin Subsidios', tarifa: 264.576, tarifaExcedente: 332.854, inyeccion: 93.703 },
    'urbano-sef': { nombre: 'Residencial Urbano - Bonificado SEF', tarifa: 103.903, tarifaExcedente: 181.928, inyeccion: 27.028 },
    'rural-sef': { nombre: 'Residencial Rural - Bonificado SEF', tarifa: 191.635, tarifaExcedente: 264.576, inyeccion: 27.028 },
    'comercial': { nombre: 'Comercial / Industrial', tarifa: 147.118, tarifaExcedente: 184.046, inyeccion: 78.755 }
};

// --- Parámetros generales ---
const EFICIENCIA_SISTEMA = 0.80;
const CO2_POR_KWH = 0.5;

document.addEventListener('DOMContentLoaded', function() {
    const btnCalcular = document.getElementById('calcular');
    btnCalcular.addEventListener('click', calcularSistema);

    // Botón para rellenar todos los meses con el mismo valor
    const btnRellenar = document.getElementById('btn-rellenar');
    btnRellenar.addEventListener('click', function() {
        const valor = document.getElementById('consumo-1').value;
        if (!valor || valor <= 0) {
            alert('Primero ingresá un valor en el mes de Enero para copiarlo a los demás meses.');
            return;
        }
        for (let i = 2; i <= 12; i++) {
            document.getElementById('consumo-' + i).value = valor;
        }
    });

    // Al cambiar la categoría, actualizar automáticamente las tarifas
    const selectCategoria = document.getElementById('categoria');
    selectCategoria.addEventListener('change', function() {
        const categoria = TARIFAS_ENERGIA[this.value];
        if (categoria) {
            document.getElementById('tarifa').value = categoria.tarifa.toFixed(3);
            document.getElementById('tarifa-inyeccion').value = categoria.inyeccion.toFixed(3);
        }
    });

    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularSistema();
        }
    });
});

function calcularSistema() {
    // --- Obtener valores de entrada ---
    const localidadKey = document.getElementById('localidad').value;
    const tipoTecho = document.getElementById('tipo-techo').value;
    const orientacion = document.getElementById('orientacion').value;
    const inclinacion = document.getElementById('inclinacion').value;
    const tarifa = parseFloat(document.getElementById('tarifa').value);
    const tarifaInyeccion = parseFloat(document.getElementById('tarifa-inyeccion').value) || 0;
    const categoriaKey = document.getElementById('categoria').value;
    const porcentajeCobertura = parseFloat(document.getElementById('cobertura').value) || 1.0;

    // --- Leer consumos mensuales ---
    const consumosMensuales = [];
    let consumoAnual = 0;
    for (let i = 1; i <= 12; i++) {
        const valorMes = parseFloat(document.getElementById('consumo-' + i).value) || 0;
        consumosMensuales.push(valorMes);
        consumoAnual += valorMes;
    }

    // --- Validar entradas ---
    if (consumoAnual <= 0) {
        alert('Por favor, ingresá el consumo de energía de al menos un mes.');
        return;
    }
    if (!tarifa || tarifa <= 0) {
        alert('Por favor, ingresá una tarifa válida.');
        return;
    }

    // --- Obtener datos de localidad y factores ---
    const localidad = LOCALIDADES[localidadKey];
    const radiacion = localidad.radiacion;
    const factorOrientacion = ORIENTACION_FACTOR[orientacion];
    const factorInclinacion = INCLINACION_FACTOR[inclinacion];
    const factorTecho = TECHO_FACTOR[tipoTecho];
    const factorTotal = factorOrientacion * factorInclinacion * factorTecho;

    // --- Aplicar porcentaje de cobertura al consumo anual ---
    const consumoACubrir = consumoAnual * porcentajeCobertura;

    // --- Potencia necesaria del sistema (kW) ---
    const potenciaNecesaria = consumoACubrir / (radiacion * 365 * EFICIENCIA_SISTEMA * factorTotal);

    // --- Potencia del sistema (kWp de paneles, sin límite de superficie) ---
    // Se redondea hacia arriba a 0,1 kW para obtener un total limpio
    const potenciaReal = Math.ceil(potenciaNecesaria * 10) / 10;

    // --- Inversor On Grid recomendado (total, redondeado hacia arriba a 0,5 kW) ---
    const inversorRecomendado = Math.ceil(potenciaReal * 2) / 2;

    // --- Generación anual estimada ---
    const generacionAnual = potenciaReal * radiacion * 365 * EFICIENCIA_SISTEMA * factorTotal;
    const cobertura = Math.min((generacionAnual / consumoAnual) * 100, 100);

    // --- Cálculo de ahorro con descuento directo + reintegro por inyección ---
    // Ahorro por energía consumida directamente (reducción de la factura)
    const energiaAhorradaDirecta = Math.min(generacionAnual, consumoAnual);
    const ahorroDirecto = energiaAhorradaDirecta * tarifa;

    // Excedente inyectado a la red
    const excedenteInyectado = Math.max(generacionAnual - consumoAnual, 0);

    // Reintegro por excedente inyectado
    const reintegroInyeccion = excedenteInyectado * tarifaInyeccion;

    // Ahorro total anual (directo + reintegro por inyección)
    const ahorroAnual = ahorroDirecto + reintegroInyeccion;

    // CO2 evitado
    const co2Evitado = generacionAnual * CO2_POR_KWH;

    // --- Mostrar resultados ---
    document.getElementById('result-potencia').textContent = potenciaReal.toFixed(2) + ' kWp';
    document.getElementById('result-inversor').textContent = '≈ ' + inversorRecomendado.toFixed(1) + ' kW';
    document.getElementById('result-generacion').textContent = generacionAnual.toFixed(0) + ' kWh/año';
    document.getElementById('result-cobertura').textContent = cobertura.toFixed(1) + '%';
    document.getElementById('result-ahorro').textContent = '$ ' + formatNumber(ahorroAnual) + '/año';
    document.getElementById('result-co2').textContent = co2Evitado.toFixed(0) + ' kg/año';

    // --- Detalle del sistema ---
    const detalle = document.getElementById('detalle-sistema');
    detalle.innerHTML = '';

    const items = [
        { label: 'Localidad', value: localidad.nombre },
        { label: 'Tipo de sistema', value: 'On Grid (conectado a la red)' },
        { label: 'Radiación solar promedio', value: radiacion.toFixed(1) + ' kWh/m²/día' },
        { label: 'Potencia de paneles solares', value: potenciaReal.toFixed(2) + ' kWp' },
        { label: 'Inversor On Grid recomendado', value: '≈ ' + inversorRecomendado.toFixed(1) + ' kW' },
        { label: 'Cobertura seleccionada', value: (porcentajeCobertura * 100).toFixed(0) + '%' },
        { label: 'Categoría de usuario', value: (TARIFAS_ENERGIA[categoriaKey] || { nombre: 'Personalizada' }).nombre },
        { label: 'Consumo anual total', value: consumoAnual.toFixed(0) + ' kWh/año' },
        { label: 'Consumo a cubrir', value: consumoACubrir.toFixed(0) + ' kWh/año' },
        { label: 'Generación anual estimada', value: generacionAnual.toFixed(0) + ' kWh/año' },
        { label: 'Generación mensual prom.', value: (generacionAnual / 12).toFixed(0) + ' kWh/mes' },
        { label: 'Consumo mensual prom.', value: (consumoAnual / 12).toFixed(0) + ' kWh/mes' },
        { label: 'Consumo mensual (detalle)', value: consumosMensuales.map(function(c, i) { return ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][i] + ':' + c; }).join(' | ') },
        { label: 'Cobertura del consumo', value: cobertura.toFixed(1) + '%' },
        { label: 'Ahorro directo (consumo evitado)', value: '$ ' + formatNumber(ahorroDirecto) + '/año' },
        { label: 'Excedente inyectado a red', value: excedenteInyectado.toFixed(0) + ' kWh/año' },
        { label: 'Reintegro por inyección', value: '$ ' + formatNumber(reintegroInyeccion) + '/año' },
        { label: 'Ahorro total anual', value: '$ ' + formatNumber(ahorroAnual) + '/año' },
        { label: 'Ahorro mensual estimado', value: '$ ' + formatNumber(ahorroAnual / 12) },
        { label: 'CO₂ evitado por año', value: co2Evitado.toFixed(0) + ' kg' }
    ];

    items.forEach(function(item) {
        const li = document.createElement('li');
        li.innerHTML = '<strong>' + item.label + ':</strong> ' + item.value;
        detalle.appendChild(li);
    });

    // --- Descripción del sistema óptimo ---
    const descripcion = document.getElementById('descripcion-sistema');
    descripcion.innerHTML = '';

    const descripcionHTML = `
        <div class="sistema-tipo">
            <span class="badge">⚡ Sistema On Grid</span>
            <p>Sistema conectado a la red eléctrica para maximizar el ahorro en tu factura de luz. Genera energía durante el día y el excedente se inyecta a la red.</p>
        </div>
        <div class="equipo-recomendado">
            <h4>🔆 Paneles Solares</h4>
            <p><strong>${potenciaReal.toFixed(2)} kWp</strong> de paneles solares</p>
        </div>
        <div class="equipo-recomendado">
            <h4>⚡ Inversor On Grid</h4>
            <p><strong>≈ ${inversorRecomendado.toFixed(1)} kW</strong> de inversor recomendado</p>
        </div>
        <div class="rendimiento-estimado">
            <h4>📈 Rendimiento Estimado</h4>
            <p>Generación anual: <strong>${generacionAnual.toFixed(0)} kWh</strong> (${cobertura.toFixed(0)}% de tu consumo)</p>
            <p>Ahorro anual: <strong>$${formatNumber(ahorroAnual)}</strong></p>
            <p>Ahorro mensual: <strong>$${formatNumber(ahorroAnual / 12)}</strong></p>
            <p>CO₂ evitado: <strong>${co2Evitado.toFixed(0)} kg/año</strong> 🌱</p>
        </div>
    `;

    descripcion.innerHTML = descripcionHTML;

    // --- Generar gráfico de barras mensual ---
    generarGrafico(consumosMensuales, potenciaReal, radiacion, factorTotal, localidadKey);

    // --- Mostrar la sección de resultados ---
    const resultados = document.getElementById('resultados');
    resultados.classList.remove('hidden');
    resultados.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function generarGrafico(consumosMensuales, potenciaReal, radiacionPromedio, factorTotal, localidadKey) {
    const contenedor = document.getElementById('grafico-barras');
    contenedor.innerHTML = '';

    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const radiacionMensual = RADIACION_MENSUAL[localidadKey] || RADIACION_MENSUAL['corrientes'];

    // Calcular generación mensual estimada (kWh/mes)
    const generacionMensual = radiacionMensual.map(function(rad) {
        return potenciaReal * rad * 30 * EFICIENCIA_SISTEMA * factorTotal;
    });

    // Calcular % cubierto por mes
    const coberturaMensual = consumosMensuales.map(function(consumo, i) {
        if (consumo <= 0) return 0;
        return Math.min((generacionMensual[i] / consumo) * 100, 100);
    });

    // Encontrar el valor máximo para escalar las barras
    const maxValor = Math.max(
        ...consumosMensuales,
        ...generacionMensual,
        1
    );

    // Altura máxima del gráfico en px
    const alturaMax = 180;

    for (let i = 0; i < 12; i++) {
        const columna = document.createElement('div');
        columna.className = 'grafico-columna';

        const inner = document.createElement('div');
        inner.className = 'grafico-barras-inner';

        // Barra de consumo
        const barraConsumo = document.createElement('div');
        barraConsumo.className = 'barra barra-consumo';
        barraConsumo.style.height = Math.max((consumosMensuales[i] / maxValor) * alturaMax, 2) + 'px';
		barraConsumo.style.width = 22 + 'px';
        barraConsumo.title = 'Consumo: ' + consumosMensuales[i].toFixed(0) + ' kWh';
        inner.appendChild(barraConsumo);

        // Barra de generación
        const barraGeneracion = document.createElement('div');
        barraGeneracion.className = 'barra barra-generacion';
        barraGeneracion.style.height = Math.max((generacionMensual[i] / maxValor) * alturaMax, 2) + 'px';
		barraGeneracion.style.width = 22 + 'px';
        barraGeneracion.title = 'Generación: ' + generacionMensual[i].toFixed(0) + ' kWh';
        inner.appendChild(barraGeneracion);

        columna.appendChild(inner);

        // Etiqueta del mes
        const mesLabel = document.createElement('div');
        mesLabel.className = 'grafico-mes';
        mesLabel.textContent = meses[i];
        columna.appendChild(mesLabel);

        // Valor de cobertura (solo número, sin barra)
        const valorLabel = document.createElement('div');
        valorLabel.className = 'grafico-valor';
        valorLabel.textContent = coberturaMensual[i].toFixed(0) + '%';
        valorLabel.title = 'Cobertura: ' + coberturaMensual[i].toFixed(0) + '%';
        columna.appendChild(valorLabel);

        contenedor.appendChild(columna);
    }
}

function formatNumber(num) {
    return num.toLocaleString('es-AR', { maximumFractionDigits: 0 });
}