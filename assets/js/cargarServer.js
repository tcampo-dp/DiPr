$(document).ready(function () {
   
})

function cargarServer() {
    $.ajax({
      type: "GET",
      url: "Server.html",
      data: {},
      success: function (datos) {
        $('#app').html(datos);

        $('#tabServer').hide();
        $('#Server').hide();
        $('#descServer').hide();

        $('#btnAddServer').click(function () {
          $('#Server').show('fast');
          $('#tabServer').show();
          $('#ModalServer').modal('toggle');
        })

        $('#tabServer>tbody>tr').click(function () {
          $('#descServer').toggle('fast');
        })
      }
    });
}


