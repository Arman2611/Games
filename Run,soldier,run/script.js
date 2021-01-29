// 		The game "Run,soldier,run" is designed for 1366/768 screen
// 		24 fps
// 		How to play: 
//		To run - right arrow;
//		To stop - left arrow;
//		To sit - down arrow;
//		To jump - up arrow;
//		To shoot - Shift;
//		To hit by knife - Z;

window.onload = function () {
	var musicJump = document.getElementById('musicJump')

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var standing = document.getElementById('standing');
	var runFrames = document.getElementsByClassName('run');
	var jumpFrames = document.getElementsByClassName('jump');
	var sitFrames = document.getElementsByClassName('sit');
	var knifeFrames = document.getElementsByClassName('knife');
	var fireFrames = document.getElementsByClassName('fire');
	var background = document.getElementById('background');
	
	var bg = {
		src: document.getElementById('background'),
		leftPixel: 0,
		runningSpeed: 0, //maximum 15;
		width: background.naturalWidth,
		height: background.naturalHeight,
		drawWidth: 768/background.naturalHeight*background.naturalWidth,
	}

	
	var	bronzeFrames = document.getElementsByClassName('bronze');
	var	silverFrames = document.getElementsByClassName('silver');
	var	goldFrames = document.getElementsByClassName('gold');
	var	eteriumFrames = document.getElementsByClassName('eterium');
	

	var distance = 0;
	var eterium = 0;    //Values of rss rise in collectCoins() function
	var gold = 0;
	var silver = 0;
	var bronze = 0;

	var scoreX = canvas.getContext('2d');
		scoreX.font = "30px Arial";
	function drawScore () {
		distance += bg.runningSpeed;
		scoreX.fillText("Score: " + parseInt(distance/50),47,100);
		context.drawImage(eteriumFrames[0],0,0,70,70,40,19,40,40);
		scoreX.fillText(eterium,80,50);
		context.drawImage(goldFrames[0],0,0,70,70,140,19,40,40);
		scoreX.fillText(gold,180,50);
		context.drawImage(silverFrames[0],0,0,70,70,240,19,40,40);
		scoreX.fillText(silver,280,50);
		context.drawImage(bronzeFrames[0],0,0,70,70,340,19,40,40);
		scoreX.fillText(bronze,380,50);
		scoreX.fillText('Soldier',1250,50)
		drawHealth();
	}
	var health = 4;
	function drawHealth () {
		for (var i = 0; i < health; i++) {
			scoreX.beginPath();
			scoreX.fillRect(1219-i*18,27,13,25);
			scoreX.fillStyle = 'red';
			scoreX.fillRect(1220-i*18,28,11,23);
			scoreX.fillStyle = 'black';
			scoreX.closePath();
		}
	}

	var soldierTopPixel = 420;	
	function soldierRun () {
		soldierRunRoller();
		context.drawImage(runFrames[runNumber],0,0,400,500,0,soldierTopPixel-19,200,250);
	}
	var runNumber=-1;
	var runReplays=0;
	function soldierRunRoller () {
		if (runNumber<runFrames.length-1) {
			if (runReplays==0) {runNumber++};
		} else {
			if (runReplays==0) {runNumber=0};
		};
		if(runReplays!=1) {runReplays++} else {runReplays=0};
		return runNumber;
	}
	function soldierJump () {
		soldierJumpRoller();
		soldierJumpHeightHandler()
		context.drawImage(jumpFrames[jumpNumber],0,0,400,500,0,soldierTopPixel,200,250);
	}
	var jumpNumber=-1;
	var jumpReplays=0;
	function soldierJumpRoller () {
		if (jumpNumber<jumpFrames.length-1) {
			if (jumpReplays==0) {jumpNumber++};
			isBusy='jump';
		} else {
			if (jumpReplays==0) {jumpNumber=0;isBusy='jump'};
			if (jumpReplays==1) {isBusy=undefined};
		};
		if(jumpReplays!=1) {jumpReplays++} else {jumpReplays=0};
		return jumpNumber;
	}
	function soldierJumpHeightHandler() {
		switch (jumpNumber) {
			case 0:soldierTopPixel-=0;
				if (isStanding==false) {soldierTopPixel-=19};
				document.removeEventListener('keydown', drawSoldier);break;
			case 1:soldierTopPixel-=20;break;
			case 2:soldierTopPixel-=20;break;
			case 3:soldierTopPixel-=20;break;
			case 4:soldierTopPixel-=15;break;
			case 5:soldierTopPixel-=10;break;
			case 6:soldierTopPixel-=10;break;
			case 7:soldierTopPixel-=2;break;
			case 8:soldierTopPixel+=2;break;
			case 9:soldierTopPixel+=10;break;
			case 10:soldierTopPixel+=10;break;
			case 11:soldierTopPixel+=15;break;
			case 12:soldierTopPixel+=20;break;
			case 13:soldierTopPixel+=20;break;
			case 14:soldierTopPixel+=20;break;
			case 15:soldierTopPixel+=0;
				if (isStanding==false) {soldierTopPixel+=19};
				document.addEventListener('keydown', drawSoldier);break;
			default:soldierTopPixel=420;break;
		}
		return soldierTopPixel;
	}
	function soldierSit () {
		bgSpeedHandler();
		sitKeyUpHandler();
		soldierSitRoller();
		soldierSitHeightHandler();
		context.drawImage(sitFrames[sitNumber],0,0,400,500,0,soldierTopPixel,200,250);
	};
	var sitNumber=-1;
	var sitReplays=0;
	function soldierSitRoller() {
		if (sitNumber<sitFrames.length-1) {
			if (sitNumber==3) {
				if (isSeat==true) {
					sitNumber+=0;
				} else {sitNumber++};
			} else {
				if (sitReplays==0) {sitNumber++};
			}
			if (sitNumber>3) {isSeat=false};
			isBusy = 'sit';
		} else {
			if (sitReplays==0) {sitNumber=0;isBusy='sit'};
			if (sitReplays==1) {isBusy=undefined};
		};
		if(sitReplays!=1) {sitReplays++} else {sitReplays=0};
		return sitNumber;
	}
	function soldierSitHeightHandler(event) {
		switch (sitNumber) {
			case 0:soldierTopPixel=420;
				document.removeEventListener('keydown', drawSoldier);
				document.addEventListener('keyup', sitKeyUpHandler);break;
			case 1:soldierTopPixel=420;break;
			case 2:soldierTopPixel=420;break;
			case 3:soldierTopPixel=420;break;
			case 4:soldierTopPixel=420;
				document.removeEventListener('keyup', sitKeyUpHandler);break;
			case 5:soldierTopPixel=420;break;
			case 6:soldierTopPixel=420;
				document.addEventListener('keydown', drawSoldier);break;
			default:soldierTopPixel=420;break;
		}
		return soldierTopPixel;
	}
	function sitKeyUpHandler (event) {
		if(event!=undefined && event.keyCode=='40') {isSeat=false};
		return isSeat;
	}

	function soldierKnife () {
		bgSpeedHandler();
		knifeKeyUpHandler();
		soldierKnifeRoller();
		soldierKnifeHeightHandler();
		context.drawImage(knifeFrames[knifeNumber],0,0,400,500,45,soldierTopPixel,200,250);
	}
	var knifeNumber=-1;
	var knifeReplays=0;
	function soldierKnifeRoller () {
		if (knifeNumber<knifeFrames.length-1) {
			if (knifeReplays==0) {knifeNumber++};
			isBusy='knife';
		} else {
			if (multiHit == true) {
				knifeNumber=0;isBusy='knife';
			} else {
				if (knifeReplays==0) {knifeNumber=0;isBusy='knife'};
				if (knifeReplays==1) {isBusy=undefined};
			}			
		};
		if(knifeReplays!=1) {knifeReplays++} else {knifeReplays=0};
		return knifeNumber;
	};
	function soldierKnifeHeightHandler(event) {
		switch (knifeNumber) {
			case 0:soldierTopPixel+=0;
				document.removeEventListener('keydown', drawSoldier);
				document.addEventListener('keyup', knifeKeyUpHandler);break;
			case 1:soldierTopPixel+=0;break;
			case 2:soldierTopPixel+=0;break;
			case 3:soldierTopPixel+=0;break;
			case 4:soldierTopPixel+=0;break;
			case 5:soldierTopPixel+=0;break;
			case 6:soldierTopPixel+=0;break;
			case 7:soldierTopPixel+=0;
				document.removeEventListener('keyup', knifeKeyUpHandler);
				document.addEventListener('keydown', drawSoldier);break;
			default:soldierTopPixel=420;break;
		}
		return soldierTopPixel;
	}
	function knifeKeyUpHandler (event) {
		if(event!=undefined && event.keyCode=='90') {multiHit=false};
		return multiHit;
	}

	function soldierFire () {
		bgSpeedHandler();
		fireKeyUpHandler();
		soldierFireRoller();
		soldierFireHeightHandler();
		context.drawImage(fireFrames[fireNumber],0,0,400,500,45,soldierTopPixel,200,250);
	}
	var fireNumber=-1;
	var fireReplays=0;
	function soldierFireRoller () {
		if (fireNumber<fireFrames.length-1) {
			if (fireReplays==0) {fireNumber++};
			isBusy='fire';
		} else {
			if (multiShoot == true) {
				fireNumber=0;isBusy='fire';
			} else {
				if (fireReplays==0) {fireNumber=0;isBusy='fire'};
				if (fireReplays==1) {isBusy=undefined};
			}			
		};
		if(fireReplays!=1) {fireReplays++} else {fireReplays=0};
		return fireNumber;
	}
	function soldierFireHeightHandler (event) {
		switch (fireNumber) {
			case 0:soldierTopPixel+=0;
				document.removeEventListener('keydown', drawSoldier);
				document.addEventListener('keyup', fireKeyUpHandler);break;
			case 1:soldierTopPixel+=0;break;
			case 2:soldierTopPixel+=0;break;
			case 3:soldierTopPixel+=0;break;
			case 4:soldierTopPixel+=0;break;
			case 5:soldierTopPixel+=0;
				document.removeEventListener('keyup', fireKeyUpHandler);
				document.addEventListener('keydown', drawSoldier);break;
			default:soldierTopPixel=420;break;
		}
		return soldierTopPixel;
	}
	function fireKeyUpHandler (event) {
		if(event!=undefined && event.keyCode=='16') {multiShoot=false};
		return multiShoot;
	}


	var isStanding = true;
	function soldierStand () {
		bgSpeedHandler();
		context.drawImage(standing,0,0,400,500,0,soldierTopPixel,200,250);
	}
	var toSpeed = false;
	function bgSpeedHandler () {
		if (toSpeed == true) {
			if (bg.runningSpeed < 15) {
				bg.runningSpeed += 1.5;
			}
		} else if (toSpeed == false) {
			if (bg.runningSpeed > 0) {
				bg.runningSpeed -= 1.5;
			}
		}
	}
	var isBusy = undefined;
	var isSeat = false;
	var multiHit = false;
	var multiShoot = false;
	event = window.event;


	function drawSoldier (event) {
		if (event != undefined) {	
			if (event.keyCode == '39') { 	//when right arrow is pressed, go
				isStanding = false;
			};		
			if (event.keyCode == '37') {    //when left arrow is pressed, stop
				isStanding = true;
			};
			if (event.keyCode == '40') {	//when down arrow is pressed, stop
				isStanding = true;
			};
			if (event.keyCode == '90') {	//when Ctrl is pressed, stop
				isStanding = true;
			};
			if (event.keyCode == '16') {	//when Shift is pressed, stop
				isStanding = true;
			};
			
		};
		if (isBusy=='knife' || isBusy=='fire') {
			isStanding=true;
		}
		if (isStanding == true) {    //when left arrow is pressed
			toSpeed = false;

			if (isBusy==undefined) {
				if (event == undefined) {
					soldierStand();
				} else if (event.keyCode == '38') {
					soldierJump();
					musicJump.play();
				} else if (event.keyCode == '40') {
					isSeat = true;
					soldierSit();
				} else if (event.keyCode == '90') {
					multiHit = true;
					soldierKnife();
				} else if (event.keyCode == '16') {
					multiShoot = true;
					soldierFire();
				};
			} else	if (isBusy!=undefined) {
				if (isBusy == 'jump') {
					soldierJump();
				} else if (isBusy == 'sit') {
					if (event != undefined && event.keyCode == '40') {isSeat=true};
					soldierSit();
				} else if (isBusy == 'knife') {
					if (event != undefined && event.keyCode == '90') {multiHit=true};
					soldierKnife();
				} else if (isBusy == 'fire') {
					if (event != undefined && event.keyCode == '16') {multiShoot=true};
					soldierFire();
				};
			}; 			

		} else if (isStanding == false) {    //when right arrow is pressed
			toSpeed = true;
			bgSpeedHandler();
			
			if (isBusy==undefined) {
				if (event == undefined) {
					soldierRun();
				} else if (event.keyCode == '38') {
					soldierJump();
					musicJump.play();
				};
			}
			if (isBusy!=undefined) {
				if (isBusy == 'jump') {
					soldierJump();
				} else if (isBusy == 'sit') {
					soldierSit();
				};  
			}; 
		};
	};

	function drawBackground () {
		if (bg.leftPixel < -bg.drawWidth) {
			bg.leftPixel = 0;
		};
		bg.leftPixel -= bg.runningSpeed;
		context.drawImage(bg.src,0,0,bg.width,bg.height,bg.leftPixel,0,1536,768);
		context.drawImage(bg.src,0,0,bg.width,bg.height,bg.leftPixel+bg.drawWidth,0,bg.drawWidth,768);
	};

	function drawBonuses () {
		drawCoins();
	};
		// existingCoins contains all coins, that are not collected or deleted
	var existingCoins = [{coinLeftPixel: 1600, coinTopPixel:558, color: 'bronze', isRising: false, value:1}];
	
	function drawCoins () {
		coinsGenerator();
		coinsRoller();
		collectCoins();
		drawExistingCoins();
		deleteCoins();
	};
	function coinsGenerator () {
		if (isStanding==false) {
			var coinsRandomDigit = Math.random();
			if (coinsRandomDigit < 0.05) {
				var coinsRandomColor = Math.random();
				if (coinsRandomColor<=0.7) {
					existingCoins.push({coinLeftPixel: 1600, coinTopPixel: 558, color: 'bronze', isRising: false, value:1})
				} else if (coinsRandomColor<=0.9) {
					existingCoins.push({coinLeftPixel: 1600, coinTopPixel: 558, color: 'silver', isRising: false, value:1})
				} else if (coinsRandomColor<=0.98) {
					existingCoins.push({coinLeftPixel: 1600, coinTopPixel: 558, color: 'gold', isRising: false, value:1})
				} else if (coinsRandomColor<=1) {
					existingCoins.push({coinLeftPixel: 1600, coinTopPixel: 558, color: 'eterium', isRising: false, value:1})
				};
			};
		};
	};
	var coinNumber=-1;
	var coinReplays=0;
	function coinsRoller () {
		if (coinNumber<bronzeFrames.length-1) {
			if (coinReplays==0) {coinNumber++};
		} else {
			if (coinReplays==0) {coinNumber=0};
		};
		if(coinReplays!=1) {coinReplays++} else {coinReplays=0};
		return coinNumber;
	};
	function drawExistingCoins () {
		 for (var i = 0; i < existingCoins.length; i++) {
			existingCoins[i].coinLeftPixel-=bg.runningSpeed;
			if (existingCoins[i].color == 'bronze') {
				context.drawImage(bronzeFrames[coinNumber],0,0,70,70,existingCoins[i].coinLeftPixel,existingCoins[i].coinTopPixel,70,70);
			} else if (existingCoins[i].color == 'silver') {
				context.drawImage(silverFrames[coinNumber],0,0,70,70,existingCoins[i].coinLeftPixel,existingCoins[i].coinTopPixel,70,70);
			} else if (existingCoins[i].color == 'gold') {
				context.drawImage(goldFrames[coinNumber],0,0,70,70,existingCoins[i].coinLeftPixel,existingCoins[i].coinTopPixel,70,70);
			} else if (existingCoins[i].color == 'eterium') {
				context.drawImage(eteriumFrames[coinNumber],0,0,70,70,existingCoins[i].coinLeftPixel,existingCoins[i].coinTopPixel,70,70);
			};
		};
	};
	function collectCoins () {
		for (var i = 0; i < existingCoins.length; i++) {
			if (soldierTopPixel>=350 && existingCoins[i].coinLeftPixel<148 && existingCoins[i].coinLeftPixel>15) {
				existingCoins[i].isRising=true;
				if (existingCoins[i].color == 'bronze') {
					bronze += existingCoins[i].value;
				} else if (existingCoins[i].color == 'silver') {
					silver += existingCoins[i].value;
				} else if (existingCoins[i].color == 'gold') {
					gold += existingCoins[i].value;
				} else if (existingCoins[i].color == 'eterium') {
					eterium += existingCoins[i].value;
				};
				existingCoins[i].value = 0;
			}
			if (existingCoins[i].isRising==true) {
				existingCoins[i].coinTopPixel -= 12;
			};
		};
	};
	function deleteCoins () {
		for (var i = 0; i < existingCoins.length; i++) {
			if (existingCoins[i].coinLeftPixel<=-200 || existingCoins[i].coinTopPixel<-100) {
 				existingCoins.shift();
			}
		}
	}

	function drawImage () {
		context.clearRect(0,0,1366,768);
		drawBackground ();
		drawSoldier();
		drawBonuses();
		drawScore();
	}
	document.addEventListener('keydown', drawSoldier);
	setInterval(drawImage, 1000/60);
}
