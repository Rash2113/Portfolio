// Typewriting Effect
class typeWriting {
  constructor(element) {
    this.element = element;
    this.words = JSON.parse(element.getAttribute("data-words"));
    this.speed = parseInt(element.getAttribute("data-speed"), 10) || 100;
    this.delay = parseInt(element.getAttribute("data-delay"), 10) || 1000;
    this.loop = element.getAttribute("data-loop");
    this.char = "";
    this.counter = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    const index =
      this.loop === "yes" ? this.counter % this.words.length : this.counter;
    const fullWord = this.words[index];
    let typeSpeed = this.speed;

    if (this.isDeleting) {
      typeSpeed /= 2;
      this.char = fullWord.substring(0, this.char.length - 1);
    } else {
      this.char = fullWord.substring(0, this.char.length + 1);
    }

    this.element.innerHTML = `<span class="write">${this.char}</span><span class="blinking-cursor">|</span>`;

    if (!this.isDeleting && this.char === fullWord) {
      if (this.loop === "no" && this.counter >= this.words.length - 1) {
        return;
      }
      this.isDeleting = true;
      typeSpeed = this.delay;
    } else if (this.isDeleting && this.char === "") {
      this.isDeleting = false;
      this.counter++;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener("DOMContentLoaded", init);
function init() {
  document.querySelectorAll(".typewrite").forEach((e) => new typeWriting(e));
}

// Tabs Functionality
const tabs = document.querySelectorAll(".tab-btn");
const all_content = document.querySelectorAll(".content");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => tab.classList.remove("active"));
    tab.classList.add("active");

    const line = document.querySelector(".line");
    line.style.width = tab.offsetWidth + "px";
    line.style.left = tab.offsetLeft + "px";

    all_content.forEach((content) => content.classList.remove("active"));
    all_content[index].classList.add("active");
  });
});

// Hire Me Functionality
function hireMe() {
  window.location.href =
    "mailto:Rashendra.g@gmail.com?subject=Hiring%20Inquiry&body=Hi%20Rashendra,%0D%0A%0D%0AWe%20are%20interested%20in%20hiring%20you.%20Please%20get%20back%20to%20us.%0D%0A%0D%0ARegards,%0D%0A[Your%20Name]";
}

// View Resume Functionality
function viewResume() {
  window.open("New Final resume.pdf", "_blank");
}

//arrow
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const arrow = document.getElementById("scrollArrow");
  let currentSectionIndex = 0;

  const scrollToNextSection = () => {
    currentSectionIndex++;
    if (currentSectionIndex >= sections.length) {
      currentSectionIndex = 0; // Loop back to the first section
    }
    sections[currentSectionIndex].scrollIntoView({ behavior: "smooth" });
  };

  arrow.addEventListener("click", scrollToNextSection);
});


//moving bar
document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".progress");

  const animateProgressBars = () => {
    progressBars.forEach((bar) => {
      const target = bar.getAttribute("data-progress");
      bar.style.width = `${target}%`;
    });
  };

  // Add an intersection observer to trigger the animation when the section is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateProgressBars();
        observer.disconnect(); // Trigger only once
      }
    });
  });

  observer.observe(document.querySelector(".skills-grid"));
});
