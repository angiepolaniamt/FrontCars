function autoInicioGama(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.112.106:8080/api/Gama/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-gama");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idGama+'>'+name.name+'</option>');
                console.log("select "+name.idGama);
            }); 
        }
    
    })

}


function autoInicioCar(){

    $.ajax({
        url:"http://129.151.112.106:8080/api/Car/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
            let $select = $("#select-car");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idCar+'>'+name.name+'</option>');
         
            }); 
        }
    
    })
}

//Manejador GET
function traerInformacionCarro() {
    $.ajax({
        url:"http://129.151.112.106:8080/api/Car/all",
        //url: "http://localhost:8080/api/Car/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaCarro(response);
        }

    });

}

function pintarRespuestaCarro(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Modelo</td>";
        myTable+="<td>Año</td>";
        myTable+="<td>Descripcion</td>";
        myTable+="<td>Gama</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
        if (response[i].gama == undefined){
            gama = 'Desconocida'
        } else{
            gama = response[i].gama.name
        }
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].brand + "</td>";
        myTable+="<td>" + response[i].year + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + gama + "</td>";
        myTable+='<td><button class = "botonCarro2" onclick="borrar(' + response[i].idCar + ')">Borrar Carro!</button></td>';
        myTable+='<td><button class = "botonCarro2" onclick="cargarDatosCarro(' + response[i].idCar + ')">Editar Carro!</button></td>';
        myTable+='<td><button class = "botonCarro2" onclick="actualizar(' + response[i].idCar + ')">Actualizar Carro!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaCarro").html(myTable);
}
//Capturar informacion para Actualizar
function cargarDatosCarro(id) {
    $.ajax({
        dataType: 'json',
        
        url: "http://129.151.112.106:8080/api/Car/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.idCar);
            $("#name2").val(item.name);
            $("#brand").val(item.brand);
            $("#year").val(item.year);
            $("#description2").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarCarro() {

    if($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#name2").val(),
                brand: $("#brand").val(),
                year: $("#year").val(),
                description: $("#description2").val(),
                gama:{idGama: $("#select-gama").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://129.151.112.106:8080/api/Car/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                    $("#resultado2").empty();
                    $("#name2").val("");
                    $("#brand").val("");
                    $("#year").val("");
                    $("#description2").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}
//Manejador DELETE
function borrar(idElemento) {
    var elemento = {
        idCar: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url: "http://129.151.112.106:8080/api/Car/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaCarro").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function actualizar(idElemento) {
    
    if($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            idCar: idElemento,
            name: $("#name2").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            description: $("#description2").val(),
            gama:{idGama: +$("#select-gama").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url: "http://129.151.112.106:8080/api/Car/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaCarro").empty();
                listarCarro();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado2").empty();
                $("#id").val("");
                $("#name2").val("");
                $("#brand").val("");
                $("#year").val("");
                $("#description2").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
