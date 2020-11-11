let socket = io(); // in questo modo mettiamo nel nostro file js la libreria socket, ma prima va messa nell'index, se no non funzionana
// dobbiamo collegare la libreria socket anche qui perchè ci serve per mandare dati tra server e pc
let myColor = "white";

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse); // la virgola significa "eseguito attraverso"
socket.on("color", setColor);
    // prima mandiamo come messaggio quello della nuova connessione, poi le coordinate del mouse, poi il colore. Tutti questi sono messaggi
    // tutte queste sono riferite ai socket.emit che sono scirtti nel server.js

function setColor(assignedColor) {
  myColor = assignedColor;
}

function newConnection() {
  console.log("your id: " + socket.id); // in questo modo vedo nella console l'id di chi si è connesso
}

function drawOtherMouse(data) { // questa variabile contiene i dati ricevuti dal server
  push();
  fill(data.color);
  ellipse(data.x, data.y, 15);
  pop();
}

function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  background("pink");
  // put setup code here
}

function draw() {
  // put drawing code here
}

function mouseMoved() {
  push();
  fill(myColor);
  ellipse(mouseX, mouseY, 20);
  pop();
  // creaiamo il messaggio
  let message = { // stiamo rilevando le coordinate del mouse x e y e le impacchettiamo nella variabile message
    x: mouseX,
    y: mouseY,
    color: myColor,
  };
  // per inviare il messaggio al server
  socket.emit("mouse", message); // qui mandiamo il messaggio al server
}
