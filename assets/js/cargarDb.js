$(document).ready(function () {
   
}).on("click", "#tabDb tr", function(e) {
  var valores;
  var texTemp ;

  valores = $(this).find('td');
 
  texTemp = $(valores[1]).html();


  if (texTemp === localStorage.getItem("textemp")) {
    $('#descDb').toggle('fast');
    var InstanseID = $(valores[2]).html();
    $("#InstanseID").text(InstanseID);
    console.log($("#InstanseID").text(InstanseID));
  }else {
    $('#descDb').show('fast');
    var InstanseID = $(valores[2]).html();
    $("#InstanseID").text(InstanseID);
  }
  
  localStorage.setItem("textemp", texTemp);

});

function addDb(Name, Desc) {
  var date = moment().format('L');
  var row = 
    ' <tr>' +
      '<td class="text-center" style="width: 50px;"><span class="fa fa-desktop text-info"></span></td>' +
      '<td class="NameServer">'+ Name +'</td>' +
      '<td>'+ Desc +'</td>' +
      '<td>0</td>' +
      '<td>0</td>' +
      '<td>0</td>' +
      '<td>'+ date +'</td>' +
    '</tr>';

  $('#tabDb').append(row);

}

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
        var Name = $('#txtNameDb').val();
        var Desc = $('#txtDescDb').val();
        addDb(Name, Desc);
        $('#txtNameDb').val('');
        $('#txtDescDb').val('');
      })
    }
  });
}


