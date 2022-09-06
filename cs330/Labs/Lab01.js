function arrayWork(){
    var array = []
    var runningTotal = 0;
    for (var i = 0; i < 5; i++) {
        var val = Math.floor(100*Math.random());
        array.push(val);
        runningTotal += val;
    }
    var mean = runningTotal / array.length;
    var outArray = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i] > mean){
            outArray.push(array[i]);
        }
    }
    document.querySelector("#outArray").innerHTML="The array is: "+array+"<br>The mean is: "+mean+"<br>Greater: "+outArray;
}
