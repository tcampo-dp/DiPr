$(document).ready(function () {
   
})

function cargarDb() {
    $.ajax({
      type: "GET",
      url: "Db.html",
      data: {},
      success: function (datos) {
        $('#app').html(datos);

        $('#tabDb').hide();
        $('#Db').hide();
        $('#descDb').hide();

        $('#btnAddDb').click(function () {
          $('#Db').show('fast');
          $('#tabDb').show();
          $('#ModalDb').modal('toggle');
        })

        $('#tabDb>tbody>tr').click(function () {
          $('#descDb').toggle('fast');
        })
      }
    });
}


