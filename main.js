song = "";

leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;

scoreleftwrist = 0;

function preload() {
 song = loadSound("music.mp3");   
}



function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses)
}


function modelLoaded() {
    console.log('posenet is initialized');
}


function gotPoses(results) {

    if (results.length > 0 ) {
        
        scoreleftwrist = results[0].pose.keypoints[9].score;

        console.log(results);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
    }

}


function draw() {
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#000000");
    
    if (scoreleftwrist > 0) {
        
    
    
    circle(leftwristX,leftwristY,50);

    inNumberleftwristY = Number(leftwristY);
    remove_decimal = floor(inNumberleftwristY);
    volume = remove_decimal / 500;
    document.getElementById("volume").innerHTML = "volume = "+volume;
    song.setVolume(volume);
    }


}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(2.5);
}

function stop() {
    song.stop();
}


