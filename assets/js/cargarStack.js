
 var IdJson;
$(document).ready(function () {
   
}).on("click", "#tabStack tr", function(e) {
  var valores;
  var texTemp ;

  valores = $(this).find('td');
 
  texTemp = $(valores[2]).html();


  if (texTemp === localStorage.getItem("textemp")) {
    $('#descStack').toggle('fast');
    $('#text-desc').toggle();

    var InstanceID = $(valores[3]).html();
    $("#InstanceID").text(InstanceID);
  }else {
    $('#descStack').show('fast');
    $('#text-desc').hide();

    var InstanceID = $(valores[2]).html();
    $("#InstanceID").text(InstanceID);
  }
  
  localStorage.setItem("textemp", texTemp);

}).on("click", "#btnActionStack", function () {
  $('#divActionStac').toggle();
}).on("click", "#btnUpdateStack", function () {
   IdJson = $('table input:checked').map(function(){
   return $(this).closest('tr').find('td:eq(8)').text();
   }).get();

   jsonValue = JSON.parse(localStorage.getItem('StackJ'));


  for (let i = 0; i < jsonValue.length ; i++) {
    if (jsonValue[i].id == IdJson) {
      InfoStack = jsonValue[i];
    }
  }
  $('#txtNameStack').val(InfoStack.NameStack);
  $('#txtDescStack').val(InfoStack.DescStack);
    
}).on("click", "#btnDeleteStack", function () {
  IdJson = $('table input:checked').map(function(){
    return $(this).closest('tr').find('td:eq(8)').text();
    }).get();
 
    jsonValue = JSON.parse(localStorage.getItem('StackJ'));
 
 
   for (let i = 0; i < jsonValue.length ; i++) {
     if (jsonValue[i].id == IdJson) {
       InfoStack = jsonValue[i];
        console.log(i);
        jsonValue.splice(i, 1);

     }
   }

   console.log(InfoStack)
    
    localStorage.setItem("StackJ", JSON.stringify(jsonValue));
    
    $('input:checkbox:checked').map(function () {
      return this.value;
    }).get();
    $('input:checkbox:checked').parents("tr").remove();
});


var id;

function addStack(Name, Desc) {
  var date = moment().format('L');
  
  var data = [];
  
  
  if (localStorage.getItem("StackJ") === null) {
    id = 1;
    data.push({'id': id, 'NameStack' : Name, 'DescStack' : Desc, 'Date': date});
  }else{
    var _jsonData ={ _Stack:[]};
    _jsonData._Stack  = JSON.parse(localStorage.getItem('StackJ'));
    console.log('Json Data '+_jsonData._Stack.length);
    if (_jsonData._Stack.length === 0) {
      id = 1;
      
    } else {
      $.each(_jsonData._Stack, function (index, item) { 
        data.push(item);
        id = item.id + 1;
      });
      
    }
    data.push({'id': id, 'NameStack' : Name, 'DescStack' : Desc, 'Date': date});
  }
  var row = 
    ' <tr>' +
      '<td style="width: 40px;text-align: center;"><input type="checkbox" id="chkStack"></td>' +
      '<td class="text-center" style="width: 50px;"><span class="fa fa-desktop text-info"></span></td>' +
      '<td class="NameServer">'+ Name +'</td>' +
      '<td>'+ Desc +'</td>' +
      '<td>0</td>' +
      '<td>0</td>' +
      '<td>0</td>' +
      '<td>'+ date +'</td>' +
      '<td style="display: none;" id="idStack">'+ id +'</td>' +
    '</tr>';

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
      $('#divActionStac').hide();

      if (localStorage.getItem("StackJ") !== null) {
        response = $.parseJSON(localStorage.getItem("StackJ"));
        $.each(response, function (i, item) { 
           var tr =  
          ' <tr>' +
              '<td style="width: 40px;text-align: center;"><input type="checkbox" id="chkStack"></td>' +
              '<td class="text-center" style="width: 50px;"><span class="fa fa-desktop text-info"></span></td>' +
              '<td class="NameServer">'+ item.NameStack +'</td>' +
              '<td>'+ item.DescStack +'</td>' +
              '<td>0</td>' +
              '<td>0</td>' +
              '<td>0</td>' +
              '<td>'+ item.Date +'</td>' +
              '<td style="display: none;" id="idStack">'+ item.id +'</td>' +
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

      $('#btnCloseModalStack').click(function (e) { 
        $('#txtNameStack').val('');
        $('#txtDescStack').val('');
      });
    }
  });
}



