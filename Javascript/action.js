let ul = document.querySelector(".ul")
let more = document.querySelector(".more")
let less = document.querySelector(".less")
let boxes = document.querySelector(".action_boxes")
let box = document.querySelectorAll(".action_box")
let info_main = document.querySelector(".info_main")
let info = document.querySelector(".info")
let info_name = document.querySelector(".info_name")
let info_date = document.querySelector(".info_date")
let info_description = document.querySelector(".info_description")
let info_imdb = document.querySelector(".info_imdb")
let info_originaltitle = document.querySelector(".info_originaltitle")
let info_language = document.querySelector(".info_language")
let info_img = document.querySelector(".info_img")
let trailer_main = document.querySelector(".trailer_main")
let trailer = document.querySelector(".trailer")
let bellclose = document.querySelector(".bellclose")
let bellopen = document.querySelector(".bellopen")
let heading = document.querySelector(".heading")
let profile = document.querySelectorAll(".profile")
let movie_namelist = ""
const handleRoute = (id)=>{
    localStorage.setItem('route',id)
}
let route_id = localStorage.getItem('route')
route_id = JSON.parse(route_id)
heading.innerHTML = route_id.name.toUpperCase()
const fetch_movies = async () => {
    trailer_main.style.display = "none"
    info_main.style.display = "none"
    less.style.display = "none"
    bellclose.style.display = "none"

    let response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7fad363f58889077cd601fe2d0ed4fb7&with_genres=${route_id.id}`)
    response = await response.json()
    movie_namelist = response.results;
    let names = response.results.map((e) => {
        return `<div class="action_box" id="${e.original_title}">
        <div class="template">
        <div>
            <img onclick="handleImageClick()" src=https://image.tmdb.org/t/p/w500${e.poster_path} alt="${e.original_title}" srcset="">
        </div>
        <div>${e.original_title}</div>
        <div>
        <button name='${e.original_title}' data-imdb=${e.vote_average} data-date=${e.release_date} data-poster=${e.backdrop_path} data-description='${e.overview}' data-language=${e.original_language} title='${e.title}' onclick="handleMore(this)" class="action_box_btn">More</button>
        </div>
        </div>
        </div>`
    })
    names = names.join(" ")

    boxes.innerHTML += names;
}

fetch_movies()

// ADDING INFO---------------------------------------------------
let movie_name = ""
const handleMore = (e) => {
    info_main.style.display = "block"
    info_name.innerHTML = (e.name)
    info_imdb.innerHTML = (e.dataset.imdb)
    info_description.innerHTML = (e.dataset.description)
    info_originaltitle.innerHTML = (e.title)
    info_language.innerHTML = (e.dataset.language)
    info_date.innerHTML = (e.dataset.date)
    info_img.innerHTML = `<img src=https://image.tmdb.org/t/p/w500${e.dataset.poster} alt="">`
    movie_name = e.name
}

const handleInfo = () => {
    info_main.style.display = "none"
}


// ADDING YOUTUBE TRAILER--------------------------------------------------------

const handleVideo = (e) => {
    e.parentElement.parentElement.innerHTML = ""
    trailer_main.style.display = "none"
}

const handlePlay = async () => {
    info_main.style.display = "none"
    trailer_main.style.display = "block"

    let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movie_name}&key=AIzaSyAOOFrJ8QNGrnbJPyRytE6qlOqUXaz1XrM`);
    response = await response.json()

    let videoID = response.items[0].id.videoId
    trailer.innerHTML = `<div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/rp1aU3SileM" autoplay></iframe>
    </div>
    <div>
       <button onclick="handleVideo(this)">Close</button>
    </div>`

    // <iframe class="header_video_trailer" width="100%" height="80%"src="https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1"></iframe> 
}

const handleBell = (a) => {
    ul.style.display = 'none'
    less.style.display = 'none'
    more.style.display = 'block'
    bellopen.style.display = "none"
    bellclose.style.display = "block"
    let list = movie_namelist.map((e, i) => {
        return `<div><span>${i + 1}</span>.<a href="#${e.original_title}"><span>${e.original_title}</span></a></div>`
    })
    let div = document.createElement('div')
    div.className = "bell"
    div.innerHTML = `<div><h2>LIST OF MOVIES</h2></div><div class="bell_list">${list.join(" ")}</div>`
    document.body.append(div)

}
const handleBellClose = (a) => {
    bellclose.style.display = "none"
    bellopen.style.display = "block"
    let div_bell = document.querySelectorAll(".bell")
    div_bell.forEach((e) => {
        e.style.transition = "all .4s ease"
        e.style.transform = "translateX(-100%)"
        setTimeout(() => {
            e.style.display = "none"
        }, 1000);
    })

}

const handleMoreCategory = () => {
    ul.style.display = "block"
    more.style.display = "none"
    less.style.display = "block"
}
const handleLessCategory = () => {
    ul.style.display = "none"
    less.style.display = "none"
    more.style.display = "block"
}

if (screen.width < 550) {
    ul.style.display = "none"
} else {
    ul.style.display = "block"
}


// --------------PROFILE--------
profile.forEach((e) => {
    e.addEventListener("click", () => {
        window.location.href = 'form.html';
    })
})
