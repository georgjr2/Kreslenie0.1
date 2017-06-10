var portik = 1337;
var klienti = [];
var client = {};
var defaultnyAdmin = {meno:"admin",ID:"admin"};
klienti.push(defaultnyAdmin);
var zakazany1 = {meno:"",ID:"/skryte/"};
klienti.push(zakazany1);
var zleMeno = false;
var express = require('express');
var app = express();
app.get('/',function(req, res) {
		res.sendFile(__dirname + '/public/login.html')});
// serverSetup
// process.env.PORT -> heroku
var server = app.listen(process.env.PORT || portik, listen);

// správa => cmd 
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}
app.use(express.static('public'));
// WebSocket 
// WebSockets pracuje s HTTP serverom
var io = require('socket.io')(server);
		// --------------------------------------------------------------------------------------------------------
		// --------------------------------------------------ZACIATOK KODU-----------------------------------------
		// --------------------------------------------------------------------------------------------------------
		// --------------------------------------------------------------------------------------------------------

io.sockets.on('connection',
 
  function (socket) {
  	
    console.log("We have a new client: " + socket.id);
  	
// ----------------------TABULKA-LUDI------------------------------------------------------------------------------
	for(var i = 0;i<klienti.length;i++){if(klienti[i].ID != "/skryte/"){if(klienti[i].ID != "admin"){
	socket.emit('tabulkaUpdate',klienti[i].meno);};};
	};
	
	
// -----------------------PRIJMEME A ODOSLEME MYS----------------------------------------------------------------
    // client : socket.emit('event',data);
    socket.on('mouse',
      function(data) {
        // Prijmeme data tak ako boli odoslané
        console.log("Received: 'mouse' " + data.x + " " + data.y);
		
		
      
        // Pošleme vš. ostatným
        socket.broadcast.emit('mouse', data);
        
        // Posielame každému aj odosielateľovi
        // io.sockets.emit('message', "všetkým");

      }
    );
// --------------------------PRI ODOSLANI LOGIN--------------------------------------------------------------------
    socket.on('login',function(name){
		for(var i=0;i < klienti.length;i++) {
		if(klienti[i].meno != name){
				
				zleMeno = false;
		};};
		for(var i=0;i < klienti.length;i++) {
		if(klienti[i].meno == name){
				socket.emit('chyba',"Meno používateľa už existuje alebo nie je povolené");
				zleMeno = true;
		};};
		
		if(zleMeno == false) {
			//pridať objekt s ID a s menom
		client = {meno:name, ID: socket.id};
		
		console.log("prihlásil sa " + client.meno +  " --- ID: " + client.ID);
		klienti.push(client);
		socket.emit('success',"úspešne prihlásený"); }});
//----------------------------PRI HRE--------------------------------------------------------------------------
	
	socket.on('hraLogin',function(meno){
		console.log(meno + " je v hre !");
		
		console.log("Prihlásení : ")
		for(var i=0;i < klienti.length;i++) {
			console.log(klienti[i].meno);
			
		
			}; 
		});
			  
		
	
	
	
// -----------------------PRI ODPOJENÍ-----------------------------------------------------------------------------
    socket.on('disconnect', function() {
      console.log("Client has disconnected");
	
		console.log("odhlásil sa "  + socket.id);
//	for(var i=0;i < klienti.length;i++) {
//			if(id == klienti[i].ID){
//				klienti.pop()				
//			}; 
//		
//	};
    });
	
	
	
	
	
	
	// ---------------------------------------------------------------
	// ----------------------DEBUG APPLIKACIE------------------------
	// ---------------------------------------------------------------
	socket.on('list', function() {
		console.log("ZOZNAM prihlásených : ");
		for(var i=0;i < klienti.length;i++){ if(klienti[i].ID != "/skryte/"){
			console.log(klienti[i]);}						   
										}
	});
});