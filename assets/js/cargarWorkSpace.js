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

var jsonData = {};


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

    var data = [];

    if (localStorage.getItem("WorkSpacesJ") === null) {
      data.push({'NameWorkSpaces' : Name, 'DescWorkSpaces' : Desc, 'Date': date});
    }else{
      var _jsonData ={ _WorkSpaces:[]};
      _jsonData._WorkSpaces  = JSON.parse(localStorage.getItem('WorkSpacesJ'));
      $.each(_jsonData._WorkSpaces, function (index, item) { 
         data.push(item);
      });
      data.push({'NameWorkSpaces' : Name, 'DescWorkSpaces' : Desc, 'Date': date});
    }

    localStorage.setItem("WorkSpacesJ", JSON.stringify(data));

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

      if (localStorage.getItem("WorkSpacesJ") !== null) {
        var _WorkSpacesJ = $.parseJSON(localStorage.getItem("WorkSpacesJ"));
         $.each(_WorkSpacesJ, function (i, item) { 
            var tr =  
           ' <tr>' +
               '<td class="text-center" style="width: 50px;"><span class="fa fa-desktop text-info"></span></td>' +
               '<td class="NameServer">'+ item.NameWorkSpaces +'</td>' +
               '<td>'+ item.DescWorkSpaces +'</td>' +
               '<td>0</td>' +
               '<td>0</td>' +
               '<td>0</td>' +
               '<td>'+ item.Date +'</td>' +
           '</tr>';
           $('#tabWorkSpaces').append(tr);
         });
       } else {
         console.log("Vacio WorkSpaces")
       }

       if (localStorage.getItem("StackJ") !== null) {
         var responseStack = $.parseJSON(localStorage.getItem("StackJ"));
         console.log(responseStack);
         $.each(responseStack, function (i, item) { 
           $("#selectStack").append('<option value="'+ item.NameStack +'">'+ item.NameStack +'</option>');
         });
       }

       if (localStorage.getItem("ServerJ") !== null) {
         var responseServer = $.parseJSON(localStorage.getItem("ServerJ"));
         console.log(responseServer);
         $.each(responseServer, function (i, item) { 
           $("#selectServer").append('<option value="'+ item.NameServer +'">'+ item.NameServer +'</option>');
         });
       }


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



