$(document).ready(function () {
   
}).on("click", "#tabWorkSpaces tr", function(e) {
  var valores;
  var texTemp ;

  valores = $(this).find('td');
 
  texTemp = $(valores[1]).html();


  if (texTemp === localStorage.getItem("textemp")) {
    $('#descWorkSpaces').toggle('fast');
    $('#text-desc').toggle();

    var InstanceID = $(valores[2]).html();
    $("#InstanceID").text(InstanceID);
    console.log($("#InstanceID").text(InstanceID));
  }else {
    $('#descWorkSpaces').show('fast');
    $('#text-desc').hide();

    var InstanceID = $(valores[2]).html();
    $("#InstanceID").text(InstanceID);
  }
  
  localStorage.setItem("textemp", texTemp);

});

function addWorkSpaces(Name, Desc) {
  var date = moment().format('L');
  var row = 
    ' <tr>' +
      '<td class="text-center" style="width: 50px;"><span class="fa fa-desktop text-info"></span></td>' +
      '<td class="NameWorkSpaces">'+ Name +'</td>' +
      '<td>'+ Desc +'</td>' +
      '<td>0</td>' +
      '<td>0</td>' +
      '<td>0</td>' +
      '<td>'+ date +'</td>' +
    '</tr>';

  $('#tabWorkSpaces').append(row);

}

function cargarWorkSpaces() {
  $.ajax({
    type: "GET",
    url: "WorkSpaces.html",
    data: {},
    success: function (datos) {
      $('#app').html(datos);

      $('#descWorkSpaces').hide();

      $('#btnAddWorkSpaces').click(function () {
        $('#WorkSpaces').show('fast');
        $('#tabWorkSpaces').show();
        $('#ModalWorkSpaces').modal('toggle');
        var Name = $('#txtNameWorkSpaces').val();
        var Desc = $('#txtDescWorkSpaces').val();
        addWorkSpaces(Name, Desc);
        $('#txtNameWorkSpaces').val('');
        $('#txtDescWorkSpaces').val('');
      })
    }
  });
}



