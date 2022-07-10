let registros = [];

const txtID = document.getElementById("txtID");
const txtNombre = document.getElementById("txtNombre");
const txtApellido = document.getElementById("txtApellido");
const txtEdad = document.getElementById("txtEdad");
const cuerpoTabla = document.getElementById("cuerpoTabla");

const crearRegistro = () => {
    const usuario = {
        id: uuidv4(),
        nombre: txtNombre.value,
        apellido: txtApellido.value,
        edad: txtEdad.value
    }
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
            <th scope="row">1</th>
            <td>${registroLocal.nombre}</td>
            <td>${registroLocal.apellido}</td>
            <td>${registroLocal.edad}</td>
            <td>
                <button 
                    type="button" 
                    class="btn btn-warning"
                    onclick="iniciarEditarRegistro('${registroLocal.id}')"
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
    txtNombre.value = usuario.nombre;
    txtApellido.value = usuario.apellido;
    txtEdad.value = usuario.edad;

}
const editarRegistro = () => {
    const registrosLocales = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = registrosLocales.find((registroLocal) => {
        return registroLocal.id === txtID.value;
    })

    usuario.nombre = txtNombre.value;
    usuario.apellido = txtApellido.value;
    usuario.edad = txtEdad.value;

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


function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

window.onload = () => {
    mostrarRegistros();
}