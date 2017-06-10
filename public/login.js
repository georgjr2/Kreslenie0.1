var IP = "http://10.2.1.239:1337";
var localIP = "localhost:1337"
var socket = io.connect(IP);

 function login() { 
		   meno = document.getElementById("meno").value;
		  console.log(meno);
		  socket.emit('login',meno);
	 	
		  };
		//window.sessionStorage('ULmeno',meno );
				
function list() {
		socket.emit('list', "aaa");
	};
function setup(){
	sessionStorage.setItem("logID", socket.id);
	//Ak používateľ už existuje
	socket.on('chyba', function(sprava1){
		console.log(sprava1);
	});
	socket.on('success',function(){
		window.location.replace("/index.html");
		sessionStorage.setItem("logMeno", meno);
		
		
	});
	
};
 