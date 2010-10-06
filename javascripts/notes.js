var db = null;

$(function(){
  $("#form").hide();
  
  $("#new").click(function(e){
    $("#form").show();
    $("#notes").hide();
    
  });
  
  $("#back").click(function(e){
    $("#form").hide();
    $("#notes").show();
    
  });
  
  
});
