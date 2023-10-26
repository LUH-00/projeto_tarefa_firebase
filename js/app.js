import { app, db } from "./config-firebase.js"
import { doc, setDoc, collection, addDoc, query, where, getDocs, orderBy, deleteDoc} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"

let nome = document.querySelector("#tarefa")
let data = document.querySelector("#data")
let status = document.querySelector("#status")
let btnTarefa = document.querySelector("#btnTarefa")
let bloco = document.querySelector("#bloco")
let formCadastrar = document.querySelector("#formCadastrar")
let formAtualizar = document.querySelector("#formAtualizar")
let btnAtualizar = document.querySelector("#btnAtualizar")

async function inserirTarefa(){
    try {
        // Add a new document with a generated id.
const docRef = await addDoc(collection(db, "tarefa"), {
    nome: nome.value,
    data: data.value,
    status: status.value
  });
  console.log("Document written with ID: ", docRef.id);

    } catch (error) {
        console.error("Ocoreu o seguinte erro: " + error)
        
    }
    
}
async function consultarTarefa (){
  bloco.innerHTML = "" // limpando o elemento HTML antes de inserir novos registros, para não acumular
    const busca = query(collection(db, "tarefa"), orderBy("nome"));

    const resultado = await getDocs(busca);
    resultado.forEach((item) => {
  // item.data() is never undefined for query item snapshots
    console.log(item.id, " => ", item.data());

    bloco.innerHTML += `
    
    <li class="list-group-item d-flex justify-content-between align-items-center mb-2">
        <div class="ms-2 me-auto">
        <strong>Nome:</strong> ${item.data().nome} <br>
        <strong>Data:</strong> ${item.data().data} <br>
        <strong>Status:</strong> ${item.data().status} <br>
        </div>
        <div class="d-flex gap-2 justify-content-end">
        <button type="button" class="btn btn-danger" id="${item.id}">Excluir</button>
        <button type="button" class="btn btn-info" id="${item.id}">Alterar</button>
        </div>
    </li>
  `
  document.querySelectorAll(".btn-danger").forEach((elemento)=>{
    elemento.addEventListener("click",(evento)=>{
      console.log(evento.target.id)
      excluirTarefa(evento.target.id)
      //alert("Botão excluir acionado")
    })
  })
});

document.querySelectorAll(".btn-info").forEach((elemento)=>{
  elemento.addEventListener("click",()=>{
    if(formAtualizar.classList.contains("d-none")){
      formCadastrar.classList.replace("d-block", "d-none")
      formAtualizar.classList.replace("d-none", "d-block")
    }
  })
})

}

async function excluirTarefa(id){
  let resultado = confirm("Tem certeza que deseja excluir?")
  if(resultado){
    await deleteDoc(doc(db, "tarefa", id));
    alert("Tarefa excluida com sucesso")
    
    consultarTarefa() // recarregar os dados após excluir
  }
}
btnTarefa.addEventListener("click", (evento)=>{
    evento.preventDefault()
    console.log(nome.value, data.value, status.value)
    inserirTarefa()
    consultarTarefa()
})    



consultarTarefa()