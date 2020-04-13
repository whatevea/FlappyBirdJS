var $ = (id )=> { return document.getElementById( id ); };
let score=0;
const pipeGap=85;
const screen=$('myCanvas').getContext('2d');
const birdImg=$('bird');
const bg=$('bg');
const bird={x:100,y:250,height:30,width:30}
let jump=false;
let start=0;
const pipemargin=125;
const pipe1= $('pipe1');
const pipe2= $('pipe2');
let pipeSetx=500
let pipeSety=randomBetn(250,380);
let pipeSetx2=pipeSetx+300;
let pipeSety2=randomBetn(250,380);
var interval;
//Everything 
function render(){
jumpCheck();
screen.clearRect(0,0,500,500)
screen.drawImage(bg,0,0,500,500);
screen.drawImage(birdImg,bird.x,bird.y,bird.height,bird.width);
drawMovePipes();
writeScore();
interval=requestAnimationFrame(render)	
}


function jumpCheck(){
if (jump){
	jump=false
	start=0;
}
if(start!=9){
	bird.y-=Math.abs(9-start);
	start++;}
	else{bird.y+=3;}

if(bird.y>520){collided()}////  Falling Mechanism
}
//event listerner
screen.canvas.onclick=()=>{
	jump=true;
start=0;

}

function drawMovePipes(){
//create 2 pipes at y diff of 45 pixells/


pipeSet1=()=>{
if(pipeSetx<-180){pipeSety=randomBetn(250,380);pipeSetx=300}
	screen.drawImage(pipe1,pipeSetx,0,300,pipeSety-pipeGap);
	screen.drawImage(pipe2,pipeSetx,pipeSety,300,500);
	//collison detection
	if(bird.x+bird.width>pipeSetx+pipemargin && bird.y<pipeSety-pipeGap && bird.x<pipeSetx+pipemargin+55){collided()}
	if(bird.x+bird.width>pipeSetx+pipemargin && bird.y+bird.height>pipeSety && bird.x<pipeSetx+55+pipemargin){collided()}
	if(pipeSetx==-36){score++;}
	pipeSetx-=4;

}
pipeSet2=()=>{
	if(pipeSetx2<-180){pipeSety2=randomBetn(250,380);pipeSetx2=300}
	screen.drawImage(pipe1,pipeSetx2,0,300,pipeSety2-pipeGap);
	screen.drawImage(pipe2,pipeSetx2,pipeSety2,300,500);
	//collison detection
	if(bird.x+bird.width>pipeSetx2+pipemargin && bird.y<pipeSety2-pipeGap && bird.x<pipeSetx2+pipemargin+55){collided()}
	if(bird.x+bird.width>pipeSetx2+pipemargin && bird.y+bird.height>pipeSety2 && bird.x<pipeSetx2+55+pipemargin){collided()}
		if(pipeSetx2==-36){score++;}
	pipeSetx2-=4;
}
pipeSet1();
pipeSet2();
}

//Random generator function 
function randomBetn(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

//function collided

function collided(){

	cancelAnimationFrame(interval);
	console.log(interval);
	screen.canvas.style.display="none";
	$('h3').innerText+=`Last Score ${score}`
	$('startScreen').style.display="block";
}

function writeScore(){
	screen.font = "30px Verdana";
screen.fillStyle = "white";
screen.fillText(score, 150, 90);
}

//
$('startScreen').onclick=()=>{
	screen.canvas.style.display="block";
	$('startScreen').style.display="none";
	cancelAnimationFrame(interval);
interval=window.requestAnimationFrame(render);
}
