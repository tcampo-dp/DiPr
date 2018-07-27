
 var IdJson;
 $(document).ready(function () {
 
  
    
 }).on("click", "#btnActionServer", function () {
   $('#divActionServer').toggle();
 }).on("click", "#btnUpdateServer", function () {
   $('#btnAddServer').text('Update Changes');
 
    IdJson = $('table input:checked').map(function(){
    return $(this).closest('tr').find('td:eq(8)').text();
    }).get();
 
    jsonValue = JSON.parse(localStorage.getItem('ServerJ'));
    if (IdJson.length <= 1) {
      for (let i = 0; i < jsonValue.length ; i++) {
        if (jsonValue[i].id == IdJson) {
          InfoServer = jsonValue[i];
        }
       }
 
      $('#txtNameServer').val(InfoServer.NameServer);
      $('#txtDescServer').val(InfoServer.DescServer);
      var date = moment().format('L');
 
       var DataUpdate = [];
       DataUpdate.push({'id': InfoServer.id, 'NameServer' : InfoServer.NameServer, 'DescServer' : InfoServer.DescServer, 'Date': date})
 
      localStorage.setItem("DataUpdate", JSON.stringify(DataUpdate));
    }
 }).on("click", "#btnDeleteServer", function () {
   IdJson = $('table input:checked').map(function(){
     return $(this).closest('tr').find('td:eq(8)').text();
     }).get();
  
     jsonValue = JSON.parse(localStorage.getItem('ServerJ'));
  
  
    for (let i = 0; i < jsonValue.length ; i++) {
      if (jsonValue[i].id == IdJson) {
        InfoServer = jsonValue[i];
         jsonValue.splice(i, 1);
 
      }
    }
 
     
     localStorage.setItem("ServerJ", JSON.stringify(jsonValue));
     
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
         $('#descServer').toggle('fast');
         $('#text-desc').toggle();
     
         var InstanceID = $(valores[3]).html();
         $("#InstanceID").text(InstanceID);
       }else {
         $('#descServer').show('fast');
         $('#text-desc').hide();
     
         var InstanceID = $(valores[2]).html();
         $("#InstanceID").text(InstanceID);
       }
       
       localStorage.setItem("textemp", texTemp);
 
       
      $(".check").not($(this)).each(function () {
           $(this).removeAttr("checked");
       })
   }else{
     $('#descServer').hide('fast');
   }
 });
 
 
 var id;
 
 function addServer(Name, Desc) {
 
   if ($('#btnAddServer').text() == 'Save Changes') {
     var date = moment().format('L');
     
     var data = [];
     
     
     if (localStorage.getItem("ServerJ") === null) {
       id = 1;
       data.push({'id': id, 'NameServer' : Name, 'DescServer' : Desc, 'Date': date});
     }else{
       var _jsonData ={ _Server:[]};
       _jsonData._Server  = JSON.parse(localStorage.getItem('ServerJ'));
       if (_jsonData._Server.length === 0) {
         id = 1;
         
       } else {
         $.each(_jsonData._Server, function (index, item) { 
           data.push(item);
           id = item.id + 1;
         });
         
       }
       data.push({'id': id, 'NameServer' : Name, 'DescServer' : Desc, 'Date': date});
     }
     
     llenartablaServer(data);
       localStorage.setItem("ServerJ", JSON.stringify(data));
     
     
   }else{
     var jsonValue = JSON.parse(localStorage.getItem('ServerJ'));
     var JsonUpdate =  JSON.parse(localStorage.getItem('DataUpdate'));
     var date = moment().format('L');
 
     for (let i = 0; i < jsonValue.length ; i++) {
       var id1 = JsonUpdate[0].id;
       var id2 = jsonValue[i].id;
       if (id1 === id2) {
        jsonValue[i].NameServer = $('#txtNameServer').val();
        jsonValue[i].DescServer = $('#txtDescServer').val();
        jsonValue[i].Date = date;
      }
    }
     localStorage.setItem("ServerJ", JSON.stringify(jsonValue));
 
     llenartablaServer(jsonValue);
 
     localStorage.removeItem('DataUpdate');
   }
 
 
 }
 
 function cargarServer() {
   $.ajax({
     type: "GET",
     url: "Server.html",
     data: {},
     success: function (datos) {
       $('#app').html(datos);
 
       $('#descServer').hide();
 
       $('#btnAddServer').text('Save Changes');
 
       if (localStorage.getItem("ServerJ") !== null) {
         response = $.parseJSON(localStorage.getItem("ServerJ"));
         llenartablaServer(response);
 
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

       if (localStorage.getItem("StackJ") !== null) {
        var responseStack = $.parseJSON(localStorage.getItem("StackJ"));
        console.log(responseStack);
        $.each(responseStack, function (i, item) { 
          $("#selectStack").append('<option value="'+ item.NameStack +'">'+ item.NameStack +'</option>');
        });
     }

       
 
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
 
       $('#btnCloseModalServer').click(function (e) { 
         $('#txtNameServer').val('');
         $('#txtDescServer').val('');
       });
     }
   });
 }
 
 function llenartablaServer(jsonValue) {
   $('#tabla').empty();
 
   var tabla = 
       '<table id="tabServer" class="table table-bordered" style="background: white">'+
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
            '<td style="width: 40px;text-align: center;"><input class="check" type="checkbox" id="chkServer"></td>' +
            '<td class="text-center" style="width: 50px;"><span class="fa fa-desktop text-info"></span></td>' +
            '<td class="NameServer">'+ item.NameServer +'</td>' +
            '<td>'+ item.DescServer +'</td>' +
            '<td>0</td>' +
            '<td>0</td>' +
            '<td>0</td>' +
            '<td>'+ item.Date +'</td>' +
            '<td style="display: none;" id="idServer">'+ item.id +'</td>' +
        '</tr>';
        $('#tabServer').append(tr);
      });
 }
 
 
 
 