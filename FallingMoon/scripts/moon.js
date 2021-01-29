var ball = document.querySelector("#ball");
var body = document.querySelector("body");
var rect = document.querySelector("#rect");
var button = document.querySelector("button");
var score = document.querySelector("#score");
var best = document.querySelector("#best");
var lost = document.querySelector("#lost");

var v = 0.6; //speed
var v1 = false;
var x = 40, y = 80, z = 290;
var score1 = 0, best1 = 0, lost1 = 0;
var up = false, right = true;
var xMax = window.innerWidth;
var yMax = window.innerHeight;

body.style.height = yMax;
body.style.width = xMax;

ball.style.position = "absolute";
ball.style.backgroundImage = "radial-gradient(white,#C7A05D)";
ball.style.height = "50px";
ball.style.width = "50px";
ball.style.borderRadius = "100px";
ball.style.top = y + "px";
ball.style.left = x + "px";

rect.style.position = "absolute";
rect.style.width = "200px";
rect.style.height = "40px";
rect.style.backgroundImage = "linear-gradient(blue,red,blue)";
rect.style.borderRadius = "10px";
rect.style.top = 565 + "px";
rect.style.left = z + "px";


function vector() {
  if(up==false && right==true) {
    x=x+v;
    y=y+v;
  } else if(up==true && right==true) {
    x=x+v;
    y=y-v;
  } else if(up==true && right==false) {
    x=x-v;
    y=y-v;
  } else if (up==false && right==false) {
    x=x-v;
    y=y+v;
  };
};

function ricochet() {
  if(y>530) {
    if(y>650) {
      retry();
    };
  } else if(y>=515 && (x>=z-30 && x<=z+180)){
    up = true;
    score1+=10;
  } else if(y<=80){
    up = false;
  };
  if(x>=690){
    right = false;
  } else if(x<=40){
    right = true;
  };
}

function speed() {
  v=v+0.2;
}

function scene() {
  ricochet();
  vector();
  ball.style.top = y + "px";
  ball.style.left = x + "px";
  score.innerHTML = "Score: " + score1;
  best.innerHTML = "Best: " + best1;
  lost.innerHTML = "Lost: " + lost1;
  if(score1!=10 && score1%50 == 10){
    v1=false;
  };
  if(score1 != 0  && score1%50==0 && v1==false) {
    v=v+0.3;
    v1=true;
  };
};

function retry() {
   if(best1<score1) {
     best1=score1;
   };
     score1=0;
     lost1+=1;
     clearInterval(int1);
     x=40,y=80;
     v=0.5;
     button.style.display="inline";
}

function controller(e) {
  switch (e.keyCode) {
    case 37: if(z>=70) {
      z=z-30;
      rect.style.left = z + "px";} else if(z>=50) {
        z=z-10;
        rect.style.left = z + "px";
      }
    break;
    case 39: if(z<=510) {
      z=z+30;
      rect.style.left = z + "px";} else if(z<=530) {
        z=z+10;
        rect.style.left = z + "px";
      }
    break;
  };

};

button.onclick = function(){
   int1 = setInterval(scene,1);
   button.style.display = "none";
};
window.addEventListener("keydown",controller);
