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

function preload() {

  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  for (let i = 1980; i <= 2011; i++){
    table = `saskatoon${i}.csv`;
    table = loadTable(table, "csv", "header");
    filesList.push(table);
  }
  //table1 = loadTable("saskatoon1980.csv", "csv", "header");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //count the columns
  //print(table1.getRowCount() + " total rows in table");
  //print(table1.getColumnCount() + " total columns in table");

  //print(table1.getColumn("Max Temp (°C)"));


  //cycle through the table
  // for (let r = 0; r < table1.getRowCount(); r++) {
  //   for (let c = 0; c < table1.getColumnCount(); c++){
  //     print(table1.getString(r, c));
  //   }
  // }
  getMax();
  getMin();
  getAverage(127,"max");
  getHighest();
}

function draw(){
  background(220);
  visualizeData();
}

function visualizeData() {
  list = getMax();
  fill("red");
  let x = 0;
  for (let i = 1; i < list.length; i++){
    for (let j = 1; j < 32; j++){
      circle(x,Number(list[i][j])+300,3);
      x += windowWidth/360;
    }
  }
}

function getHighest(){
  let highest = 0;
  list = getMax();
  for (let i = 1; i < list.length; i++){
    for (let j = 1; j < 32; j++){
      if (list[i][j] > highest){
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

  return minTemp;

}

