(function(){
	//object constructors
	this.Racer = function(element){
		this.$element = element;
		// this.tip = element.offset().right;
		this.engineOn = false;
		this.gear = 0;

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
		this.realTrackLength = 402; //A drag race trace is a quarter mile or 402m
		
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
		this.$element = "";
		this.bestTime = 0;
		this.previoustime = 0;
		this.reset();
	};

	this.Game = function(){
		//this.raceareas = document.getElementByID('areas');
		this.racer1 = new Racer(document.getElementById('racer'));
		this.lights = new Lights();
		this.track = new Track();
		
		this.racer1.move();

		//turnOn(h.$ready, "yellow", 0, h.$go);
		//this.timeBoard = new Time();

	};





//Object methods
	Racer.prototype.move = function(){
		console.log("moving");
		this.$element.style.left = "0.1%";
		var self = this;

		window.addEventListener("keydown", function(event){
			console.log(event.keyCode);
			// console.log(this.offset());
			if(event.keyCode === 83){self.engineOn = true;} //when 's' is pressed, engine is turned on.

			if(self.engineOn){
				if(event.keyCode === 39){
					self.$element.style.left = (parseFloat(self.$element.style.left) + 0.2) + "%";
					if(self.racerTip(self.$element, game.track.$raceAreasWidth) >= game.track.$stagingLine1+2){
						for(var i = 0; i < game.lights.$stage.length; i++){
						game.lights.$stage[i].style.backgroundColor = "yellow";
						}
						game.lights.turnOn(game.lights.$ready, 0, game.lights.$go, game.lights.$violation);
					}
				}
				if(event.keyCode === 37){
					self.$element.style.left = (parseFloat(self.$element.style.left) - 0.2) + "%";
					if(self.racerTip(self.$element, game.track.$raceAreasWidth) <= game.track.$stagingLine1){
						for(var j = 0; j < game.lights.$stage.length; j++){
						game.lights.$stage[j].style.backgroundColor = "white";
						}
					}
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
				}, 500);
			} else if (goLight[0].style.backgroundColor != "green" && game.racer1.racerTip(game.racer1.$element, game.track.$raceAreasWidth) > game.track.$stagingLine2) {
				console.log(game.racer1.racerTip(game.racer1.$element, game.track.$raceAreasWidth));
				console.log(game.racer1.$element.style.left);

				violation[0].style.backgroundColor = "red";
				violation[1].style.backgroundColor = "red";
			}
			
	
	};

	Lights.prototype.reset = function(){
		//Need more info about how the lights should start
		//this.prestage
	};


	Racer.prototype.racerTip = function (racer, areaWidth) { //Separated to accomodate 2 racers
			return racer.clientWidth + ((parseFloat(racer.style.left)/100) * areaWidth);
		};

	// Game.prototype.attachListeners = function(){
	// 	var self = this
	// };

//for testing, will be deleted before game launch.
	var game = new Game();
	// g.move();
	// var h = new Lights();
	// console.log(h.$ready);

	// h.turnOn(h.$ready, "yellow", 0, h.$go);
	
	// var j = new Stats();
	// console.log(j.trackWidth);
	// if(j.racerTip(j.$racer, j.$raceAreasWidth) >= j.$stagingLine2){
	// 	console.log("yup, tracking racer!");
	// }
	

	})();
