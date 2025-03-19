const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Verifica si hay un tema guardado en el almacenamiento local
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'dark-mode') {
        themeIcon.textContent = '🌙';
        themeIcon.classList.add('moon');
    } else {
        themeIcon.textContent = '☀️';
        themeIcon.classList.add('sun');
    }
} else {
    // Si no hay tema guardado, establece el tema por defecto (claro)
    themeIcon.textContent = '☀️';
    themeIcon.classList.add('sun');
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        themeIcon.textContent = '☀️';
        themeIcon.classList.remove('moon');
        themeIcon.classList.add('sun');
        localStorage.setItem('theme', ''); // Elimina el tema del almacenamiento local
    } else {
        body.classList.add('dark-mode');
        themeIcon.textContent = '🌙';
        themeIcon.classList.remove('sun');
        themeIcon.classList.add('moon');
        localStorage.setItem('theme', 'dark-mode'); // Guarda el tema en el almacenamiento local
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        menu.classList.toggle('active');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20, // Ajusta el offset según sea necesario
                    behavior: 'smooth'
                });

                // Cierra el menú después de hacer clic (opcional)
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // ... (Tu código JavaScript anterior aquí) ...

    // Referencias a los selectores de fecha de nacimiento
    const diaNacimientoSelect = document.getElementById('diaNacimiento');
    const mesNacimientoSelect = document.getElementById('mesNacimiento');
    const anioNacimientoSelect = document.getElementById('anioNacimiento');

    // Función para llenar los días
    function llenarDias(mes, anio) {
        diaNacimientoSelect.innerHTML = ''; // Limpiar los días anteriores
        const diasEnMes = new Date(anio, mes, 0).getDate(); // Obtener la cantidad de días en el mes

        for (let i = 1; i <= diasEnMes; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            diaNacimientoSelect.appendChild(option);
        }
    }

    // Función para llenar los años (desde 1950 hasta el año actual)
    function llenarAnios() {
        const anioActual = new Date().getFullYear();
        for (let i = anioActual; i >= 1950; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            anioNacimientoSelect.appendChild(option);
        }
    }

    // Llenar los años al cargar la página
    llenarAnios();

    // Llenar los días al cargar la página (con el mes y año iniciales)
    llenarDias(mesNacimientoSelect.value, anioNacimientoSelect.value);

    // Escuchar los cambios en el mes y el año para actualizar los días
    mesNacimientoSelect.addEventListener('change', function () {
        llenarDias(this.value, anioNacimientoSelect.value);
    });

    anioNacimientoSelect.addEventListener('change', function () {
        llenarDias(mesNacimientoSelect.value, this.value);
    });
});

document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const enfermedadCronicaRadios = document.querySelectorAll('input[name="enfermedadCronica"]');
  const cualEnfermedadInput = document.getElementById('cualEnfermedad');

  // Función para mostrar/ocultar el campo "cualEnfermedad"
  function toggleCualEnfermedad() {
    if (document.querySelector('input[name="enfermedadCronica"]:checked')?.value === 'si') {  // Use optional chaining
      cualEnfermedadInput.style.display = 'block';
    } else {
      cualEnfermedadInput.style.display = 'none';
      cualEnfermedadInput.value = ''; // Limpiar el campo si se oculta
    }
  }

  // Event Listeners
  enfermedadCronicaRadios.forEach(radio => {
    radio.addEventListener('change', toggleCualEnfermedad);
  });

  // Initial state on page load
  toggleCualEnfermedad(); // Check the initial state when the page loads.
});

document.addEventListener('DOMContentLoaded', function() {
  // Obtener referencias a los elementos del DOM
  const tieneHijosSelect = document.getElementById('tieneHijos');
  const datosHijosDiv = document.getElementById('datosHijos');
  const cantidadHijosSelect = document.getElementById('cantidadHijos');
  const hijosContainerDiv = document.getElementById('hijosContainer');

  // Función para mostrar u ocultar la sección de datos de hijos
  function toggleDatosHijos() {
    if (tieneHijosSelect.value === 'si') {
      datosHijosDiv.style.display = 'block';
      actualizarCamposHijos(); // Asegurarse de generar los campos al mostrar
    } else {
      datosHijosDiv.style.display = 'none';
      hijosContainerDiv.innerHTML = ''; // Limpiar los campos si se oculta
    }
  }

  // Función para actualizar dinámicamente los campos para cada hijo
  function actualizarCamposHijos() {
    const cantidadHijos = parseInt(cantidadHijosSelect.value);
    hijosContainerDiv.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos campos

    for (let i = 1; i <= cantidadHijos; i++) {
      // Crear elementos para cada hijo
      const hijoDiv = document.createElement('div');
      hijoDiv.classList.add('hijo-group'); // Agregar una clase para estilos (opcional)

      const nombreLabel = document.createElement('label');
      nombreLabel.textContent = `Nombre del hijo ${i}:`;
      nombreLabel.setAttribute('for', `nombreHijo${i}`);  // Importante para la accesibilidad
      const nombreInput = document.createElement('input');
      nombreInput.type = 'text';
      nombreInput.id = `nombreHijo${i}`;
      nombreInput.name = `nombreHijo${i}`;  // Importante para el envío del formulario
      nombreInput.classList.add('form-control'); // Agregar clase de bootstrap para estilo (opcional)

      const edadLabel = document.createElement('label');
      edadLabel.textContent = `Edad del hijo ${i}:`;
      edadLabel.setAttribute('for', `edadHijo${i}`); // Importante para la accesibilidad
      const edadInput = document.createElement('input');
      edadInput.type = 'number';
      edadInput.id = `edadHijo${i}`;
      edadInput.name = `edadHijo${i}`; // Importante para el envío del formulario
      edadInput.classList.add('form-control'); // Agregar clase de bootstrap para estilo (opcional)
      edadInput.min = '0'; // Evita edades negativas

      // Agregar los elementos al contenedor del hijo
      hijoDiv.appendChild(nombreLabel);
      hijoDiv.appendChild(nombreInput);
      hijoDiv.appendChild(edadLabel);
      hijoDiv.appendChild(edadInput);

      // Agregar el contenedor del hijo al contenedor principal
      hijosContainerDiv.appendChild(hijoDiv);
    }
  }

  // Escuchar los cambios en el select "¿Tiene hijos?"
  tieneHijosSelect.addEventListener('change', toggleDatosHijos);

  // Escuchar los cambios en el select "¿Cuántos?"
  cantidadHijosSelect.addEventListener('change', actualizarCamposHijos);

  // Llamar a toggleDatosHijos inicialmente para manejar el estado inicial
  toggleDatosHijos(); // Importante!  Se asegura de que al cargar la página, el estado sea correcto.
});

document.addEventListener('DOMContentLoaded', function () {
    // ... (Escolaridad) ...

    const checkboxes = document.querySelectorAll('input[name="estudiosRealizados"]');
    const seccionesEscolaridad = document.getElementById('seccionesEscolaridad');

    // Función para crear un input de tipo date
    function createDateInput(id, label, name) {
        return `
            <div class="form-group">
                <label for="${id}">${label}</label>
                <input type="date" id="${id}" name="${name}">
            </div>
        `;
    }

    const sections = {
        primaria: `
            <section>
                <h3>Sección de primaria</h3>
                <div class="form-group">
                    <label for="nombrePrimaria">¿Nombre de tu primaria?</label>
                    <input type="text" id="nombrePrimaria" name="nombrePrimaria">
                </div>
                <div class="form-group">
                    <label for="direccionPrimaria">¿Dirección de tu primaria?</label>
                    <input type="text" id="direccionPrimaria" name="direccionPrimaria">
                </div>
                ${createDateInput("periodoPrimaria", "¿Periodo en qué cursaste tu primaria?", "periodoPrimaria")}
                <div class="form-group">
                    <label for="aniosPrimaria">¿Total de años cursados?</label>
                    <select id="aniosPrimaria" name="aniosPrimaria">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="tituloPrimaria">¿Título recibido?</label>
                    <select id="tituloPrimaria" name="tituloPrimaria">
                        <option value="certificado">Certificado</option>
                        <option value="truncado">Truncado</option>
                    </select>
                </div>
            </section>
        `,
        secundaria: `
            <section>
                <h3>Sección de secundaria</h3>
                <div class="form-group">
                    <label for="nombreSecundaria">¿Nombre de tu secundaria?</label>
                    <input type="text" id="nombreSecundaria" name="nombreSecundaria">
                </div>
                <div class="form-group">
                    <label for="direccionSecundaria">¿Dirección de tu secundaria?</label>
                    <input type="text" id="direccionSecundaria" name="direccionSecundaria">
                </div>
                ${createDateInput("periodoSecundaria", "¿Periodo en qué cursaste tu secundaria?", "periodoSecundaria")}
                <div class="form-group">
                    <label for="aniosSecundaria">¿Total de años cursados?</label>
                    <select id="aniosSecundaria" name="aniosSecundaria">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="tituloSecundaria">¿Título recibido?</label>
                    <select id="tituloSecundaria" name="tituloSecundaria">
                        <option value="certificado">Certificado</option>
                        <option value="truncado">Truncado</option>
                    </select>
                </div>
            </section>
        `,
        preparatoria: `
            <section>
                <h3>Sección de preparatoria</h3>
                <div class="form-group">
                    <label for="nombrePreparatoria">¿Nombre de tu preparatoria?</label>
                    <input type="text" id="nombrePreparatoria" name="nombrePreparatoria">
                </div>
                <div class="form-group">
                    <label for="direccionPreparatoria">¿Dirección de tu preparatoria?</label>
                    <input type="text" id="direccionPreparatoria" name="direccionPreparatoria">
                </div>
                ${createDateInput("periodoPreparatoria", "¿Periodo en qué cursaste tu preparatoria?", "periodoPreparatoria")}
                <div class="form-group">
                    <label for="aniosPreparatoria">¿Total de años cursados?</label>
                    <select id="aniosPreparatoria" name="aniosPreparatoria">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="tituloPreparatoria">¿Título recibido?</label>
                    <select id="tituloPreparatoria" name="tituloPreparatoria">
                        <option value="certificado">Certificado</option>
                        <option value="truncado">Truncado</option>
                    </select>
                </div>
            </section>
        `,
        universidad: `
            <section>
                <h3>Sección de universidad</h3>
                <div class="form-group">
                    <label for="nombreUniversidad">¿Nombre de tu universidad?</label>
                    <input type="text" id="nombreUniversidad" name="nombreUniversidad">
                </div>
                <div class="form-group">
                    <label for="direccionUniversidad">¿Dirección de tu universidad?</label>
                    <input type="text" id="direccionUniversidad" name="direccionUniversidad">
                </div>
                ${createDateInput("periodoUniversidad", "¿Periodo en qué cursaste tu universidad?", "periodoUniversidad")}
                <div class="form-group">
                    <label for="aniosUniversidad">¿Total de años cursados?</label>
                    <select id="aniosUniversidad" name="aniosUniversidad">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="tituloUniversidad">¿Título recibido?</label>
                    <select id="tituloUniversidad" name="tituloUniversidad">
                        <option value="certificado">Certificado</option>
                        <option value="truncado">Truncado</option>
                    </select>
                </div>
            </section>
        `,
        adicionales: `
            <section>
                <h3>Sección institución de estudios adicionales</h3>
                <div class="form-group">
                    <label for="nombreAdicionales">¿Nombre de la institución de estudio adicional?</label>
                    <input type="text" id="nombreAdicionales" name="nombreAdicionales">
                </div>
                <div class="form-group">
                    <label for="direccionAdicionales">¿Dirección de la institución de estudio adicional?</label>
                    <input type="text" id="direccionAdicionales" name="direccionAdicionales">
                </div>
                ${createDateInput("periodoAdicionales", "¿Periodo en qué cursaste la institución de estudio adicional?", "periodoAdicionales")}
                <div class="form-group">
                    <label for="aniosAdicionales">¿Total de años cursados?</label>
                    <select id="aniosAdicionales" name="aniosAdicionales">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="tituloAdicionales">¿Título recibido?</label>
                    <select id="tituloAdicionales" name="tituloAdicionales">
                        <option value="certificado">Certificado</option>
                        <option value="truncado">Truncado</option>
                    </select>
                </div>
            </section>
        `,
    };

    function updateSections() {
        seccionesEscolaridad.innerHTML = '';
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                seccionesEscolaridad.innerHTML += sections[checkbox.value];
            }
        });
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSections);
    });

    // Estudios actuales
    const estudiaSi = document.getElementById('estudiaSi');
    const estudiaNo = document.getElementById('estudiaNo');
    const seccionEstudiosActuales = document.getElementById('seccionEstudiosActuales');
    const fechaInicioEstudios = createDateInput("fechaInicioEstudios", "¿Fecha en qué comenzaste tu plan de estudio actual?", "fechaInicioEstudios");
    const fechaFinEstudios = createDateInput("fechaFinEstudios", "¿Cuándo terminas tu periodo de estudio?", "fechaFinEstudios");

    seccionEstudiosActuales.innerHTML = fechaInicioEstudios + fechaFinEstudios;
    seccionEstudiosActuales.style.display = 'none'; // Ocultar por defecto

    estudiaSi.addEventListener('change', function () {
        seccionEstudiosActuales.style.display = 'block';
    });

    estudiaNo.addEventListener('change', function () {
        seccionEstudiosActuales.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Función para generar las secciones de empleo
    function generarSeccionEmpleo(tipo) {
        const empleo = tipo.charAt(0).toUpperCase() + tipo.slice(1); // Capitaliza la primera letra
        return `
            <section>
                <h3>Empleo ${empleo}</h3>
                <div class="form-group">
                    <label for="nombreEmpresa${empleo}">¿Nombre de la empresa?</label>
                    <input type="text" id="nombreEmpresa${empleo}" name="nombreEmpresa${empleo}">
                </div>
                <div class="form-group">
                    <label>¿Tiempo que prestó sus servicios?</label>
                    <div class="fechas">
                        <label for="fechaIngreso${empleo}">Fecha de ingreso:</label>
                        <input type="date" id="fechaIngreso${empleo}" name="fechaIngreso${empleo}">
                        <label for="fechaRenuncia${empleo}">Fecha de renuncia:</label>
                        <input type="date" id="fechaRenuncia${empleo}" name="fechaRenuncia${empleo}">
                    </div>
                </div>
                <div class="form-group">
                    <label for="direccionEmpresa${empleo}">¿Dirección de la empresa?</label>
                    <input type="text" id="direccionEmpresa${empleo}" name="direccionEmpresa${empleo}">
                </div>
                <div class="form-group">
                    <label for="telefonoEmpresa${empleo}">¿Teléfono de la empresa?</label>
                    <input type="text" id="telefonoEmpresa${empleo}" name="telefonoEmpresa${empleo}" inputmode="numeric" pattern="[0-9]{0,10}" maxlength="10" oninput="this.value = this.value.replace(/[^0-9]/g, '');">
                </div>
                <div class="form-group">
                    <label for="puestoDesempenado${empleo}">¿Puesto que desempeñaste?</label>
                    <input type="text" id="puestoDesempenado${empleo}" name="puestoDesempenado${empleo}">
                </div>
                <div class="form-group sueldo-container">
                    <label for="sueldoGanabas${empleo}">¿Sueldo que ganabas?</label>
                    <input type="text" id="sueldoGanabas${empleo}" name="sueldoGanabas${empleo}" class="sueldo" inputmode="numeric">
                </div>
                <div class="form-group">
                    <label for="motivoSeparacion${empleo}">¿Motivo de tu separación de la empresa?</label>
                    <select id="motivoSeparacion${empleo}" name="motivoSeparacion${empleo}">
                        <option value="">Seleccione un motivo</option>
                        <option value="sueldo">Sueldo</option>
                        <option value="sinCrecimiento">Sin crecimiento</option>
                        <option value="ambienteLaboral">Ambiente laboral</option>
                        <option value="renunciaForzada">Renuncia forzada</option>
                        <option value="cortePersonal">Corte de personal</option>
                        <option value="renunciaVoluntaria">Renuncia voluntaria</option>
                        <option value="renunciaConspiracion">Renuncia por conspiracion</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="nombreJefe${empleo}">¿Nombre de tu jefe directo?</label>
                    <input type="text" id="nombreJefe${empleo}" name="nombreJefe${empleo}">
                </div>
                <div class="form-group">
                    <label for="puestoJefe${empleo}">¿Puesto de tu jefe directo?</label>
                    <select id="puestoJefe${empleo}" name="puestoJefe${empleo}">
                        <option value="">Seleccione un puesto</option>
                        <option value="encargadoTurno">Encargado de turno</option>
                        <option value="jefeLinea">Jefe de línea</option>
                        <option value="supervisor">Supervisor</option>
                        <option value="rh">RH</option>
                        <option value="copropietario">Copropietario</option>
                        <option value="duenoPropietario">Dueño y propietario</option>
                    </select>
                </div>
            </section>
        `;
    }

    const cantidadEmpleosSelect = document.getElementById('cantidadEmpleos');
    const seccionesEmpleoDiv = document.getElementById('seccionesEmpleo');
    const informesEmpresasSelect = document.getElementById('informesEmpresas');
    const razonNoInformesDiv = document.getElementById('razonNoInformes');

    function actualizarSeccionesEmpleo() {
        const cantidad = parseInt(cantidadEmpleosSelect.value);
        seccionesEmpleoDiv.innerHTML = ''; // Limpiar las secciones existentes

        for (let i = 1; i <= cantidad; i++) {
            let tipo;
            switch (i) {
                case 1:
                    tipo = "reciente";
                    break;
                case 2:
                    tipo = "anterior";
                    break;
                case 3:
                    tipo = "penúltimo";
                    break;
                case 4:
                    tipo = "antepenúltimo";
                    break;
            }
            seccionesEmpleoDiv.innerHTML += generarSeccionEmpleo(tipo);
        }
         // Después de crear las secciones, aplicar el formato de moneda
         formatearCamposSueldo();
    }

    function formatearCamposSueldo() {
        const sueldoInputs = document.querySelectorAll('.sueldo');
        sueldoInputs.forEach(input => {
            let previousValue = '';
            let isFocused = false; // Nueva variable para rastrear si el campo tiene el foco

            input.addEventListener('focus', function (e) {
                if (!isFocused) { // Verificar si el foco ya se ha establecido
                    if (!e.target.value) {
                        e.target.value = '$ ';
                    }
                    previousValue = e.target.value;
                    isFocused = true; // Establecer que el foco está activo
                }
            });

            input.addEventListener('input', function (e) {
                let value = e.target.value;

                // Remover el símbolo de dólar y espacios al principio
                value = value.replace(/^\$\s*/, '');

                // Permitir solo números, comas y puntos
                value = value.replace(/[^\d,.]/g, '');

                // Permitir solo un punto decimal o una coma
                const decimalCount = (value.match(/[.,]/g) || []).length;
                if (decimalCount > 1) {
                    value = previousValue.replace(/^\$\s*/, ''); // Revertir al valor anterior sin el $
                }

                //Solo permitir un punto o coma
                if (value.indexOf('.') > -1 && value.indexOf(',') > -1) {
                     value = previousValue.replace(/^\$\s*/, ''); // Revertir al valor anterior sin el $
                }

                // Formatear con comas para miles
                let [integerPart, decimalPart] = value.split(/[.,]/); // Dividir por coma o punto
                integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                // Reconstruir el valor
                value = integerPart + (decimalPart ? '.' + decimalPart : '');

                e.target.value = '$ ' + value;
                previousValue = e.target.value;
            });

            input.addEventListener('blur', function (e) {
                if (e.target.value === '$ ') {
                    e.target.value = '';
                }
                isFocused = false; // Resetear cuando el campo pierde el foco
            });
        });
    }

    cantidadEmpleosSelect.addEventListener('change', actualizarSeccionesEmpleo);

    // Inicializar las secciones de empleo y el formato de moneda al cargar la página
    actualizarSeccionesEmpleo();

      // Mostrar/Ocultar el campo "¿Por qué No?"
      if (informesEmpresasSelect) {
        informesEmpresasSelect.addEventListener('change', function () {
            if (this.value === 'no') {
                razonNoInformesDiv.style.display = 'block';
            } else {
                razonNoInformesDiv.style.display = 'none';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // ... (Tu código JavaScript anterior aquí) ...

    // Función para generar la sección de una referencia
    function generarSeccionReferencia(numero) {
        return `
            <section>
                <h3>Referencia ${numero}</h3>
                <div class="form-group">
                    <label for="nombreReferencia${numero}">¿Nombre de tu referencia?</label>
                    <input type="text" id="nombreReferencia${numero}" name="nombreReferencia${numero}">
                </div>
                <div class="form-group">
                    <label>¿Domicilio de tu referencia?</label>
                    <div class="direccion">
                        <input type="text" id="calleReferencia${numero}" name="calleReferencia${numero}" placeholder="Calle">
                        <input type="text" id="coloniaReferencia${numero}" name="coloniaReferencia${numero}" placeholder="Colonia">
                    </div>
                </div>
                <div class="form-group">
                    <label for="telefonoReferencia${numero}">¿Teléfono de tu referencia?</label>
                    <input type="number" id="telefonoReferencia${numero}" name="telefonoReferencia${numero}">
                </div>
                <div class="form-group">
                    <label for="ocupacionReferencia${numero}">¿Ocupación de tu referencia?</label>
                    <input type="text" id="ocupacionReferencia${numero}" name="ocupacionReferencia${numero}">
                </div>
                <div class="form-group">
                    <label for="tiempoConocerlo${numero}">¿Tiempo de conocerlo (años)?</label>
                    <input type="number" id="tiempoConocerlo${numero}" name="tiempoConocerlo${numero}" maxlength="2">
                </div>
            </section>
        `;
    }

    const cantidadReferenciasSelect = document.getElementById('cantidadReferencias');
    const seccionesReferenciasDiv = document.getElementById('seccionesReferencias');

    function actualizarSeccionesReferencias() {
        const cantidad = parseInt(cantidadReferenciasSelect.value);
        seccionesReferenciasDiv.innerHTML = ''; // Limpiar las secciones existentes

        for (let i = 1; i <= cantidad; i++) {
            seccionesReferenciasDiv.innerHTML += generarSeccionReferencia(i);
        }
    }

    cantidadReferenciasSelect.addEventListener('change', actualizarSeccionesReferencias);

    // Inicializar las secciones de referencias al cargar la página
    actualizarSeccionesReferencias();
});

document.addEventListener('DOMContentLoaded', function() {

    // Funciones para mostrar/ocultar divs (general)
    function toggleDiv(radioSi, divToShow) {
        const radioNo = radioSi.id.replace('Si', 'No');
        const radioNoElement = document.getElementById(radioNo);

        if(radioSi.checked) {
            divToShow.classList.remove('oculto');
        }

        radioSi.addEventListener('change', function() {
            divToShow.classList.remove('oculto');
        });

        radioNoElement.addEventListener('change', function() {
            divToShow.classList.add('oculto');
        });
    }

    // Funciones para mostrar/ocultar divs (específica para las preguntas 6 y 7)
    function toggleDivInvertido(radioNo, divToShow) {
        const radioSi = radioNo.id.replace('No', 'Si');
        const radioSiElement = document.getElementById(radioSi);

        if(radioNo.checked) {
            divToShow.classList.remove('oculto');
        }

        radioNo.addEventListener('change', function() {
            divToShow.classList.remove('oculto');
        });

        radioSiElement.addEventListener('change', function() {
            divToShow.classList.add('oculto');
        });
    }


    //  Pariente
    const parienteSi = document.getElementById('parienteSi');
    const divNombrePariente = document.getElementById('divNombrePariente');
    toggleDiv(parienteSi, divNombrePariente);

    //  Afianzado
    const afianzadoSi = document.getElementById('afianzadoSi');
    const divNombreEntidadAfianzadora = document.getElementById('divNombreEntidadAfianzadora');
    toggleDiv(afianzadoSi, divNombreEntidadAfianzadora);

    //  Sindicato
    const sindicatoSi = document.getElementById('sindicatoSi');
    const divNombreSindicato = document.getElementById('divNombreSindicato');
    toggleDiv(sindicatoSi, divNombreSindicato);

    //  Seguro de vida
    const seguroVidaSi = document.getElementById('seguroVidaSi');
    const divSeguroVida = document.getElementById('divSeguroVida');
    toggleDiv(seguroVidaSi, divSeguroVida);

    //  Puede viajar
    const puedeViajarNo = document.getElementById('puedeViajarNo'); // Cambiado a 'No'
    const divRazonesViaje = document.getElementById('divRazonesViaje');
    toggleDivInvertido(puedeViajarNo, divRazonesViaje); // Usa la función invertida

    // Cambio de residencia
    const cambioResidenciaNo = document.getElementById('cambioResidenciaNo'); // Cambiado a 'No'
    const divRazonesResidencia = document.getElementById('divRazonesResidencia');
    toggleDivInvertido(cambioResidenciaNo, divRazonesResidencia); // Usa la función invertida

    // Suma Asegurada - Validación (Solo números y punto decimal)
    const sumaAseguradaInput = document.getElementById('sumaAsegurada');
    sumaAseguradaInput.addEventListener('input', function(event) {
        let value = event.target.value;
        // Elimina cualquier carácter que no sea un dígito o un punto
        value = value.replace(/[^0-9.]/g, '');
        // Permite solo un punto decimal
        if ((value.split(".").length - 1) > 1) {
            value = value.substring(0, value.length - 1);
        }
        event.target.value = value;
    });
});