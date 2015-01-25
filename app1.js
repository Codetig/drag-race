(function(){
	//object constructors
	this.Racer = function(element){
		this.$element = element;
		// this.tip = element.offset().right;
		this.engineOn = false;
		this.gear = 0;

	};

	this.Lights = function(){
		this.$prestage = document.querySelectorAll(".circle1")[0];
		this.$stage = document.querySelectorAll(".circle1")[1];
		this.$ready = document.querySelectorAll(".ready");
		this.$go = document.querySelectorAll(".go");
		this.$violation = document.querySelectorAll(".disq");
		this.reset();
	};

	this.Track = function(){
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
		this.raceareas = document.getElementByID('areas');
		this.racer1 = new Racer(document.getElementByID('racer'));
		this.lights = new Lights();
		this.track = new Track();
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
			if(event.keyCode === 39){
				self.$element.style.left = (parseFloat(self.$element.style.left) + 0.2) + "%";
			}
			if(event.keyCode === 37){
				self.$element.style.left = (parseFloat(self.$element.style.left) - 0.2) + "%";
			}
		});
	};

	Lights.prototype.turnOn = function(lightType, color, p, cb){
			var self = this;

			if(p < lightType.length){
			setTimeout(function(){
				lightType[p].style.backgroundColor = color;
				lightType[p+1].style.backgroundColor = color;
				self.turnOn(lightType, color, p +2, cb);
			}, 1500);
			} else{
				setTimeout(function(){
				cb[0].style.backgroundColor = "green";
				cb[1].style.backgroundColor = "green";	
				}, 1500);
			}
			
	
	};

	Lights.prototype.reset = function(){
		//Need more info about how the lights should start
		//this.prestage
	};

	// Game.prototype.attachListeners = function(){
	// 	var self = this
	// };

//for testing, will be deleted before game launch.
	var g = new Racer(document.querySelector("#racer"));
	g.move();
	var h = new Lights();
	console.log(h.$ready);

	h.turnOn(h.$ready, "yellow", 0, h.$go);
	
	console.log(j.raceArea.clientWidth);
	//console.log(Stats.pageWidth);
	console.log(j.stagingLine.style.left);


	})();
