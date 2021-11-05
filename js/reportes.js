function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url:"http://129.151.112.106:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}
function pintarRespuesta(respuesta){
    $("#count-completed").empty();
    $("#count-cancelled").empty();
    $("#count-completed").append(respuesta.completed);
    $("#count-cancelled").append(respuesta.cancelled);   
   
}
function traerReporteDate(){

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    
        $.ajax({
            url:"http://129.151.112.106:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }
    function pintarRespuestaDate(respuesta){

        let myTable="<table class='table'>";
        myTable+="<tr>";
        myTable+="<th>Fecha de devolucion</th>";
        myTable+="<th>Fecha de Inicio</th>";
        myTable+="<th>Estado</th>";
        myTable+="</tr>";
        for(i=0;i<respuesta.length;i++){
      
            myTable+="<tr>";
            myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
            myTable+="<td>"+respuesta[i].startDate+"</td>";
            myTable+="<td>"+respuesta[i].status+"</td>";
          
          
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoDate").html(myTable);
    }

    function traerReporteClientes(){
        $.ajax({
            url:"http://129.151.112.106:8080/api/Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaClientes(respuesta);
            }
        });
    }
    function pintarRespuestaClientes(respuesta){

        let myTable="<table class='table'>";
        myTable+="<tr>";
        myTable+="<th>Total</th>";
        myTable+="<th>Nombre</th>";  
        myTable+="<th>Email</th>"; 
        myTable+="<th>Edad</th>"; 
        myTable+="</tr>";
        for(i=0;i<respuesta.length;i++){
            myTable+="<tr>";
            myTable+="<td>"+respuesta[i].total+"</td>";
            myTable+="<td>"+respuesta[i].client.name+"</td>";
            myTable+="<td>"+respuesta[i].client.email+"</td>";
            myTable+="<td>"+respuesta[i].client.age+"</td>";
          
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoClientes").html(myTable);
    }
