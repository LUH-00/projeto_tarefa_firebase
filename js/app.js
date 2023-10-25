import { app, db } from "./config-firebase.js"
import { doc, setDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"

let nome = document.querySelector("#tarefa")
let data = document.querySelector("#data")
let status = document.querySelector("#status")
let btnTarefa = document.querySelector("#btnTarefa")

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

btnTarefa.addEventListener("click", (evento)=>{
    evento.preventDefault()
    console.log(nome.value, data.value, status.value)
    inserirTarefa()
})    