const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


var asteroidImg,asteroid2Img,asteroid
var galaxyImg;
var asronautImg;
var cutbtnImg;


function preload() {
  galaxyImg=loadImage("assets/galaxy.png")
 




 asteroidImg=loadImage("assets/asteroid.png")


 asteroid2Img=loadImage("assets/asteroid2.png")


 astronautImg=loadImage("assets/astronaut.png")



  cutbtnImg=loadImage("cut.png")



}
















function setup() {
    createCanvas(600,700);
   
  edge=createEdgeSprites()
  
  astronaut=createSprite(200,height-80,100,100);
  astronaut.addImage(astronautImg)
  astronaut.scale=0.5
  astronaut.velocityX=1;
  astronaut.setCollider("circle",0,0,80)
    
    engine = Engine.create();
    world = engine.world;

    button = createImg('cut.png');
    button.position(100,90);
    button.size(50,50);
    button.mouseClicked(drop);
  
     
    button2 = createImg('cut.png');
     button2.position(450,90);
     button2.size(50,50);
     button2.mouseClicked(drop2);
   
     rope = new Rope(7,{x:120,y:90});
     rope2 = new Rope(7,{x:490,y:90});
  
  
    
    ground = new Ground(300,height,width,20);
    ground2=new Ground(100,height,width,20)
  
  var options={
   dencity:1      
}  
  
    
    asteroid = Bodies.circle(300,300,20,options);
    Matter.Composite.add(rope.body,asteroid);
  
    asteroid_con = new Link(rope,asteroid);
    asteroid_con_2 = new Link(rope2,asteroid);
  
  
   
  
  
    rectMode(CENTER);
    ellipseMode(RADIUS);
    textSize(50)
}
    








function draw() {
    background(51);
    image(galaxyImg,0,0,width,height);
  
     astronaut.bounceOff(edge)

    push();
    imageMode(CENTER);
    if(asteroid!=null){
      image(asteroidImg,asteroid.position.x,asteroid.position.y,70,70);
    }
    pop();
  
    rope.show();
    rope2.show();
  
    Engine.update(engine);
    ground.show();
  
    ground2.show();

    



    if(collide(asteroid,astronaut)==true)
    {
      World.remove(engine.world,asteroid);
      asteroid = null;
      
    }
  
   


 
 
drawSprites();

}
 
function drop()
{
  
  rope.break();
  asteroid_con.dettach();
  asteroid_con = null; 
}

function drop2()
{

  rope2.break();
  asteroid_con_2.dettach();
  asteroid_con_2 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}