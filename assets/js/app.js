$(document).ready(function(){
  
});


$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

$(function() {
      $( 'ul.sidebar-menu li' ).on( 'click', function() {
            $( this ).parent().find( 'li.active' ).removeClass( 'active' );
            $( this ).addClass( 'active' );
      });
});




