function autoInicioCliente(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.112.106:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta2(respuesta);
        }
    
    })

}
function pintarRespuesta2(respuesta){

    let myTable="<table>";
    myTable+="<tr><th>Email</th><th>Nombre</th><th>Edad</th><th>Actualiza Información</th><th>Borralo! SÓLO si no tiene reservaciones o mensajes</th></tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].email+"</td>";
       // myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionCliente("+respuesta[i].idClient+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCliente("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}

function guardarInformacionCliente(){
    let var2 = {
        
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),
     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.112.106:8080/api/Client/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarInformacionCliente(idElemento){
    let myData={
        idClient:idElemento,
        // email:$("#Clemail").val(),
        // password:$("#Clpassword").val(),
        // name:$("#Clname").val(),
        // age:$("#Clage").val(),


    };

    if ($("#Clemail").val() !== ''){
        console.log('email')
        myData['email'] = $("#Clemail").val()
    }

    if ($("#Clpassword").val() !== ''){
        console.log('password')
        myData['password'] = $("#Clpassword").val()
    }

    if ($("#Clname").val() !== ''){
        console.log('password')
        myData['name'] = $("#Clname").val()
    }

    if ($("#Clage").val() !== ''){
        console.log('age')
        myData['age'] = $("#Clage").val()
    }


    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.112.106:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idClient").val("");
            $("#Clemail").val("");
            $("#Clpassword").val("");
            $("#Clname").val("");
            $("#Clage").val("");
            autoInicioCliente();
            alert("se ha Actualizado correctamente Cliente")
        }
    });

}

function borrarCliente(idElemento){
    let myData={
        idClient:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.112.106:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioCliente();
            alert("Se ha Eliminado.")

        }
       
    }
    );

}