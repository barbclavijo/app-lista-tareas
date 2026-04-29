const input = document.querySelector("#nuevaTarea");
const form = document.querySelector("form");
const listaUL = document.querySelector("#listaTareas");


const guardarStorage = (array) => {
  localStorage.setItem("listaTareas", JSON.stringify(array));
};

const leerStorage = () => {
  const string = localStorage.getItem("listaTareas");
  const datos = JSON.parse(string);
  return datos ? datos : [];
};


const crearUL = (array) => {
  listaUL.innerHTML = "";

  array.forEach((tarea, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    if (tarea.completada) {
      li.classList.add("completada");
    }

    const span = document.createElement("span");
    span.textContent = tarea.texto;


    const btnSuccess = document.createElement("button");
    btnSuccess.className = "btn btn-success btn-sm";
    btnSuccess.innerHTML = '<i class="fa-regular fa-square-check"></i>';

    btnSuccess.addEventListener("click", () => {
      tareas[index].completada = !tareas[index].completada;
      guardarStorage(tareas);
      crearUL(tareas);
    });

    const btnDelete = document.createElement("button");
    btnDelete.className = "btn btn-danger btn-sm";
    btnDelete.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

    btnDelete.addEventListener("click", () => {
      tareas.splice(index, 1); 
      guardarStorage(tareas);
      crearUL(tareas);
    });


    const acciones = document.createElement("div");
    acciones.className = "d-flex gap-2";
    acciones.appendChild(btnSuccess);
    acciones.appendChild(btnDelete);

    li.appendChild(span);
    li.appendChild(acciones);

    listaUL.appendChild(li);
  });
};


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const tarea = input.value.trim();
  if (tarea === "") return;

  input.value = "";

  tareas.push({
    texto: tarea,
    completada: false
  });

  guardarStorage(tareas);
  crearUL(tareas);
});

const tareas = leerStorage();
crearUL(tareas);

