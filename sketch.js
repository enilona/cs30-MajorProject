// Project Title
// Eszter Nemeth
// Date
//https://www.dataquest.io/blog/basic-statistics-in-python-probability/
//download moment.js



let table,table1;
let anotherTemp = [];
let maxTemp = [[]];
let minTemp=[[]];
let filesList = [];
let list;
let theColor, multiplyer;
let inp, button, greeting,r;
let dateInput = [];
const dayOfYear = date => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
let field = document.querySelector("#date");


function preload() {

  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  for (let i = 1980; i <= 2022; i++){
    table = `saskatoon${i}.csv`;
    table = loadTable(table, "csv", "header");
    filesList.push(table);
  }
  table1 = loadTable("saskatoon1980.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //count the columns
  // print(table1.getRowCount() + " total rows in table");
  // print(table1.getColumnCount() + " total columns in table");

  // print(table1.getColumn("Max Temp (°C)"));
  // //cycle through the table
  for (let r = 0; r < table1.getRowCount(); r++) {
    for (let c = 0; c < table1.getColumnCount(); c++){
      print(table1.getString(r, c));
    }
  }
  getMax();
  getMin();
  getAverage(127,"max");
  getHighest();
  getDayInput();
  getFileDate();
 
}

function draw(){
  background(220);
  //visualizeData();
  //displayYear();
  timeline();
}

function displayWeatherData(){

}

function getFileDate(year,day){
  let temporaryList = [];
  for (let i = 0; i < filesList.length; i++){
    r = filesList[i].getColumn(5);
    let element = r[1];
    temporaryList.push(element);
  }
  return temporaryList;
}

function visualizeData() {
  let list = getMax();
  let x = 10;
  let y = 1;
  fill("black");
  textSize(50);
  text(1980,width/2,100);
  fill("red");
  for (let i = 0; i < 367; i++){
    circle(x,Number(list[i][y])*4+300,5);
    x+=4;
  }
  return list;
}

function getHighest(){
  let highest = -9999999;
  let lowest = 999999;
  list = getMax();
  for (let i = 1; i < list.length; i++){
    for (let j = 1; j < filesList.length; j++){
      if (Number(list[i][j]) > highest){
        highest = list[i][j];
      }
    }
  }
  return highest;
  //return list;
}

function getAverage(day, maxOrmin){
  let average = 0;
  if (day === "today"){
    day = 127;
  }
  if (maxOrmin === "max"){
    list = getMax();
  }
  if (maxOrmin === "min"){
    list = getMin();
  }
  for (let i = 0; i < filesList.length; i++){
    average += Number(list[day][i]);
  }
  average = average/filesList.length;

  return average;
}


function getMax(){
  maxTemp = [];
  for (let i = 0; i < 366; i++){
    let temporaryList = [];
    for (let j = 0; j < filesList.length; j++) {
      let aTemp = filesList[j].getColumn("Max Temp (°C)");
      temporaryList.push(aTemp[i]);
    }
    maxTemp.push(temporaryList);
  }

  return maxTemp;
}

function getMin(){
  for (let i = 0; i < 366; i++){
    let temporaryList = [];
    for (let j = 0; j < filesList.length; j++) {
      let aTemp = filesList[j].getColumn("Min Temp (°C)");
      temporaryList.push(aTemp[i]);
    }
    minTemp.push(temporaryList);
  }
  
  text(minTemp , width/2, height/2);
  return minTemp;
}

function timeline(){
  strokeWeight(3);
  line(width/10, height/6,width - width/10, height/6);
}

function displayYear(desiredYear){
  let list = getMax();
  let value = list[150][0];
  if(value > 0){
    theColor = "red";
    multiplyer = value*1000;
  }
  noStroke();
  fill(theColor);
  for (let i = 0; i < multiplyer; i++){
    let x = random(width);
    let y = random(height);
    fill(theColor);
    circle(x,y,2);
  }
}

function getDayInput(){
  // Handle date changes
  date.addEventListener("input", function () {
    // Get the date
    let theDate = new Date(field.value);
    console.log(theDate.getFullYear());
    console.log(dayOfYear(theDate));
    dateInput.push(theDate.getFullYear());
    dateInput.push(dayOfYear(theDate));
    table1 = loadTable(`saskatoon${dateInput[0]}.csv`, "csv", "header");
    console.log(table1);
  });
}


