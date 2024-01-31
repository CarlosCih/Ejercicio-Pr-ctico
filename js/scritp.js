//constantes
const formulario = document.querySelector("#form");
const tituloForm = document.querySelector("#titulo-formulario");
let tareas = [];
const task = document.querySelector(".tareas");
const total = document.querySelector("#total");
const pendientes = document.querySelector("#pendientes");
const completadas = document.querySelector("#completadas");
//eventos
function eventos() {
  formulario.addEventListener("submit", validarForm);
  task.addEventListener("click", eliminarTarea);
  task.addEventListener("click", tareaCompletada);
}
eventos();
//funciones
function validarForm(e) {
  e.preventDefault();
  //validar los datos
  const tarea = document.querySelector("#tarea").value;
  if (!tarea.trim()) {
    tituloForm.textContent = "Formulario vacio";
    setTimeout(() => {
      tituloForm.textContent = "Formulario";
    }, 3000);
    return;
  }
  //crear un objeto
  const objTarea = {
    id: Date.now(), //cuantos milisegundos pasaron desde una dicha fecha
    tarea: tarea,
    estado: false,
  };
  // Registro de nueva tarea creada
    console.log({
    tipoEvento: "Nueva Tarea",
    fechaHora: new Date().toLocaleString(),
    nuevaTarea: objTarea,
  });
  tareas = [...tareas, objTarea];
  formulario.reset();
  mostrarTareas();
}
function mostrarTareas() {
  task.innerHTML = `<h4>Tareas activas</h4>`;

  if (tareas.length < 1) {
    const mensaje = document.createElement("h5");
    mensaje.textContent = "~SIN TAREAS~";
    task.appendChild(mensaje);
    // Actualizar el contador de tareas pendientes
    pendientes.textContent = "Tareas pendientes: 0";
    return;
  }
  tareas.forEach((item) => {
    const itemTarea = document.createElement("div");
    itemTarea.classList.add("item-tarea");
    itemTarea.innerHTML = `
            ${
              item.estado
                ? `<ul class="completa">${item.tarea}</ul>`
                : `<ul>${item.tarea}</ul>`
            }
            <div class="botones">
                <button class="eliminar fa-solid fa-xmark" data-id="${
                  item.id
                }"></button>
                <button class="completada fa-solid fa-check" data-id="${
                  item.id
                }"></button>
            </div>
        `;
    task.appendChild(itemTarea);
  });
  //mostrar los datos pendiente y completadas
  const totalTareas = tareas.length;
  total.textContent = `Total de tareas: ${totalTareas}`;
  // Actualizar el contador de tareas pendientes
  const tareasPendientes = tareas.filter((item) => !item.estado).length;
  pendientes.textContent = `Tareas pendientes: ${tareasPendientes}`;
  const tareasCompletadas = tareas.filter(
    (item) => item.estado === true
  ).length;
  completadas.textContent = `Tareas completadas: ${tareasCompletadas}`;
}
//eliminar tarea
function eliminarTarea(e) {
  if (e.target.classList.contains("eliminar")) {
    const tareaID = Number(e.target.getAttribute("data-id"));
    const tareaEliminada = tareas.find((item) => item.id === tareaID);
    const newTask = tareas.filter((item) => item.id != tareaID);
    tareas = newTask;
    mostrarTareas();
    // Registro de tarea eliminada
    console.log({
      tipoEvento: "Tarea eliminada",
      fechaHora: new Date().toLocaleString(),
      tareaEliminada: tareaEliminada,
    });
    // Actualizar el contador total de tareas
    const totalTareas = tareas.length;
    total.textContent = `Total de tareas: ${totalTareas}`;
  }
}
function tareaCompletada(e) {
  if (e.target.classList.contains("completada")) {
    const tareaID = Number(e.target.getAttribute("data-id"));
    const tareaCompletada = tareas.find((item) => item.id === tareaID);
    const nuevasTareas = tareas.map((item) => {
      if (item.id === tareaID) {
        return {
          ...item,
          estado: !item.estado,
        };
      } else {
        return item;
      }
    });
    tareas = nuevasTareas;
    mostrarTareas();
    // Registro de tarea completada
    console.log({
      tipoEvento: "Tarea completada",
      fechaHora: new Date().toLocaleString(),
      tareaCompletada: tareaCompletada,
    });
  }
}
// function eliminarTarea(e) {
//     if (e.target.classList.contains("eliminar")) {
//       const tareaID = Number(e.target.getAttribute("data-id"));
//       const tareaEliminada = tareas.find((item) => item.id === tareaID);
//       const newTask = tareas.filter((item) => item.id != tareaID);
//       tareas = newTask;
//       // Actualizar el contador total de tareas
//       const totalTareas = tareas.length;
//       total.textContent = `Total de tareas: ${totalTareas}`;
      
//       // Registro de tarea eliminada
//       console.log({
//         tipoEvento: "Tarea eliminada",
//         fechaHora: new Date().toLocaleString(),
//         tareaEliminada: tareaEliminada,
//       });
  
//       mostrarTareas();
//     }
//   }
