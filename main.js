status="";
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

}
function draw(){
image(video,0,0,480,380);
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}
function modelLoaded(){
    console.log("model is loaded");
    status=true;
}