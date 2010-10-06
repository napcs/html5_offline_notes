var db = null;

$(function(){
  $("#form").hide();
  $("#delete").hide();
  
  
  
  $("#new").click(function(e){
    $("#form").show();
    $("#notes").hide();
    
  });
  
  $("#back").click(function(e){
    $("#form").hide();
    $("#notes").show();
    
  });
  
  
  var db = null;

  // Creates a connection to the local database
  connectToDB = function()
  {
     db = window.openDatabase('tccc_notes', '1.0',
                                     'TCCC Notes Database', 1024*1024*3);
  };



  //Create the table method
  createNotesTable = function()
  {
    db.transaction(function(tx){
      tx.executeSql(
        "CREATE TABLE notes (id INTEGER \
         PRIMARY KEY, title TEXT, note TEXT)", [],
        function(){ alert('Notes database created successfully!'); },
        function(tx, error){ alert(error.message); } );
    });
  };
  
  connectToDB();
  createNotesTable();
  
  
  
  
  
  
  
});
