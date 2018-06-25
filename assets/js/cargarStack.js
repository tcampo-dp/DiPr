$(document).ready(function () {
   
})

function cargarStack() {
    $.ajax({
      type: "GET",
      url: "stack.html",
      data: {},
      success: function (datos) {
        $('#app').html(datos);

        $('#tabStack').hide();
        $('#Stack').hide();
        $('#descStack').hide();

        $('#btnAddStack').click(function () {
          $('#Stack').show('fast');
          $('#tabStack').show();
          $('#ModalStack').modal('toggle');
        })

        $('#tabStack>tbody>tr').click(function () {
          $('#descStack').toggle('fast');
        })
      }
    });
}


