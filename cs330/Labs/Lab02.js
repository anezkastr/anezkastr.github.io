function getInfo(){
    var hours12 = true;
    var date = new Date;
    var year = date.getFullYear();
    const months = ["January", "February", "March", "April",
                    "May", "June", "July", "August", "September", "October",
                    "November", "December"];
    var month = months[date.getMonth()];
    var minute = date.getMinutes();
    hours12 = ( document.getElementById("Hours").selectedIndex==0 ? true : false );
    hour = date.getHours();
    hour = (hours12 ? hour%12 : hour);
    var hour = date.getHours();
    var day = date.getDate();
    return[year, month, day, hour, minute];
}

function dateAlert(){
    let dayValues = getInfo();
    alert("The date today is: "+dayValues[1]+" "+dayValues[2]+", "+dayValues[0]+"\nand the current time is: "+dayValues[3]+":"+(dayValues[4] < 10 ? "0"+dayValues[4] : dayValues[4]));
}

function dateOnPage(){
    let dayValues = getInfo();
    document.querySelector("#dayValues").innerHTML="The date today is: "+dayValues[1]+" "+dayValues[2]+", "+dayValues[0]+"<br>and the current time is: "+dayValues[3]+":"+(dayValues[4] < 10 ? "0"+dayValues[4] : dayValues[4]);
}