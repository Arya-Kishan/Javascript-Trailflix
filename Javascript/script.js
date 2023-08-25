let main_category = document.querySelector(".main_category")
let category = document.querySelector(".category")
let category_heading = document.querySelector(".category_heading")
let movie_name = document.querySelector(".movie_name")
let movie_description = document.querySelector(".movie_description")
let header_box2 = document.querySelector(".header--box2")
let header = document.querySelector(".header")
let movie_trailer = document.querySelector(".movie_trailer")
let main_body = document.querySelector(".main_body")
let playbtn = document.querySelector(".playbtn")
let pausebtn = document.querySelector(".pausebtn")
let info_btn = document.querySelector(".info_btn")
let error_pop = document.querySelector(".error_pop")
let movie_info = document.querySelector(".movie_info")
let gif = document.querySelector(".gif")
let gif_span = document.querySelector(".gif_span")
let select = document.querySelector(".select")
let bellopen = document.querySelector(".bellopen")
let bellclose = document.querySelector(".bellclose")
let tap_main = document.querySelector(".tap_main")
let tap = document.querySelector(".tap")
let slide_left = document.querySelector(".slide_left")
let gif_select_heading = document.querySelector(".gif_select_heading")
let redinfo_main = document.querySelector(".redinfo_main")
let redinfo = document.querySelector(".redinfo")
let redinfo_name = document.querySelector(".redinfo_name")
let redinfo_date = document.querySelector(".redinfo_date")
let redinfo_description = document.querySelector(".redinfo_description")
let redinfo_imdb = document.querySelector(".redinfo_imdb")
let redinfo_originaltitle = document.querySelector(".redinfo_originaltitle")
let redtrailer_main = document.querySelector(".redtrailer_main")
let redtrailer = document.querySelector(".redtrailer")
let redinfo_language = document.querySelector(".redinfo_language")
let redinfo_img = document.querySelector(".redinfo_img")
let movie_img = document.querySelectorAll(".movie_img")

select.style.display = "none"
redinfo_main.style.display = "none"
redtrailer.style.display = "none"
let genre_id = [];

// FETCHING THE INITIAL DATA---------------------------------------
const first_fetch = async () => {
    let category = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=7fad363f58889077cd601fe2d0ed4fb7")
    category = await category.json()
    category = (category.genres)
    category.forEach(element => {
        category_movies(element.name, element.id)
        genre_id.push({ name: element.name, id: element.id })
    });
    Movies_ID(genre_id)
}

const hide_trailer = () => {
    movie_trailer.innerHTML = ""
    movie_trailer.style.display = "none"
    main_body.style.filter = "blur(0)"
}

const enlarge = (ab) => {
    let div_trailer = ab.parentElement.parentElement
    div_trailer.className = "trailer_enlarge"
    main_body.style.filter = "blur(10px)"
    ab.style.display = "none"
}


// FETCHING MOVIES IMAGES AND ADDING TO WEBPAGE------------------------------------------
const category_movies = async (name, id) => {
    let movies = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7fad363f58889077cd601fe2d0ed4fb7&with_genres=${id}`)
    movies = await movies.json()
    let arr1 = movies.results

    let path = arr1.map(element => {
        return (`<div class="movie_token">
            <div id="${element.original_title}">
               <img class="movie_img" data-name='${element.original_title}' data-imdb=${element.vote_average} data-date=${element.release_date} data-poster=${element.backdrop_path} data-description='${element.overview}' data-language=${element.original_language} title='${element.title}' onclick="handleInfoLetter(this)" src=https://image.tmdb.org/t/p/w500${element.poster_path} alt="${element.original_title}" srcset="">
            </div>
         </div>`)
    }).join(" ");

    main_category.innerHTML += ` <div class="category_headingdiv"><h2 class="category_heading">${name}</h2><span>More</span></div>
    <div class="category">
        ${path}
    </div>`

}
// --------------------------------------HEADER SECTION ----------------------------------

let header_trailer_name = "";
let image_url = "";
let language = "";
let title = "";
let imdb = "";
let title_movie = "";
let released_date = "";
let overview = "";

const hero_section = async () => {

    let hero = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=7fad363f58889077cd601fe2d0ed4fb7")
    hero = await hero.json()
    hero = hero.results

    let num = Math.floor(Math.random() * hero.length)

    language = hero[num].original_language;
    title = hero[num].original_title;
    imdb = hero[num].vote_average
    title_movie = hero[num].title
    released_date = hero[num].release_date
    overview = hero[num].overview

    movie_name.innerHTML = hero[num].original_title
    header_trailer_name = hero[num].original_title
    header_box2.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${hero[num].backdrop_path}">`

    movie_description.innerHTML = (hero[num].overview)

    image_url = `url(https://image.tmdb.org/t/p/w500${hero[num].backdrop_path})`;
}

const pause_func = () => {
    pausebtn.style.display = "none"
    playbtn.style.display = "inline-block"
    header_box2.innerHTML = ``
    header_box2.style.backgroundImage = image_url;
}

const header_trailer = async () => {
    pausebtn.style.display = "block"
    playbtn.style.display = "none"
    let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${header_trailer_name}&key=AIzaSyAOOFrJ8QNGrnbJPyRytE6qlOqUXaz1XrM`);
    response = await response.json()
    let videoID = response.items[0].id.videoId
    header_box2.innerHTML = `<iframe class="header_video_trailer" width="100%" height="80%"src="https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1"></iframe>`
}

const info_close = (this_obj) => {
    main_body.style.pointerEvents = "all"
    main_body.style.filter = "blur(0)"
    this_obj.parentElement.parentElement.parentElement.style.display = "none"
}
info_btn.addEventListener("click", () => {
    main_body.style.pointerEvents = "none"
    main_body.style.filter = "blur(20px)"
    movie_info.style.display = "block"
    movie_info.innerHTML = `<div class="info"><div class="info_heading">${title}</div>
    <div class="info_child1"><span>Language : ${language}</span><span>Title : ${title_movie}</span></div>
    <div>Description : \n ${overview}</div>
    <div class="info_child2"><span>IMDB : ${imdb}</span><span>Released Date : ${released_date}</span></div><div><button onclick="info_close(this)">CLOSE</button></div></div>`
})


window.addEventListener("load", () => {
    movie_trailer.style.display = "none"
    first_fetch();
    hero_section()

    setTimeout(() => {
        gif.style.transition = "all 2s ease-in"
        gif.style.left = "-100%"
    }, 5000);
    gif.style.transition = "all 3s ease-in"
    gif.style.bottom = "0"
})


const handleRoute = (id) => {
    localStorage.setItem('route', id)
}
// ADDING NAME TO TAP SLIDE AND SHOW LEFT
const Movies_ID = async (category) => {
    category.forEach((e) => {
        let name12 = e.name.toLowerCase()
        tap.innerHTML += `<a href="action.html"><div onclick="handleRoute(${e.id})" class="tap_links">${e.name}</div></a>`
    })
    category.forEach(async (e) => {
        let movies = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7fad363f58889077cd601fe2d0ed4fb7&with_genres=${e.id}`)
        movies = await movies.json()
        let arr1 = movies.results

        let movies_names = arr1.map((e) => {
            return `<a href="#${e.original_title}"><span onclick="handleBellClose()">${e.title}</span></a>`
        }).join(" ")
        select.innerHTML += `
        <div class="select_each">
          <div>${e.name}</div>
          <div>${movies_names}</div>
        </div>`;


    })
}
// href="#${e.original_title}"

// TO MAKE BELL
bellclose.style.display = "none"
const handleBellOpen = () => {
    bellopen.style.display = "none"
    bellclose.style.display = "block"
    select.style.display = "block"
    select.style.transition = "all .5s ease"
    select.style.transform = "translateX(0%)"
}
const handleBellClose = () => {
    bellclose.style.display = "none"
    bellopen.style.display = "block"
    select.style.transition = "all .5s ease"
    select.style.transform = "translateX(-100%)"
    setTimeout(() => {
        select.style.display = "none"
    }, 1000);

}

const handleCatch = () => {
    e.stopPropagation()
    if (tap_main.className == "tap_main") {
        tap_main.className = "tap_main2"
    } else {
        tap_main.className = "tap_main"
    }
}

const handleRedInfo = () => {
    redinfo_main.style.display = "none"
}

const handleVideo = () => {
    redtrailer.innerHTML = ""
    redtrailer.style.display = "none"
    main_body.style.filter = "blur(0)"
}

let redinfo_moviename = "";

const handleRedPlay = async () => {


    redtrailer.style.display = "block"
    redinfo_main.style.display = "none"
    main_body.style.filter = "blur(4px)"

    let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${redinfo_moviename}&key=AIzaSyAOOFrJ8QNGrnbJPyRytE6qlOqUXaz1XrM`);
    response = await response.json()

    let videoID = response.items[0].id.videoId

    redtrailer.innerHTML = `<div><iframe class="header_video_trailer" width="560" height="315"src="https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1&rel=0&showinfo=0"></iframe></div><div><button onclick="handleVideo(this)">Close</button></div>`
}

const handleInfoLetter = (a) => {
    redinfo_main.style.display = "block"
    redinfo_name.innerHTML = (a.dataset.name)
    redinfo_imdb.innerHTML = (a.dataset.imdb)
    redinfo_description.innerHTML = (a.dataset.description)
    redinfo_originaltitle.innerHTML = (a.title)
    redinfo_language.innerHTML = (a.dataset.language)
    redinfo_date.innerHTML = (a.dataset.date)
    redinfo_img.innerHTML = `<img src=https://image.tmdb.org/t/p/w500${a.dataset.poster} alt="">`
    redinfo_moviename = a.dataset.name
}


let div = document.createElement('div')
div.innerHTML = `<div class="header_video">
    <video loop muted autoplay="autoplay">
        <source src="./Images/video.mp4">
    </video>
    <div class="video_shadow"><h1>MOVIE TRAILER</h1></div>
</div>`
header.append(div)

if (screen.width < 1200) {
    header
}



let nav = document.querySelector(".navbar")
window.onscroll = function (e) {
    if (window.scrollY > 250) {
        nav.style.visibility = "hidden"
    }
    else{
        nav.style.visibility = "visible"

    }
};


tap.addEventListener("click",(e)=>{
    if (tap_main.className == "tap_main") {
        tap_main.className = "tap_main2"
    } else {
        tap_main.className = "tap_main"
    }
})

select.addEventListener("click",(e)=>{
    bellclose.style.display = "none"
    bellopen.style.display = "block"
    select.style.transition = "all .5s ease"
    select.style.transform = "translateX(-100%)"
})