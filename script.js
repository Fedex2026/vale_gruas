const CLOUD_NAME = "dpsevb0cd";
const UPLOAD_PRESET = "vales_gruas";

const firebaseConfig = {
  apiKey: "AIzaSyDPnwRf3t2a0qgk1Pnvj1c6j3FLxXj4la4",
  authDomain: "vales-sin-y-asis.firebaseapp.com",
  projectId: "vales-sin-y-asis",
  storageBucket: "vales-sin-y-asis.appspot.com",
  messagingSenderId: "97700189591",
  appId: "1:97700189591:web:f30bfe39d83dbdf2e2a0d2"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

const btnSiniestros = document.getElementById("btnSiniestros");
const btnAsistencias = document.getElementById("btnAsistencias");
const tipoSeleccionadoBox = document.getElementById("tipoSeleccionadoBox");
const tipoTexto = document.getElementById("tipoTexto");
const formulario = document.getElementById("formulario");
const btnGuardar = document.getElementById("btnGuardar");
const btnExcel = document.getElementById("btnExcel");
const tablaBody = document.getElementById("tablaBody");

const seguroInput = document.getElementById("seguro");
const fechaInput = document.getElementById("fecha");
const siniestroInput = document.getElementById("siniestro");
const folioInput = document.getElementById("folio");
const marcaInput = document.getElementById("marca");
const submarcaInput = document.getElementById("submarca");
const anioInput = document.getElementById("anio");
const placasInput = document.getElementById("placas");
const colorInput = document.getElementById("color");
const fotoUnidadInput = document.getElementById("fotoUnidad");
const fotoValeInput = document.getElementById("fotoVale");

const buscarFechaInput = document.getElementById("buscarFecha");
const buscarPlacasInput = document.getElementById("buscarPlacas");
const buscarMarcaInput = document.getElementById("buscarMarca");
const buscarSubmarcaInput = document.getElementById("buscarSubmarca");
const btnBuscar = document.getElementById("btnBuscar");
const btnLimpiarBusqueda = document.getElementById("btnLimpiarBusqueda");

const nombreChoferInput = document.getElementById("nombreChofer");
const emailLogin = document.getElementById("emailLogin");
const passwordLogin = document.getElementById("passwordLogin");
const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const btnLogout = document.getElementById("btnLogout");
const usuarioActivo = document.getElementById("usuarioActivo");

let tipoSeleccionado = "";
let registros = [];
let choferActual = null;
let choferActualNombre = "";

btnSiniestros.addEventListener("click", () => seleccionarTipo("Siniestro"));
btnAsistencias.addEventListener("click", () => seleccionarTipo("Asistencia"));
btnGuardar.addEventListener("click", guardarRegistro);
btnExcel.addEventListener("click", cargarRegistros);
btnBuscar.addEventListener("click", buscarRegistros);
btnLimpiarBusqueda.addEventListener("click", limpiarBusqueda);
btnLogin.addEventListener("click", loginChofer);
btnRegister.addEventListener("click", registrarChofer);
btnLogout.addEventListener("click", logoutChofer);

window.onload = function () {
  cargarRegistros();
};

auth.onAuthStateChanged(async (user) => {
  choferActual = user || null;
  choferActualNombre = "";

  if (choferActual) {
    try {
      const choferDoc = await db.collection("choferes").doc(choferActual.uid).get();

      if (choferDoc.exists) {
        const data = choferDoc.data();
        choferActualNombre = data.nombre || choferActual.email || "";
      } else {
        choferActualNombre = choferActual.email || "";
      }

      usuarioActivo.textContent = "Sesión activa: " + choferActualNombre + " (" + (choferActual.email || "") + ")";
    } catch (error) {
      console.error(error);
      usuarioActivo.textContent = "Sesión activa: " + (choferActual.email || "");
      choferActualNombre = choferActual.email || "";
    }
  } else {
    usuarioActivo.textContent = "Sin sesión iniciada";
  }
});

function seleccionarTipo(tipo) {
  tipoSeleccionado = tipo;
  tipoTexto.textContent = tipo;
  tipoSeleccionadoBox.classList.remove("hidden");
  formulario.classList.remove("hidden");

  btnSiniestros.classList.remove("activo");
  btnAsistencias.classList.remove("activo");

  if (tipo === "Siniestro") {
    btnSiniestros.classList.add("activo");
  } else {
    btnAsistencias.classList.add("activo");
  }
}

async function registrarChofer() {
  try {
    const nombre = nombreChoferInput.value.trim();
    const email = emailLogin.value.trim();
    const password = passwordLogin.value.trim();

    if (!nombre) {
      alert("Ingresa el nombre del chofer.");
      return;
    }

    if (!email || !password) {
      alert("Ingresa correo y contraseña.");
      return;
    }

    const cred = await auth.createUserWithEmailAndPassword(email, password);

    await db.collection("choferes").doc(cred.user.uid).set({
      uid: cred.user.uid,
      nombre: nombre,
      correo: email,
      createdAt: new Date().toISOString()
    });

    alert("Chofer registrado correctamente.");
  } catch (error) {
    console.error(error);
    alert("Error al registrar: " + error.message);
  }
}

async function loginChofer() {
  try {
    const email = emailLogin.value.trim();
    const password = passwordLogin.value.trim();

    if (!email || !password) {
      alert("Ingresa correo y contraseña.");
      return;
    }

    await auth.signInWithEmailAndPassword(email, password);
    alert("Sesión iniciada correctamente.");
  } catch (error) {
    console.error(error);
    alert("Error al ingresar: " + error.message);
  }
}

async function logoutChofer() {
  try {
    await auth.signOut();
    alert("Sesión cerrada.");
  } catch (error) {
    console.error(error);
    alert("Error al cerrar sesión: " + error.message);
  }
}

async function subirImagenACloudinary(file) {
  if (!file) return "";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData
    }
  );

  const data = await response.json();

  if (!response.ok || !data.secure_url) {
    console.error("Error Cloudinary:", data);
    throw new Error("No se pudo subir la imagen");
  }

  return data.secure_url;
}

async function guardarRegistro() {
  try {
    if (!choferActual) {
      alert("Primero inicia sesión.");
      return;
    }

    if (!tipoSeleccionado) {
      alert("Selecciona primero Siniestro o Asistencia.");
      return;
    }

    if (!seguroInput.value.trim()) {
      alert("Selecciona un seguro.");
      return;
    }

    if (!fechaInput.value.trim()) {
      alert("Ingresa la fecha.");
      return;
    }

    if (!marcaInput.value.trim()) {
      alert("Ingresa la marca.");
      return;
    }

    if (!placasInput.value.trim()) {
      alert("Ingresa las placas.");
      return;
    }

    btnGuardar.disabled = true;
    btnGuardar.textContent = "Guardando...";

    const fotoUnidadFile = fotoUnidadInput.files[0];
    const fotoValeFile = fotoValeInput.files[0];

    let fotoUnidadUrl = "";
    let fotoValeUrl = "";

    if (fotoUnidadFile) {
      fotoUnidadUrl = await subirImagenACloudinary(fotoUnidadFile);
    }

    if (fotoValeFile) {
      fotoValeUrl = await subirImagenACloudinary(fotoValeFile);
    }

    const nuevoRegistro = {
      fecha: fechaInput.value,
      seguro: seguroInput.value.trim(),
      tipo: tipoSeleccionado,
      siniestro: siniestroInput.value.trim(),
      folio: folioInput.value.trim(),
      marca: marcaInput.value.trim(),
      submarca: submarcaInput.value.trim(),
      anio: anioInput.value.trim(),
      placa: placasInput.value.trim().toUpperCase(),
      placas: placasInput.value.trim().toUpperCase(),
      color: colorInput.value.trim(),
      fotoUnidad: fotoUnidadUrl,
      fotoVale: fotoValeUrl,
      createdAt: new Date().toISOString(),
      choferId: choferActual.uid,
      choferCorreo: choferActual.email || "",
      choferNombre: choferActualNombre || choferActual.email || ""
    };

    await db.collection("vales").add(nuevoRegistro);

    await cargarRegistros();
    limpiarFormulario();

    alert("Registro guardado correctamente.");
  } catch (error) {
    console.error(error);
    alert("Error al guardar: " + error.message);
  } finally {
    btnGuardar.disabled = false;
    btnGuardar.textContent = "Guardar";
  }
}

async function cargarRegistros() {
  try {
    const snapshot = await db.collection("vales").get();
    registros = [];

    snapshot.forEach((doc) => {
      const data = doc.data();

      registros.push({
        id: doc.id,
        fecha: data.fecha || "",
        seguro: data.seguro || "",
        tipo: data.tipo || "",
        siniestro: data.siniestro || "",
        folio: data.folio || "",
        marca: data.marca || "",
        submarca: data.submarca || "",
        anio: data.anio || "",
        placa: data.placa || "",
        placas: data.placas || data.placa || "",
        color: data.color || "",
        choferNombre: data.choferNombre || "",
        choferCorreo: data.choferCorreo || "",
        fotoUnidad: data.fotoUnidad || "",
        fotoVale: data.fotoVale || "",
        createdAt: data.createdAt || ""
      });
    });

    registros.sort((a, b) => {
      const fa = new Date(a.createdAt || 0).getTime();
      const fb = new Date(b.createdAt || 0).getTime();
      return fb - fa;
    });

    renderTabla();
  } catch (error) {
    console.error("Error al cargar registros:", error);
    alert("No se pudieron cargar los registros.");
  }
}

function buscarRegistros() {
  const fecha = (buscarFechaInput.value || "").trim();
  const placas = (buscarPlacasInput.value || "").trim().toUpperCase();
  const marca = (buscarMarcaInput.value || "").trim().toLowerCase();
  const submarca = (buscarSubmarcaInput.value || "").trim().toLowerCase();

  const filtrados = registros.filter((r) => {
    const coincideFecha = !fecha || String(r.fecha || "").trim() === fecha;
    const coincidePlacas = !placas || String(r.placas || "").toUpperCase().includes(placas);
    const coincideMarca = !marca || String(r.marca || "").toLowerCase().includes(marca);
    const coincideSubmarca = !submarca || String(r.submarca || "").toLowerCase().includes(submarca);

    return coincideFecha && coincidePlacas && coincideMarca && coincideSubmarca;
  });

  renderTablaFiltrada(filtrados);
}

function limpiarBusqueda() {
  buscarFechaInput.value = "";
  buscarPlacasInput.value = "";
  buscarMarcaInput.value = "";
  buscarSubmarcaInput.value = "";
  renderTabla();
}

function renderTabla() {
  renderTablaFiltrada(registros);
}

function renderTablaFiltrada(lista) {
  tablaBody.innerHTML = "";

  lista.forEach((r) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${escapeHtml(r.fecha)}</td>
      <td>${escapeHtml(r.seguro)}</td>
      <td>${escapeHtml(r.tipo)}</td>
      <td>${escapeHtml(r.siniestro)}</td>
      <td>${escapeHtml(r.folio)}</td>
      <td>${escapeHtml(r.marca)}</td>
      <td>${escapeHtml(r.submarca)}</td>
      <td>${escapeHtml(r.anio)}</td>
      <td>${escapeHtml(r.placas || r.placa)}</td>
      <td>${escapeHtml(r.color)}</td>
      <td>${escapeHtml(r.choferNombre)}</td>
      <td>${escapeHtml(r.choferCorreo)}</td>
      <td>
        ${
          r.fotoUnidad
            ? `<a href="${r.fotoUnidad}" target="_blank" rel="noopener noreferrer">
                 <img src="${r.fotoUnidad}" alt="Foto Unidad" class="foto-mini" />
               </a>`
            : "Sin foto"
        }
      </td>
      <td>
        ${
          r.fotoVale
            ? `<a href="${r.fotoVale}" target="_blank" rel="noopener noreferrer">
                 <img src="${r.fotoVale}" alt="Foto Vale" class="foto-mini" />
               </a>`
            : "Sin foto"
        }
      </td>
    `;

    tablaBody.appendChild(tr);
  });
}

function limpiarFormulario() {
  seguroInput.value = "";
  fechaInput.value = "";
  siniestroInput.value = "";
  folioInput.value = "";
  marcaInput.value = "";
  submarcaInput.value = "";
  anioInput.value = "";
  placasInput.value = "";
  colorInput.value = "";
  fotoUnidadInput.value = "";
  fotoValeInput.value = "";
}

function escapeHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto || "";
  return div.innerHTML;
}
