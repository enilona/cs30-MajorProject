// Project Title
// Eszter Nemeth
// Date
//https://www.dataquest.io/blog/basic-statistics-in-python-probability/




let table,table1,table2,table3,table4,table5,table6,table7,table8,table9,table10;
let anotherTemp = [];
let aTemp = [];
let maxTemp = [[]];
let filesList = [];

function preload() {
  let i = 1990;
  table = `saskatoon${i}.csv`;
  table1 = loadTable(table, "csv", "header");
  // table1 = loadTable("saskatoon1990.csv", "csv", "header");

  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  // for (let i = 1980; i <= 1990; i++){
  //   table = `"saskatoon${i}.csv", "csv", "header"`;
  //   table1 = loadTable(table);
  //   filesList.push(table);
  // }
  // table1 = loadTable("saskatoon1980.csv", "csv", "header");
  // table2 = loadTable("saskatoon1981.csv", "csv", "header");
  // table2 = loadTable("saskatoon1982.csv", "csv", "header");

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
  getAverage();
}


function getAverage(){
  aTemp = table1.getColumn("Max Temp (°C)");
  anotherTemp = table2.getColumn("Max Temp (°C)"); 
  for (let i = 0; i < table1.getRowCount(); i++) {
    let temporaryList = [];
    temporaryList.push(aTemp[i]);
    temporaryList.push(anotherTemp[i]);
    maxTemp.push(temporaryList);
  }
  
  return maxTemp;
}