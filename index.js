let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
  
  if (document.body.classList.contains("dark-mode")) {
    themeButton.innerHTML = 'Light Mode☀️'; // Sun icon for light mode
  } else {
    themeButton.innerHTML = 'Dark Mode🌙'; // Moon icon for dark mode
  }
}
themeButton.addEventListener("click", toggleDarkMode);


const signNowButton = document.getElementById('sign-now-button');


const validateForm = () => {
  let person = {
    name: document.getElementById('name').value,
    hometown: document.getElementById('hometown').value,
    email: document.getElementById('email').value
  };

  let containsErrors = false;

  if (person.name.length < 2) {
    document.getElementById('name').classList.add('error');
    containsErrors = true;
  } else {
    document.getElementById('name').classList.remove('error');
  }

  if (person.hometown.length < 2) {
    document.getElementById('hometown').classList.add('error');
    containsErrors = true;
  } else {
    document.getElementById('hometown').classList.remove('error');
  }

  if (!person.email.includes('.com')) {
    document.getElementById('email').classList.add('error');
    containsErrors = true;
  } else {
    document.getElementById('email').classList.remove('error');
  }

  if (!containsErrors) {
    addSignature(person);
    toggleModal(person); // Call toggleModal after adding the signature
    document.getElementById('name').value = '';
    document.getElementById('hometown').value = '';
    document.getElementById('email').value = '';
  }
}


signNowButton.addEventListener('click', validateForm);

let count = 3;

const addSignature = (person) => {
  let newSignature = document.createElement('p');
  newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this.`;
  document.querySelector('.signatures').appendChild(newSignature);

  count++;

  let signatureCounter = document.getElementById('counter');
  signatureCounter.textContent = "🖊️ " + count + " people have signed this petition and support this cause.";
  document.querySelector('.signatures').appendChild(signatureCounter);
}



let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

let revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
}
window.addEventListener('click', reveal);
window.addEventListener('scroll', reveal);


let motionButton = document.getElementById("motion-button");

const reduceMotion = () => {
  animation.revealDistance = 0;
  animation.initialOpacity = 1;
  animation.transitionDuration = '0s';
  animation.transitionProperty = 'none'; 
  animation.transitionTimingFunction = 'linear';
  
  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.revealDistance = animation.revealDistance;
    revealableContainers[i].style.initialOpacity = animation.initialOpacity;
    revealableContainers[i].style.transitionDuration = animation.transitionDuration;
    revealableContainers[i].style.transitionProperty = animation.transitionProperty;
    revealableContainers[i].style.transitionTimingFunction = animation.transitionTimingFunction;
  }
}
motionButton.addEventListener ('click',reduceMotion)

let scaleFactor = 1;
let modalImage = document.getElementById("modal-img");

let scaleImage = () => {
  scaleFactor = scaleFactor === 1 ? 0.8 : 1
  modalImage.style.transform = `scale(${scaleFactor})`; 
}

let toggleModal = (person) => {
  let modal = document.getElementById("thanks-modal");
  let modalContent = document.getElementById("thanks-modal-content");
  

  modal.style.display = "flex";
  modalContent.textContent = "Thank you so much " + person.name + " from " + person.hometown + " for signing the petition!";
  
  let intervalId = setInterval(scaleImage, 500);

  setTimeout (() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  },4000)
  
  let closeModalButton = document.getElementById("close-modal");

  const closeModal = () => {
    modal.style.display = "none";
  }

  closeModalButton.addEventListener('click',closeModal)
}






