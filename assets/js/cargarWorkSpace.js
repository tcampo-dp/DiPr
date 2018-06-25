$(document).ready(function () {
   
})

function cargarWorkSpace() {
    $.ajax({
      type: "GET",
      url: "Workspaces.html",
      data: {},
      success: function (datos) {
        $('#app').html(datos);

        $('#tabWorkspaces').hide();
        $('#Workspaces').hide();
        $('#descWorkspaces').hide();

        $('#btnAddWorkspaces').click(function () {
          $('#Workspaces').show('fast');
          $('#tabWorkspaces').show();
          $('#ModalWorkspaces').modal('toggle');
        })

        $('#tabWorkspaces>tbody>tr').click(function () {
          $('#descWorkspaces').toggle('fast');
        })
      }
    });
}


