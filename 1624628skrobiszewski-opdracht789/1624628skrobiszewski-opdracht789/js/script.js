// maak array met 500 nummers aan
var numbers = new Array(500);
var maxValue = 0;

// eerste array
let huidigArray = [1,2,3,4,5,6,7,8,9,10];

// vul array 1
for (var i=0; i<numbers.length; i++){
    if(i<numbers.length/2){
        numbers[i] = Math.floor(Math.random()*290) + 10;
    }else{
        numbers[i] = Math.floor(Math.random()*200) + 501;
    }
    if(maxValue < numbers[i]){
        maxValue = numbers[i];
    }
}

// log array 1
console.log(numbers);
console.log(maxValue);

// tweede array
const map1 = huidigArray.map(x => x * 4);

// log array 2
console.log(map1);
