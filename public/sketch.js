var IP = "http://10.2.1.239:1337";
var localIP = "localhost:1337"
var socket = io.connect(IP);
var sirka = 600;
var vyska = 600;
var idBer = sessionStorage.getItem("logID")
var menoBer = sessionStorage.getItem("logMeno");
socket.id = idBer;
function reload(){
	background(0);
}

function setup() {
	
	
	
	console.log(menoBer);
	socket.id = idBer;
	
	if(idBer == null) {
		window.location.replace("/login.html");
	};
	
	socket.emit('hraLogin',menoBer);
	
	
  createCanvas(sirka, vyska);
  background(0);
  // začneme socket connection
  
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------MYSKA------------------------------------------------
//--------------------------------------------------------------------------------------------------------
  // Vytvoríme event 'mouse' a vpíšeme
  // anonymnú callback funkciu
  socket.on('mouse',
    // Keď príjmame
    function(data) { 
//      console.log("Got: " + data.x + " " + data.y);
      // Vykreslíme MODRÝ krúžok
      fill(0,0,255);
      noStroke();
      ellipse(data.x, data.y, 20, 20);
    });
	
}

function draw() {
  // ...
}

function touchMoved() {if( mouseX < sirka && mouseX > 0 && mouseY < vyska && mouseY > 0 ){
  // Vykreslíme biele krúžky
  fill(255);
  noStroke();
  ellipse(mouseX,mouseY,20,20);
  // Odošleme koordináty myši
  sendmouse(mouseX,mouseY);
}
	};

// Fn. posielanie -> socket
function sendmouse(xpos, ypos) {

//  console.log("sendmouse: " + xpos + " " + ypos);
  
  // Vytvoríme objekt 
  var data = {
    x: xpos,
    y: ypos
  };

  //Odošleme objekt 
  socket.emit('mouse',data);
}