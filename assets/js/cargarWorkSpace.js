
 var IdJson;
 $(document).ready(function () {
 
  
    
 }).on("click", "#btnActionWorkSpaces", function () {
   $('#divActionWorkSpaces').toggle();
 }).on("click", "#btnUpdateWorkSpaces", function () {
   $('#btnAddWorkSpaces').text('Update Changes');
 
    IdJson = $('table input:checked').map(function(){
    return $(this).closest('tr').find('td:eq(8)').text();
    }).get();
 
    jsonValue = JSON.parse(localStorage.getItem('WorkSpacesJ'));
    if (IdJson.length <= 1) {
      for (let i = 0; i < jsonValue.length ; i++) {
        if (jsonValue[i].id == IdJson) {
          InfoWorkSpaces = jsonValue[i];
        }
       }
 
      $('#txtNameWorkSpaces').val(InfoWorkSpaces.NameWorkSpaces);
      $('#txtDescWorkSpaces').val(InfoWorkSpaces.DescWorkSpaces);
      var date = moment().format('L');
 
       var DataUpdate = [];
       DataUpdate.push({'id': InfoWorkSpaces.id, 'NameWorkSpaces' : InfoWorkSpaces.NameWorkSpaces, 'DescWorkSpaces' : InfoWorkSpaces.DescWorkSpaces, 'Date': date})
 
      localStorage.setItem("DataUpdate", JSON.stringify(DataUpdate));
    }
 }).on("click", "#btnDeleteWorkSpaces", function () {
   IdJson = $('table input:checked').map(function(){
     return $(this).closest('tr').find('td:eq(8)').text();
     }).get();
  
     jsonValue = JSON.parse(localStorage.getItem('WorkSpacesJ'));
  
  
    for (let i = 0; i < jsonValue.length ; i++) {
      if (jsonValue[i].id == IdJson) {
        InfoWorkSpaces = jsonValue[i];
         jsonValue.splice(i, 1);
 
      }
    }
 
     
     localStorage.setItem("WorkSpacesJ", JSON.stringify(jsonValue));
     
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
         $('#descWorkSpaces').toggle('fast');
         $('#text-desc').toggle();
     
         var InstanceID = $(valores[3]).html();
         $("#InstanceID").text(InstanceID);
       }else {
         $('#descWorkSpaces').show('fast');
         $('#text-desc').hide();
     
         var InstanceID = $(valores[2]).html();
         $("#InstanceID").text(InstanceID);
       }
       
       localStorage.setItem("textemp", texTemp);
 
       
      $(".check").not($(this)).each(function () {
           $(this).removeAttr("checked");
       })
   }else{
     $('#descWorkSpaces').hide('fast');
   }
 });
 
 
 var id;
 
 function addWorkSpaces(Name, Desc) {
 
   if ($('#btnAddWorkSpaces').text() == 'Save Changes') {
     var date = moment().format('L');
     
     var data = [];
     
     
     if (localStorage.getItem("WorkSpacesJ") === null) {
       id = 1;
       data.push({'id': id, 'NameWorkSpaces' : Name, 'DescWorkSpaces' : Desc, 'Date': date});
     }else{
       var _jsonData ={ _WorkSpaces:[]};
       _jsonData._WorkSpaces  = JSON.parse(localStorage.getItem('WorkSpacesJ'));
       if (_jsonData._WorkSpaces.length === 0) {
         id = 1;
         
       } else {
         $.each(_jsonData._WorkSpaces, function (index, item) { 
           data.push(item);
           id = item.id + 1;
         });
         
       }
       data.push({'id': id, 'NameWorkSpaces' : Name, 'DescWorkSpaces' : Desc, 'Date': date});
     }
     
     llenartablaWorkSpaces(data);
       localStorage.setItem("WorkSpacesJ", JSON.stringify(data));
     
     
   }else{
     var jsonValue = JSON.parse(localStorage.getItem('WorkSpacesJ'));
     var JsonUpdate =  JSON.parse(localStorage.getItem('DataUpdate'));
     var date = moment().format('L');
 
     for (let i = 0; i < jsonValue.length ; i++) {
       var id1 = JsonUpdate[0].id;
       var id2 = jsonValue[i].id;
       if (id1 === id2) {
        jsonValue[i].NameWorkSpaces = $('#txtNameWorkSpaces').val();
        jsonValue[i].DescWorkSpaces = $('#txtDescWorkSpaces').val();
        jsonValue[i].Date = date;
      }
    }
     localStorage.setItem("WorkSpacesJ", JSON.stringify(jsonValue));
 
     llenartablaWorkSpaces(jsonValue);
 
     localStorage.removeItem('DataUpdate');
   }
 
 
 }
 
 function cargarWorkSpaces() {
   $.ajax({
     type: "GET",
     url: "WorkSpaces.html",
     data: {},
     success: function (datos) {
       $('#app').html(datos);
 
       $('#descWorkSpaces').hide();
 
       $('#btnAddWorkSpaces').text('Save Changes');
 
       if (localStorage.getItem("WorkSpacesJ") !== null) {
         response = $.parseJSON(localStorage.getItem("WorkSpacesJ"));
         llenartablaWorkSpaces(response);
 
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
 
       $('#btnCloseModalWorkSpaces').click(function (e) { 
         $('#txtNameWorkSpaces').val('');
         $('#txtDescWorkSpaces').val('');
       });
     }
   });
 }
 
 function llenartablaWorkSpaces(jsonValue) {
   $('#tabla').empty();
 
   var tabla = 
       '<table id="tabWorkSpaces" class="table table-bordered" style="background: white">'+
       '  <thead>'+
       '      <tr>'+
       '          <th colspan="2"></th>'+
       '          <th>Name</th>'+
       '          <th>Description</th>'+
       '          <th>WorkSpacess</th>'+
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
            '<td style="width: 40px;text-align: center;"><input class="check" type="checkbox" id="chkWorkSpaces"></td>' +
            '<td class="text-center" style="width: 50px;"><span class="fa fa-desktop text-info"></span></td>' +
            '<td class="NameWorkSpaces">'+ item.NameWorkSpaces +'</td>' +
            '<td>'+ item.DescWorkSpaces +'</td>' +
            '<td>0</td>' +
            '<td>0</td>' +
            '<td>0</td>' +
            '<td>'+ item.Date +'</td>' +
            '<td style="display: none;" id="idWorkSpaces">'+ item.id +'</td>' +
        '</tr>';
        $('#tabWorkSpaces').append(tr);
      });
 }
 
 
 
 