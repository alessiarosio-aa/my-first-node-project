let socket = io(); // in questo modo mettiamo nel nostro file js la libreria socket, ma prima va messa nell'index, se no non funzionana
// dobbiamo collegare la libreria socket anche qui perchè ci serve per mandare dati tra server e pc

socket.on("connect", newConnection);

function newConnection() {
  console.log("your id: " + socket.id); // in questo modo vedo nella console l'id di chi si è connesso
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
  ellipse(mouseX, mouseY, 20);
  // creaiamo il messaggio
  let message = { // stiamo rilevando le coordinate del mouse x e y e le impacchettiamo nella variabile message
    x: mouseX,
    y: mouseY,
  };
  // per inviare il messaggio al server
  socket.emit("mouse", message); // qui mandiamo il messaggio al server
}
