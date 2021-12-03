object = [];
status = "";
object_name = "";
function setup() {
    canvas = createCanvas(380, 280);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}
function draw() {
    image(video, 0, 0, 380, 280);

    if (status != "") {
        objectDetector.detect(video, getresult);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects :" + object.length;

            fill("red");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + "" + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if (object[i].label == object_name) {
                video.stop();
                objectDetector.detect(getresult);
                document.getElementById("status").innerHTML = object_name + "object found";
                synth = window.SpeechSynthesis;
                utter_this = new SpeechSynthesisUtterance(object_name + "found");
                synth.speak(utter_this);
            }
            else {
                document.getElementById("status").innerHTML = object_name + "object  not found";
            }
        }
    }
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;
}
function modelLoaded() {
    console.log("model is loaded");
    status = true;
}
function getresult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        object = results;
    }

}