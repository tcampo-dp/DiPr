$(document).ready(function () {
   
}).on("click", "#tabStack tr", function(e) {
  var valores;
  var texTemp ;

  valores = $(this).find('td');
 
  texTemp = $(valores[1]).html();


  if (texTemp === localStorage.getItem("textemp")) {
    $('#descStack').toggle('fast');
    var InstanseID = $(valores[2]).html();
    $("#InstanseID").text(InstanseID);
    console.log($("#InstanseID").text(InstanseID));
  }else {
    $('#descStack').show('fast');
    var InstanseID = $(valores[2]).html();
    $("#InstanseID").text(InstanseID);
  }
  
  localStorage.setItem("textemp", texTemp);

});

function addStack(Name, Desc) {
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

  $('#tabStack').append(row);

}

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
        var Name = $('#txtNameStack').val();
        var Desc = $('#txtDescStack').val();
        addStack(Name, Desc);
        $('#txtNameStack').val('');
        $('#txtDescStack').val('');
      })
    }
  });
}


