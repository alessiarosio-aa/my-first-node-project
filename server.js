      // questo è il file che viene avviato dal server
      // se andiamo su github desktop - repository - open in command prompt, ci fa vedere se la pagina viene elaborata dal server scrivendo "node server.js" (senza % prima della frase)
console.log("node is running")

      // scrivendo nel terminal npm init ci connette al serve (premo invio senza inserire i dati per ora non ci interesssa)
      // c'è un oggetto json che ci permette di avviare il progetto, viene quindi creato un file che si chiama package.json, in questo modo possiamo installare i packages
      // scrivendo nel terminal npm install express --save (lasciare lo spazio tra install e -) mi installa il package express
      // questo crea un nuovo file chiamato pakage-lock.json (vediamo se funziona perchè viene creato un pezzo di codice nel file package.json alla fine, chiamato espress)

let express = require("express"); // stiamo richiedendo di installare il pezzo di codice chiamato express e di avere la possibilità di richiamarlo con la variabile express
      // così abbiamo caricato il codice del pacchetto sul nostro file attraverso una variabile

let socket = require("socket.io"); // io sta per input e output

let app = express();

let port = 3000;

let server = app.listen(port);

      // queste quattro righe (let express, let app, let port e let server) permettono di creare un server locale
      // aprendo il terminal da github, e scrivendo node server.js possiamo vedere che funziona, ma se scriviamo su una pagina web "localhost:3000" vediamo che funziona ma nulla viene caricato

      // quindi creiamo una nuova cartella chiamata public e ci inseriamo un file index.html (prima non si vedeva niente perchè non c'era niente a livello di file, funzionava ma non si vedeva nulla)

app.use(express.static("public")); // scrivendo questo stiamo dicendo che l'app deve usare una funzione di express che si chiama static che richaima la cartella public che abbiamo creato prima
      // per fermare l'avvio del server basta cliccare ctrl+c, per avviarlo invece node server.js
      // ora vediamo ciò che abbiamo scritto nell'index

      // abbiamo creato un server virtuale nel nostro computer e abbiamo inviato come clienti delle informazioni al server
      // ora dobbiamo creare dei web sockets, ovvero permettere ai clienti (pc) di inviare dati al server
      // quindi andiamo nel terminal e scriviamo "npm install socket.io --save", vediamo se è installato sempre dal file package.json che nelle ultime righe farà vedere una scritta socket.io
      // la linea 5 del file package.json è la più importante perchè contiene la connessione tra i pacchetti e il file server

let io = socket(server); // così creiamo un socket che va definito con la dicitura server nelle parentesi
      // questa libreria ci permette di mandare messaggi tra server e clienti (pc). I messaggi si chiamano eventi, dobbiamo quindi creare delle cose interpretate come eventi

io.on("connection", newConnection); // stiamo dicendo: quando c'è un messaggio connection eseguisci la funzione new connection

function newConnection(socket) { // questa funzione ci fornisce la connessione unica che c'è con il cliente
  console.log("new connection: " + socket.client.id);

  let clientColor = getRandomColor();
  socket.emit("color", clientColor); 

  socket.on("mouse", mouseMessage); // qui diciamo di darci le informazioni sul mouse come messaggio che viene dal cliente, eseguita tramite la funzione mouseMessage

  function mouseMessage(dataReceived) { // in questo modo vediamo nel terminal la posizione della x e della y, stiamo mandando le informazioni del mouse del cliente al server
    console.log(socket.client.it, dataReceived); // ci dice l'id del cliente che provoca i dati
    socket.broadcast.emit("mouseBroadcast", dataReceived); // in questo modo diciamo di inviare il messaggio al server e agli altri utenti, ma senza che venga rinviato a noi
  }
}


    // aggiungiamo la funzione che assegna un colore random a ogni utente diverso
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
