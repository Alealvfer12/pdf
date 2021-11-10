
var data = [];
let consultar = () => {
    axios.get("http://localhost:3001/consultarBovinos").then((response) => {
        console.log("Respuesta del Api");
        console.log(response);
        registros = response.data.info;
        console.log(registros);
        let lista = document.getElementById("lista");
        let data = "";
        for (let i = 0; i < registros.length; i++) {
            chapeta = registros[i].chapeta;
            id_tipo = registros[i].id_tipo;
            nombre = registros[i].nombre;
            id_raza = registros[i].id_raza;
            genetica = registros[i].genetica;
            finca = registros[i].finca;
            data += "<tr>";
            data += `<td>${chapeta}</td>`;
            data +=`<td>${id_tipo}</td>`;
            data += `<td>${nombre} </td>`;
            data += `<td>${id_raza} </td>`;
            data += `<td>${genetica} </td>`;
            data += `<td>${finca} </td>`;
            "</tr>";
        }
        lista.innerHTML = data;
    });
};

consultar();
