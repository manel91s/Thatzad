function codigoPostal() {
            

    cp = document.querySelector("#cp").value

    if(cp.trim()==""){
        alert("Inserta un Código Postal de España")
        return;
    }
    

    var datos = new FormData();

    datos.append('cp',cp)
    datos.append('opcion','A')

    fetch('proceso.php', {

        method: 'POST',
        body:datos


    })
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json()
            } else {
                console.log(respuesta)
                throw ('error en la llamada AJAX')

            }
        })
        .then(function (datos) {
            //montar la lista de invitados
            
            
            if(datos[0]=='00') {

                localStorage.setItem('temperatura',datos[1]);
                localStorage.setItem('codigopostal',cp)
                location.href = "resultado.html"
            }else {
                
            }
            
        })
        .catch(function (error) {
            alert(error)
        })

}