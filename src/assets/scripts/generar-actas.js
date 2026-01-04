const STORAGE_KEY = "acta_acuerdos_data";

    let units = [
      {
        title: "Unidad I. Modelos de Negocios Electrónicos.",
        evidences: [
          "EP1. Resuelve cuestionario donde identifica y define los elementos tecnológicos que intervienen en el comercio electrónico así como los diferentes modelos de e-Business (B2C, C2C, B2B, etc.)",
        ],
      },
    ];

    let saveTimeout;
    function showSaveStatus() {
      const status = document.getElementById("save-status");
      if (!status) return;
      
      status.classList.remove("opacity-0");
      status.classList.add("opacity-100");
      
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        status.classList.remove("opacity-100");
        status.classList.add("opacity-0");
      }, 2000);
    }

    function saveToLocalStorage() {
      const data = {
        units,
        inputs: {
          logoUrl: document.getElementById("logoUrl").value,
          materia: document.getElementById("materia").value,
          carrera: document.getElementById("carrera").value,
          grupo: document.getElementById("grupo").value,
          periodoEval: document.getElementById("periodoEval").value,
          fechaCelebracion: document.getElementById("fechaCelebracion").value,
          horaIni: document.getElementById("horaIni").value,
          horaFin: document.getElementById("horaFin").value,
          p_producto: document.getElementById("p_producto").value,
          p_conocimiento: document.getElementById("p_conocimiento").value,
          p_desempeno: document.getElementById("p_desempeno").value,
          p_actitudinal: document.getElementById("p_actitudinal").value,
          c1: document.getElementById("c1").value,
          c2: document.getElementById("c2").value,
          c3: document.getElementById("c3").value,
          r1: document.getElementById("r1").value,
          r2: document.getElementById("r2").value,
          r3: document.getElementById("r3").value,
          numAlumnos: document.getElementById("numAlumnos").value,
          docente: document.getElementById("docente").value,
        },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      showSaveStatus();
    }

    function loadFromLocalStorage() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          if (data.units) units = data.units;
          if (data.inputs) {
            Object.keys(data.inputs).forEach((id) => {
              const el = document.getElementById(id);
              if (el) el.value = data.inputs[id];
            });
          }
        } catch (e) {
          console.error("Error loading from localStorage", e);
        }
      }
    }

    function clearData() {
      if (confirm("¿Estás seguro de que deseas limpiar todos los datos?")) {
        localStorage.removeItem(STORAGE_KEY);
        
        // Reset units to a single empty unit
        units = [
          {
            title: "",
            evidences: [""],
          },
        ];

        // Clear all inputs
        const inputs = document.querySelectorAll(
          "#logoUrl, #materia, #carrera, #grupo, #periodoEval, #fechaCelebracion, #horaIni, #horaFin, #p_producto, #p_conocimiento, #p_desempeno, #p_actitudinal, #c1, #c2, #c3, #r1, #r2, #r3, #numAlumnos, #docente"
        );
        inputs.forEach((input) => {
          input.value = "";
        });

        renderUnitsEditor();
        updatePreview();
      }
    }

    function addUnit() {
      units.push({
        title: "Nueva Unidad",
        evidences: ["Descripción de evidencia"],
      });
      renderUnitsEditor();
      updatePreview();
      saveToLocalStorage();
    }

    function addEvidence(unitIndex) {
      units[unitIndex].evidences.push("Nueva evidencia");
      renderUnitsEditor();
      updatePreview();
      saveToLocalStorage();
    }

    function removeEvidence(unitIndex, evidenceIndex) {
      units[unitIndex].evidences.splice(evidenceIndex, 1);
      renderUnitsEditor();
      updatePreview();
      saveToLocalStorage();
    }

    function removeUnit(index) {
      if (confirm("¿Estás seguro de eliminar esta unidad?")) {
        units.splice(index, 1);
        renderUnitsEditor();
        updatePreview();
        saveToLocalStorage();
      }
    }

    function renderUnitsEditor() {
      const list = document.getElementById("units-list");
      list.innerHTML = "";
      units.forEach((u, i) => {
        const evidencesHTML = u.evidences
          .map(
            (ev, ei) => `
          <div class="evidence-item">
            <div class="flex w-full gap-2">
              <textarea class="dark:bg-zinc-900 w-full form-textarea flex-1 text-sm" rows="2" oninput="units[${i}].evidences[${ei}] = this.value; updatePreview(); saveToLocalStorage()" placeholder="Descripción de evidencia">${ev}</textarea>
              <button onclick="removeEvidence(${i}, ${ei})" class="btn-danger self-start color-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        `
          )
          .join("");

        const div = document.createElement("div");
        div.className = "unit-card fade-in";
        div.innerHTML = `
          <div class="flex justify-between items-start mb-3">
            <span class="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">Unidad ${i + 1}</span>
            <button onclick="removeUnit(${i})" class="btn-danger color-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
          <div class="mb-3">
            <input type="text" class="dark:bg-zinc-900 w-full form-input font-semibold" value="${u.title}" 
              oninput="units[${i}].title = this.value; updatePreview(); saveToLocalStorage()" 
              onkeydown="if(event.key==='Enter'){ event.preventDefault(); addEvidence(${i}) }"
              placeholder="Título de la unidad">
          </div>
          <div>
            <label class="form-label mb-2">Evidencias</label>
            ${evidencesHTML}
            <button onclick="addEvidence(${i})" class="flex text-center text-purple-500 items-center justify-center gap-2 btn-secondary text-xs mt-2 hover:text-purple-300">
              <svg class="w-3 h-3 items-center justify-center" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Agregar Evidencia (Enter en título)
            </button>
          </div>
        `;
        list.appendChild(div);
      });
    }

    function updatePreview() {
      const val = (id) => document.getElementById(id).value;
      
      // Update percentage total
      const pProd = parseInt(val("p_producto")) || 0;
      const pCono = parseInt(val("p_conocimiento")) || 0;
      const pDese = parseInt(val("p_desempeno")) || 0;
      const pActi = parseInt(val("p_actitudinal")) || 0;
      const total = pProd + pCono + pDese + pActi;
      
      const totalEl = document.getElementById("percentage-total");
      if (totalEl) {
        totalEl.textContent = `Total: ${total}%`;
        if (total !== 100) {
          totalEl.classList.remove("bg-zinc-100", "dark:bg-zinc-800", "text-zinc-600", "dark:text-zinc-400");
          totalEl.classList.add("bg-red-100", "dark:bg-red-900/30", "text-red-600", "dark:text-red-400");
        } else {
          totalEl.classList.remove("bg-red-100", "dark:bg-red-900/30", "text-red-600", "dark:text-red-400");
          totalEl.classList.add("bg-green-100", "dark:bg-green-900/30", "text-green-600", "dark:text-green-400");
        }
      }

      const numAlumnos = parseInt(val("numAlumnos")) || 1;
      const materia = val("materia");
      const carrera = val("carrera");
      const grupo = val("grupo");
      const fechaCelebracion = val("fechaCelebracion");

      let alumnosRows = "";
      for (let i = 1; i <= numAlumnos; i++) {
        alumnosRows += `
          <tr class="h-8">
            <td class="border border-black px-2 text-center text-[10pt]">${i}</td>
            <td class="border border-black px-2"></td>
            <td class="border border-black px-2"></td>
          </tr>
        `;
      }

      const unitsHTML = units
        .map((u) => {
          const evidencesText = u.evidences
            .map(
              (ev) =>
                `<p class="ml-4 italic text-[10.5pt] leading-snug mb-1">${ev}</p>`
            )
            .join("");
          return `
          <div class="mb-3">
            <p class="font-bold mb-0 text-[11pt]">${u.title}</p>
            ${evidencesText}
          </div>
        `;
        })
        .join("");

      const logoUrl = val("logoUrl");
      const logoHTML = logoUrl
        ? `
        <div class="mb-8 relative">
          <div class="absolute left-0 top-0 w-24 h-24 flex items-center justify-center">
            ${
              logoUrl.startsWith("http") || logoUrl.startsWith("data:")
                ? `<img src="${logoUrl}" alt="Logo" class="max-w-full max-h-full object-contain" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div style="display:none" class="w-full h-full border-2 border-blue-900 rounded-lg flex items-center justify-center"><span class="text-blue-900 font-bold text-xs">Logo</span></div>`
                : `<div class="w-full h-full border-2 border-blue-900 rounded-lg flex items-center justify-center bg-blue-50"><span class="text-blue-900 font-bold text-sm">Logo</span></div>`
            }
          </div>
          <div class="text-center font-bold">
            <p class="text-xs mb-2 text-gray-600" style="text-align: right;">Acta de Acuerdos</p>
            <p class="text-xl mb-2 tracking-wide">ACTA DE ACUERDOS</p>
            <p class="text-base mb-2">${materia}</p>
            <p class="text-sm uppercase font-black">${carrera}</p>
          </div>
        </div>
      `
        : `
        <div class="text-center font-bold mb-8">
          <p class="text-xs mb-2 text-gray-600" style="text-align: right;">Acta de Acuerdos</p>
          <p class="text-xl mb-2 tracking-wide">ACTA DE ACUERDOS</p>
          <p class="text-base mb-2">${materia}</p>
          <p class="text-sm uppercase font-black">${carrera}</p>
        </div>
      `;

      const html = `
        ${logoHTML}

        <div class="text-[11.5pt] space-y-4">
          <p><strong>Acta de acuerdos celebrada en el Grupo ${grupo} de ${carrera}, el día ${fechaCelebracion}.</strong></p>
          
          <p>Siendo las ${val("horaIni")} horas del ${fechaCelebracion.split(" de ")[0]} de ${fechaCelebracion.split(" de ")[1]?.toUpperCase() || ""} se celebra la presente acta de acuerdos con los alumnos del Grupo ${grupo} de la carrera de <strong>${carrera}</strong>, donde se establecen las indicaciones de pase lista, hora de entrada, justificación de faltas, uso de celular en clase, las evidencias a evaluar por cada unidad que marca el manual de la asignatura, características generales a evaluar, entre otros aspectos.</p>

          <div class="space-y-2">
            <p>1.- En primer término, se acuerda que se pasará lista de asistencia a la hora de entrada puntual, se dará retardo a los 5 minutos como máximo y la falta será después de los 5 minutos de clase. Además, se realizará el pase de lista únicamente al inicio de clase, es por clase, no por hora, es decir; cuando se tengan clases de dos horas, solamente se pasará una vez lista de asistencia.</p>
            <p>2.- Los alumnos para tener derecho a la calificación por corte deberán tener el 80% de asistencia. Las fechas de corte serán: primer corte el <strong>${val("c1")}</strong>, segundo corte el <strong>${val("c2")}</strong> y tercer corte el <strong>${val("c3")}</strong> del presente año.</p>
            <p>3.- La justificación por faltas se hará máximo 48 horas después de haber ocurrido ésta, después del tiempo señalado no habrá justificación, además cuando sea muy frecuente se reportará el caso al maestro tutor o bien a la dirección de la escuela.</p>
            <p>4.- El uso de computadora personal, será a criterio del profesor.</p>
            <p>5.- El uso del celular deberá estar apagado o en vibrador puesto que no se debe estar jugando o mensajeando en hora de clase, en caso de ser sorprendido utilizando el celular o que suene se consignará al profesor para resguardo hasta que lo considere necesario.</p>
            <p>6.- El docente tiene la obligación de solicitar con tiempo las evidencias y tareas programadas para los alumnos.</p>
            <p>7.- Se acuerda que dentro del aula de clases y centro de cómputo no se deben consumir alimentos y bebidas, para tal efecto existe un área designada para el consumo de alimentos al interior de la escuela.</p>
            <p>8.- También se prohíbe el uso de gorras (cachuchas), sombreros y lentes de sol en el aula de clases; al igual que fumar o consumir bebidas alcohólicas dentro de las instalaciones de la Universidad.</p>
            <p>9.- Al final de clases el salón deberá quedar limpio de basura, y las butacas acomodadas, se convino hacer un rol de equipos de aseo para que diariamente se limpie el salón de clases.</p>
            <p>10.- Honestidad en los trabajos (no se permitirán trabajos, ni tareas iguales entre los alumnos) quien sea sorprendido con un trabajo plagiado se anulará ambas partes.</p>
            <p>11.- Cuando se solicite una investigación y sea apoyada con el uso de Internet, se deberá hacer un resumen crítico basada en la información recopilada y no solo copiarla, además de sustentarla con la bibliografía. </p>
            <p>12.- También se acuerda que por cada unidad que marca el manual de Aplicaciones Web, se aplicarán las evidencias y exámenes marcados. Para acreditar la asignatura, el alumno deberá aprobar todos los rubros de evaluación (E. Conocimientos, E. Productos, E. Desempeño y E. Actitudinales) en las evidencias sumativas; si uno de los rubros y/o evidencia es no aprobatorio a la fecha de corte, el alumno tiene el corte no acreditado.</p>
          </div>

          <div class="py-3">
            <p class="font-bold text-start mb-4 text-[12pt]">Porcentajes de evaluación periodo ${val("periodoEval")}</p>
            <div class="grid grid-cols-1 gap-1">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-bold mb-0">Evidencias de producto (Tareas, reportes):</p>
                  <p class="ml-4 mb-0 text-[10.5pt]">- Ortografía y limpieza (10%)</p>
                  <p class="ml-4 mb-0 text-[10.5pt]">- Resultado (20%)</p>
                  <p class="ml-4 mb-0 text-[10.5pt]">- Orden y procedimiento (10%)</p>
                </div>
                <span class="font-bold text-lg">${pProd}%</span>
              </div>
              <div class="flex justify-between mt-2">
                <p class="font-bold">Evidencias de conocimiento (Examen o Proyecto):</p>
                <span class="font-bold text-lg">${pCono}%</span>
              </div>
              <div class="flex justify-between mt-1">
                <p class="font-bold">Evidencias de desempeño (Trabajo en clase):</p>
                <span class="font-bold text-lg">${pDese}%</span>
              </div>
              <div class="flex justify-between mt-1">
                <p class="font-bold">Evidencia actitudinal (Participación, conducta):</p>
                <span class="font-bold text-lg">${pActi}%</span>
              </div>
            </div>
          </div>

          <div class="rounded-sm">
            ${unitsHTML}
          </div>

          <p>13.- Además se evaluará constantemente la disciplina, actitudes y desempeño del alumno dentro del salón de clases y las instalaciones de la UPMYS.</p>
          <p>14.- En caso de que alguna de las evidencias de conocimiento, desempeño y actitudinales no sea aprobadas, el alumno tendrá como fechas de recuperación: <strong>${val("r1")}</strong> (Primer Corte), <strong>${val("r2")}</strong> (Segundo Corte) y <strong>${val("r3")}</strong> (Tercer Corte), con calificación aprobatoria de 7.</p>
          <p>15.- Si el alumno no aprueba alguno de los puntos a evaluar al final de cuatrimestre se les indicará la fecha de recuperación, pero la calificación final será en base a 7, aunque haya obtenido 9 y 10 en las otras evaluaciones o evidencias entregadas en tiempo.</p>

          <div style="page-break-before: always;"></div>
          
          <div>
            <p class="mt-4 italic text-[11pt]">Siendo las ${val("horaFin")} horas del día ${fechaCelebracion}, se da por terminada la presente, firmando para su constancia los asistentes.</p>

            <div class="mt-2">
              <table class="w-full border-collapse border-2 border-black">
                <thead class="bg-gray-200">
                  <tr class="text-[11pt]">
                    <th class="border-2 border-black p-2 w-16 text-center">No.</th>
                    <th class="border-2 border-black p-2 text-left">Nombre del Alumno</th>
                    <th class="border-2 border-black p-2 w-56">Firma</th>
                  </tr>
                </thead>
                <tbody>
                  ${alumnosRows}
                </tbody>
              </table>
            </div>

            <div class="mt-5 flex flex-col items-start">
              <p class="text-[10pt] italic">Atentamente</p>
              <p class="font-bold uppercase text-start text-[10pt]">${val("docente")}</p>
              <p class="text-[10pt] text-start">${materia}</p>
            </div>
          </div>
        </div>
      `;
      document.getElementById("preview-container").innerHTML = html;
    }

    // Tabs functionality
    function setupTabs() {
      const tabButtons = document.querySelectorAll(".tab-button");
      const tabContents = document.querySelectorAll(".tab-content");

      tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const targetTab = button.getAttribute("data-tab");

          // Remove active classes
          tabButtons.forEach((btn) => {
            btn.classList.remove(
              "border-purple-600",
              "text-purple-600",
              "dark:border-purple-400",
              "dark:text-purple-400"
            );
            btn.classList.add(
              "border-transparent",
              "text-zinc-600",
              "dark:text-zinc-400"
            );
          });

          // Add active classes to clicked button
          button.classList.remove(
            "border-transparent",
            "text-zinc-600",
            "dark:text-zinc-400"
          );
          button.classList.add(
            "border-purple-600",
            "text-purple-600",
            "dark:border-purple-400",
            "dark:text-purple-400"
          );

          // Hide all tab contents
          tabContents.forEach((content) => {
            content.classList.add("hidden");
          });

          // Show target tab content
          const targetContent = document.querySelector(
            `[data-tab-content="${targetTab}"]`
          );
          if (targetContent) {
            targetContent.classList.remove("hidden");
          }
        });
      });
    }

    // Event listeners for inputs
    function setupInputListeners() {
      const inputs = document.querySelectorAll(
        "#logoUrl, #materia, #carrera, #grupo, #periodoEval, #fechaCelebracion, #horaIni, #horaFin, #p_producto, #p_conocimiento, #p_desempeno, #p_actitudinal, #c1, #c2, #c3, #r1, #r2, #r3, #numAlumnos, #docente"
      );

      inputs.forEach((input) => {
        input.addEventListener("input", () => {
          updatePreview();
          saveToLocalStorage();
        });
      });
    }

    // Print button
    function setupPrintButton() {
      const printBtn = document.getElementById("print-btn");
      if (printBtn) {
        printBtn.addEventListener("click", () => {
          // Cambiar a la pestaña de vista previa antes de imprimir
          const previewTab = document.querySelector('[data-tab="preview"]');
          if (previewTab) {
            previewTab.click();
          }

          // Guardar el título original
          const originalTitle = document.title;

          // Cambiar el título temporalmente a vacío o solo espacios
          document.title = " ";

          // Esperar un momento para que se renderice el cambio de pestaña
          setTimeout(() => {
            window.print();

            // Restaurar el título después de imprimir
            setTimeout(() => {
              document.title = originalTitle;
            }, 100);
          }, 100);
        });
      }
    }

    // Add unit button
    function setupAddUnitButton() {
      const addUnitBtn = document.getElementById("add-unit-btn");
      if (addUnitBtn) {
        addUnitBtn.addEventListener("click", addUnit);
      }
    }

    // Clear button
    function setupClearButton() {
      const clearBtn = document.getElementById("clear-btn");
      if (clearBtn) {
        clearBtn.addEventListener("click", clearData);
      }
    }

    // Initialize on load
    window.addEventListener("DOMContentLoaded", () => {
      loadFromLocalStorage();
      setupTabs();
      setupInputListeners();
      setupPrintButton();
      setupAddUnitButton();
      setupClearButton();
      renderUnitsEditor();
      updatePreview();
    });