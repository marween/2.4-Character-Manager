
// import some polyfill to ensure everything works OK
import "babel-polyfill"

// import bootstrap's javascript part
import 'bootstrap';

// import the style
import "./style.scss";

import axios from 'axios';

var url = "https://character-database.becode.xyz/characters";
let array;

const getCharacter = async () =>{
   let response = await axios.get(url);
   // je recupere response data et le stock dans un tableau
   
   array = response.data;
   for (let i=0 ; i<response.data.length; i++){

      // afficher la liste des characters
      let article = document.createElement("article");

      let characterName = document.createElement("h2");
      
      characterName.textContent = response.data[i].name;

      let characterDescrib = document.createElement("p");
      characterDescrib.textContent = response.data[i].shortDescription;

      let img = document.createElement("img");
      img.setAttribute("src","data:image/jpeg;base64," + response.data[i].image);

      article.appendChild(characterName);
      article.appendChild(characterDescrib);
      article.appendChild(img);

      document.querySelector(".character").appendChild(article);

      // afficher le bouton description  
      let button = document.createElement("button");
      button.setAttribute("class", "btn btn-primary");
        // id veut du texte avec !!!
        button.setAttribute("id", "idDisplay"+i);
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#Modal");
        button.innerText = "description";
        article.appendChild(button);

      // function listerner 
      document.querySelector("#idDisplay"+i).addEventListener("click", () =>{
         // i de la boucle for (pour la position dans le tableau)
         //vu que le data est stocké dans le array, 
         //la position des objet est la meme 
         // i = argument de ma fct display 
         display(i);
      });

      // afficher le bouton delete  
      let deleteBtn = document.createElement("button");
      button.setAttribute("class", "btn btn-primary");
      
      deleteBtn.setAttribute("id", "idDelete"+i);
      deleteBtn.setAttribute("class", "btn btn-primary");
      deleteBtn.setAttribute("data-toggle", "modal");
      deleteBtn.setAttribute("data-target", "#Modal");
      deleteBtn.innerText = "delete";
      article.appendChild(deleteBtn);

      document.querySelector("#idDelete"+i).addEventListener("click", () =>{ 
         del(i);
      });

      // afficher le bouton edit  
      let editBtn = document.createElement("button");
      button.setAttribute("class", "btn btn-primary");
      
      editBtn.setAttribute("id", "idEdit"+i);
      editBtn.setAttribute("class", "btn btn-primary");
      editBtn.setAttribute("data-toggle", "modal");
      editBtn.setAttribute("data-target", "#Modal");
      editBtn.innerText = "edit";
      article.appendChild(editBtn);

      document.querySelector("#idEdit"+i).addEventListener("click", () =>{ 
         edit(i);
      });



      
   };//end of for

    // afficher le bouton add  
    // en dehors du for puisque le bouton n'apparait qu'une fois 
    let addBtn = document.createElement("button");
    addBtn.setAttribute("class", "btn btn-primary");
    addBtn.setAttribute("id", "addButton");
    addBtn.setAttribute("data-toggle", "modal");
    addBtn.setAttribute("data-target", "#Modal");
    addBtn.innerText = "add";
    document.querySelector('#buttonHolder').appendChild(addBtn);

    document.querySelector("#addButton").addEventListener("click", () =>{ 
      add();
   });


}; //end of function

getCharacter();


function edit(index){
   let edit = `<div class="modal-dialog" role="document">
   <div class="modal-content">
   <div class="modal-header">
   <h5 class="modal-title" id="exampleModalLabel">`+array[index].name+`</h5>
   <button type="button" class="close" data-dismiss="modal" aria-label="Close">
   <span aria-hidden="true">&times;</span>
   </button>
   </div>
   <div class="modal-body">
   <p>title: <input id="title" type="text" name="texte" placeholder ="title" value = `+array[index].name+`></p>
   <p>shortDescription: <textarea id="text"placeholder ="short description" value = `+array[index].shortDescription+`></textarea></p>
   <p>Description: <textarea id="longtext" placeholder="long description" value = `+array[index].description+`></textarea></p>
   <p>image: <input id="file" type="file" name="texte"></p>
   </div>
   <div class="modal-footer">
   <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
   <button type="button" id='confirm' class="btn btn-primary">Add</button>
   </div>
   </div>
   </div>
   </div>`

   document.querySelector(".modal").innerHTML = edit;
   document.querySelector('#confirm').addEventListener ("click", async ()=> {

      let title = document.querySelector("#title").value;
      let shortDescription = document.querySelector("#text").value;
      let description = document.querySelector("#longtext").value;
      
      await axios.put(url+'/'+array[index].id, {
        name:title , 
        shortDescription:shortDescription, 
        description:description
           // +1 c'est pour ne pas prendre la , sinon il écrira ',Kl/64...'
           //image: result.slice(virgule + 1)
        });
      

      window.location.reload();
   });
};


function display(id){
   let display = `<div class="modal-dialog" role="document">
   <div class="modal-content">
   <div class="modal-header">
   <h5 class="modal-title" id="exampleModalLabel">`+array[id].name+`</h5>
   <button type="button" class="close" data-dismiss="modal" aria-label="Close">
   <span aria-hidden="true">&times;</span>
   </button>
   </div>
   <div class="modal-body">
   <p> `+array[id].description+`</p></div>
   <div class="modal-footer">
   <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

   </div>
   </div>
   </div>
   </div>`

   document.querySelector(".modal").innerHTML = display;

};
function del(index){
   let del = `<div class="modal-dialog" role="document">
   <div class="modal-content">
   <div class="modal-header">
   <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
   <button type="button" class="close" data-dismiss="modal" aria-label="Close">
   <span aria-hidden="true">&times;</span>
   </button>
   </div>
   <div class="modal-body">Are you sure?</div>
   <div class="modal-footer">
   <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
   <button type="button" id='confirm' class="btn btn-primary">yes</button>
   </div>
   </div>
   </div>
   </div>`

   document.querySelector(".modal").innerHTML = del;
   document.querySelector('#confirm').addEventListener ("click", async ()=> {
      await axios.delete(url +'/'+array[index].id);
      window.location.reload();
   });
};


function add(){ 
   let add = `<div class="modal-dialog" role="document">
   <div class="modal-content">
   <div class="modal-header">
   <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
   <button type="button" class="close" data-dismiss="modal" aria-label="Close">
   <span aria-hidden="true">&times;</span>
   </button>
   </div>
   <div class="modal-body">
   <p>title: <input id="title" type="text" name="texte" placeholder ="title"></p>
   <p>shortDescription: <textarea id="text"placeholder ="short description"></textarea></p>
   <p>Description: <textarea id="longtext" placeholder="long description"></textarea></p>
   <p>image: <input id="file" type="file" name="texte"></p>
   </div>
   <div class="modal-footer">
   <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
   <button type="button" id='confirm' class="btn btn-primary">Add</button>
   </div>
   </div>
   </div>
   </div>`

   document.querySelector(".modal").innerHTML = add;
   document.querySelector('#confirm').addEventListener ("click", async ()=> {

      let title = document.querySelector("#title").value;
      let shortDescription = document.querySelector("#text").value;
      let description = document.querySelector("#longtext").value;

      let file = document.querySelector("#file").files[0];
      let fileReader = new FileReader();
      fileReader.addEventListener('load', async(event)=> {
         let result = event.target.result;
         let virgule = result.indexOf(',');
         

         await axios.post(url, {
           name:title , 
           shortDescription:shortDescription, 
           description:description,
           // +1 c'est pour ne pas prendre la , sinon il écrira ',Kl/64...'
           image: result.slice(virgule + 1)
        });
         window.location.reload();

      })
      fileReader.readAsDataURL(file);

   });
};


console.log("Hey look in your browser console. It works!");