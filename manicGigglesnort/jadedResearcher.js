

function makeTestCanvas(){
    var output = document.getElementById("output");
    var canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.border   = "1px solid";
    output.append(canvas);
    return canvas;
}

function sampleImageCanvas(canvas){
    var buffer = document.createElement('canvas');
    buffer.width = 400;
    buffer.height = 400;
    var img = new Image();
    img.addEventListener('load', function() {
      // execute drawImage statements here
       buffer.getContext("2d").drawImage(img,0,0);
       fuckshitup(canvas, buffer);

    }, false);
    img.src = 'New_Trees_Background_Plus_Prince.png';

}

function fuckshitup(canvas,source){
    var context = canvas.getContext("2d");
    context.drawImage(source,0,0);
    var imgData = source.getContext("2d").getImageData(0, 0, source.width, source.height);
    for(var i = 0 ; i < 40; i++){
        console.log("i is ",i);
        var x = i*10;
        var y = 20*i;
        new_color = colorAtPixel(imgData, x,y);
        if(new_color != ctx.fillStyle){
            ctx.fillStyle = new_color;
            //fill is expensive so only call it when the color changes (  i think)
            context.fill();
        }
        context.rect(x, y, 10, 10*i);

    }
}

function test(){
    console.log("hello world");
    var canvas = makeTestCanvas();
    sampleImageCanvas(canvas);
}

function colorAtPixel(image_data, x,y){
    y = Math.floor(y)
	x = Math.floor(x)
	var i = (y * canvas.width + x)* 4; //array is in sets of rgba
	return createHex(array[i],array[i+1] ,array[i+2]);
}


//~~~~~~~~~~~~~~~~thanks past jr from pre SBURBSim



function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function createHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}



//I need to turn an x,y coordinate into a location in an array.
//from 2d to 1d.
//if i assume each array takes up an equal amount of physical space,
//then I know when the 'row' ends.
function coordToArrayElement(num_rows, num_columns, cell_width, cell_height, x,y,array){
	//first, how far down are we?
	//the row I fall in ends after I end, and starts before I start.

	var row = Math.ceil(y/cell_height) - 1;
	var column = Math.ceil(x/cell_width) - 1;
	//console.log("y is: " + y + " so I think I'm at row: " + row + " because cell_height is: " + cell_height);
	//console.log("x is: " + x + " so I think I'm at column: " + column + " because cell_width is: " + cell_width);
	//first element is zero, second is 1. if 3 columns, then fourth element will be 3, or 3 columns * 1st row + zero)
	var ret = row*num_columns + column;
	if(ret > array.length - 1 || ret < 0){
		return 0;
	}

	return array[ret];
}
