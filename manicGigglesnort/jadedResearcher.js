

function makeTestCanvas(){
    var output = document.getElementById("output");
    var canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.border   = "1px solid";
    output.append(canvas);
    return canvas;
}

function fuckshitup(canvas){

}

function test(){
    console.log("hello world");
    var canvas = makeTestCanvas();
    fuckshitup(canvas);
}