var openStreetMap = L.tileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }
);
googleSat = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
});

var map = L.map("map", {
  center: [10.410041, -66.886543],
  zoom: 16,
  layers: [googleSat],
});

if (L.Browser.mobile) {
  map.fitBounds([
    [10.412858, -66.889161],
    [10.408764, -66.880143],
  ]);
}

var baseMaps = {
  Satélite: googleSat,
  Calles: openStreetMap,
};

L.control.layers(baseMaps).addTo(map);

map.zoomControl.setPosition("topright");

var sidebar = L.control
  .sidebar({
    autopan: false,
    closeButton: true,
    container: "sidebar",
    position: "left",
  })
  .addTo(map);

sidebar.open("home");

L.control
  .locate({
    position: "topright",
  })
  .addTo(map);

if (L.Browser.mobile) {
  map.on("click", function () {
    sidebar.close();
  });
}

$("#tablist-home-btn").click(function () {
  if (L.Browser.mobile) {
    map.fitBounds([
      [10.412858, -66.889161],
      [10.408764, -66.880143],
    ]);
  } else {
    map.flyTo([10.410041, -66.886543], 16);
  }
});

var source;
var target;
var pathLayer = L.geoJSON(null);
var sourceMarker = L.geoJSON(null);
var targetMarker = L.geoJSON(null);

function getVertexSource(x, y) {
  var url =
    "./src/php/vertex.php?lat=" + y + "&lon=" + x;
  $.ajax({
    dataType: "json",
    url: url,
    async: true,
    success: function (data) {
      loadVertexSource(data);
      sourceMarker = L.geoJSON(data);
      map.addLayer(sourceMarker);
    },
    error: function () {
      setTimeout(function () {
        getVertexSource(sourceX, sourceY);
      }, 2000);
    },
  });
}

function getVertexTarget(x, y) {
  var url =
    "./src/php/vertex.php?lat=" + y + "&lon=" + x;
  $.ajax({
    dataType: "json",
    url: url,
    async: true,
    success: function (data) {
      loadVertexTarget(data);
      targetMarker = L.geoJSON(data);
      map.addLayer(targetMarker);
      targetMarker.bindPopup(myVal2).openPopup();
    },
    error: function () {
      setTimeout(function () {
        getVertexTarget(targetX, targetY);
      }, 2000);
    },
  });
}

function loadVertexSource(response) {
  var features = response.features;
  source = features[0].properties.id;
}

function loadVertexTarget(response) {
  var features = response.features;
  target = features[0].properties.id;
}

function getRoute() {
  var url =
    "./src/php/edge.php?source=" +
    source +
    "&target=" +
    target;
  $.ajax({
    dataType: "json",
    url: url,
    async: true,
    success: function (data) {
      map.removeLayer(pathLayer);
      pathLayer = L.geoJSON(data);
      map.addLayer(pathLayer);
      calculateDistance(data);
      myVal1 = null;
      myVal2 = null;
      sidebar.close();
      map.flyToBounds(pathLayer);
    },
    error: function () {
      setTimeout(function () {
        getRoute();
      }, 2000);
    },
  });
}

var lugaresList = [
  "Fuente Hidrocinética",
  "Biblioteca Central",
  "Aulas - AUL",
  "Complejo de Auditorios",
  "Laberinto Cromovegetal",
  "Comedor Central",
  "Comedor Casa del Estudiante",
  "Cafetín El Ampere",
  "Piscina Olímpica",
  "Piscina de Clavadismo",
  "Doña Jojoto",
  "Gimnasio Techado",
  "Cancha de Kickingball",
  "Canchas de Tenis",
  "Campo de Béisbol",
  "Campo de Sóftbol",
  "Sala de Pesas - Gimnasio",
  "Campo Olímpico",
  "Pino Solitario",
  "Guardabosques",
  "Restaurant Escuela Camuri Alto - RECA",
  "Mecánica y Estudios Urbanos - MEU",
  "Mecánica y Materiales - MEM",
  "Energética - ENE",
  "Estudios Generales - EGE",
  "Química y Procesos - QYP",
  "Electrónica - ELE",
  "Física y Electrónica 1 - FE1",
  "Física y Electrónica 2 - FE2",
  "Comunicaciones - COM",
  "Matemáticas y Sistemas - MYS",
  "Ciencias Básicas 1 - CB1",
  "Ciencias Básicas 2 - CB2",
  "Casa del Profesor",
  "Casa Rectoral - Rectorado",
  "Pabellón 6 - PA6",
  "Sala de Teatro Pabellón 6",
  "Laguna de los Patos",
  "Pabellón 1 - PA1",
  "Pabellón 5 - PA5",
  "Pabellón 2 - PA2",
  "Pabellón 3 - PA3",
  "Pabellón 4 - PA4",
  "Laboratorio de Alta Tensión",
  "Laboratorio de Conversión de Energía Eléctrica - CEE",
  "Laboratorio de Procesos Metalmecánicos",
  "Casa del Empleado - EMP",
  "Auditorio de ENE",
  "Auditorio de MEM",
  "La Casita - Sede FCE",
  "Servicios Generales",
  "Mechurrio",
  "U.E.I. Simón Bolívar",
  "Guardería USB",
  "Escultura Simón Bolívar",
  "Auditorio MEU",
  "Almacén - ALM",
  "Parada de Transporte Principal",
  "Laboratorio de Tratamientos Térmicos - TRT",
  "Laboratorio de Materiales y Depósito Central - MTE",
  "Laboratorio de Fluidos y Operaciones Unitarias - FOP",
  "Laboratorio de Microscopía Electrónica - MIC",
  "Proveeduria IPP - PRO",
  "Laboratorio de Termodinámica y Transferencia - TYT",
  "Laboratorio de Conversión de Energía Mecánica - CEM",
  "Casa de Los Naranjos",
  "Librería Limesama",
  "Proveeduría Estudiantil",
  "Cancha Fútbol Sala",
  "Represa",
  "Pica Mercantil",
  "Antena Digitel",
  "La Casita (retirada)",
  "Curva 180",
  "Y de Juan Fermin",
  "Puesto de Guardia",
  "Viveros",
  "Chinchorro",
  "Cuerpo de Bomberos",
  "Centro de Especialidades Odontológicas",
  "Enfermería",
  "Caja",
  "Estacionamiento Biblioteca",
  "Estacionamiento Mecánica y Estudios Urbanos - MEU",
  "Dirección de Admisión y Control de Estudios - DACE",
  "Decanato de Estudios Generales",
  "Coordinación de Ciclo Básico",
  "Librería Xerox",
  "Banco Mercantil",
  "Parada de Transporte Aulas",
  "Aulas abiertas",
  "Pica Yogui",
  "Acuario Grill",
  "Agrupación Oikos",
  "Agrupación Wissib USB",
  "Casa del Estudiante",
  "Antena Norte",
  "Pica Caribe",
  "Pica Norte",
  "Complejo Deportivo - Canchas",
  "Dirección de Desarrollo Estudiantil - DIDE",
  "Dirección de Servicios",
  "Restaurante Casa del Profesor",
  "Coffee Break",
  "Chip a cookie",
  "Bamboo Xpress (Aulas)",
  "Acuario Café",
  "Centro de Estudiantes de Arquitectura",
  "Centro de Estudiantes de Urbanismo",
  "Centro de Estudiantes de Computación",
  "Centro de Estudiantes de Biología",
  "Centro de Estudiantes de Matemáticas",
  "Centro de Estudiantes de Organización Empresarial",
  "Centro de Estudiantes de Ingeniería Geofísica",
  "Centro de Estudiantes de Física",
  "Centro de Estudiantes de Ingeniería en Materiales",
  "Centro de Estudiantes de Ingeniería Mecánica",
  "Centro de Estudiantes de Ingeniería Química",
  "Centro de Estudiantes de Química",
  "Centro de Estudiantes de Ingeniería en Producción",
  "Centro de Estudiantes de Ingeniería Eléctrica",
  "Boulevar de ENE - Bule",
  "Sistema de Préstamo de Bicicletas - Ruédala Simón",
];

var lugaresList = new Bloodhound({
  local: lugaresList,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  datumTokenizer: Bloodhound.tokenizers.whitespace,
});

$(".from").typeahead(
  {
    minLength: 1,
    highlight: true,
  },
  {
    name: "from",
    source: lugaresList,
  }
);

$(".to").typeahead(
  {
    minLength: 1,
    highlight: true,
  },
  {
    name: "from",
    source: lugaresList,
  }
);

var myVal1;
var myVal2;

$(".from").bind("typeahead:select", function (ev, suggestion) {
  myVal1 = suggestion;
});

$(".to").bind("typeahead:select", function (ev, suggestion) {
  myVal2 = suggestion;
});

var sourceX;
var sourceY;
var targetX;
var targetY;

//listener form search route
$(function () {
  $("#formSearchDirection").on("submit", function (e) {
    e.preventDefault();
    if ($("#direccionFrom").typeahead("val") == "Ubicación seleccionada") {
      if (myVal2 == null) {
        alert('Selecciona una "Dirección hasta"');
      } else {
        $(".typeahead").typeahead("val", "");
        map.removeLayer(pointMarker);
        map.removeLayer(sourceMarker);
        getVertexSource(sourceX, sourceY);
        map.removeLayer(targetMarker);
        for (var i = 0; i < lugares.features.length; i++) {
          if (myVal2 == lugares.features[i].properties.Nombre) {
            targetX = lugares.features[i].properties.Lon;
            targetY = lugares.features[i].properties.Lat;
          }
        }
        getVertexTarget(targetX, targetY);
        getRoute();
      }
    } else {
      if (myVal1 == null) {
        alert('Selecciona una "Dirección desde"');
      } else if (myVal2 == null) {
        alert('Selecciona una "Dirección hasta"');
      } else {
        $(".typeahead").typeahead("val", "");
        map.removeLayer(pointMarker);
        map.removeLayer(sourceMarker);
        for (var i = 0; i < lugares.features.length; i++) {
          if (myVal1 == lugares.features[i].properties.Nombre) {
            sourceX = lugares.features[i].properties.Lon;
            sourceY = lugares.features[i].properties.Lat;
          }
        }
        getVertexSource(sourceX, sourceY);
        map.removeLayer(targetMarker);
        for (var i = 0; i < lugares.features.length; i++) {
          if (myVal2 == lugares.features[i].properties.Nombre) {
            targetX = lugares.features[i].properties.Lon;
            targetY = lugares.features[i].properties.Lat;
          }
        }
        getVertexTarget(targetX, targetY);
        getRoute();
      }
    }
  });
});

var distanceSumLoop;
var timeSumLoop;

function calculateDistance(data) {
  var entities = data.features;
  distanceSumLoop = 0;
  timeSumLoop = 0;
  for (var i = 0; i < entities.length; i++) {
    distanceSumLoop += entities[i].properties.distance;
  }
  distanceSumLoop = Math.round(distanceSumLoop * 1000);
  timeSumLoop = Math.round((distanceSumLoop * 60) / 4000);
  $("#routeDistance").text(distanceSumLoop + " metros");
  $("#routeTime").text(timeSumLoop + " minutos");
  $("#routePath").text("Desde " + myVal1 + " hasta " + myVal2);
}

$(".pointMarker").typeahead(
  {
    minLength: 1,
    highlight: true,
  },
  {
    name: "pointMarker",
    source: lugaresList,
  }
);

var myVal3;
var myVal3Lon;
var myVal3Lat;

$(".pointMarker").bind("typeahead:select", function (ev, suggestion) {
  myVal3 = suggestion;
});

var pointMarker = L.marker(null);

//listener form search point
$(function () {
  $("#formSearchPoint").on("submit", function (e) {
    e.preventDefault();
    if (myVal3 == null) {
      alert("Seleccione un lugar para buscar");
    } else {
      $(".typeahead").typeahead("val", "");
      map.removeLayer(sourceMarker);
      map.removeLayer(targetMarker);
      map.removeLayer(pathLayer);
      $("#routeDistance").text(" ");
      $("#routeTime").text(" ");
      $("#routePath").text(" ");
      map.removeLayer(pointMarker);
      for (var i = 0; i < lugares.features.length; i++) {
        if (myVal3 == lugares.features[i].properties.Nombre) {
          myVal3Lon = lugares.features[i].properties.Lon;
          myVal3Lat = lugares.features[i].properties.Lat;
        }
      }
      pointMarker = L.marker([myVal3Lat, myVal3Lon]);
      map.addLayer(pointMarker);
      map.flyTo(pointMarker.getLatLng(), 16);
      pointMarker.bindPopup(myVal3).openPopup();
      if (L.Browser.mobile) {
        sidebar.close();
      }
      myVal3 = null;
    }
  });
});

var isInside;

function getPositionCampus(x, y) {
  var url =
    "./src/php/campus.php?lat=" +
    y +
    "&lon=" +
    x;
  $.ajax({
    dataType: "json",
    url: url,
    async: true,
    success: function (data) {
      isInside = data.crs;
    },
    error: function () {
      setTimeout(function () {
        getVertexTarget(sourceX, sourceY);
      }, 2000);
    },
  });
}

function myPosition() {
  function success(position) {
    sourceX = position.coords.longitude;
    sourceY = position.coords.latitude;
    getPositionCampus(sourceX, sourceY);
    if (isInside == null) {
      alert(
        "Su posición GPS indica que usted está fuera del campus. Seleccione una dirección de la lista"
      );
    } else {
      myVal1 = "Mi ubicación";
      $("#direccionFrom").typeahead("val", "Ubicación seleccionada");
    }
  }
  function error() {
    alert("Hubo un error, no podemos detectar su ubicación");
  }
  if (!navigator.geolocation) {
    alert("Hubo un error, habilite su GPS");
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

document.querySelector("#myLocation").addEventListener("click", myPosition);
