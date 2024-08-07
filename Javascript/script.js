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
let select = document.querySelector(".select")
let bellopen = document.querySelector(".bellopen")
let bellclose = document.querySelector(".bellclose")
let tap_main = document.querySelector(".tap_main")
let tap_main2 = document.querySelector(".tap_main2")
let tap = document.querySelector(".tap")
let slide_left = document.querySelector(".slide_left")
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
let navbar = document.querySelector('.navbar')
let select_close = document.querySelector('.select_close')

select.style.display = "none"
select_close.style.display = "none"
redinfo_main.style.display = "none"
redtrailer.style.display = "none"
let genre_id = [];



// WINDOW BACK BUTTON
window.onpopstate = function (event) {

    tap_main.style.transition = "all 1s ease";
    tap_main.style.transform = "translateX(100%)";

    if (select.style.display = 'block') {
        bellopen.style.display = "block"
        bellclose.style.display = "none"
        select.style.transition = "all .5s ease"
        select.style.transform = "translateX(-100%)"
    }

    redtrailer.style.display = 'none'
    navbar.style.display = 'flex'
    main_body.style.pointerEvents = "all"
}








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


// FETCHING MOVIES IMAGES AND ADDING TO WEBPAGE------------------------------------------
const category_movies = async (name, id) => {
    let movies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=7fad363f58889077cd601fe2d0ed4fb7&with_genres=${id}`)
    movies = await movies.json()
    let arr1 = movies.results


    let path = arr1.map(element => {
        return (`<div>
            <div id="${element.original_title}">
               <img loading="lazy" class="movie_img" data-name='${element.original_title}' data-imdb=${element.vote_average} data-date=${element.release_date} data-poster=${element.backdrop_path} data-description='${element.overview}' data-language=${element.original_language} title='${element.title}' onclick="handleInfoLetter(this)" src=https://image.tmdb.org/t/p/w500${element.poster_path} alt="${element.original_title}" srcset="">
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


    movie_name.innerHTML = hero[num].title;
    header_trailer_name = hero[num].title;
    movie_description.innerHTML = hero[num].overview;
    console.log(hero)

    header_box2.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${hero[num].backdrop_path}">`

    image_url = `<img src="https://image.tmdb.org/t/p/w500${hero[num].backdrop_path}">`;


}

const pause_func = () => {
    pausebtn.style.display = "none"
    playbtn.style.display = "inline-block"
    header_box2.innerHTML = ``
    header_box2.innerHTML = image_url;
}

const header_trailer = async () => {
    pausebtn.style.display = "block"
    playbtn.style.display = "none"
    let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${header_trailer_name}&key=AIzaSyAOOFrJ8QNGrnbJPyRytE6qlOqUXaz1XrM`);
    response = await response.json()
    let videoID = response.items[0].id.videoId
    header_box2.innerHTML = `<iframe class="header_video_trailer" width="100%" height="80%"src="https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1" allowfullscreen></iframe>`
    // header_box2.innerHTML = `<iframe width="100%" height="80%" src="https://www.youtube.com/embed/rp1aU3SileM?si=i5pJvSevhcyI-Bma" ></iframe>`
}



window.addEventListener("load", () => {
    movie_trailer.style.display = "none"
    first_fetch();
    hero_section()
})


const handleRoute = (a) => {
    history.back()
    let obj = { 'id': a.dataset.id, 'name': a.innerText }
    obj = JSON.stringify(obj)
    localStorage.setItem('route', obj)
}

const anchorRoute = (b) => {
    let obj = { 'id': b.dataset.id, 'name': b.dataset.name }
    obj = JSON.stringify(obj)
    localStorage.setItem('route', obj)
}


// ADDING NAME TO TAP SLIDE AND SHOW LEFT
const Movies_ID = async (category) => {
    category.forEach((e) => {
        let name12 = e.name.toLowerCase()
        tap.innerHTML += `<a href="action.html"><div data-id="${e.id}" onclick="handleRoute(this)" class="tap_links">${e.name}</div></a>`
    })
    category.forEach(async (e) => {
        let movies = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7fad363f58889077cd601fe2d0ed4fb7&with_genres=${e.id}`)
        movies = await movies.json()
        let arr1 = movies.results

        let movies_names = arr1.map((e) => {
            return `<p id="${e.original_title}"><span onclick="handleBellClose(this)">${e.title}</span></p>`
        }).join(" ")
        select.innerHTML += `
        <div class="select_each">
          <div>${e.name}</div>
          <div>${movies_names}</div>
        </div>`;


    })
}

bellclose.style.display = "none"
const handleBellOpen = () => {
    navbar.style.display = 'none'
    bellopen.style.display = "none"
    bellclose.style.display = "block"
    select_close.style.display = "flex"
    select.style.display = "block"
    select.style.transition = "all .5s ease"
    select.style.transform = "translateX(0%)"
}

const handleBellClose = (a) => {
    navbar.style.display = 'flex'
    bellclose.style.display = "none"
    select_close.style.display = "none"
    bellopen.style.display = "block"
    select.style.transition = "all .5s ease"
    select.style.transform = "translateX(-100%)"
    setTimeout(() => {
        select.style.display = "none"
    }, 1000);
    console.log(a.parentElement.id)
    let element = document.getElementById(`${a.parentElement.id}`)
    element.scrollIntoView({ block: "center" });
    element.style.transition = "all 2s ease";
    element.style.scale = '1.1';
    setTimeout(() => {
        element.styltransition = "all 2s ease";
        element.style.scale = '1';
    }, 2000);
    setTimeout(() => {
        element.styltransition = "all 2s ease";
        element.style.scale = '1.1';
    }, 4000);
    setTimeout(() => {
        element.styltransition = "all 2s ease";
        element.style.scale = '1';
    }, 6000);

}

const handleCatch = () => {
    tap_main.style.transition = "all 1s ease";
    tap_main.style.transform = "translateX(0%)";
    window.history.pushState({ id: 1 }, "", "")
}

let redinfo_moviename = "";

const handleInfoPlay = async (a) => {

    let moviename = a.parentElement.parentElement.firstElementChild.innerText
    redinfo.style.display = 'none'
    redtrailer.style.display = 'flex'
    main_body.style.pointerEvents = "none"

    let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${moviename}&key=AIzaSyAOOFrJ8QNGrnbJPyRytE6qlOqUXaz1XrM`);
    response = await response.json()

    let videoID = response.items[0].id.videoId

    redtrailer.innerHTML = `<iframe class="header_video_trailer info_video_trailer" width="100%" height="80%" src="https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1&rel=0&showinfo=0" allowfullscreen></iframe><button onclick="handleVideo()">Close</button>`

    // redtrailer.innerHTML = `<iframe width="100%" height="80%" src="https://www.youtube.com/embed/rp1aU3SileM?si=i5pJvSevhcyI-Bma" ></iframe><button onclick="handleVideo()">Close</button>`

}
const handleVideo = () => {
    redtrailer.innerHTML = ''
    redtrailer.style.display = 'none'
    navbar.style.display = 'flex'
    main_body.style.pointerEvents = "all"
    history.back()
}
const handleInfoClose = () => {
    redinfo.style.display = 'none'
    navbar.style.display = 'flex'
    main_body.style.pointerEvents = "all"
    history.back()
}

const handleInfoLetter = async (a) => {

    main_body.style.pointerEvents = "none"
    redinfo.style.display = 'flex'
    navbar.style.display = 'none'
    redinfo_main.style.display = "flex"
    window.history.pushState({ id: 1 }, "", "")

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
    <div class="video_shadow"><h1>ARYA</h1></div>
</div>`
header.append(div)



window.onscroll = function (e) {
    if (window.scrollY > 5) {
        navbar.style.width = '100vw'
        navbar.style.backgroundColor = 'black'
    }
    else {
        navbar.style.backgroundColor = 'transparent'
    }
};




const handlegif = () => {
    let gif = document.querySelector(".gif")
    gif.className = 'largegif'
    setTimeout(() => {
        gif.className = 'gif'
    }, 2000);
}
if (screen.width < 550) {
    let div1 = document.createElement('div')
    div1.innerHTML = `<img onclick="handlegif()" src="Images/movie2.gif" alt="" srcset="">`
    div1.className = 'gif'
    document.body.append(div1)
}

tap_main.addEventListener('click', () => {
    tap_main.style.transition = "all 1s ease";
    tap_main.style.transform = "translateX(100%)";
    history.back()
})