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

let tipoSeleccionado = "";
let choferActual = null;
let choferActualNombre = "";

let registrosVales = [];
let registrosEntregas = [];
let registrosCorralon = [];
let registrosSinSeguro = [];
let registrosFacturas = [];

// -------------------- ELEMENTOS GENERALES --------------------
const btnSiniestros = document.getElementById("btnSiniestros");
const btnAsistencias = document.getElementById("btnAsistencias");
const btnOtros = document.getElementById("btnOtros");

const btnEntregas = document.getElementById("btnEntregas");
const btnCorralon = document.getElementById("btnCorralon");
const btnSinSeguro = document.getElementById("btnSinSeguro");
const btnFacturas = document.getElementById("btnFacturas");

const formulario = document.getElementById("formulario");
const otrosOpciones = document.getElementById("otrosOpciones");
const formEntregas = document.getElementById("formEntregas");
const formCorralon = document.getElementById("formCorralon");
const formSinSeguro = document.getElementById("formSinSeguro");
const formFacturas = document.getElementById("formFacturas");

const tipoSeleccionadoBox = document.getElementById("tipoSeleccionadoBox");
const tipoTexto = document.getElementById("tipoTexto");

const btnGuardar = document.getElementById("btnGuardar");
const btnExcel = document.getElementById("btnExcel");

btnExcel.addEventListener("click", exportarExcelFacturas);

const btnLimpiarBusqueda = document.getElementById("btnLimpiarBusqueda");

const btnBuscarEntrega = document.getElementById("btnBuscarEntrega");
const btnGuardarEntrega = document.getElementById("btnGuardarEntrega");
const btnGuardarCorralon = document.getElementById("btnGuardarCorralon");
const btnGuardarSinSeguro = document.getElementById("btnGuardarSinSeguro");
const btnGuardarFactura = document.getElementById("btnGuardarFactura");

// -------------------- TABLAS --------------------
const tablaBody = document.getElementById("tablaBody");
const tablaEntregasBody = document.getElementById("tablaEntregasBody");
const tablaCorralonBody = document.getElementById("tablaCorralonBody");
const tablaSinSeguroBody = document.getElementById("tablaSinSeguroBody");
const tablaFacturasBody = document.getElementById("tablaFacturasBody");

// -------------------- LOGIN --------------------
const nombreChoferInput = document.getElementById("nombreChofer");
const emailLogin = document.getElementById("emailLogin");
const passwordLogin = document.getElementById("passwordLogin");
const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const btnLogout = document.getElementById("btnLogout");
const usuarioActivo = document.getElementById("usuarioActivo");

// -------------------- VALES / ASISTENCIAS --------------------
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

// -------------------- BÚSQUEDA VALES --------------------
const buscarFechaInput = document.getElementById("buscarFecha");
const buscarPlacasInput = document.getElementById("buscarPlacas");
const buscarMarcaInput = document.getElementById("buscarMarca");
const buscarSubmarcaInput = document.getElementById("buscarSubmarca");

// -------------------- ENTREGAS --------------------
const buscarEntregaPlaca = document.getElementById("buscarEntregaPlaca");
const buscarEntregaSiniestro = document.getElementById("buscarEntregaSiniestro");
const entregaFecha = document.getElementById("entregaFecha");
const entregaSeguro = document.getElementById("entregaSeguro");
const entregaTipoBase = document.getElementById("entregaTipoBase");
const entregaSiniestro = document.getElementById("entregaSiniestro");
const entregaFolio = document.getElementById("entregaFolio");
const entregaMarca = document.getElementById("entregaMarca");
const entregaSubmarca = document.getElementById("entregaSubmarca");
const entregaAnio = document.getElementById("entregaAnio");
const entregaPlacas = document.getElementById("entregaPlacas");
const entregaColor = document.getElementById("entregaColor");
const nombreTaller = document.getElementById("nombreTaller");
const quienRecibe = document.getElementById("quienRecibe");
const fotoTaller = document.getElementById("fotoTaller");

// -------------------- CORRALÓN --------------------
const corralonFecha = document.getElementById("corralonFecha");
const corralonSeguro = document.getElementById("corralonSeguro");
const corralonSiniestro = document.getElementById("corralonSiniestro");
const corralonFolio = document.getElementById("corralonFolio");
const corralonMarca = document.getElementById("corralonMarca");
const corralonSubmarca = document.getElementById("corralonSubmarca");
const corralonAnio = document.getElementById("corralonAnio");
const corralonPlacas = document.getElementById("corralonPlacas");
const corralonColor = document.getElementById("corralonColor");
const numeroInventario = document.getElementById("numeroInventario");
const numeroActa = document.getElementById("numeroActa");
const motivoDelito = document.getElementById("motivoDelito");
const telefonoClienteCorralon = document.getElementById("telefonoClienteCorralon");
const fotoInventario = document.getElementById("fotoInventario");
const fotoCarroCorralon = document.getElementById("fotoCarroCorralon");

// -------------------- SIN SEGURO --------------------
const sinSeguroFecha = document.getElementById("sinSeguroFecha");
const sinSeguroMarca = document.getElementById("sinSeguroMarca");
const sinSeguroSubmarca = document.getElementById("sinSeguroSubmarca");
const sinSeguroAnio = document.getElementById("sinSeguroAnio");
const sinSeguroPlacas = document.getElementById("sinSeguroPlacas");
const sinSeguroColor = document.getElementById("sinSeguroColor");
const sinSeguroNombreCliente = document.getElementById("sinSeguroNombreCliente");
const sinSeguroTelefonoCliente = document.getElementById("sinSeguroTelefonoCliente");
const sinSeguroMontoCobrado = document.getElementById("sinSeguroMontoCobrado");
const sinSeguroFotoUnidad = document.getElementById("sinSeguroFotoUnidad");
const sinSeguroFotoServicio = document.getElementById("sinSeguroFotoServicio");

// -------------------- FACTURAS --------------------
const facturaRazonSocial = document.getElementById("facturaRazonSocial");
const facturaRFC = document.getElementById("facturaRFC");
const facturaDomicilio = document.getElementById("facturaDomicilio");
const facturaCodigoPostal = document.getElementById("facturaCodigoPostal");
const facturaRegimen = document.getElementById("facturaRegimen");
const facturaCorreo = document.getElementById("facturaCorreo");
const facturaMarca = document.getElementById("facturaMarca");
const facturaSubmarca = document.getElementById("facturaSubmarca");
const facturaAnio = document.getElementById("facturaAnio");
const facturaPlacas = document.getElementById("facturaPlacas");
const facturaMontoSinIVA = document.getElementById("facturaMontoSinIVA");
const facturaIVA = document.getElementById("facturaIVA");
const facturaTotal = document.getElementById("facturaTotal");
const facturaArchivo = document.getElementById("facturaArchivo");

// -------------------- EVENTOS --------------------
if (btnSiniestros) btnSiniestros.addEventListener("click", () => seleccionarPantallaPrincipal("Siniestro"));
if (btnAsistencias) btnAsistencias.addEventListener("click", () => seleccionarPantallaPrincipal("Asistencia"));
if (btnOtros) btnOtros.addEventListener("click", abrirOtros);

if (btnEntregas) btnEntregas.addEventListener("click", () => abrirPantallaOtros("Entregas"));
if (btnCorralon) btnCorralon.addEventListener("click", () => abrirPantallaOtros("Corralón"));
if (btnSinSeguro) btnSinSeguro.addEventListener("click", () => abrirPantallaOtros("Sin Seguro"));
if (btnFacturas) btnFacturas.addEventListener("click", () => abrirPantallaOtros("Zona de Facturación"));

if (btnGuardar) btnGuardar.addEventListener("click", guardarRegistro);
if (btnExcel) btnExcel.addEventListener("click", cargarTodosLosRegistros);
if (btnBuscar) btnBuscar.addEventListener("click", buscarRegistrosVales);
if (btnLimpiarBusqueda) btnLimpiarBusqueda.addEventListener("click", limpiarBusquedaVales);

if (btnBuscarEntrega) btnBuscarEntrega.addEventListener("click", autollenarEntrega);
if (btnGuardarEntrega) btnGuardarEntrega.addEventListener("click", guardarEntrega);
if (btnGuardarCorralon) btnGuardarCorralon.addEventListener("click", guardarCorralon);
if (btnGuardarSinSeguro) btnGuardarSinSeguro.addEventListener("click", guardarSinSeguro);
if (btnGuardarFactura) btnGuardarFactura.addEventListener("click", guardarFactura);

if (facturaMontoSinIVA) {
  facturaMontoSinIVA.addEventListener("input", calcularFactura);
}

if (btnLogin) btnLogin.addEventListener("click", loginChofer);
if (btnRegister) btnRegister.addEventListener("click", registrarChofer);
if (btnLogout) btnLogout.addEventListener("click", logoutChofer);

// -------------------- AUTH STATE --------------------
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

      if (usuarioActivo) {
        usuarioActivo.textContent =
          "Sesión activa: " + choferActualNombre + " (" + (choferActual.email || "") + ")";
      }
    } catch (error) {
      console.error(error);
      if (usuarioActivo) {
        usuarioActivo.textContent = "Sesión activa: " + (choferActual.email || "");
      }
      choferActualNombre = choferActual.email || "";
    }
  } else {
    if (usuarioActivo) {
      usuarioActivo.textContent = "Sin sesión iniciada";
    }
  }

  await cargarTodosLosRegistros();
});

// -------------------- UI --------------------
function ocultarTodosLosFormularios() {
  if (formulario) formulario.classList.add("hidden");
  if (formEntregas) formEntregas.classList.add("hidden");
  if (formCorralon) formCorralon.classList.add("hidden");
  if (formSinSeguro) formSinSeguro.classList.add("hidden");
  if (formFacturas) formFacturas.classList.add("hidden");
}

function limpiarBotonesActivos() {
  if (btnSiniestros) btnSiniestros.classList.remove("activo");
  if (btnAsistencias) btnAsistencias.classList.remove("activo");
  if (btnOtros) btnOtros.classList.remove("activo");
  if (btnEntregas) btnEntregas.classList.remove("activo");
  if (btnCorralon) btnCorralon.classList.remove("activo");
  if (btnSinSeguro) btnSinSeguro.classList.remove("activo");
  if (btnFacturas) btnFacturas.classList.remove("activo");
}

function seleccionarPantallaPrincipal(tipo) {
  tipoSeleccionado = tipo;
  if (tipoTexto) tipoTexto.textContent = tipo;
  if (tipoSeleccionadoBox) tipoSeleccionadoBox.classList.remove("hidden");

  ocultarTodosLosFormularios();

  if (formulario) formulario.classList.remove("hidden");
  if (otrosOpciones) otrosOpciones.classList.add("hidden");

  limpiarBotonesActivos();
  if (tipo === "Siniestro" && btnSiniestros) btnSiniestros.classList.add("activo");
  if (tipo === "Asistencia" && btnAsistencias) btnAsistencias.classList.add("activo");
}

function abrirOtros() {
  tipoSeleccionado = "Otros";
  if (tipoTexto) tipoTexto.textContent = "Otros";
  if (tipoSeleccionadoBox) tipoSeleccionadoBox.classList.remove("hidden");

  ocultarTodosLosFormularios();

  if (otrosOpciones) otrosOpciones.classList.remove("hidden");

  limpiarBotonesActivos();
  if (btnOtros) btnOtros.classList.add("activo");
}

function seleccionarTipo(nombre) {
  abrirPantallaOtros(nombre);
}

function abrirPantallaOtros(nombre) {
  tipoSeleccionado = nombre;
  if (tipoTexto) tipoTexto.textContent = nombre;
  if (tipoSeleccionadoBox) tipoSeleccionadoBox.classList.remove("hidden");

  ocultarTodosLosFormularios();

  if (otrosOpciones) otrosOpciones.classList.remove("hidden");

  limpiarBotonesActivos();
  if (btnOtros) btnOtros.classList.add("activo");

  if (nombre === "Entregas") {
    if (formEntregas) formEntregas.classList.remove("hidden");
    if (btnEntregas) btnEntregas.classList.add("activo");
  } else if (nombre === "Corralón") {
    if (formCorralon) formCorralon.classList.remove("hidden");
    if (btnCorralon) btnCorralon.classList.add("activo");
  } else if (nombre === "Sin Seguro") {
    if (formSinSeguro) formSinSeguro.classList.remove("hidden");
    if (btnSinSeguro) btnSinSeguro.classList.add("activo");
  } else if (nombre === "Zona de Facturación") {
    if (formFacturas) formFacturas.classList.remove("hidden");
    if (btnFacturas) btnFacturas.classList.add("activo");
  }
}

// -------------------- AUTH --------------------
async function registrarChofer() {
  try {
    const nombre = nombreChoferInput ? nombreChoferInput.value.trim() : "";
    const email = emailLogin ? emailLogin.value.trim() : "";
    const password = passwordLogin ? passwordLogin.value.trim() : "";

    if (!nombre) return alert("Ingresa el nombre del chofer.");
    if (!email || !password) return alert("Ingresa correo y contraseña.");

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
    const email = emailLogin ? emailLogin.value.trim() : "";
    const password = passwordLogin ? passwordLogin.value.trim() : "";

    if (!email || !password) return alert("Ingresa correo y contraseña.");

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

// -------------------- CLOUDINARY --------------------
async function subirImagenACloudinary(file) {
  if (!file) return "";

  const esPdf = file.type === "application/pdf";
  const uploadUrl = esPdf
    ? `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`
    : `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(uploadUrl, {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  if (!response.ok || (!data.secure_url && !data.url)) {
    console.error("Error Cloudinary:", data);
    throw new Error("No se pudo subir el archivo");
  }

  return data.secure_url || data.url || "";
}

// -------------------- GUARDAR VALES / ASISTENCIAS --------------------
async function guardarRegistro() {
  try {
    if (!choferActual) return alert("Primero inicia sesión.");
    if (!tipoSeleccionado || (tipoSeleccionado !== "Siniestro" && tipoSeleccionado !== "Asistencia")) {
      return alert("Selecciona primero Siniestro o Asistencia.");
    }

    if (!seguroInput || !seguroInput.value.trim()) return alert("Ingresa el seguro.");
    if (!fechaInput || !fechaInput.value.trim()) return alert("Ingresa la fecha.");
    if (!marcaInput || !marcaInput.value.trim()) return alert("Ingresa la marca.");
    if (!placasInput || !placasInput.value.trim()) return alert("Ingresa las placas.");

    if (btnGuardar) {
      btnGuardar.disabled = true;
      btnGuardar.textContent = "Guardando...";
    }

    const fotoUnidadUrl =
      fotoUnidadInput && fotoUnidadInput.files && fotoUnidadInput.files[0]
        ? await subirImagenACloudinary(fotoUnidadInput.files[0])
        : "";

    const fotoValeUrl =
      fotoValeInput && fotoValeInput.files && fotoValeInput.files[0]
        ? await subirImagenACloudinary(fotoValeInput.files[0])
        : "";

    await db.collection("vales").add({
      fecha: fechaInput.value,
      seguro: seguroInput.value.trim(),
      tipo: tipoSeleccionado,
      siniestro: siniestroInput ? siniestroInput.value.trim() : "",
      folio: folioInput ? folioInput.value.trim() : "",
      marca: marcaInput.value.trim(),
      submarca: submarcaInput ? submarcaInput.value.trim() : "",
      anio: anioInput ? anioInput.value.trim() : "",
      placas: placasInput.value.trim().toUpperCase(),
      color: colorInput ? colorInput.value.trim() : "",
      fotoUnidad: fotoUnidadUrl,
      fotoVale: fotoValeUrl,
      createdAt: new Date().toISOString(),
      choferId: choferActual.uid,
      choferCorreo: choferActual.email || "",
      choferNombre: choferActualNombre || choferActual.email || ""
    });

    limpiarFormularioOriginal();
    await cargarValesYAsistencias();
    alert("Registro guardado correctamente.");
  } catch (error) {
    console.error(error);
    alert("Error al guardar: " + error.message);
  } finally {
    if (btnGuardar) {
      btnGuardar.disabled = false;
      btnGuardar.textContent = "Guardar";
    }
  }
}

// -------------------- AUTOLLENAR ENTREGA --------------------
async function autollenarEntrega() {
  try {
    const placas = buscarEntregaPlaca ? buscarEntregaPlaca.value.trim().toUpperCase() : "";
    const siniestro = buscarEntregaSiniestro ? buscarEntregaSiniestro.value.trim() : "";

    if (!placas && !siniestro) {
      return alert("Escribe placas o siniestro para autollenar.");
    }

    const snapshot = await db.collection("vales").get();
    let encontrado = null;

    snapshot.forEach((doc) => {
      const data = doc.data();
      const coincidePlacas = placas && String(data.placas || "").toUpperCase() === placas;
      const coincideSiniestro = siniestro && String(data.siniestro || "").trim() === siniestro;

      if ((coincidePlacas || coincideSiniestro) && !encontrado) {
        encontrado = data;
      }
    });

    if (!encontrado) {
      return alert("No se encontró registro para autollenar.");
    }

    if (entregaFecha) entregaFecha.value = encontrado.fecha || "";
    if (entregaSeguro) entregaSeguro.value = encontrado.seguro || "";
    if (entregaTipoBase) entregaTipoBase.value = encontrado.tipo || "";
    if (entregaSiniestro) entregaSiniestro.value = encontrado.siniestro || "";
    if (entregaFolio) entregaFolio.value = encontrado.folio || "";
    if (entregaMarca) entregaMarca.value = encontrado.marca || "";
    if (entregaSubmarca) entregaSubmarca.value = encontrado.submarca || "";
    if (entregaAnio) entregaAnio.value = encontrado.anio || "";
    if (entregaPlacas) entregaPlacas.value = encontrado.placas || "";
    if (entregaColor) entregaColor.value = encontrado.color || "";

    alert("Datos autollenados.");
  } catch (error) {
    console.error(error);
    alert("Error al autollenar.");
  }
}

// -------------------- GUARDAR ENTREGA --------------------
async function guardarEntrega() {
  try {
    if (!choferActual) return alert("Primero inicia sesión.");

    const taller = nombreTaller ? nombreTaller.value.trim() : "";
    const recibe = quienRecibe ? quienRecibe.value.trim() : "";

    if (!taller) return alert("Ingresa el nombre del taller.");
    if (!recibe) return alert("Ingresa quién recibe.");

    if (btnGuardarEntrega) {
      btnGuardarEntrega.disabled = true;
      btnGuardarEntrega.textContent = "Guardando...";
    }

    const fotoTallerUrl =
      fotoTaller && fotoTaller.files && fotoTaller.files[0]
        ? await subirImagenACloudinary(fotoTaller.files[0])
        : "";

    await db.collection("entregas").add({
      fecha: entregaFecha ? entregaFecha.value : "",
      seguro: entregaSeguro ? entregaSeguro.value.trim() : "",
      tipoBase: entregaTipoBase ? entregaTipoBase.value.trim() : "",
      siniestro: entregaSiniestro ? entregaSiniestro.value.trim() : "",
      folio: entregaFolio ? entregaFolio.value.trim() : "",
      marca: entregaMarca ? entregaMarca.value.trim() : "",
      submarca: entregaSubmarca ? entregaSubmarca.value.trim() : "",
      anio: entregaAnio ? entregaAnio.value.trim() : "",
      placas: entregaPlacas ? entregaPlacas.value.trim().toUpperCase() : "",
      color: entregaColor ? entregaColor.value.trim() : "",
      nombreTaller: taller,
      quienRecibe: recibe,
      fotoTaller: fotoTallerUrl,
      createdAt: new Date().toISOString(),
      choferId: choferActual.uid,
      choferCorreo: choferActual.email || "",
      choferNombre: choferActualNombre || choferActual.email || ""
    });

    limpiarEntrega();
    await cargarEntregas();
    alert("Entrega guardada correctamente.");
  } catch (error) {
    console.error(error);
    alert("Error al guardar entrega: " + error.message);
  } finally {
    if (btnGuardarEntrega) {
      btnGuardarEntrega.disabled = false;
      btnGuardarEntrega.textContent = "Guardar Entrega";
    }
  }
}

// -------------------- GUARDAR CORRALÓN --------------------
async function guardarCorralon() {
  try {
    if (!choferActual) return alert("Primero inicia sesión.");

    if (btnGuardarCorralon) {
      btnGuardarCorralon.disabled = true;
      btnGuardarCorralon.textContent = "Guardando...";
    }

    const fotoInventarioUrl =
      fotoInventario && fotoInventario.files && fotoInventario.files[0]
        ? await subirImagenACloudinary(fotoInventario.files[0])
        : "";

    const fotoCarroUrl =
      fotoCarroCorralon && fotoCarroCorralon.files && fotoCarroCorralon.files[0]
        ? await subirImagenACloudinary(fotoCarroCorralon.files[0])
        : "";

    await db.collection("corralon").add({
      fecha: corralonFecha ? corralonFecha.value : "",
      seguro: corralonSeguro ? corralonSeguro.value.trim() : "",
      siniestro: corralonSiniestro ? corralonSiniestro.value.trim() : "",
      folio: corralonFolio ? corralonFolio.value.trim() : "",
      marca: corralonMarca ? corralonMarca.value.trim() : "",
      submarca: corralonSubmarca ? corralonSubmarca.value.trim() : "",
      anio: corralonAnio ? corralonAnio.value.trim() : "",
      placas: corralonPlacas ? corralonPlacas.value.trim().toUpperCase() : "",
      color: corralonColor ? corralonColor.value.trim() : "",
      numeroInventario: numeroInventario ? numeroInventario.value.trim() : "",
      numeroActa: numeroActa ? numeroActa.value.trim() : "",
      motivoDelito: motivoDelito ? motivoDelito.value.trim() : "",
      telefonoCliente: telefonoClienteCorralon ? telefonoClienteCorralon.value.trim() : "",
      fotoInventario: fotoInventarioUrl,
      fotoCarro: fotoCarroUrl,
      createdAt: new Date().toISOString(),
      choferId: choferActual.uid,
      choferCorreo: choferActual.email || "",
      choferNombre: choferActualNombre || choferActual.email || ""
    });

    limpiarCorralon();
    await cargarCorralon();
    alert("Corralón guardado correctamente.");
  } catch (error) {
    console.error(error);
    alert("Error al guardar corralón: " + error.message);
  } finally {
    if (btnGuardarCorralon) {
      btnGuardarCorralon.disabled = false;
      btnGuardarCorralon.textContent = "Guardar Corralón";
    }
  }
}

// -------------------- GUARDAR SIN SEGURO --------------------
async function guardarSinSeguro() {
  try {
    if (!choferActual) return alert("Primero inicia sesión.");

    if (btnGuardarSinSeguro) {
      btnGuardarSinSeguro.disabled = true;
      btnGuardarSinSeguro.textContent = "Guardando...";
    }

    const fotoUnidadUrl =
      sinSeguroFotoUnidad && sinSeguroFotoUnidad.files && sinSeguroFotoUnidad.files[0]
        ? await subirImagenACloudinary(sinSeguroFotoUnidad.files[0])
        : "";

    const fotoServicioUrl =
      sinSeguroFotoServicio && sinSeguroFotoServicio.files && sinSeguroFotoServicio.files[0]
        ? await subirImagenACloudinary(sinSeguroFotoServicio.files[0])
        : "";

    await db.collection("sin_seguro").add({
      fecha: sinSeguroFecha ? sinSeguroFecha.value : "",
      marca: sinSeguroMarca ? sinSeguroMarca.value.trim() : "",
      submarca: sinSeguroSubmarca ? sinSeguroSubmarca.value.trim() : "",
      anio: sinSeguroAnio ? sinSeguroAnio.value.trim() : "",
      placas: sinSeguroPlacas ? sinSeguroPlacas.value.trim().toUpperCase() : "",
      color: sinSeguroColor ? sinSeguroColor.value.trim() : "",
      nombreCliente: sinSeguroNombreCliente ? sinSeguroNombreCliente.value.trim() : "",
      telefonoCliente: sinSeguroTelefonoCliente ? sinSeguroTelefonoCliente.value.trim() : "",
      montoCobrado: sinSeguroMontoCobrado ? Number(sinSeguroMontoCobrado.value || 0) : 0,
      fotoUnidad: fotoUnidadUrl,
      fotoServicio: fotoServicioUrl,
      createdAt: new Date().toISOString(),
      choferId: choferActual.uid,
      choferCorreo: choferActual.email || "",
      choferNombre: choferActualNombre || choferActual.email || ""
    });

    limpiarSinSeguro();
    await cargarSinSeguro();
    alert("Registro sin seguro guardado correctamente.");
  } catch (error) {
    console.error(error);
    alert("Error al guardar sin seguro: " + error.message);
  } finally {
    if (btnGuardarSinSeguro) {
      btnGuardarSinSeguro.disabled = false;
      btnGuardarSinSeguro.textContent = "Guardar Sin Seguro";
    }
  }
}

// -------------------- FACTURAS --------------------
function calcularFactura() {
  const monto = facturaMontoSinIVA ? Number(facturaMontoSinIVA.value || 0) : 0;
  const iva = monto * 0.16;
  const total = monto + iva;

  if (facturaIVA) facturaIVA.value = iva.toFixed(2);
  if (facturaTotal) facturaTotal.value = total.toFixed(2);
}

async function guardarFactura() {
  try {
    if (!choferActual) return alert("Primero inicia sesión.");

    calcularFactura();

    if (btnGuardarFactura) {
      btnGuardarFactura.disabled = true;
      btnGuardarFactura.textContent = "Guardando...";
    }

    const archivoUrl =
      facturaArchivo && facturaArchivo.files && facturaArchivo.files[0]
        ? await subirImagenACloudinary(facturaArchivo.files[0])
        : "";

    await db.collection("facturas").add({
      fecha: new Date().toISOString().slice(0, 10),
      razonSocial: facturaRazonSocial ? facturaRazonSocial.value.trim() : "",
      rfc: facturaRFC ? facturaRFC.value.trim() : "",
      domicilioFiscal: facturaDomicilio ? facturaDomicilio.value.trim() : "",
      codigoPostal: facturaCodigoPostal ? facturaCodigoPostal.value.trim() : "",
      regimenFiscal: facturaRegimen ? facturaRegimen.value.trim() : "",
      correoCliente: facturaCorreo ? facturaCorreo.value.trim() : "",
      marca: facturaMarca ? facturaMarca.value.trim() : "",
      submarca: facturaSubmarca ? facturaSubmarca.value.trim() : "",
      anio: facturaAnio ? facturaAnio.value.trim() : "",
      placas: facturaPlacas ? facturaPlacas.value.trim().toUpperCase() : "",
      montoSinIVA: facturaMontoSinIVA ? Number(facturaMontoSinIVA.value || 0) : 0,
      iva: facturaIVA ? Number(facturaIVA.value || 0) : 0,
      totalConIVA: facturaTotal ? Number(facturaTotal.value || 0) : 0,
      archivoConstancia: archivoUrl,
      createdAt: new Date().toISOString(),
      choferId: choferActual.uid,
      choferCorreo: choferActual.email || "",
      choferNombre: choferActualNombre || choferActual.email || ""
    });

    limpiarFactura();
    await cargarFacturas();
    alert("Factura guardada correctamente.");
  } catch (error) {
    console.error(error);
    alert("Error al guardar factura: " + error.message);
  } finally {
    if (btnGuardarFactura) {
      btnGuardarFactura.disabled = false;
      btnGuardarFactura.textContent = "Guardar Factura";
    }
  }
}

// -------------------- CARGAR TODO --------------------
async function cargarTodosLosRegistros() {
  await cargarValesYAsistencias();
  await cargarEntregas();
  await cargarCorralon();
  await cargarSinSeguro();
  await cargarFacturas();
}

// -------------------- CARGAR VALES --------------------
async function cargarValesYAsistencias() {
  try {
    const snapshot = await db.collection("vales").get();
    registrosVales = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      registrosVales.push({
        id: doc.id,
        fecha: data.fecha || "",
        seguro: data.seguro || "",
        tipo: data.tipo || "",
        siniestro: data.siniestro || "",
        folio: data.folio || "",
        marca: data.marca || "",
        submarca: data.submarca || "",
        anio: data.anio || "",
        placas: data.placas || "",
        color: data.color || "",
        choferNombre: data.choferNombre || "",
        choferCorreo: data.choferCorreo || "",
        fotoUnidad: data.fotoUnidad || "",
        fotoVale: data.fotoVale || "",
        createdAt: data.createdAt || ""
      });
    });

    registrosVales.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    renderTablaVales(registrosVales);
  } catch (error) {
    console.error("Error al cargar vales:", error);
    registrosVales = [];
    renderTablaVales([]);
  }
}

// -------------------- CARGAR ENTREGAS --------------------
async function cargarEntregas() {
  try {
    const snapshot = await db.collection("entregas").get();
    registrosEntregas = [];

    snapshot.forEach((doc) => {
      registrosEntregas.push({
        id: doc.id,
        ...doc.data()
      });
    });

    registrosEntregas.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    renderTablaEntregas();
  } catch (error) {
    console.error("Error al cargar entregas:", error);
    registrosEntregas = [];
    renderTablaEntregas();
  }
}

// -------------------- CARGAR CORRALÓN --------------------
async function cargarCorralon() {
  try {
    const snapshot = await db.collection("corralon").get();
    registrosCorralon = [];

    snapshot.forEach((doc) => {
      registrosCorralon.push({
        id: doc.id,
        ...doc.data()
      });
    });

    registrosCorralon.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    renderTablaCorralon();
  } catch (error) {
    console.error("Error al cargar corralón:", error);
    registrosCorralon = [];
    renderTablaCorralon();
  }
}

// -------------------- CARGAR SIN SEGURO --------------------
async function cargarSinSeguro() {
  try {
    const snapshot = await db.collection("sin_seguro").get();
    registrosSinSeguro = [];

    snapshot.forEach((doc) => {
      registrosSinSeguro.push({
        id: doc.id,
        ...doc.data()
      });
    });

    registrosSinSeguro.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    renderTablaSinSeguro();
  } catch (error) {
    console.error("Error al cargar sin seguro:", error);
    registrosSinSeguro = [];
    renderTablaSinSeguro();
  }
}

// -------------------- CARGAR FACTURAS --------------------
async function cargarFacturas() {
  try {
    const snapshot = await db.collection("facturas").get();
    registrosFacturas = [];

    snapshot.forEach((doc) => {
      registrosFacturas.push({
        id: doc.id,
        ...doc.data()
      });
    });

    registrosFacturas.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    renderTablaFacturas();
  } catch (error) {
    console.error("Error al cargar facturas:", error);
    registrosFacturas = [];
    renderTablaFacturas();
  }
}

// -------------------- RENDER TABLAS --------------------
function renderTablaVales(lista) {
  if (!tablaBody) return;
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
      <td>${escapeHtml(r.placas)}</td>
      <td>${escapeHtml(r.color)}</td>
      <td>${escapeHtml(r.choferNombre)}</td>
      <td>${escapeHtml(r.choferCorreo)}</td>
      <td>${renderArchivo(r.fotoUnidad, "Foto Unidad")}</td>
      <td>${renderArchivo(r.fotoVale, "Foto Vale")}</td>
    `;
    tablaBody.appendChild(tr);
  });
}

function renderTablaEntregas() {
  if (!tablaEntregasBody) return;
  tablaEntregasBody.innerHTML = "";

  registrosEntregas.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(r.fecha)}</td>
      <td>${escapeHtml(r.seguro)}</td>
      <td>${escapeHtml(r.tipoBase)}</td>
      <td>${escapeHtml(r.siniestro)}</td>
      <td>${escapeHtml(r.folio)}</td>
      <td>${escapeHtml(r.marca)}</td>
      <td>${escapeHtml(r.submarca)}</td>
      <td>${escapeHtml(r.anio)}</td>
      <td>${escapeHtml(r.placas)}</td>
      <td>${escapeHtml(r.color)}</td>
      <td>${escapeHtml(r.nombreTaller)}</td>
      <td>${escapeHtml(r.quienRecibe)}</td>
      <td>${escapeHtml(r.choferNombre)}</td>
      <td>${escapeHtml(r.choferCorreo)}</td>
      <td>${renderArchivo(r.fotoTaller, "Foto Taller")}</td>
    `;
    tablaEntregasBody.appendChild(tr);
  });
}

function renderTablaCorralon() {
  if (!tablaCorralonBody) return;
  tablaCorralonBody.innerHTML = "";

  registrosCorralon.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(r.fecha)}</td>
      <td>${escapeHtml(r.seguro)}</td>
      <td>${escapeHtml(r.siniestro)}</td>
      <td>${escapeHtml(r.folio)}</td>
      <td>${escapeHtml(r.marca)}</td>
      <td>${escapeHtml(r.submarca)}</td>
      <td>${escapeHtml(r.anio)}</td>
      <td>${escapeHtml(r.placas)}</td>
      <td>${escapeHtml(r.color)}</td>
      <td>${escapeHtml(r.numeroInventario)}</td>
      <td>${escapeHtml(r.numeroActa)}</td>
      <td>${escapeHtml(r.motivoDelito)}</td>
      <td>${escapeHtml(r.telefonoCliente)}</td>
      <td>${escapeHtml(r.choferNombre)}</td>
      <td>${escapeHtml(r.choferCorreo)}</td>
      <td>${renderArchivo(r.fotoInventario, "Foto Inventario")}</td>
      <td>${renderArchivo(r.fotoCarro, "Foto Carro")}</td>
    `;
    tablaCorralonBody.appendChild(tr);
  });
}

function renderTablaSinSeguro() {
  if (!tablaSinSeguroBody) return;
  tablaSinSeguroBody.innerHTML = "";

  registrosSinSeguro.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(r.fecha)}</td>
      <td>${escapeHtml(r.marca)}</td>
      <td>${escapeHtml(r.submarca)}</td>
      <td>${escapeHtml(r.anio)}</td>
      <td>${escapeHtml(r.placas)}</td>
      <td>${escapeHtml(r.color)}</td>
      <td>${escapeHtml(r.nombreCliente)}</td>
      <td>${escapeHtml(r.telefonoCliente)}</td>
      <td>${escapeHtml(r.montoCobrado)}</td>
      <td>${escapeHtml(r.choferNombre)}</td>
      <td>${escapeHtml(r.choferCorreo)}</td>
      <td>${renderArchivo(r.fotoUnidad, "Foto Unidad")}</td>
      <td>${renderArchivo(r.fotoServicio, "Foto Servicio")}</td>
    `;
    tablaSinSeguroBody.appendChild(tr);
  });
}

function renderTablaFacturas() {
  if (!tablaFacturasBody) return;
  tablaFacturasBody.innerHTML = "";

  registrosFacturas.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(r.fecha)}</td>
      <td>${escapeHtml(r.razonSocial)}</td>
      <td>${escapeHtml(r.rfc)}</td>
      <td>${escapeHtml(r.domicilioFiscal)}</td>
      <td>${escapeHtml(r.codigoPostal)}</td>
      <td>${escapeHtml(r.regimenFiscal)}</td>
      <td>${escapeHtml(r.correoCliente)}</td>
      <td>${escapeHtml(r.marca)}</td>
      <td>${escapeHtml(r.submarca)}</td>
      <td>${escapeHtml(r.anio)}</td>
      <td>${escapeHtml(r.placas)}</td>
      <td>${escapeHtml(r.montoSinIVA)}</td>
      <td>${escapeHtml(r.iva)}</td>
      <td>${escapeHtml(r.totalConIVA)}</td>
      <td>${escapeHtml(r.choferNombre)}</td>
      <td>${escapeHtml(r.choferCorreo)}</td>
    `;
    tablaFacturasBody.appendChild(tr);
  });
}

// -------------------- BUSCAR SOLO VALES --------------------
function buscarRegistrosVales() {
  const fecha = buscarFechaInput ? (buscarFechaInput.value || "").trim() : "";
  const placas = buscarPlacasInput ? (buscarPlacasInput.value || "").trim().toUpperCase() : "";
  const marca = buscarMarcaInput ? (buscarMarcaInput.value || "").trim().toLowerCase() : "";
  const submarca = buscarSubmarcaInput ? (buscarSubmarcaInput.value || "").trim().toLowerCase() : "";

  const filtrados = registrosVales.filter((r) => {
    const coincideFecha = !fecha || String(r.fecha || "").trim() === fecha;
    const coincidePlacas = !placas || String(r.placas || "").toUpperCase().includes(placas);
    const coincideMarca = !marca || String(r.marca || "").toLowerCase().includes(marca);
    const coincideSubmarca = !submarca || String(r.submarca || "").toLowerCase().includes(submarca);
    return coincideFecha && coincidePlacas && coincideMarca && coincideSubmarca;
  });

  renderTablaVales(filtrados);
}

function limpiarBusquedaVales() {
  if (buscarFechaInput) buscarFechaInput.value = "";
  if (buscarPlacasInput) buscarPlacasInput.value = "";
  if (buscarMarcaInput) buscarMarcaInput.value = "";
  if (buscarSubmarcaInput) buscarSubmarcaInput.value = "";
  renderTablaVales(registrosVales);
}

// -------------------- LIMPIAR FORMULARIOS --------------------
function limpiarFormularioOriginal() {
  if (seguroInput) seguroInput.value = "";
  if (fechaInput) fechaInput.value = "";
  if (siniestroInput) siniestroInput.value = "";
  if (folioInput) folioInput.value = "";
  if (marcaInput) marcaInput.value = "";
  if (submarcaInput) submarcaInput.value = "";
  if (anioInput) anioInput.value = "";
  if (placasInput) placasInput.value = "";
  if (colorInput) colorInput.value = "";
  if (fotoUnidadInput) fotoUnidadInput.value = "";
  if (fotoValeInput) fotoValeInput.value = "";
}

function limpiarEntrega() {
  if (buscarEntregaPlaca) buscarEntregaPlaca.value = "";
  if (buscarEntregaSiniestro) buscarEntregaSiniestro.value = "";
  if (entregaFecha) entregaFecha.value = "";
  if (entregaSeguro) entregaSeguro.value = "";
  if (entregaTipoBase) entregaTipoBase.value = "";
  if (entregaSiniestro) entregaSiniestro.value = "";
  if (entregaFolio) entregaFolio.value = "";
  if (entregaMarca) entregaMarca.value = "";
  if (entregaSubmarca) entregaSubmarca.value = "";
  if (entregaAnio) entregaAnio.value = "";
  if (entregaPlacas) entregaPlacas.value = "";
  if (entregaColor) entregaColor.value = "";
  if (nombreTaller) nombreTaller.value = "";
  if (quienRecibe) quienRecibe.value = "";
  if (fotoTaller) fotoTaller.value = "";
}

function limpiarCorralon() {
  if (corralonFecha) corralonFecha.value = "";
  if (corralonSeguro) corralonSeguro.value = "";
  if (corralonSiniestro) corralonSiniestro.value = "";
  if (corralonFolio) corralonFolio.value = "";
  if (corralonMarca) corralonMarca.value = "";
  if (corralonSubmarca) corralonSubmarca.value = "";
  if (corralonAnio) corralonAnio.value = "";
  if (corralonPlacas) corralonPlacas.value = "";
  if (corralonColor) corralonColor.value = "";
  if (numeroInventario) numeroInventario.value = "";
  if (numeroActa) numeroActa.value = "";
  if (motivoDelito) motivoDelito.value = "";
  if (telefonoClienteCorralon) telefonoClienteCorralon.value = "";
  if (fotoInventario) fotoInventario.value = "";
  if (fotoCarroCorralon) fotoCarroCorralon.value = "";
}

function limpiarSinSeguro() {
  if (sinSeguroFecha) sinSeguroFecha.value = "";
  if (sinSeguroMarca) sinSeguroMarca.value = "";
  if (sinSeguroSubmarca) sinSeguroSubmarca.value = "";
  if (sinSeguroAnio) sinSeguroAnio.value = "";
  if (sinSeguroPlacas) sinSeguroPlacas.value = "";
  if (sinSeguroColor) sinSeguroColor.value = "";
  if (sinSeguroNombreCliente) sinSeguroNombreCliente.value = "";
  if (sinSeguroTelefonoCliente) sinSeguroTelefonoCliente.value = "";
  if (sinSeguroMontoCobrado) sinSeguroMontoCobrado.value = "";
  if (sinSeguroFotoUnidad) sinSeguroFotoUnidad.value = "";
  if (sinSeguroFotoServicio) sinSeguroFotoServicio.value = "";
}

function limpiarFactura() {
  if (facturaRazonSocial) facturaRazonSocial.value = "";
  if (facturaRFC) facturaRFC.value = "";
  if (facturaDomicilio) facturaDomicilio.value = "";
  if (facturaCodigoPostal) facturaCodigoPostal.value = "";
  if (facturaRegimen) facturaRegimen.value = "";
  if (facturaCorreo) facturaCorreo.value = "";
  if (facturaMarca) facturaMarca.value = "";
  if (facturaSubmarca) facturaSubmarca.value = "";
  if (facturaAnio) facturaAnio.value = "";
  if (facturaPlacas) facturaPlacas.value = "";
  if (facturaMontoSinIVA) facturaMontoSinIVA.value = "";
  if (facturaIVA) facturaIVA.value = "";
  if (facturaTotal) facturaTotal.value = "";
  if (facturaArchivo) facturaArchivo.value = "";
}

// -------------------- UTILS --------------------
function renderArchivo(url, alt) {
  if (!url) return "Sin archivo";

  const lower = String(url).toLowerCase();
  const esPdf = lower.includes(".pdf") || lower.includes("/raw/upload/");

  if (esPdf) {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">Ver PDF</a>`;
  }

  return `
    <a href="${url}" target="_blank" rel="noopener noreferrer">
      <img src="${url}" alt="${alt}" class="foto-mini" />
    </a>
  `;
}

function escapeHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto || "";
  return div.innerHTML;
}
function togglePassword() {
  const input = document.getElementById("passwordLogin");

  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

function exportarExcelFacturas() {
  let tabla = [
    [
      "Fecha",
      "Razón Social",
      "RFC",
      "Domicilio",
      "Código Postal",
      "Régimen",
      "Correo",
      "Marca",
      "Submarca",
      "Año",
      "Placas",
      "Monto",
      "IVA",
      "Total",
      "Chofer"
    ]
  ];

  registrosFacturas.forEach(r => {
    tabla.push([
      r.fecha || "",
      r.razonSocial || "",
      r.rfc || "",
      r.domicilioFiscal || "",
      r.codigoPostal || "",
      r.regimenFiscal || "",
      r.correoCliente || "",
      r.marca || "",
      r.submarca || "",
      r.anio || "",
      r.placas || "",
      r.montoSinIVA || "",
      r.iva || "",
      r.totalConIVA || "",
      r.choferNombre || ""
    ]);
  });

  let csv = tabla.map(e => e.join(",")).join("\n");
  let blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Facturas_ValesGruas.csv";
  link.click();
  }
  function exportarFila(btn){

let fila = btn.closest("tr");
let celdas = fila.querySelectorAll("td");

let datos = [];

celdas.forEach((celda,index)=>{
if(index < celdas.length -1){
datos.push(celda.innerText);
}
});

let csv = datos.join(",");

let blob = new Blob([csv], { type: "text/csv" });
let url = URL.createObjectURL(blob);

let link = document.createElement("a");
link.href = url;
link.download = "Factura_Individual.csv";
link.click();
}


