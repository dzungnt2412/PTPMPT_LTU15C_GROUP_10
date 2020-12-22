
$(init());
async function init(){
		var socket = io.connect('http://localhost:3000')
    	    	    	const userID = Date.now()

	socket.emit('new_user', {userID : userID})
	
	socket.on("change_process", (data) => {
		if (userID == data.userID){
			myMove(function() {
				socket.emit('change_process', {})
				var elem = document.getElementById("animate"); 
				elem.style.display = "none";
			});
		}
	})
    	 }

function myMove(callback) {
	var elem = document.getElementById("animate"); 
	elem.style.display = "block";
    var width = $(".icon").width();
    var pos = 0;
    var animate = setInterval(frame, 2);
    function frame() {
      if (pos == (width-200)) {
		clearInterval(animate);
		callback();
      } else {
        pos++; 
        elem.style.left = pos + "px"; 
      } 
    }
}

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
	var s = date.getSeconds(); // 0 - 59
	var dd = date.getDay();
	var mm = date.getMonth();
	var yy = date.getFullYear();
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
	var time = h + ":" + m + ":" + s + " " + session;
	var day = dd + "/" + mm + "/" + yy
    document.getElementById("time").innerText = time;
	document.getElementById("time").textContent = time;
	
	document.getElementById("day").innerText = day;
    document.getElementById("day").textContent = day;
    
    setTimeout(showTime, 1000);
    
}

showTime();


