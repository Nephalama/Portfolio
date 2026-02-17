// All variable declarations are here at the top, declared only once
const navs = document.querySelectorAll('.nav-list li');
const cube = document.querySelector('.box');
const sections = document.querySelectorAll('.section');

const resumeLists = document.querySelectorAll('.resume-list');
const resumBoxs = document.querySelectorAll('.resume-box');

const portfolioLists = document.querySelectorAll('.portfolio-list');
const portfolioBoxs = document.querySelectorAll('.portfolio-box');

// --- MODAL VARIABLES DECLARED ONCE FOR BOTH SECTIONS ---
const modal = document.getElementById('skill-modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const closeButton = document.querySelector('.close-button');

// Dictionary of skill descriptions
const skillDescriptions = {
    "HTML5": "I use HTML5 to structure the content of web pages, ensuring clean, semantic markup for accessibility and search engine optimization. I am proficient in using modern tags and forms.",
    "CSS3": "I use CSS3 to style and design web applications. My expertise includes creating responsive layouts with Flexbox and Grid, implementing animations, and styling components to match a brand's visual identity.",
    "JavaScript": "I use JavaScript to add dynamic and interactive functionality to websites. I am experienced in DOM manipulation, event handling, and fetching data from APIs to create engaging user experiences.",
    "Python": "I use Python for backend development, scripting, and automation. My skills include writing clean, efficient code for server-side logic and creating scripts to automate repetitive tasks.",
    "Flask": "I use Flask to build lightweight web applications and RESTful APIs. I am proficient in creating routes, handling HTTP requests, and integrating with databases like PostgreSQL to build scalable backend solutions.",
    "Linux": "Proficient in fundamental Linux commands for file management, system navigation, and process monitoring.",
    "Tailwind CSS": "I use Tailwind CSS to rapidly build custom user interfaces without leaving my HTML. I am skilled in using its utility-first approach to create unique and responsive designs.",
    "PostgreSQL": "I am proficient in PostgreSQL, which I use to design and manage relational databases for web applications, ensuring data integrity and efficient queries.",
    "GitHub": "I use GitHub to host my code repositories, manage project issues, and collaborate with other developers. My projects are all version-controlled on GitHub.",
    "REST APIs": "I have experience designing and consuming REST APIs to build interconnected applications. I use them to fetch and send data between the frontend and backend of my projects.",
    "Web Scraping (Selenium)": "I use Selenium with Python to automate browser tasks and extract data from websites. I've built automation tools to streamline data collection and business processes.",
    "Figma": "I use Figma for designing and prototyping user interfaces. I can translate mockups and wireframes into clean, functional web designs."
};


// NAVBAR ACTIONS AND CUBE ROTATION
navs.forEach((nav, idx) => {
    nav.addEventListener('click', () => {
        document.querySelector('.nav-list li.active').classList.remove('active');
        nav.classList.add('active');

        // Calculate rotation for each section
        let rotateAngle;
        switch(idx) {
            case 0: // Home (front)
                rotateAngle = 'rotateY(0deg)';
                break;
            case 1: // About (right)
                rotateAngle = 'rotateY(-90deg)';
                break;
            case 2: // Resume (back)
                rotateAngle = 'rotateY(-180deg)';
                break;
            case 3: // Portfolio (left)
                rotateAngle = 'rotateY(90deg)';
                break;
            case 4: // Contact (center)
                rotateAngle = 'rotateY(0deg)';
                break;
        }

        cube.style.transition = 'transform 1s ease-in-out';
        cube.style.transform = rotateAngle;

        document.querySelector('.section.active').classList.remove('active');
        sections[idx].classList.add('active');
    });
});

// RESUME TABS
resumeLists.forEach((list, idx) => {
    list.addEventListener('click', () => {
        document.querySelector('.resume-list.active').classList.remove('active');
        list.classList.add('active');

        document.querySelector('.resume-box.active').classList.remove('active');
        resumBoxs[idx].classList.add('active');
    });
});

// PORTFOLIO TABS
portfolioLists.forEach((list, idx) => {
    list.addEventListener('click', () => {
        document.querySelector('.portfolio-list.active').classList.remove('active');
        list.classList.add('active');

        document.querySelector('.portfolio-box.active').classList.remove('active');
        portfolioBoxs[idx].classList.add('active');
    });
});

// SKILL MODAL LOGIC
const skillItems = document.querySelectorAll('.resume-box.skills .tab-item');
skillItems.forEach(item => {
    item.addEventListener('click', () => {
        const skillName = item.querySelector('p').textContent.trim();
        modalTitle.textContent = skillName;
        modalText.textContent = skillDescriptions[skillName] || "No description available for this skill.";
        modal.style.display = "block";
    });
});

// PORTFOLIO MODAL LOGIC
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('click', (event) => {
        const serviceNameElement = item.querySelector('h4');
        if (serviceNameElement) {
            const serviceName = serviceNameElement.textContent.trim();
            modalTitle.textContent = serviceName;
            modalText.textContent = portfolioDescriptions[serviceName] || "No description available for this service.";
            modal.style.display = "block";
        }
    });
});

// MODAL CLOSE LOGIC
closeButton.addEventListener('click', () => {
    modal.style.display = "none";
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// TOGGLE EXTRA INFO INSIDE PORTFOLIO CARDS
const toggleArrows = document.querySelectorAll('.toggle-arrow');
toggleArrows.forEach(arrow => {
    arrow.addEventListener('click', function (e) {
        e.preventDefault(); // Prevents link jumping
        const card = this.closest('.portfolio-item');
        const extraInfo = card.querySelector('.extra-info');
        if (extraInfo) {
            extraInfo.style.display = extraInfo.style.display === 'none' ? 'block' : 'none';
        }
    });
});

// MODULAR FORM USED FOR THE CONTACT FORM

class ContactForm {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    this.nameInput = this.form.querySelector('input[name="name"]');
    this.emailInput = this.form.querySelector('input[name="email"]');
    this.phoneInput = this.form.querySelector('input[name="phone"]');
    this.subjectInput = this.form.querySelector('input[name="subject"]');
    this.messageInput = this.form.querySelector('textarea[name="message"]');

    // Create a place to show form messages
    this.messageBox = document.createElement('div');
    this.messageBox.style.marginTop = '10px';
    this.form.appendChild(this.messageBox);

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  validate() {
    // Basic validation example
    if (!this.nameInput.value.trim()) {
      this.showMessage('Please enter your full name.', 'error');
      return false;
    }
    if (!this.validateEmail(this.emailInput.value)) {
      this.showMessage('Please enter a valid email address.', 'error');
      return false;
    }
    if (!this.phoneInput.value.trim()) {
      this.showMessage('Please enter your phone number.', 'error');
      return false;
    }
    if (!this.subjectInput.value.trim()) {
      this.showMessage('Please enter a subject.', 'error');
      return false;
    }
    return true;
  }

  validateEmail(email) {
    // Simple email regex
    return /\S+@\S+\.\S+/.test(email);
  }

  showMessage(message, type = 'info') {
  this.messageBox.textContent = message;

  // Reset styles
  this.messageBox.style.backgroundColor = '';
  this.messageBox.style.border = '';

  // Apply styles based on message type
  if (type === 'error') {
    this.messageBox.style.color = '#d63384';
    this.messageBox.style.border = '1px solid #d63384';
    this.messageBox.style.backgroundColor = '#fce4ec';
  } else if (type === 'success') {
    this.messageBox.style.color = '#198754';
    this.messageBox.style.border = '1px solid #198754';
    this.messageBox.style.backgroundColor = '#d1e7dd';
  } else {
    this.messageBox.style.color = '#333';
  }

  this.messageBox.style.padding = '10px';
  this.messageBox.style.marginTop = '10px';
  this.messageBox.style.borderRadius = '4px';
}


  async handleSubmit(event) {
    event.preventDefault();

    if (!this.validate()) {
      return;
    }

    const formData = new FormData(this.form);

    try {
      const response = await fetch(this.form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        this.showMessage('Thank you! Your message has been sent.', 'success');
        this.form.reset();
      } else {
        this.showMessage('Oops! There was a problem sending your message.', 'error');
      }
    } catch (error) {
      this.showMessage('Network error. Please try again later.', 'error');
    }
  }
}

// When the page loads, create an instance of the form module
document.addEventListener('DOMContentLoaded', () => {
  new ContactForm('.contact-form');
});

// Function to handle the WhatsApp modal
function setupWhatsAppModal() {
    const openModalBtn = document.querySelector('.open-modal-btn');
    const modal = document.getElementById('whatsappModal');
    const closeBtn = modal.querySelector('.close-btn');

    if (openModalBtn && modal && closeBtn) {
        // Open the modal
        openModalBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the link from jumping
            modal.style.display = 'flex';
        });

        // Close the modal when the close button is clicked
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close the modal when the user clicks outside of it
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Call the function to set up the modal after the page loads
document.addEventListener('DOMContentLoaded', setupWhatsAppModal);