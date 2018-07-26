
 var IdJson;
 $(document).ready(function () {
    
 }).on("click", "#tabServer tr", function(e) {
   var valores;
   var texTemp ;
 
   valores = $(this).find('td');
  
   texTemp = $(valores[2]).html();
 
 
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
 
 }).on("click", "#btnActionServer", function () {
   $('#divActionServer').toggle();
 }).on("click", "#btnUpdateServer", function () {
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
 });
 
 
 var id;
 
 function addServer(Name, Desc) {
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
   var row = 
     ' <tr>' +
       '<td style="width: 40px;text-align: center;"><input type="checkbox" id="chkServer"></td>' +
       '<td class="text-center" style="width: 50px;"><span class="fa fa-desktop text-info"></span></td>' +
       '<td class="NameServer">'+ Name +'</td>' +
       '<td>'+ Desc +'</td>' +
       '<td>0</td>' +
       '<td>0</td>' +
       '<td>0</td>' +
       '<td>'+ date +'</td>' +
       '<td style="display: none;" id="idServer">'+ id +'</td>' +
     '</tr>';
 
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
       $('#divActionServer').hide();
 
       if (localStorage.getItem("ServerJ") !== null) {
         response = $.parseJSON(localStorage.getItem("ServerJ"));
         $.each(response, function (i, item) { 
            var tr =  
           ' <tr>' +
               '<td style="width: 40px;text-align: center;"><input type="checkbox" id="chkServer"></td>' +
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
 
       $('#btnCloseModalServer').click(function (e) { 
         $('#txtNameServer').val('');
         $('#txtDescServer').val('');
       });
     }
   });
 }
 
 
 
 