$(document).ready(function () {
   
}).on("click", "#tabServer tr", function(e) {
  var valores;
  var texTemp ;

  valores = $(this).find('td');
 
  texTemp = $(valores[1]).html();


  if (texTemp === localStorage.getItem("textemp")) {
    $('#descServer').toggle('fast');
    $('#text-desc').toggle();

    var InstanceID = $(valores[2]).html();
    $("#InstanceID").text(InstanceID);
    console.log($("#InstanceID").text(InstanceID));
  }else {
    $('#descServer').show('fast');
    $('#text-desc').hide();

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

    
    // var jsonData = {};
    // jsonData.Server = {"NameServer" : Name, "descServer" : Desc, "Date": date}
    // localStorage.setItem("ServerJ", JSON.stringify(jsonData));

    var data = [];

    if (localStorage.getItem("ServerJ") === null) {
      data.push({'NameServer' : Name, 'DescServer' : Desc, 'Date': date});
    }else{
      var _jsonData ={ _Stack:[]};
      _jsonData._Stack  = JSON.parse(localStorage.getItem('ServerJ'));
      $.each(_jsonData._Stack, function (index, item) { 
         data.push(item);
      });
      data.push({'NameServer' : Name, 'DescServer' : Desc, 'Date': date});
    }

    localStorage.setItem("ServerJ", JSON.stringify(data));


    

  $('#tabServer').append(row);

}

function cargarServer() {
  $.ajax({
    type: "GET",
    url: "Server.html",
    data: {},
    success: function (datos) {
      $('#app').html(datos);

      $('#descServer').hide();

      if (localStorage.getItem("ServerJ") !== null) {
       var _ServerJ = $.parseJSON(localStorage.getItem("ServerJ"));
        console.log(_ServerJ);
        $.each(_ServerJ, function (i, item) { 
           var tr =  
          ' <tr>' +
              '<td class="text-center" style="width: 50px;"><span class="fa fa-desktop text-info"></span></td>' +
              '<td class="NameServer">'+ item.NameServer +'</td>' +
              '<td>'+ item.DescServer +'</td>' +
              '<td>0</td>' +
              '<td>0</td>' +
              '<td>0</td>' +
              '<td>'+ item.Date +'</td>' +
          '</tr>';

         

          $('#tabServer').append(tr);
        });
      } else {
        console.log("Vacio Server")
      }
      var response = $.parseJSON(localStorage.getItem("StackJ"));
      console.log(response);
      $.each(response, function (i, item) { 
        $("#selectStack").append('<option value="'+ item.NameStack +'">'+ item.NameStack +'</option>');
      });

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



