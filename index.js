let projectsJSON = [
    {    
        "description": "0",
        "previewURL": "tic-tac-toe.jpg",
        "sourceURL": "https://rolling-scopes-school.github.io/advoryan-JSFEPRESCHOOL/tic-tac-toe/",
    },
    {    
        "description": "1",
        "previewURL": "tic-tac-toe.jpg",
        "sourceURL": "https://rolling-scopes-school.github.io/advoryan-JSFEPRESCHOOL/tic-tac-toe/",
    },
    {    
        "description": "2",
        "previewURL": "tic-tac-toe.jpg",
        "sourceURL": "https://rolling-scopes-school.github.io/advoryan-JSFEPRESCHOOL/tic-tac-toe/",
    },
    {    
        "description": "3",
        "previewURL": "tic-tac-toe.jpg",
        "sourceURL": "https://rolling-scopes-school.github.io/advoryan-JSFEPRESCHOOL/tic-tac-toe/",
    },
]

const carousel = document.querySelector(".carousel");
const framesWrapper = carousel.querySelector(".carousel__frames-wrapper");
const slideLeftBtn = carousel.querySelector(".carousel__btn_slide-left");
const slideRightBtn = carousel.querySelector(".carousel__btn_slide-right");

const getShiftedSlidesArr = (direction) => {
    let arr = [
        0, 
        projectsJSON.length < 2 ? 0 : 1, 
        projectsJSON.length < 3 ? 0 : 2,
    ];
    return function(direction) {
        if (direction === "slide-left") {
            return (arr = arr.map( element => {
                return element === 0 ? element = projectsJSON.length - 1 : --element
            }))
        } else if (direction === "slide-right") {
            return (arr = arr.map( element => {
                return element === projectsJSON.length - 1 ? element = 0 : ++element
                }))
        } else {
            return arr
        }
    }
}
    
let shiftSlidesArr = getShiftedSlidesArr();
    
const createSlide = (slideNbr) => {
    let newFrame = document.createElement("div");
    newFrame.className = "carousel__frame";
    newFrame.innerHTML = projectsJSON[slideNbr].description;
    framesWrapper.append(newFrame);
}

//init: creates 3 slides if projectsJSON has at leat 1 item
shiftSlidesArr().forEach( slideNbr => {
    createSlide(slideNbr);
})

const slides = carousel.querySelectorAll(".carousel__frame");

const modifySlide = () => {
    for (let i = 0; i < slides.length; i++) {
        slides[i].innerHTML = shiftSlidesArr()[i];
    }
}

const modifyAllSlides = () => {
    shiftSlidesArr().forEach(slideNbr => {
        createSlide(slideNbr)
    });
}

const getPreviousSlide = () => {
    framesWrapper.classList.add("slide-left");
    shiftSlidesArr("slide-left");
}

const getNextSlide = () => {
    framesWrapper.classList.add("slide-right");
    shiftSlidesArr("slide-right");
}

slideLeftBtn.addEventListener('click', getPreviousSlide);
slideRightBtn.addEventListener('click', getNextSlide);

framesWrapper.addEventListener('animationstart', () => {
    slideLeftBtn.removeEventListener('click', getPreviousSlide);
    slideRightBtn.removeEventListener('click', getNextSlide);    
})

framesWrapper.addEventListener('animationend', () => {
    modifySlide();
    framesWrapper.classList.remove("slide-left");
    framesWrapper.classList.remove("slide-right");
    slideLeftBtn.addEventListener('click', getPreviousSlide);
    slideRightBtn.addEventListener('click', getNextSlide);
})