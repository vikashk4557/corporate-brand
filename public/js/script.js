const themeBtn=document.getElementById("themeToggle");
const icon=themeBtn.querySelector("i");
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const titles = document.querySelectorAll(".hero__title");
const navLinks = document.querySelectorAll(".nav-link");


// Day Night Effect
if(localStorage.getItem("theme")==="dark"){
    document.body.classList.add("dark");
    icon.classList.replace("bi-moon-fill","bi-sun-fill");
}
menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
themeBtn.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        icon.classList.replace("bi-moon-fill","bi-sun-fill");
        localStorage.setItem("theme","dark");
    }else{
        icon.classList.replace("bi-sun-fill","bi-moon-fill");
        localStorage.setItem("theme","light");
    }
});

(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
// Title Animation
titles.forEach((title) => {
  const text = title.textContent.trim();
  title.textContent = "";
  let started = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !started) {
        started = true;
        let i = 0;
        function typing() {
          if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typing, 50);
          }
        }
        typing();
        observer.unobserve(title);
      }
    });
  }, {
      threshold: 0.5
  });
    observer.observe(title);
});
navLinks.forEach(link => {
    link.addEventListener("click", function () {
    navLinks.forEach(item => item.classList.remove("active"));
    this.classList.add("active");
    });
});  