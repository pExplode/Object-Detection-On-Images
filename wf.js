status = "";
objects = [];


function preload()
{
    img = loadImage("wf.jpeg");
}

function setup()
{
    canvas = createCanvas(480,350);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw()
{
    image(img,0,0,480,350);
    if(status != "")
    {
        for(i = 0; i < objects.length; i++)
        {
            percent = floor(objects[i].confidence*100);
            fill("black");
            text(objects[i].label + " "+percent+"%", objects[i].x +15, objects[i].y +15);
            noFill();
            stroke("grey");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded()
{
    status = true;
    console.log("Model Loaded!");
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }

    objects = results;
    document.getElementById("number_of_objects").innerHTML = "There are '5' total objects in the image out of which cocossd has detected '2'";
}

