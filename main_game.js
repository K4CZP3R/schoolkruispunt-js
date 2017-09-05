var screen_width=1024; //x
var screen_height=600; //y

function setup() {
    debug_say("Setup()!");
    createCanvas(screen_width,screen_height);
    frameRate(60);
    textSize(32);
    for(var i=0; i<10;i++){
      cars.push(new Jitter(i));
    }
}
//coordinates
//left-left = 0,230
///0left-right = 0,330
//right-left = screen_width-carsize,330
///1right-right = screen_width-carsize,230
///2up-right = 384+50,0
//up-left = 384+128+50,0
//down-left = 384+50,screen_height-carsize
///3down-right = 384+128+50,screen_height-carsize
var frametime=200;
var spawn=0;
function draw(){
    background(50,89,100);
    debug_info();
    drawRoads();
    for(var i=0; i<spawn; i++){
      cars[i].touch();
      cars[i].move();
      cars[i].display();
    }
    if(frametime > 200){
      if(spawn != cars.length){spawn+=1;}
      frametime=0;
    }
    frametime++;
}
var car_location_array= ["left","right","up","down"];
var car_size=25;
var car_speed=2;
var cars = [];

function Jitter(id){
  this.id = id
  this.carlocation_start = random(car_location_array);
  debug_say("Car location:"+this.carlocation_start);
  if(this.carlocation_start == "left"){
    this.x=0;
    this.y=330;
  }
  if(this.carlocation_start == "right"){
    this.x=screen_width-car_size;
    this.y=230;
  }
  if(this.carlocation_start == "up"){
    this.x=384+50;
    this.y=0;
  }
  if(this.carlocation_start == "down"){
    this.x=384+128+50;
    this.y=screen_height-car_size;
  }

  this.size = car_size;
  this.speed = car_speed;
  this.touch = function(){
    var temparray = cars;
  }
  this.move = function(){
    if(this.carlocation_start == "left"){
      if(this.x > screen_width){this.x=0;}
      this.x += this.speed;
    }
    if(this.carlocation_start == "right"){
      if(this.x < 0){this.x=screen_width-car_size;}
      this.x -= this.speed;
    }
    if(this.carlocation_start == "up"){
      if(this.y > screen_height){this.y=0;}
      this.y += this.speed;
    }
    if(this.carlocation_start == "down"){
      if(this.y < 0){this.y=screen_height-car_size;}
      this.y -= this.speed;
    }

  };
  this.display = function(){
    rect(this.x,this.y,this.size,this.size);
    if(int(mouseX)<=this.x+car_size && int(mouseX)>=this.x ){
      debug_say("Touched id:"+this.id);
    }
  };
}
function debug_say(what){
  console.log(what);
}
function debug_info(){
  text("DEBUG: 0.1b - "+int(frameRate())+"fps",0,32);
  text("Cars:"+spawn,0,64);
  text("httpskacper",0,96);
}
function drawRoads(){
  //line(x1,y1,x2,y2)
  stroke("black");
  line(screen_width/2-10,screen_height/2,screen_width/2+10,screen_height/2);
  line(screen_width/2,screen_height/2-10,screen_width/2,screen_height/2+10)

  var lr_x2 = 256+128;
  var lr_begin_y = 200;
  var lr_middle_y = 300;
  var lr_end_y = 400;
  //left side
  stroke("black");
  line(0,lr_begin_y,lr_x2,lr_begin_y);
  stroke("red");
  line(0,lr_middle_y,lr_x2,lr_middle_y);
  stroke("black");
  line(0,lr_end_y,lr_x2,lr_end_y);
  //right side
  stroke("black");
  line(screen_width,lr_begin_y,screen_width-lr_x2,lr_begin_y);
  stroke("red");
  line(screen_width,lr_middle_y,screen_width-lr_x2,lr_middle_y);
  stroke("black");
  line(screen_width,lr_end_y,screen_width-lr_x2,lr_end_y);

  //up side
  var up_begin_x=lr_x2;
  var up_begin_y=lr_begin_y;
  var up_middle_x=up_begin_x+128;
  var up_middle_y = up_begin_y;
  var up_end_x=up_middle_x+128;
  var up_end_y = up_middle_y;
  stroke("black");
  line(up_begin_x,0,up_begin_x,up_begin_y);
  stroke("red");
  line(up_middle_x,0,up_middle_x,up_middle_y);
  stroke("black");
  line(up_end_x,0,up_end_x,up_end_y);

  //down side
  var down_begin_x=up_begin_x;
  var down_begin_y=lr_end_y;
  var down_middle_x=up_middle_x;
  var down_middle_y=down_begin_y;
  var down_end_x=up_end_x;
  var down_end_y=down_middle_y;
  stroke("black");
  line(down_begin_x,down_begin_y,down_begin_x,screen_height);
  stroke("red");
  line(down_middle_x,down_middle_y,down_middle_x,screen_height);
  stroke("black");
  line(down_end_x,down_end_y,down_end_x,screen_height);

}
