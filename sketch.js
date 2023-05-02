// Project Title
// Eszter Nemeth
// Date
//https://www.dataquest.io/blog/basic-statistics-in-python-probability/




let table,table1;
let anotherTemp = [];
let maxTemp = [[]];
let filesList = [];
let list;

function preload() {

  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  for (let i = 1980; i <= 1990; i++){
    table = `saskatoon${i}.csv`;
    table = loadTable(table, "csv", "header");
    filesList.push(table);
  }
  //table1 = loadTable("saskatoon1980.csv", "csv", "header");

}

function setup() {
  //count the columns
  print(table1.getRowCount() + " total rows in table");
  print(table1.getColumnCount() + " total columns in table");

  print(table1.getColumn("Max Temp (°C)"));


  //cycle through the table
  for (let r = 0; r < table1.getRowCount(); r++) {
    for (let c = 0; c < table1.getColumnCount(); c++){
      print(table1.getString(r, c));
    }
  }
 getMax();
}


function getMax(){
  let aTemp =[];
  aTemp.push(filesList[0].getColumn("Max Temp (°C)"));

  for (let i = 0; i < filesList.length; i++) {

    // for (let j = 0; j < aTemp.length; j++){
    //   let temporaryList = [];
    //   temporaryList.push(aTemp[i]);
    //   maxTemp.push(temporaryList);
    // }
  }
  
  //return maxTemp
  return aTemp;
}