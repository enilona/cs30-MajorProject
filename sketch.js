// Project Title
// Eszter Nemeth
// Date
//https://www.dataquest.io/blog/basic-statistics-in-python-probability/




let table1,table2;

function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table1 = loadTable("saskatoon1980.csv", "csv", "header");
  table2 = loadTable("saskatoon1981.csv", "csv", "header");
  //the file can be remote
  //table = loadTable("http://p5js.org/reference/assets/mammals.csv",
  //                  "csv", "header");
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
}