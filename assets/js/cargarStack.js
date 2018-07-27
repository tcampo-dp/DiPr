
 var IdJson;
$(document).ready(function () {

 
   
}).on("click", "#btnActionStack", function () {
  $('#divActionStack').toggle();
}).on("click", "#btnUpdateStack", function () {
  $('#btnAddStack').text('Update Changes');

   IdJson = $('table input:checked').map(function(){
   return $(this).closest('tr').find('td:eq(8)').text();
   }).get();

   jsonValue = JSON.parse(localStorage.getItem('StackJ'));
   if (IdJson.length <= 1) {
     for (let i = 0; i < jsonValue.length ; i++) {
       if (jsonValue[i].id == IdJson) {
         InfoStack = jsonValue[i];
       }
      }

     $('#txtNameStack').val(InfoStack.NameStack);
     $('#txtDescStack').val(InfoStack.DescStack);
     var date = moment().format('L');

      var DataUpdate = [];
      DataUpdate.push({'id': InfoStack.id, 'NameStack' : InfoStack.NameStack, 'DescStack' : InfoStack.DescStack, 'Date': date})

     localStorage.setItem("DataUpdate", JSON.stringify(DataUpdate));
   }
}).on("click", "#btnDeleteStack", function () {
  IdJson = $('table input:checked').map(function(){
    return $(this).closest('tr').find('td:eq(8)').text();
    }).get();
 
    jsonValue = JSON.parse(localStorage.getItem('StackJ'));
 
 
   for (let i = 0; i < jsonValue.length ; i++) {
     if (jsonValue[i].id == IdJson) {
       InfoStack = jsonValue[i];
        jsonValue.splice(i, 1);

     }
   }

    
    localStorage.setItem("StackJ", JSON.stringify(jsonValue));
    
    $('input:checkbox:checked').map(function () {
      return this.value;
    }).get();
    $('input:checkbox:checked').parents("tr").remove();
}).on('change', '.check', function () {
  if ($(this).is(":checked")) {
      var chk = $('table input:checked').map(function(){
      return $(this).closest('tr').find('td').text();
      }).get();

      var valores;
      var texTemp ;
      var valores = $('table input:checked').closest('tr').find('td');

      texTemp = $(valores[3]).html();
    
    
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

      
     $(".check").not($(this)).each(function () {
          $(this).removeAttr("checked");
      })
  }else{
    $('#descStack').hide('fast');
  }
});


var id;

function addStack(Name, Desc) {

  if ($('#btnAddStack').text() == 'Save Changes') {
    var date = moment().format('L');
    
    var data = [];
    
    
    if (localStorage.getItem("StackJ") === null) {
      id = 1;
      data.push({'id': id, 'NameStack' : Name, 'DescStack' : Desc, 'Date': date});
    }else{
      var _jsonData ={ _Stack:[]};
      _jsonData._Stack  = JSON.parse(localStorage.getItem('StackJ'));
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
    
    llenartablaStack(data);
      localStorage.setItem("StackJ", JSON.stringify(data));
    
    
  }else{
    var jsonValue = JSON.parse(localStorage.getItem('StackJ'));
    var JsonUpdate =  JSON.parse(localStorage.getItem('DataUpdate'));
    var date = moment().format('L');

    for (let i = 0; i < jsonValue.length ; i++) {
      var id1 = JsonUpdate[0].id;
      var id2 = jsonValue[i].id;
      if (id1 === id2) {
       jsonValue[i].NameStack = $('#txtNameStack').val();
       jsonValue[i].DescStack = $('#txtDescStack').val();
       jsonValue[i].Date = date;
     }
   }
    localStorage.setItem("StackJ", JSON.stringify(jsonValue));

    llenartablaStack(jsonValue);

    localStorage.removeItem('DataUpdate');
  }


}

function cargarStack() {
  $.ajax({
    type: "GET",
    url: "stack.html",
    data: {},
    success: function (datos) {
      $('#app').html(datos);

      $('#descStack').hide();

      $('#btnAddStack').text('Save Changes');

      if (localStorage.getItem("StackJ") !== null) {
        response = $.parseJSON(localStorage.getItem("StackJ"));
        llenartablaStack(response);

      }
      
      Split(['#eight', '#nine'], {
        direction: 'vertical'
      });

      $(".check").change(function () {
        if ($(this).is(":checked")) {
            $(".check").not($(this)).each(function () {
                $(this).removeAttr("checked");
            })
        }
      })

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

function llenartablaStack(jsonValue) {
  $('#tabla').empty();

  var tabla = 
      '<table id="tabStack" class="table table-bordered" style="background: white">'+
      '  <thead>'+
      '      <tr>'+
      '          <th colspan="2"></th>'+
      '          <th>Name</th>'+
      '          <th>Description</th>'+
      '          <th>Servers</th>'+
      '          <th>Workspaces</th>'+
      '          <th>DB</th>'+
      '          <th>Created Date</th>'+
      '          <th style="display: none;"></th>'+
      '      </tr>'+
      '  </thead>'+
      '</table>';
      $('#tabla').html(tabla);
      $.each(jsonValue, function (i, item) { 
        var tr =  
       ' <tr>' +
           '<td style="width: 40px;text-align: center;"><input class="check" type="checkbox" id="chkStack"></td>' +
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
}



