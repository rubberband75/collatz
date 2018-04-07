var cellWidth = 96;
var redrawGrid = true;
var seriesStarter = 0;
var columns;

function setup() {
}

function draw() {
    if(redrawGrid){
        drawGrid();

        for(var i = 1; i <= columns; i++){
            traceSeries(generateSeries(i));
        }

        traceSeries(generateSeries(seriesStarter), true);
        redrawGrid = false;
    }
}

function drawGrid(){
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    stroke(255);
    noFill();
    
    strokeWeight(4);

    var width = Math.ceil(window.innerWidth / cellWidth);
    var height = Math.ceil(window.innerHeight / cellWidth);
    columns = width;
    for(var r = 0; r < height; r++){
        for(var i = 0; i < width; i++){
            push();
            translate(i*cellWidth + cellWidth/2, r*cellWidth + cellWidth/2);

            var cellRadius = (0.95 * cellWidth)/2;
            // ellipse(0,0,200,200);
            stroke(5);
            if(seriesStarter == i+1){
                fill(50);
            }
            rect(-cellRadius, -cellRadius, 2*cellRadius, 2*cellRadius, 0.1*cellWidth);
            
            fill(255);
            noStroke();
            textSize(cellRadius *  0.75);
            textAlign(CENTER, CENTER);
            textFont('monospace');
            text(i+1,0,0);

            pop();
        }
    }
}


function traceSeries(series, highlight = false){
    var lastPoint = null;
    for(var x in series){
        push();
        if(highlight) strokeWeight(8);
        var point = {x: (series[x] - 1)*cellWidth + cellWidth/2, y: x*cellWidth + cellWidth/2};

        noFill();
        colorMode(HSB, 255);
        var hue = 235 * (1.0 * series[0]) / columns;
        stroke(color(hue, 255, 255, 127));
        if(highlight) stroke(255);

        // ellipse(point.x, point.y, cellWidth/2, cellWidth/2);

        if(lastPoint){
            line(lastPoint.x, lastPoint.y, point.x, point.y);
        }
        lastPoint = point;

        pop();  
    }

    var cellRadius = (0.95 * cellWidth)/2;
    for(var x in series){
        push();
        if(highlight) strokeWeight(8);
        var point = {x: (series[x] - 1)*cellWidth + cellWidth/2, y: x*cellWidth + cellWidth/2};

        noFill();
        colorMode(HSB, 255);
        var hue = 240 * (1.0 * series[0]) / columns;
        stroke(color(hue, 255, 255, 127));
        if(highlight) stroke(255);

        fill(0);
        ellipse(point.x, point.y, cellWidth/2, cellWidth/2);
        fill(255);
        noStroke();
        textSize(cellRadius *  0.75);
        textAlign(CENTER, CENTER);
        textFont('monospace');
        text(series[x],point.x, point.y);


        pop();  
    }


}

function generateSeries(x){
    var series = [x];
    while(series[series.length - 1] > 1){
        var last = series[series.length - 1];
        var next = last % 2 == 0 ? last / 2 : 3*last + 1;
        series.push(next);
    }
    return series;
}



document.addEventListener("mousemove", function(e) {
    // console.log(Math.ceil(e.clientX / cellWidth));
    seriesStarter = (Math.ceil(e.clientX / cellWidth));
    redrawGrid = true;

});

document.addEventListener("resize", function () {
    redrawGrid = true;
});

document.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) {
        cellWidth -= 1;
    } else {
        cellWidth += 1;
    }

    if(cellWidth <= 0) cellWidth = 1;
    redrawGrid = true;
});