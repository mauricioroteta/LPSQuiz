let preguntas_aleatorias = true;
let mostrar_pantalla_juego_términado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;
let nro_Preguntas = 8;

window.onload = function () {
  base_preguntas = readText("base-preguntas.json");
  interprete_bp = JSON.parse(base_preguntas);
  escogerPreguntaAleatoria();
};

let pregunta;
let posibles_respuestas;
btn_correspondiente = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4")
];
let npreguntas = [];

let preguntas_hechas = 0;
let preguntas_correctas = 0;

function escogerPreguntaAleatoria() {
  let n;
  if (preguntas_aleatorias) {
    n = Math.floor(Math.random() * interprete_bp.length);
  } else {
    n = 0;
  }
  
    if (preguntas_hechas == nro_Preguntas) {
      //Aquí es donde el juego se reinicia
      if (mostrar_pantalla_juego_términado) {
        if (preguntas_correctas == 5){
          swal.fire({
            title: "¡Felicitaciones! Has ganado",
            imageUrl: './assert/festejo_5.gif', imageWidth: 400, imageHeight: 300, imageAlt: 'Ganador',
            text:
            "Puntuación: " + preguntas_correctas + "/" + (preguntas_hechas),
          });
        }else{
          swal.fire({
            title: "¡Perdiste!",
            imageUrl: './assert/gameover.gif', imageWidth: 400, imageHeight: 400, imageAlt: 'Ganador',
            text: "Puntuación: " + preguntas_correctas + "/" + (preguntas_hechas),
          });
        }
      }
      if (reiniciar_puntos_al_reiniciar_el_juego) {
        preguntas_correctas = 0
        preguntas_hechas = 0
      }
      npreguntas = [];
    }

  npreguntas.push(n);
  preguntas_hechas++;

  escogerPregunta(n);
}

function escogerPregunta(n) {
  pregunta = interprete_bp[n];
  select_id("categoria").innerHTML = pregunta.categoria.toUpperCase();
  select_id("pregunta").innerHTML = pregunta.pregunta.toUpperCase();
  select_id("numero").innerHTML = n;
  let pc = preguntas_correctas;
  if (preguntas_hechas > 0) {
    //select_id("puntaje").innerHTML = pc + " / " + (preguntas_hechas - 1) + " de " + nro_Preguntas;
    select_id("puntaje").innerHTML = "Intentos: " + preguntas_hechas + "/"+ nro_Preguntas + " - Aciertos: " + pc ;
  } else {
    select_id("puntaje").innerHTML = "";
  }

  style("imagen").objectFit = pregunta.objectFit;
  desordenarRespuestas(pregunta);
  if (pregunta.imagen) {
    select_id("imagen").setAttribute("src", pregunta.imagen);
    style("imagen").height = "20rem";
    style("imagen").width = "20rem";
  } else {
    style("imagen").height = "20rem";
    style("imagen").width = "20rem";
    setTimeout(() => {
      select_id("imagen").setAttribute("src", "");
    }, 500);
  }
}

function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    pregunta.respuesta.toUpperCase(),
    pregunta.incorrecta1.toUpperCase(),
    pregunta.incorrecta2.toUpperCase(),
    pregunta.incorrecta3.toUpperCase(),
  ];
  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}

let suspender_botones = false;

function oprimir_btn(i) {
  if (suspender_botones) {
    return;
  }
  suspender_botones = true;
  if (posibles_respuestas[i].toUpperCase() == pregunta.respuesta.toUpperCase()) {
    preguntas_correctas++;
    btn_correspondiente[i].style.background = "lightgreen";
  } else {
    btn_correspondiente[i].style.background = "pink";
  }
  for (let j = 0; j < 4; j++) {
    if (posibles_respuestas[j] == pregunta.respuesta) {
      btn_correspondiente[j].style.background = "lightgreen";
      break;
    }
  }
  setTimeout(() => {
    reiniciar();
    suspender_botones = false;
  }, 500);
}

// let p = prompt("numero")

function reiniciar() {
  for (const btn of btn_correspondiente) {
    btn.style.background = "white";
  }
  escogerPreguntaAleatoria();
}

function select_id(id) {
  return document.getElementById(id);
}

function style(id) {
  return select_id(id).style;
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}
