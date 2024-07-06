const getElement = (element) => document.querySelector(element);
const getMultipleElements = (element) => [...document.querySelectorAll(element)];

const form = getElement('.add-form');
const input = getElement('.todo-item');
const searchBtn = getElement('.btn');
const ul = getElement('.lists');
const alertParagraph = getElement('.alert');
const clearBtn = getElement('.clear-btn');
let element;
let editFlag = false;
let itemToEdit;
let editId 

const listItems = [];
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = input.value;
    const id = new Date().getTime();

    if (inputValue && !editFlag){

        const article = document.createElement('article');
        const li = document.createElement('li');
        const dataId = document.createAttribute('data-id');
        dataId.value = id;
        article.setAttributeNode(dataId);
        li.innerHTML = `
        <span class="span">
            <input type="checkbox" id="${id}">
            <label for="${id}"> 
                ${inputValue}
            </label>
        </span>
        <div class ="btns">
            <button class="edit-item">
                <i class = "fas fa-pen"> </i>
            </button>    
            <button class="remove-item">
                <i class="fa fa-times"></i>
            </button>
        </div>
            `;
            article.appendChild(li);
            ul.appendChild(article);
            alertUser("Item successfully added", "alert-success");
            
            listItems ? clearBtn.style.display = "block" : clearBtn.style.display = "none";
            listItems.push({
                id:id,
                value : inputValue
            });
        addToLocalStorage("todo", JSON.stringify(listItems));
        
        input.value = "";
        
        const editBtns = getMultipleElements('.edit-item');
        editBtns.map((editBtn) => {
            editBtn.addEventListener('click', editItem);
        });
        
        const removeBtns = getMultipleElements('.remove-item');
        removeBtns.map((removeBtn) => {
            removeBtn.addEventListener("click", clearItem);
        });
        const spans = getMultipleElements(".span");
        spans.forEach((span) => {
            span.addEventListener("click", () => {
                const radio = span.querySelector('input[type="checkbox"]');
                radio.checked ? span.classList.add("done") : span.classList.remove("done");
            });
        });
        searchBtn.innerText = "Add item";
    }
    
    else if (inputValue && editFlag){
        element.innerHTML = input.value;
        editLocalStorage("todo", editId, itemToEdit); 
        alertUser("Item editted successfully", "alert-success");
        
        searchBtn.innerHTML = "Add item";
        editFlag = false
        input.value = "";
    }

    else{
        alertUser("No element entered", "alert-danger");
    }
    
})

const alertUser = (text, className) => {
    alertParagraph.style.display ="block";
    alertParagraph.classList.add(className);
    alertParagraph.innerHTML = text;
    setTimeout(()=> { 
        alertParagraph.style.display ="none";
        alertParagraph.classList.remove(className);
    }, 1000)
}


const addToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}


const editItem = (e) => {
    element = e.target.parentElement.parentElement.previousElementSibling.firstElementChild.nextElementSibling;
    itemToEdit = e.target.parentElement.parentElement.previousElementSibling.innerText;
    editId = parseInt(e.target.parentElement.parentElement.parentElement.parentElement.dataset.id);
    
    input.value = itemToEdit
    searchBtn.innerText = "Edit item";
    editFlag = true;
} 

const clearItem = (e) => {
    element = e.target.parentElement.parentElement.parentElement.parentElement;
    itemToEdit = e.target.parentElement.parentElement.previousElementSibling.innerText;
    editId = parseInt(e.target.parentElement.parentElement.parentElement.parentElement.dataset.id);

    ul.removeChild(element);

    alertUser("Item removed from list", "alert-danger");
    removeFromLocalStorage(editId);
}

const editLocalStorage = (key, id, newElement) => {
    let currentStorage = JSON.parse(localStorage.getItem(key));
    let newCurrentStorage = currentStorage.map((item) => {
        if (item.id === id ){
            item.value = input.value;
        };
        return item;
    });
    currentStorage = JSON.stringify(currentStorage)
    
    addToLocalStorage(key, currentStorage);
    
}

const getLocalStorage = (key) => localStorage.getItem(key)? JSON.parse(localStorage.getItem(key)) : [];

const showItem = () => {
    let items= getLocalStorage("todo");
    console.log(items.length);
    if (items.length > 0){
        items.map((item) => {
            const {id, value} = item;
            const article = document.createElement('article');
            const li = document.createElement('li');
            const dataId = document.createAttribute('data-id');
            dataId.value = id;
            article.setAttributeNode(dataId);
            li.innerHTML = `
            <span class ="span">
                <input type="checkbox" id="${id}">
                <label for="${id}"> 
                ${value}
                </label>
            </span>
            <div class ="btns">
                <button class="edit-item">
                    <i class = "fas fa-pen"> </i>
                </button>    
                <button class="remove-item">
                    <i class="fa fa-times"></i>
                </button>
            </div>
                `;
                article.appendChild(li);
                ul.appendChild(article);
            });
        const editBtns = getMultipleElements('.edit-item');
            editBtns.map((editBtn) => {
                editBtn.addEventListener('click', editItem);
        });
        const removeBtns = getMultipleElements('.remove-item');
            removeBtns.map((removeBtn) => {
                removeBtn.addEventListener("click", clearItem);
        });

        const spans = getMultipleElements(".span");
        spans.forEach((span) => {
            span.addEventListener("click", () => {
                const radio = span.querySelector('input[type="checkbox"]');
                radio.checked ? span.classList.add("done") : span.classList.remove("done");
            });
        })
        }
        else{
            clearBtn.style.display = "none";
        }
    }
    
addEventListener("DOMContentLoaded", showItem);

const removeFromLocalStorage = (id) => {
    let items = getLocalStorage("todo");
    const newList = items.filter((item) => item.id !== id);
    addToLocalStorage("todo", JSON.stringify(newList));
}

clearBtn.addEventListener("click", () => {
    ul.innerHTML = "";
    localStorage.clear();
    clearBtn.style.display = "none";
    alertUser("List cleared", "alert-success");
})