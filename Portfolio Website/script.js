// ============================= script.js =============================

/* ============================= typing animation ============================= */
var typed = new Typed(".typing", {
    strings: ["Data Scientist", "Web Developer", "Beginner Python Enthusiast"],
    typeSpeed: 100,
    backSpeed: 60,  // Fixed: was "BackSpeed" 
    loop: true
});

/* ============================= Aside Navigation ============================= */
const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;

// Add click event listeners to navigation items
for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function() {
        // Remove previous active navigation
        for (let j = 0; j < totalNavList; j++) {
            navList[j].querySelector("a").classList.remove("active");
        }
        // Add active class to clicked navigation
        this.classList.add("active");
        
        // Show target section
        showSection(this);
        
        // Hide navigation on mobile after clicking
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    });
}

function showSection(element) {
    // Hide all sections
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    
    // Get target section from href attribute
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");
}

/* ============================= Navigation Toggler ============================= */
const navTogglerBtn = document.querySelector(".nav-toggler"),
      aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    
    // Hide all sections when navigation is open on mobile
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}