
let width = innerWidth;
let higth = innerHeight;
const size = 10;
const amount = 300;
const particals = [];

function setup() {
  createCanvas(width, higth);
  for (let i = 0; i < amount; i++) {
    particals.push(new smasher());
  }
}

let May_Collide = [];

function draw() {
  
  background(26, 27, 41);
  
  particals.sort((ball1,ball2)=>{
    return ball1.position.x-ball2.position.x;
  })

  let j;
  
  for(let i = 0; i<particals.length; i++){
    
    
    if (particals[i].color >= 55 && particals[i].color <= 255) { particals[i].color -= 4 }
    // try to use a while loop instead to make it run smoother
    for(j = 0; j<particals.length; j++){
      if(i!=j && abs(particals[i].position.x-particals[j].position.x)<=particals[j].radius + particals[i].radius && particals[j].intersection(particals[i])){
        collision_res(particals[i], particals[j]);
        stack_preventer(particals[i], particals[j]);
      }
    }
    

    mouse_collision_res(particals[i]);
    particals[i].display();
    particals[i].update();
  }
  
  strokeWeight(40);
  fill(255);
  textAlign(CENTER);
  textSize(24);
  textFont("arial");
  text("Ahmed Abdel Kariem", width/2, higth/2);
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  width=innerWidth;
  height=innerHeight;
}

function collision_res(ball1, ball2) {
  let postPos = p5.Vector.sub(ball1.position, ball2.position);

  let postPosNormalized = postPos.normalize();
  let newSpeed = ball1.velocity.dot(postPosNormalized) - ball2.velocity.dot(postPosNormalized);
  let postVelocity = postPosNormalized.setMag(newSpeed);
  
  ball1.color = 255;
  ball2.color = 255;
  ball1.position.sub(postPos);
  ball2.position.add(postPos);
  ball1.velocity.sub(postVelocity);
  ball2.velocity.add(postVelocity);
}

function stack_preventer(ball1, ball2){
  if(dist(ball1.position.x, ball1.position.y, ball2.position.x, ball2.position.y)<ball1.radius+ball2.radius){
    ball1.position.x-=ball1.radius;
    ball2.position.x+=ball2.radius;
  }
}

function mouse_collision_res(ball){
  let distance = dist(mouseX, mouseY, ball.position.x, ball.position.y);
  grayShade = 0;
  if(distance<=80){
    ball.color=color(255,0,0);
    setTimeout(() => {
      ball.color = color(55);
    }, 500);
  }
}

class smasher {

  constructor() {

    this.position = createVector(parseInt((Math.random() * width) % width), parseInt((Math.random() * height) % height));
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector();
    this.radius = size / 2;
    this.color = color(55,55,55);

    this.intersection = function (other) {
      let space = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (space < this.radius + other.radius) {
        return true;
      }
      return false;
    }
  }

  display() {
    fill(this.color);
    strokeWeight(.20)
    circle(this.position.x, this.position.y, this.radius * 2);
  }

  update() {

    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);

    if (this.position.x < this.radius) {
      this.position.x = this.radius;
      this.velocity.x = -this.velocity.x;
    }

    if (this.position.x > width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x = -this.velocity.x;
    }

    if (this.position.y < this.radius) {
      this.position.y = this.radius;
      this.velocity.y = -this.velocity.y;
    }

    if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y = -this.velocity.y;
    }
  }

}