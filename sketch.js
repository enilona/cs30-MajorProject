// Project Title
// Eszter Nemeth
// Date
//https://www.dataquest.io/blog/basic-statistics-in-python-probability/
//download moment.js





let table,table1, dayweather, data = [];
let yeartable, row, cellSize = 50, ROWS = 8, COLS = 2;
let backgroundImage;
let maxTemp = [[]], minTemp=[[]], rainfall = [[]], windspeed = [[]], snowfall = [[]], groundsnow = [[]];
let filesList = [];
let list;
let multiplyer;
let button,r;
let dateInput = [];
let onoff = 0;
const dayOfYear = date => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
let field = document.querySelector("#date");
let monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function preload() {
  backgroundImage = loadImage("backgroundimage.png");
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  for (let i = 1980; i <= 2023; i++){
    let tempList = [];
    table = `saskatoon${i}.csv`;
    table = loadTable(table, "csv", "header");
    tempList.push(i, table);
    filesList.push(tempList);
  }
  table1 = loadTable("saskatoon1980.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  getDayInput();
  getListofMax();

}

function draw(){
  background(220);
  image(backgroundImage, 225,88,backgroundImage.width,backgroundImage.height);
  circle(width/2,height/2,4);
  circle(backgroundImage.width/1.22 + 225,backgroundImage.height/5+88,4);
  //goButton();
  displayWeatherdata();

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

function getHighest(){
  let highest = -9999999;
  let lowest = 999999;
  list = getListofMax();
  for (let i = 1; i < list.length; i++){
    for (let j = 1; j < filesList.length; j++){
      if (Number(list[i][j]) > highest){
        highest = list[i][j];
      }
    }
  }
  return highest;
}
function getAverage(day, maxOrmin){
  let average = 0;
  if (day === "today"){
    day = 127;
  }
  if (maxOrmin === "max"){
    list = getListofMax();
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

function getListofMax(){
  maxTemp = [];
  for (let i = 0; i < 366; i++){
    let temporaryList = [];
    for (let j = 0; j < filesList.length; j++) {
      let aTemp = filesList[j][1].getColumn("Max Temp (°C)");
      temporaryList.push(aTemp[i]);
    }
    maxTemp.push(temporaryList);
  }
  return maxTemp;
}
function getListofMin(){
  minTemp = [];
  for (let i = 0; i < 366; i++){
    let temporaryList = [];
    for (let j = 0; j < filesList.length; j++) {
      let aTemp = filesList[j][1].getColumn("Min Temp (°C)");
      temporaryList.push(aTemp[i]);
    }
    minTemp.push(temporaryList);
  }
  return minTemp;
}
function getListofRain(){
  rainfall = [];
  for (let i = 0; i < 366; i++){
    let temporaryList = [];
    for (let j = 0; j < filesList.length; j++) {
      let aTemp = filesList[j][1].getColumn("Total Rain (mm)");
      temporaryList.push(aTemp[i]);
    }
    rainfall.push(temporaryList);
  }
  return rainfall;
}
function getListofWind(){
  windspeed = [];
  for (let i = 0; i < 366; i++){
    let temporaryList = [];
    for (let j = 0; j < filesList.length; j++) {
      let aTemp = filesList[j][1].getColumn("Spd of Max Gust (km/h)");
      temporaryList.push(aTemp[i]);
    }
    windspeed.push(temporaryList);
  }
  return windspeed;
}
function getListofSnow(){
  rainfall = [];
  for (let i = 0; i < 366; i++){
    let temporaryList = [];
    for (let j = 0; j < filesList.length; j++) {
      let aTemp = filesList[j][1].getColumn("Total Snow (cm)");
      temporaryList.push(aTemp[i]);
    }
    snowfall.push(temporaryList);
  }
  return snowfall;
}
function getGroundSnow(){
  groundsnow = [];
  for (let i = 0; i < 366; i++){
    let temporaryList = [];
    for (let j = 0; j < filesList.length; j++) {
      let aTemp = filesList[j][1].getColumn("Snow on Grnd (cm)");
      temporaryList.push(aTemp[i]);
    }
    windspeed.push(temporaryList);
  }
  return groundsnow;
}

function getPartialAverage(day){
  let tempList = [];
  let maxaverage = 0;
  let maxlist = getListofMax();
  for (let i = 0; i < 12; i ++){
    let rando = Math.floor(random(1,filesList.length/2));
    maxaverage += Number(maxlist[day][rando]);
  }
  let minaverage = 0;
  let minlist = getListofMin();
  for (let i = 0; i < 12; i ++){
    let rando = Math.floor(random(1,filesList.length/2));
    minaverage += Number(minlist[day][rando]);
  }
  let rainchance = 0;
  let rainlist = getListofRain();
  for (let i = 0; i < 11; i ++){
    let rando = Math.floor(random(1,filesList.length/2));
    if (Number(rainlist[day][rando]) !== 0){
      rainchance+= 10;
    }
  }
  let windgust = 0;
  let windspeed = getListofRain();
  for (let i = 0; i < 11; i ++){
    let rando = Math.floor(random(1,filesList.length/2));
    windgust += Number(windspeed[day][rando]);
  }
  let snowchance = 0;
  let snowlist = getListofSnow();
  for (let i = 0; i < 11; i ++){
    let rando = Math.floor(random(1,filesList.length/2));
    if (Number(snowlist[day][rando]) !== 0){
      snowchance+= 10;
    }
  }
  let snowdepth = 0;
  let snowdata = getListofSnow();
  for (let i = 0; i < 11; i ++){
    let rando = Math.floor(random(1,filesList.length/2));
    snowdepth += Number(snowdata[day][rando]);
  }
  maxaverage = maxaverage/10;
  minaverage = minaverage/10;
  tempList.push(maxaverage);
  tempList.push(minaverage);
  tempList.push(rainchance);
  tempList.push(windgust);
  tempList.push(snowchance);
  tempList.push(snowdepth);
  return tempList;
}


function getMin(){
  for (let i = 0; i < 366; i++){
    let temporaryList = [];
    for (let j = 0; j < filesList.length; j++) {
      let aTemp = filesList[j][1].getColumn("Min Temp (°C)");
      temporaryList.push(aTemp[i]);
    }
    minTemp.push(temporaryList);
  }
  
  text(minTemp , width/2, height/2);
  return minTemp;
}


function getDayInput(){
  // Handle date changes
  // eslint-disable-next-line no-undef
  date.addEventListener("input", function () {
    dateInput = [];
    // Get the date
    let theDate = new Date(field.value);
    console.log(theDate.getFullYear());
    console.log(dayOfYear(theDate));
    dateInput.push(theDate.getFullYear());
    dateInput.push(dayOfYear(theDate));
    dateInput.push(monthList[month(theDate)]);
    onoff = 0;
    return dateInput;
  });
}

function loadWeatherInputs(){
  let s = dateInput[0];
  for (let i = 0; i < filesList.length; i++ ){
    if (filesList[i][0]=== dateInput[0]){
      yeartable = filesList[i][1];
      print(yeartable);
      return yeartable;
    }
  }
}
function predictFutureWeatherData(day){
  let temp = getPartialAverage(day);
  let currentdate = 2023;
  let diff = dateInput[0] - currentdate;
  if (diff.length > 1){
    temp[0] += 0.1*diff[0];
    temp[1] += 0.1*diff[0];
  }
  data.push(temp[0]);
  data.push(temp[1]);
  data.push(temp[2]);
  data.push(temp[3]);
  data.push(temp[4]);
  data.push(temp[5]);
  return data;
}

function goButton(){
  button = createButton("Go!");
  button.position(100, 100);
  button.mousePressed(displayWeatherdata);
  button.mousePressed(onoff = 0);
}

function checkempty(value){
  if(value === ""){
    return value.replace("", "no data");
  }
  else{
    return value;
  }
}

function displayWeatherdata(){
  clear();
  background(237,239,239,255);
  image(backgroundImage, 225,88,backgroundImage.width,backgroundImage.height);
  if (dateInput[0] > 2022){
    console.log(onoff);
    if (onoff === 0){
      data = [];
      data = predictFutureWeatherData(dateInput[1]);
      onoff = 1;
    }
    textSize(42);
    textFont("Cursive");
    //max temp
    text(data[0] + "°C",backgroundImage.width/1.2 + 225,backgroundImage.height/4.7+88);
    //min temp
    text(data[1] + "°C",backgroundImage.width/1.2 + 225,backgroundImage.height/3.3+88);
    //chance of rain
    textSize(22);
    text(data[2] + " %",backgroundImage.width/1.7 + 225,backgroundImage.height/6.8 + 88);
    //potential wind gust
    text(data[3]+" km/h",backgroundImage.width/1.7 + 225,backgroundImage.height/4.7 + 88);
    //chance of snow
    text(data[4]+" %",backgroundImage.width/1.7 + 225,backgroundImage.height/3.5 + 88);
    //snow on ground
    text(data[5]+" cm",backgroundImage.width/1.7 + 225,backgroundImage.height/2.8 + 88);
    //year
    textSize(70);
    text(dateInput[0], backgroundImage.width/5 + 225,backgroundImage.height/5.2 + 88);
  }
  else if (dateInput[0] <= 2022 && dateInput[1] < 159){
    dayweather = loadWeatherInputs();
    textSize(42);
    textFont("Cursive");
    //max temp
    text(checkempty(dayweather.getString(dateInput[1],9))+"°C",backgroundImage.width/1.2 + 225,backgroundImage.height/4.7+88);
    //min temp
    text(checkempty(dayweather.getString(dateInput[1],11))+"°C",backgroundImage.width/1.2 + 225,backgroundImage.height/3.3+88);
    textSize(22);
    //total rain
    text(checkempty(dayweather.getString(dateInput[1],19))+" mm",backgroundImage.width/1.7 + 225,backgroundImage.height/6.8 + 88);
    //Spd of Max Gust (km/h)
    text(checkempty(dayweather.getString(dateInput[1],29))+" km/h",backgroundImage.width/1.7 + 225,backgroundImage.height/4.7 + 88);
    //total snow
    text(checkempty(dayweather.getString(dateInput[1],21))+" cm",backgroundImage.width/1.7 + 225,backgroundImage.height/3.5 + 88);
    //snow on ground
    text(checkempty(dayweather.getString(dateInput[1],25))+" cm",backgroundImage.width/1.7 + 225,backgroundImage.height/2.8 + 88);
    //year
    textSize(70);
    text(checkempty(dayweather.getString(dateInput[1],5)),backgroundImage.width/5 + 225,backgroundImage.height/5.2 + 88);
    //month and day
    textSize(42);
    text(checkempty(dateInput[2] + " " + dayweather.getString(dateInput[1],7)),backgroundImage.width/5 + 225,backgroundImage.height/3.5 + 88);
  }
}
 


// 0: "Longitude (x)"
// 1: "Latitude (y)"
// 2: "Station Name"
// 3: "Climate ID"
// 4: "Date/Time"
// 5: "Year"
// 6: "Month"
// 7: "Day"
// 8: "Data Quality"
// 9: "Max Temp (°C)"
// 10: "Max Temp Flag"
// 11: "Min Temp (°C)"
// 12: "Min Temp Flag"
// 13: "Mean Temp (°C)"
// 14: "Mean Temp Flag"
// 15: "Heat Deg Days (°C)"
// 16: "Heat Deg Days Flag"
// 17: "Cool Deg Days (°C)"
// 18: "Cool Deg Days Flag"
// 19: "Total Rain (mm)"
// 20: "Total Rain Flag"
// 21: "Total Snow (cm)"
// 22: "Total Snow Flag"
// 23: "Total Precip (mm)"
// 24: "Total Precip Flag"
// 25: "Snow on Grnd (cm)"
// 26: "Snow on Grnd Flag"
// 27: "Dir of Max Gust (10s deg)"
// 28: "Dir of Max Gust Flag"
// 29: "Spd of Max Gust (km/h)"
// 30: "Spd of Max Gust Flag"
5,6,7,9,11,  19,21,25,29;

//global warming 0.18 per decade 