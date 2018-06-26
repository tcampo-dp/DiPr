$(document).ready(function () {
   
}).on("click", "#tabServer tr", function(e) {
  var valores;
  var texTemp ;

  valores = $(this).find('td');
 
  texTemp = $(valores[1]).html();


  if (texTemp === localStorage.getItem("textemp")) {
    $('#descServer').toggle('fast');
    var InstanceID = $(valores[2]).html();
    $("#InstanceID").text(InstanceID);
    console.log($("#InstanceID").text(InstanceID));
  }else {
    $('#descServer').show('fast');
    var InstanceID = $(valores[2]).html();
    $("#InstanceID").text(InstanceID);
  }
  
  localStorage.setItem("textemp", texTemp);

});

function addServer(Name, Desc) {
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

  $('#tabServer').append(row);

}

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
        var Name = $('#txtNameServer').val();
        var Desc = $('#txtDescServer').val();
        addServer(Name, Desc);
        $('#txtNameServer').val('');
        $('#txtDescServer').val('');
      })
    }
  });
}


