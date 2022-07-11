let registros = [];

const txtID = document.getElementById("txtID");
const txtMesa = document.getElementById("txtMesa");
const txtPlatillo = document.getElementById("txtPlatillo");
const txtPersonas = document.getElementById("txtPersonas");
const cuerpoTabla = document.getElementById("cuerpoTabla");



function crearRegistro() {
    const usuario = {
        id: uuidv4(),
        nombre: txtMesa.value,
        apellido: txtPlatillo.value,
        edad: txtPersonas.value
    };
    registros = JSON.parse(localStorage.getItem("usuarios")) || [];
    registros.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(registros));

    mostrarRegistros();

}


const mostrarRegistros = () => {
    const registrosLocales = JSON.parse(localStorage.getItem("usuarios")) || [];

    cuerpoTabla.innerHTML = "";
    registrosLocales.forEach((registroLocal) => {
        const fila =
            `
        <tr>
           
            <td>${registroLocal.nombre}</td>
            <td>${registroLocal.apellido}</td>
            <td>${registroLocal.edad}</td>
            <td>
                <button 
                    type="button" 
                    class="btn btn-warning"
                    onclick="iniciarEditarRegistro('${registroLocal.id}'), editareliminarRegistro('${registroLocal.id}')"
                >
                        Editar
                </button>
            </td>
            <td>
                <button 
                    type="button" 
                    class="btn btn-danger" 
                    onclick="eliminarRegistro('${registroLocal.id}')" 
                >
                        Eliminar 
                </button>
            </td>
        </tr>
        `;
        cuerpoTabla.innerHTML += fila;
    });


}

const iniciarEditarRegistro = (idRegistro) => {
    const registrosLocales = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = registrosLocales.find((registroLocal) => {
        return registroLocal.id === idRegistro;
    })


    txtID.value = usuario.id;
    txtMesa.value = usuario.nombre;
    txtPlatillo.value = usuario.apellido;
    txtPersonas.value = usuario.edad;



}
const editarRegistro = () => {
    const registrosLocales = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = registrosLocales.find((registroLocal) => {
        return registroLocal.id === txtID.value;
    })

    usuario.nombre = txtMesa.value;
    usuario.apellido = txtPlatillo.value;
    usuario.edad = txtPersonas.value;

    localStorage.setItem("usuarios", JSON.stringify(registrosLocales));


    mostrarRegistros();

}

const eliminarRegistro = (idRegistro) => {
    const registrosLocales = JSON.parse(localStorage.getItem("usuarios")) || [];
    const registrosFiltrados = registrosLocales.filter((registroLocal) => {
        return registroLocal.id != idRegistro;
    })
    localStorage.setItem("usuarios", JSON.stringify(registrosFiltrados));
    mostrarRegistros();
}

const editareliminarRegistro = (idRegistro) => {
    const registrosLocales = JSON.parse(localStorage.getItem("usuarios")) || [];
    const registrosFiltrados = registrosLocales.filter((registroLocal) => {
        return registroLocal.id != idRegistro;
    })
    localStorage.setItem("usuarios", JSON.stringify(registrosFiltrados));

}


function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

window.onload = () => {
    mostrarRegistros();
}