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

insertNote = function(title, note)
{
   db.transaction(function(tx){
      tx.executeSql("INSERT INTO notes (title, note) VALUES (?, ?)", 
                     [title.val(), note.val()],
        function(tx, result){ 
         var id = result.insertId ;
         alert('Record ' + id+ ' saved!');
         title.attr("data-id", result.insertId );
         addToNotesList(id, title.val());
         $("#delete").show();

        },
        function(){ 
          alert('The note could not be saved.'); 
        }
      );
   });
};

addToNotesList = function(id, title){
  var notes = $("#notes");
  var item = $("<li>");
  item.attr("data-id", id);
  item.html(title);               
  notes.append(item);
};

loadNote = function(id){
  db.transaction(function(tx) {
    tx.executeSql('SELECT id, title, note FROM notes where id = ?', [id],
      function(SQLTransaction, data){
        var row = data.rows.item(0);
        var title = $("#title");
        var note = $("#note");

        title.val(row["title"]);
        title.attr("data-id", row["id"]);
        note.val(row["note"]);
        $("#delete").show();

      });
  });
}

// Fetching notes

fetchNotes = function(){
  db.transaction(function(tx) {
      tx.executeSql('SELECT id, title, note FROM notes', [],
        function(SQLTransaction, data){
          for (var i = 0; i < data.rows.length; ++i) {
              var row = data.rows.item(i);
              var id = row['id'];
              var title = row['title'];

              addToNotesList(id, title);
          }
      });
  });
};

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
  
  connectToDB();
  createNotesTable();
  fetchNotes();
  
  
  $("#save").click(function(event){
    event.preventDefault();
    var title = $("#title");
    var note = $("#note");
    insertNote(title, note);
  });
    
  $("#notes").click(function(event){
    if ($(event.target).is('li')) {
      var element = $(event.target);
      loadNote(element.attr("data-id"));
      $("#form").show();
      $("#notes").hide();
      
    }
    
  });
  
  
});
