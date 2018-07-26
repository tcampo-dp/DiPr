
 var IdJson;
 $(document).ready(function () {
    
 }).on("click", "#tabWorkSpaces tr", function(e) {
   var valores;
   var texTemp ;
 
   valores = $(this).find('td');
  
   texTemp = $(valores[2]).html();
 
 
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
 
 }).on("click", "#btnActionWorkSpaces", function () {
   $('#divActionWorkSpaces').toggle();
 }).on("click", "#btnUpdateWorkSpaces", function () {
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
 });
 
 
 var id;
 
 function addWorkSpaces(Name, Desc) {
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
   var row = 
     ' <tr>' +
       '<td style="width: 40px;text-align: center;"><input type="checkbox" id="chkWorkSpaces"></td>' +
       '<td class="text-center" style="width: 50px;"><span class="fa fa-desktop text-info"></span></td>' +
       '<td class="NameServer">'+ Name +'</td>' +
       '<td>'+ Desc +'</td>' +
       '<td>0</td>' +
       '<td>0</td>' +
       '<td>0</td>' +
       '<td>'+ date +'</td>' +
       '<td style="display: none;" id="idWorkSpaces">'+ id +'</td>' +
     '</tr>';
 
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
       $('#divActionWorkSpaces').hide();
 
       if (localStorage.getItem("WorkSpacesJ") !== null) {
         response = $.parseJSON(localStorage.getItem("WorkSpacesJ"));
         $.each(response, function (i, item) { 
            var tr =  
           ' <tr>' +
               '<td style="width: 40px;text-align: center;"><input type="checkbox" id="chkWorkSpaces"></td>' +
               '<td class="text-center" style="width: 50px;"><span class="fa fa-desktop text-info"></span></td>' +
               '<td class="NameServer">'+ item.NameWorkSpaces +'</td>' +
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
 
 
 
 