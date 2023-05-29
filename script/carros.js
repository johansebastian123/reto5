const inputtablebody = document.getElementById("inputtablebody")
const inputId = document.getElementById("inputId")
const inputNombre = document.getElementById("inputNombre")
const selectGama = document.getElementById("selectGama")
const inputMarca = document.getElementById("inputMarca")
const inputAño = document.getElementById("inputAño")
const inputDescripcion = document.getElementById("inputDescripcion")
const contenedorId = document.getElementById("contenedorId")


const valueSelect = selectGama.getElementsByTagName('selectGama')

const btnsAgregar = document.getElementsByClassName("btn-agregar")
const btnsDetalles = document.getElementsByClassName("btn-detalles")

function btnAgregar(){
    btnsAgregar[0].style.display = 'block'
    btnsDetalles[0].style.display = 'none'
    btnsDetalles[1].style.display = 'none'
    inputId.style.display = 'none'
    contenedorId.style.display = 'none'
    obtenerGamas()

    limpiarInput()
}

function btnDetalles(id){
    btnsAgregar[0].style.display = 'none'
    btnsDetalles[0].style.display = 'block'
    btnsDetalles[1].style.display = 'block'
    inputId.style.display = 'block'
    contenedorId.style.display = 'block'
    selectGama.disabled = true

    obtenerPorId(id)
}

function crear(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "name": inputNombre.value,
    "brand": inputMarca.value,
    "year": inputAño.value,
    "description": inputDescripcion.value,
    "gama":{
        "idGama": selectGama.value
    } 
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:8090/api/Car/save", requestOptions)
    .then(response => {
        window.location.reload()
    })
    .catch(error => console.log('error', error));
}

function obtener(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://localhost:8090/api/Car/all", requestOptions)
        .then(response => response.json())
        .then(result => {
            result.forEach(element => {
                tablebody.innerHTML +=
                `
                    <tr>
                        <td>${element.name}</td>
                        <td>${element.brand}</td>
                        <td>${element.year}</td>
                        <td>${element.description}</td>
                        <td>${element.gama.name}</td>
                        <td><button type="button" class="btn btn-warning"  data-bs-toggle="modal" data-bs-target="#modal" onclick="btnDetalles(${element.idCar})">
                            Detalles
                        </button>
                        </td>
                    </tr>
                `
            });
        })
        .catch(error => console.log('error', error));
}

function obtenerPorId(id){
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
      };
      
      fetch(`http://localhost:8090/api/Car/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result){
                inputId.value = result.idCar
                inputNombre.value = result.name
                inputMarca.value = result.brand
                inputAño.value = result.year
                inputDescripcion.value = result.description
                selectGama.value = result.gama.idGama
            }
        })
        .catch(error => console.log('error', error));
}

function eliminarPorId(){
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch(`http://localhost:8090/api/Car/${inputId.value}`, requestOptions)
        .then(response => {
            console.log(response)
            window.location.reload()
        })
        .catch(error => console.log('error', error));
}

function actualizarPorId(){
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "idCar": inputId.value,
  "name": inputNombre.value,
  "brand": inputMarca.value,
  "year": inputAño.value,
  "description": inputDescripcion.value
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8090/api/Car/update", requestOptions)
  .then(response => {
    console.log(response)
    window.location.reload()
  })
  .catch(error => console.log('error', error));
}

function limpiarInput(){
    inputId.value = null
    inputNombre.value = null 
    inputMarca.value = null
    inputAño.value = null
    inputDescripcion.value = null
}

function obtenerGamas(){
    selectGama.innerHTML = ""
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://localhost:8090/api/Gama/all", requestOptions)
        .then(response => response.json())
        .then(result => {
            result.forEach(element => {
                selectGama.innerHTML +=`<option value="${element.idGama}">${element.name}</option>`
            });
        })
        .catch(error => console.log('error', error));
}

obtener()