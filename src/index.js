

const menu = document.querySelector("#ramen-menu")
const detail = document.querySelector("#ramen-detail")
const ratingForm = document.querySelector("#ramen-rating")
const ramenImage = document.querySelector(".detail-image")
const ramenName = document.querySelector(".name")
const ramenRestaurant = document.querySelector(".restaurant")
const ramenRating = document.querySelector("#rating")
const newRamenForm = document.querySelector("#new-ramen")
const ramenComment = document.querySelector("#comment")
const deleteButton = document.querySelector("#delete")

const ramenUrl = "http://localhost:3000/ramens"

fetch(ramenUrl)
.then(response => response.json())
.then(ramenData => ramenData.forEach(dish => makeMenuItem(dish)))

function makeMenuItem(dish){
    let dishImage = document.createElement("img")
    dishImage.src = dish.image
    dishImage.alt = dish.name
    dishImage.dataset.id = dish.id
    dishImage.className = "dish"
    menu.append(dishImage)
}

function fetchItem(id = 1){
    // const itemId = event.target.dataset.id || 1
        fetch(ramenUrl + `/${id}`)
        .then(response => response.json())
        .then(dishData => showItem(dishData)) 
}

function showItem(dishData){
    detail.dataset.id = dishData.id
    ramenImage.src = dishData.image
    ramenImage.alt = dishData.name
    ramenName.textContent = dishData.name
    ramenRestaurant.textContent = dishData.restaurant 
    ramenRating.value = dishData.rating           
    ramenComment.value = dishData.comment
    ratingForm.dataset.id = dishData.id        
    deleteButton.dataset.id = dishData.id
}   

function patchItem(event){
    event.preventDefault()
    const newRating = event.target.rating.value
    const newComment = event.target.comment.value
    let configObject = {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({rating: newRating, comment: newComment})
    }
    fetch(ramenUrl + `/${event.target.dataset.id}`, configObject)
    // .then(response => response.json())
    // .then(dishData => showItem(dishData))
}

function postItem(event){
    event.preventDefault()
    let newRamen = {
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target.rating.value,
        comment: event.target[4].value
    }
    let configObject = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newRamen)
    }
    fetch(ramenUrl, configObject)
    .then(response => response.json())
    .then(newItem => createNewItem(newItem))
    event.target.reset()
}

function createNewItem(newItem){
    makeMenuItem(newItem)
    showItem(newItem)
}

function deleteItem(event){
    let itemId = event.target.dataset.id
    let nextId = itemId == 1 ? itemId +1 : itemId -1
    let configObject = {
        method: "DELETE"
    }
    // fetch(ramenUrl + `/${itemId}`, configObject)
    // .then(fetchItem(nextId))

    Array.from(menu.children).find(dish => dish.dataset.id == itemId).remove()
}



fetchItem()
menu.addEventListener("click", event => {
    if (event.target.className === "dish"){
        fetchItem(event.target.dataset.id)
    }
})

ratingForm.addEventListener("submit", patchItem)
newRamenForm.addEventListener("submit", postItem)
deleteButton.addEventListener("click", deleteItem)