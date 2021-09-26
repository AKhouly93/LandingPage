/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

//Getting a  list of all the section in the page.
const sections = document.querySelectorAll('section');
//The empty area allocated for navigation bar. 
const navBar = document.querySelector('.navbar');
const navBarItems = [];
const scrollToTopButton = document.getElementById('scrollToTop');
//Getting <ul> element
const ulElement = navBar.firstElementChild;
let activeSectionId = '';

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
const createNavBarLink = (section)=>{
        //Getting section id (used to anchor to that section), and section title (used as the link label in the nav bar).
        const sectionTitle = section.getAttribute('data-nav');
        const sectionId = section.getAttribute('id');
        //Creating <li> element
        const liElement = document.createElement('li');
        //adding <a> element (anchor to section) inside the <li> element 
        liElement.innerHTML = `<a href ="${sectionId}">${sectionTitle}</a>`;
        navBarItems.push(liElement);
        //listen to the cliking event.
        liElement.addEventListener('click',(e)=>{
            //I want to scroll to section based on <li> element click, not the <a> element
            //so I will disable the default action of the <a> element.
            e.preventDefault();
            //invoking a function that scrolls to the specific section.
            scrollToSection(section);
        });
        return liElement;
};
// build the nav
const populateNavBar =()=>{
    // iterate over the list of section, to generate a link for each section in the nav bar.
     for (const section of sections){
        // Creating a <li> element contating a link to the section and appending it to the parent ulElement (<ul>).
         ulElement.appendChild(createNavBarLink(section));
     }
};
populateNavBar();

//This funtion  adjusts the section padding-top so that the nav bar does not hide the section when anchoring to it.
const adjustPadding =()=>{
    for (section of sections){
        section.style.paddingTop = navBar.getBoundingClientRect().bottom + 5;
    }
};
//adjusting on load.
adjustPadding();

//check if an element enters the viewport
const checkIfInViewPort =()=>{
   for (section of sections){
       // a section top edge is in the top third of the browser window.
       if (section.getBoundingClientRect().top >= 0  && section.getBoundingClientRect().top < window.innerHeight * 0.30){
           // check if the section in the view port is not already active;
           if (section.id !== activeSectionId){
                //save the new active section id to compare it the next time a section is in the view port;
                activeSectionId = section.id;
                //we have a new section, now call the function that changes the active class to.
                toggleActiveClass(section);
           }
       }
   }
};

// Add class 'your-active-class' to section when near top of viewport
function toggleActiveClass(newSection){
    //iterate over all section and remove the active class
    for (section of sections){
        section.classList.remove ('your-active-class');
    }
    //adding the active class to the section 
    newSection.classList.add ('your-active-class');
    //iterate over the nav bar items (tabs) and activate the one that links to the active section.
    for (item of navBarItems){
        //removing from all
        item.classList.remove ('active__tab');
        const link = item.getElementsByTagName('a').item(0);
        //add to the one whose id matches the id of the active section.
        if (link.getAttribute('href') === newSection.id){
            item.classList.add('active__tab');
        }
    }
}
// Scroll to section on link click
function scrollToSection(section){
   section.scrollIntoView({behavior: 'smooth'});
}

//displaying a scroll-to-top button when reaching the bottom of the page.
const displayButton =()=>{
    const pageBottom = document.body.getBoundingClientRect().bottom;
    const bottomReached = pageBottom - 50 <= window.innerHeight && document.body.offsetHeight > window.innerHeight;
    if (bottomReached){
        scrollToTopButton.style.display = 'block';
    }else{
        scrollToTopButton.style.display = 'none';
    }
};
const scrollToTop = ()=>{
    window.scrollTo({top : 0, left : 0, behavior : 'smooth' });  
};
/**
 * End Main Functions
 * Begin Events
 * 
*/
window.addEventListener ('scroll', displayButton);
window.addEventListener('scroll', checkIfInViewPort);
scrollToTopButton.addEventListener('click', scrollToTop);
//adjust padding again everytime the window is resized.
//if the user resizes the window the nav bar height may increase and hide elements behind it. adjust padding pushes elements down.
window.addEventListener('resize', adjustPadding);