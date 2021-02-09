

const menu = document.querySelector("#ramen-menu")
const detail = document.querySelector("#ramen-detail")
const ratingForm = document.querySelector("#ramen-rating")
const ramenImage = document.querySelector(".detail-image")
const ramenName = document.querySelector(".name")
const ramenRestaurant = document.querySelector(".restaurant")
const ramenRating = document.querySelector("#rating")
const ramenComment = document.querySelector("#comment")
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

function fetchItem(event){
    if (event.target.className === "dish"){
        fetch(ramenUrl + `/${event.target.dataset.id}`)
        .then(response => response.json())
        .then(dishData => showItem(dishData))
    }
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



menu.addEventListener("click", fetchItem)
ratingForm.addEventListener("submit", patchItem)