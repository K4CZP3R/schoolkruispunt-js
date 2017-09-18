function setup() {
    createCanvas(settings__setup.width,settings__setup.height);
    frameRate(settings__setup.framerate);

    debug_addCar(0,0);
    debug_addCar(1,2);
    debug_addCar(2,1);
    debug_addCar(3,3);
    debug_addCar(4,0);
    noStroke();
    //console.log(__carArray);



}

function draw(){
    background(settings__color.background);
    //debug_lines(50,50);
    drawRoads();
    for(var x=0; x<settings__draw.allowedcars; x++){
      if(!__carRiding[x].collision()){
        __carRiding[x].move();
      }
      else{

      }
      __carRiding[x].display();
    }
    if(int(settings__draw.frametime/12) > 5){
      if(settings__draw.allowedcars != __carArray.length){
        __carRiding.push(__carArray[settings__draw.allowedcars]);
        settings__draw.allowedcars++;
      }
      settings__draw.frametime=0;
    }
    settings__draw.frametime++;

}
var __borders ={
  leftx: 600,
  rightx: 800,
  upy: 250,
  downy: 450
}
var __car = {
  size: 50,
  speed: 4
}
var __CarSpawn = {
  up: {
    x: 650-__car.size/2,
    y: 50-__car.size/2,
    name: "Up"
  },
  down: {
    x: 750-__car.size/2,
    y: 650-__car.size/2,
    name: "Down"
  },
  left: {
    x: 50-__car.size/2,
    y: 400-__car.size/2,
    name: "Left"
  },
  right: {
    x: 1350-__car.size/2,
    y: 300-__car.size/2,
    name: "Right"
  }
}
var __carLocation = {
  x: [__CarSpawn.left.x,__CarSpawn.right.x,__CarSpawn.up.x,__CarSpawn.down.x],
  y: [__CarSpawn.left.y,__CarSpawn.right.y,__CarSpawn.up.y,__CarSpawn.down.y],
  name: [__CarSpawn.left.name,__CarSpawn.right.name,__CarSpawn.up.name,__CarSpawn.down.name]
};

var __carArray = [];
var __carRiding = [];
var lastSpawn="";
function debug_addCar(id,startlocation){
  if(lastSpawn != __carLocation.name[startlocation]){
    __carArray.push(new Car(__carLocation.x[startlocation],__carLocation.y[startlocation],id,__carLocation.name[startlocation]));
    lastSpawn = __carLocation.name[startlocation];
  }
  else{
    console.log("Double spawn");
  }
}
function addCar(id){
  var carInt = int(random(0,__carLocation.x.length));
  if(lastSpawn == __carLocation.name[carInt]){
    console.log("Already spawned skipping!");
  }
  else{
    __carArray.push(new Car(__carLocation.x[carInt],__carLocation.y[carInt],id,__carLocation.name[carInt]));
    lastSpawn = __carLocation.name[carInt];
  }
}
var car_id=0;
function Car(x,y,id,name){

  this.trueid = car_id;
  car_id++
  this.x = x;
  this.y = y;
  this.id = id;
  this.name = name;
  this.collide = false;
  this.canmove = true;
  this.rect_speed = __car.speed;
  this.rect_size = __car.size;
  this.makeboom = function(){
    this.x =0;
    this.y =0;
  }
  this.collision = function(){
    for(var x=0; x<__carRiding.length; x++){
      if(__carRiding[x].trueid != this.trueid){
        this.collide = collideRectRect(this.x,this.y,this.rect_size,this.rect_size,__carRiding[x].x,__carRiding[x].y,__carRiding[x].rect_size,__carRiding[x].rect_size);
        if(this.collide){
          __carRiding[x].collide = true;
          return this.collide;}
      }
    }
    return false;
  }
  this.display = function(){
    noStroke();
    fill(settings__color.car_color);
    rect(this.x,this.y,this.rect_size,this.rect_size);
    fill(settings__color.car_text);
    text("id:"+this.trueid+"\ncol:"+this.collide+"\n"+this.x+","+this.y,this.x,this.y+10);

  }
  this.move = function(){
      if(this.name == __CarSpawn.left.name){this.x += this.rect_speed;}
      if(this.name ==  __CarSpawn.right.name){this.x -= this.rect_speed;}
      if(this.name ==  __CarSpawn.up.name){this.y += this.rect_speed;}
      if(this.name ==  __CarSpawn.down.name){this.y -= this.rect_speed;}
  }
}
function arrayContains(arraytocheck,value){
  for(var i=0; i<arraytocheck.length; i++){
    if(arraytocheck[i] == value){
      return true;
    }
  }
  return false;
}
function debug_say(what){ console.log(what); }
function debug_lines(pixelspace_width,pixelspace_height){
  textSize(settings__setup.textsize_xy);
  for(var i=0; i<width; i+=pixelspace_width){
    stroke(settings__color.debug_lines);
    line(i,0,i,height);
    stroke(settings__color.debug_lines_text);
    text(i+"x",i,10);

  }
  for(var i=0; i<height; i+=pixelspace_height){
    stroke(settings__color.debug_lines);
    line(0,i,width,i);
    stroke(settings__color.debug_lines_text);
    text(i+"y",0,i);
  }
  stroke(settings__color.debug_lines_text);
}
function drawRoads(){
  fill(settings__color.road)
  noStroke();
  rect(0,250,600,200);
  rect(width,250,-600,200)
  rect(600,0,200,250);
  rect(600,height,200,-250)
  rect(600,250,200,200)

  stroke(settings__color.middle_road);
  for(var x=50; x<600; x+=100){
    line(x,height/2,50+x,height/2);
    line(width-x,height/2,width-x-50,height/2)
  }
  for(var y=0; y<250; y+=100){
    line(width/2,y,width/2,y+50);
    line(width/2,height-y,width/2,height-y-50)
  }

  stroke(settings__color.road_outside);
  //left
  line(0,250,600,250);
  line(0,450,600,450);
  //up
  line(600,0,600,250);
  line(800,0,800,250);
  //down
  line(600,height,600,450);
  line(800,height,800,450);
  //right
  line(1400,250,800,250);
  line(1400,450,800,450);
}
