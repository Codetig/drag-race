(function(){
	//object constructors
	this.Racer = function(element){
		this.$element = element;
		this.lapTime = 0;
		// this.tip = element.offset().right;
		this.engineOn = false;
		this.gear = 1;

	};

	this.Lights = function(){
		this.$prestage = document.querySelectorAll(".circle1");
		this.$stage = document.querySelectorAll(".two");
		this.$ready = document.querySelectorAll(".ready");
		this.$go = document.querySelectorAll(".go");
		this.$violation = document.querySelectorAll(".disq");
		this.reset();
	};

	this.Track = function(){
		this.$raceAreasWidth = document.getElementById("areas").clientWidth;
		this.realTrackLength = 0.25; //A drag race trace is a quarter mile or 402m
		
		this.$stagingLine1 = Math.round(this.$raceAreasWidth * 0.06);
		this.$stagingLine2 = Math.round(this.$raceAreasWidth * 0.115);
		this.$finishLine = Math.round(this.$raceAreasWidth * 0.93);
		this.trackWidth = this.$finishLine - this.$stagingLine2;
		//this.$trackWidth = document.getElementById("track").clientWidth; //does not match my calculation
		this.$racer = document.getElementById("racer");
		this.$element = "";
		this.seeFlags = false;
	};

	this.Times = function(){
		this.$element = [];
		this.currentTime = {Silver:0, Red:0};
		//this.reset();
	};
	Times.prototype.calcTime = undefined;
	Times.prototype.bestTime = 0;
	Times.prototype.previoustime = {Silver:0, Red:0};

	this.Game = function(){
		//this.raceareas = document.getElementByID('areas');
		this.racer1 = new Racer(document.getElementById('racer'));
		this.lights = new Lights();
		this.track = new Track();
		this.racer2 = new Racer(document.getElementById('racer2'));
		//this.times = new Times();
		
		
		this.racer1.move();
		//this.racer2.compMove(game.track.$finishLine,"0.1%");
		//turnOn(h.$ready, "yellow", 0, h.$go);
		//this.timeBoard = new Time();

	};





//Object methods
	// Racer.prototype.compMove = function(p, q){
	// 	self = this;

	// 	this.$element.style.left = q;
	// 	//document.querySelector(".go").style.backgroundColor == "green" &&
	// 	if(p > self.$element.style.left){
	// 			self.engineOn = true;
	// 			self.$element.style.left = (parseFloat(self.$element.style.left) + 0.1) + "%";
	// 			self.compMove(p,self.$element.style.left);
	// 	}
		
	// 			//console.log("tryna move");
	// };
	Racer.prototype.move = function(){
		console.log("moving");
		this.$element.style.left = "0.1%";
		//1st racer uses 's' to start and left & right arrow keys. 2nd racer starts with 'a' and uses 'z' & 'x' to move
		if(this.$element.id === "racer"){var k =[83,39,37];} else {var k =[65,88,90];}
		var self = this;
		var isEnded = isEnded || false;

		window.addEventListener("keydown", function(event){
			console.log(event.keyCode);
			// console.log(this.offset());
			if(event.keyCode === k[0]){self.engineOn = true;} //when 's' is pressed, engine is turned on.
			if(self.gear < 6 && event.keyCode === 71){
				self.gear++;
			}

			if(self.engineOn){
				if(event.keyCode === k[1]){
					self.$element.style.left = (parseFloat(self.$element.style.left) + 0.2 * self.gear) + "%";
					if(self.racerTip(self.$element, game.track.$raceAreasWidth) >= game.track.$stagingLine1+1){
						for(var i = 0; i < game.lights.$stage.length; i++){
						game.lights.$stage[i].style.backgroundColor = "yellow";
						}
						game.lights.turnOn(game.lights.$ready, 0, game.lights.$go, game.lights.$violation);
					}
				}
				if(event.keyCode === k[2]){
					self.$element.style.left = (parseFloat(self.$element.style.left) - 0.2) + "%";
					if(self.racerTip(self.$element, game.track.$raceAreasWidth) <= game.track.$stagingLine1){
						for(var j = 0; j < game.lights.$stage.length; j++){
						game.lights.$stage[j].style.backgroundColor = "white";
						}
					}
				}
				if(self.racerTip(self.$element, game.track.$raceAreasWidth) > game.track.$finishLine && !isEnded){
					Times.calcTime = Date.now() - Times.calcTime;
					self.lapTime = Times.calcTime;
					document.querySelector("#r1time").innerHTML = (Times.calcTime/1000) + " Sec"; //could use a function to assign to right player
					isEnded = true;
				}
				if(self.racerTip(self.$element, game.track.$raceAreasWidth) > game.track.$finishLine + 60 || 
					self.racerTip(self.$element, game.track.$raceAreasWidth) < 40){
					console.log("game ended");
					self.engineOn = false;
				}
			}
		});
	};

	Lights.prototype.turnOn = function(lightType, p, goLight, violation){
			var self = this;

			if(p < lightType.length){
			setTimeout(function(){
				lightType[p].style.backgroundColor = "yellow";
				lightType[p+1].style.backgroundColor = "yellow";
				self.turnOn(lightType, p +2, goLight, violation);
			}, 500);
			} else if(game.racer1.racerTip(game.racer1.$element, game.track.$raceAreasWidth) <= game.track.$stagingLine2){
				setTimeout(function(){
				goLight[0].style.backgroundColor = "green";
				goLight[1].style.backgroundColor = "green";
				Times.calcTime = Times.calcTime || Date.now();
				}, 500);
			} else if (goLight[0].style.backgroundColor != "green" && game.racer1.racerTip(game.racer1.$element, game.track.$raceAreasWidth) > game.track.$stagingLine2) {
				console.log(game.racer1.racerTip(game.racer1.$element, game.track.$raceAreasWidth));
				console.log(game.racer1.$element.style.left);

				violation[0].style.backgroundColor = "red";
				violation[1].style.backgroundColor = "red";
				self.engineOn = false;
			}
			
	
	};

	Lights.prototype.reset = function(){
		for(var i = 0; i < document.querySelectorAll(".stage").length; i++){
			document.querySelectorAll(".stage")[i].style.backgroundColor = "white";
		}

		for(var j = 0; j < document.querySelectorAll(".ready").length; j++){
			document.querySelectorAll(".ready")[j].style.backgroundColor = "white";
		}
		for(var k = 0; k < document.querySelectorAll(".go").length; k++){
			document.querySelectorAll(".go")[k].style.backgroundColor = "white";
		}
		//Need more info about how the lights should start
		//this.prestage
	};


	Racer.prototype.racerTip = function (racer, areaWidth) { //Separated to accomodate 2 racers
			return racer.clientWidth + ((parseFloat(racer.style.left)/100) * areaWidth);
		};

	 

	var game = new Game();

	})();
