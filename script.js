// ------------------------Navigation Menu--------------------------------
let titleDiv = document.createElement("div")
titleDiv.setAttribute("class", "title")
let title = document.createElement("h1")
title.innerHTML = "The New York Times"
titleDiv.append(title)


let navbar = document.createElement("nav")
navbar.setAttribute("class", "navbar navbar-expand-lg navbar-light bg-light")


let toggleBtn = document.createElement("button")
toggleBtn.setAttribute("class", "navbar-toggler")
toggleBtn.setAttribute("type", "button")
toggleBtn.setAttribute("data-toggle", "collapse")
toggleBtn.setAttribute("data-target", "#navbarSupportedContent")
toggleBtn.setAttribute("aria-controls", "navbarCollapse")
toggleBtn.setAttribute("aria-expanded", "false")
toggleBtn.setAttribute("aria-label", "Toggle navigation")
let toggleBtnSpan = document.createElement("span");
toggleBtnSpan.setAttribute("class", "navbar-toggler-icon");
toggleBtn.appendChild(toggleBtnSpan);

let divNav = document.createElement("div")
divNav.setAttribute("class", "collapse navbar-collapse")
divNav.setAttribute("id", "navbarSupportedContent")

let ul1 = document.createElement("ul")
ul1.setAttribute("class", "navbar-nav mr-auto")

let home = createNavItems("Home")
let world = createNavItems("World")
let politics = createNavItems("Politics")
let magazine = createNavItems("Magazine")
let technology = createNavItems("Technology")
let science = createNavItems("Science")
let health = createNavItems("Health")
let fashion = createNavItems("Fashion")
let sports = createNavItems("Sports")
let arts = createNavItems("Arts")
let food = createNavItems("Food")
let travel = createNavItems("Travel")

let row1 = document.createElement("div")
row1.setAttribute("class", "row")

document.body.append(titleDiv, navbar, row1)
navbar.append(toggleBtn, divNav)
divNav.append(ul1)
ul1.append(home, world, politics, magazine, technology, science, health, fashion, sports, arts, food, travel)

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

onLoad()

async function onLoad() {
  let response = await fetch("https://api.nytimes.com/svc/topstories/v2/" + "home" + ".json?api-key=ncuRC4fGtMKijAG7vvJSTdN8hwPLNiZO")
  let data
  if (response.ok) {
    data = await response.json()
  } else {
    console.log("HTTP-Error: " + response.status);
    return
  }
  console.log(data)
  let newsData = data.results
  for (let i = 0; i < newsData.length; i++) {
    createCards(newsData[i], "Home")
  }
}


function createNavItems(name) {
  let li1 = document.createElement("li")
  li1.setAttribute("class", "nav-item active")
  let a = document.createElement("a")
  a.setAttribute("class", "nav-link")
  a.innerHTML = name
  a.style.cursor = "pointer"
  a.onclick = async function() {
    const remove = await removeCards()
    const domain = name.charAt(0).toLowerCase() + name.slice(1)
    let response = await fetch("https://api.nytimes.com/svc/topstories/v2/" + domain + ".json?api-key=ncuRC4fGtMKijAG7vvJSTdN8hwPLNiZO")
    let data
    if (response.ok) {
      data = await response.json()
    } else {
      console.log("HTTP-Error: " + response.status);
      return
    }

    console.log(data.results)
    let newsData = data.results


    for (let i = 0; i < newsData.length; i++) {
      createCards(newsData[i], name)
    }

  }
  li1.append(a)
  li1.setAttribute("id", name)

  return li1
}

async function removeCards() {
  row1.innerHTML = ""
}

async function createCards(newsData, name) {

  let card = document.createElement("div")
  card.setAttribute("class", "col-sm-12 col-md-12 col-lg-5 card")

  let row = document.createElement("div")
  row.setAttribute("class", "row no-gutters")

  let dataDiv = document.createElement("div")
  dataDiv.setAttribute("class", "col-md-8")
  let cardBody = document.createElement("div")
  cardBody.setAttribute("class", "card-body")
  let cardCateg = document.createElement("h5")
  cardCateg.innerHTML = name
  cardCateg.style.color = "#007bff"
  let cardTitle = document.createElement("h4")
  cardTitle.setAttribute("class", "card-title")
  cardTitle.innerHTML = newsData.title

  let date = document.createElement("h6")
  date.innerHTML = getDate(newsData.created_date)
  date.style.color = "grey"

  let cardAbstract = document.createElement("p")
  cardAbstract.setAttribute("class", "card-text")
  cardAbstract.innerHTML = newsData.abstract
  let continueReading = document.createElement("a")
  continueReading.setAttribute("class", "card-text")
  continueReading.innerHTML = "continue"
  continueReading.style.color = "#007bff"
  continueReading.href = newsData.url

  dataDiv.append(cardBody)
  cardBody.append(cardCateg, cardTitle, date, cardAbstract, continueReading)

  let imageDiv = document.createElement("div")
  imageDiv.setAttribute("class", "col-md-4")
  let image = document.createElement("img")
  image.setAttribute("class", "card-img img-thumbnail")
  if (newsData.multimedia.length > 0) {
    image.src = newsData.multimedia[0].url
  } else {
    image.src = 'dummy.jpg'
  }

  imageDiv.append(image)

  row1.append(card)
  card.append(row)
  row.append(dataDiv, imageDiv)
}

function getDate(dateString) {
  let currDate = new Date(dateString);
  let month = months[currDate.getMonth()];
  let date = currDate.getDate();
  let output = month + ' ' + date;
  return output;
}
