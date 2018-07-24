$(document).ready(function () {
   
}).on("click", "#tabStack tr", function(e) {
  var valores;
  var texTemp ;

  valores = $(this).find('td');
 
  texTemp = $(valores[1]).html();


  if (texTemp === localStorage.getItem("textemp")) {
    $('#descStack').toggle('fast');
    $('#text-desc').toggle();

    var InstanceID = $(valores[2]).html();
    $("#InstanceID").text(InstanceID);
    console.log($("#InstanceID").text(InstanceID));
  }else {
    $('#descStack').show('fast');
    $('#text-desc').hide();

    var InstanceID = $(valores[2]).html();
    $("#InstanceID").text(InstanceID);
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




    var data = [];

    if (localStorage.getItem("StackJ") === null) {
      data.push({'NameStack' : Name, 'DescStack' : Desc, 'Date': date});
    }else{
      var _jsonData ={ _Stack:[]};
      _jsonData._Stack  = JSON.parse(localStorage.getItem('StackJ'));
      $.each(_jsonData._Stack, function (index, item) { 
         data.push(item);
      });
      data.push({'NameStack' : Name, 'DescStack' : Desc, 'Date': date});
    }

    localStorage.setItem("StackJ", JSON.stringify(data));
  
  $('#tabStack').append(row);

}

function cargarStack() {
  $.ajax({
    type: "GET",
    url: "stack.html",
    data: {},
    success: function (datos) {
      $('#app').html(datos);

      $('#descStack').hide();

      if (localStorage.getItem("StackJ") !== null) {
        response = $.parseJSON(localStorage.getItem("StackJ"));
        console.log(response);
        $.each(response, function (i, item) { 
           var tr =  
          ' <tr>' +
              '<td class="text-center" style="width: 50px;"><span class="fa fa-desktop text-info"></span></td>' +
              '<td class="NameServer">'+ item.NameStack +'</td>' +
              '<td>'+ item.DescStack +'</td>' +
              '<td>0</td>' +
              '<td>0</td>' +
              '<td>0</td>' +
              '<td>'+ item.Date +'</td>' +
          '</tr>';
          $('#tabStack').append(tr);
        });
      } else {
        console.log("Vacio")
      }

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



