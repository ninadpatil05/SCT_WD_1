/* ==========================================================
   Project Script
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     Preloader
     =============================== */
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.opacity = "0";
      setTimeout(() => preloader.style.display = "none", 500);
    });
  }


  /* ===============================
     Navbar Scroll & Mobile Menu
     =============================== */
  const navbar = document.querySelector(".navbar");
  const navLinks = document.getElementById("nav-links");
  const hamburger = document.getElementById("hamburger");
  const themeToggle = document.getElementById("themeToggle");
  const currencySelect = document.getElementById("currency");
  
  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Auto-close mobile menu on link click
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  });


  /* ===============================
     Smooth Scroll (for older browsers & cross-browser support)
     =============================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - navbar.offsetHeight,
          behavior: "smooth"
        });
      }
    });
  });


  /* ===============================
     Hero Section: Rotating Text & Scroll Indicator
     =============================== */
  const rotatingTextElement = document.querySelector('.rotating');
  if (rotatingTextElement) {
    const words = ["Adventure", "Freedom", "Wilderness", "Memories"];
    let wordIndex = 0;
    
    function rotateWords() {
      wordIndex = (wordIndex + 1) % words.length;
      rotatingTextElement.textContent = words[wordIndex];
    }
    
    // Set an interval to change the word every 3 seconds
    setInterval(rotateWords, 3000);
  }


  /* ===============================
     Featured Tour Countdown Timer
     =============================== */
  const countdownElement = document.querySelector(".countdown");
  if (countdownElement) {
    const endDate = new Date("December 31, 2025 23:59:59").getTime();
    
    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("cd-days").textContent = String(days).padStart(2, '0');
      document.getElementById("cd-hours").textContent = String(hours).padStart(2, '0');
      document.getElementById("cd-mins").textContent = String(minutes).padStart(2, '0');
      document.getElementById("cd-secs").textContent = String(seconds).padStart(2, '0');

      if (distance < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = "<h4>Offer Expired</h4>";
      }
    }, 1000);
  }


  /* ===============================
     Tour Cards & Modal Popups
     =============================== */
  const tourModal = document.getElementById("tourModal");
  const modalCloseBtn = tourModal ? tourModal.querySelector(".modal-close") : null;
  
  // Tour descriptions
  const tourDescriptions = {
    '1': {
      title: 'Pacific Rim Expedition',
      text: 'Embark on a journey through ancient rainforests and breathtaking coastlines. This expedition takes you to the heart of Tofino and Ucluelet, where you can explore rugged beaches, watch for whales, and witness spectacular storm-watching. Get ready for unforgettable sunsets and the wild beauty of Canada\'s west coast.',
      img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop',
      alt: 'Pacific Rim coastline'
    },
    '2': {
      title: 'Vancouver & Whistler Escape',
      text: 'Experience the best of both worlds with this tour. Start in the vibrant city of Vancouver, exploring urban gems like Gastown and Stanley Park. Then, embark on a stunning drive along the Sea-to-Sky Highway to the alpine paradise of Whistler. You\'ll see majestic waterfalls and breathtaking mountain views, combining city excitement with mountain tranquility.',
      img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop',
      alt: 'Whistler mountain village'
    },
    '3': {
      title: 'Banff & Jasper Grand Loop',
      text: 'Journey through the heart of the Canadian Rockies. This iconic tour takes you along the famous Icefields Parkway, where you’ll marvel at pristine turquoise lakes like Lake Louise and Moraine Lake, walk on ancient glaciers, and relax in healing hot springs. It\'s an epic escape into a world of towering peaks and untouched wilderness.',
      img: 'https://banfflakelouise.bynder.com/m/3d04f19979f432ec/2000x1080_jpg-2022_MoraineLake_TravelAlberta_RothandRamberg%20(3).jpg',
      alt: 'Banff national park turquoise lake'
    }
  };

  document.querySelectorAll(".open-modal").forEach(button => {
    button.addEventListener("click", () => {
      const tourId = button.dataset.tourId;
      const tour = tourDescriptions[tourId];

      const modalTitle = document.getElementById("modalTitle");
      const modalText = document.getElementById("modalText");
      const modalPrice = document.getElementById("modalPrice");
      const modalImg = document.getElementById("modalImg");

      if (tour) {
        modalTitle.textContent = tour.title;
        modalText.textContent = tour.text;
        
        // Find the corresponding tour card to get the price
        const tourCard = document.querySelector(`.tour-card[data-tour-id="${tourId}"]`);
        if (tourCard) {
            modalPrice.textContent = tourCard.querySelector('.price-badge').textContent;
        }

        modalImg.src = tour.img;
        modalImg.alt = tour.alt;
      }

      tourModal.classList.add("show");
      document.body.style.overflow = "hidden"; // Prevent scrolling
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", () => {
      tourModal.classList.remove("show");
      document.body.style.overflow = ""; // Re-enable scrolling
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === tourModal) {
      tourModal.classList.remove("show");
      document.body.style.overflow = "";
    }
  });


  /* ===============================
     Currency Converter
     =============================== */
  const prices = document.querySelectorAll("[data-currency]");
  const conversionRates = {
    USD: 1,
    CAD: 1.37, // Example rate
    EUR: 0.92, // Example rate
    INR: 83.5 // Example rate
  };

  if (currencySelect) {
    currencySelect.addEventListener("change", (e) => {
      const selectedCurrency = e.target.value;
      const rate = conversionRates[selectedCurrency];

      prices.forEach(priceElement => {
        let originalPrice = parseFloat(priceElement.dataset.price || priceElement.textContent.replace(/[^\d.]/g, ''));
        if (originalPrice) {
          const convertedPrice = (originalPrice * rate).toFixed(2);
          priceElement.textContent = `${selectedCurrency} ${convertedPrice}`;
        }
      });
    });
  }


  /* ===============================
     Search & Filter
     =============================== */
  const tourSearch = document.getElementById("tourSearch");
  const tourFilter = document.getElementById("tourFilter");
  const tourCards = document.querySelectorAll(".tour-card");

  function filterTours() {
    const searchText = tourSearch.value.toLowerCase();
    const filterValue = tourFilter.value;

    tourCards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const price = parseFloat(card.dataset.price);

      const matchesSearch = title.includes(searchText);
      let matchesFilter = true;

      switch (filterValue) {
        case "lt1000": matchesFilter = price < 1000; break;
        case "1000-2000": matchesFilter = price >= 1000 && price <= 2000; break;
        case "gt2000": matchesFilter = price > 2000; break;
        case "all": matchesFilter = true; break;
      }

      if (matchesSearch && matchesFilter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  if (tourSearch) tourSearch.addEventListener("input", filterTours);
  if (tourFilter) tourFilter.addEventListener("change", filterTours);


  /* ===============================
     Back to Top & Sticky CTA
     =============================== */
  const backToTop = document.getElementById("backToTop");
  const stickyCta = document.querySelector(".sticky-cta");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      if (backToTop) backToTop.classList.add("show");
      if (stickyCta) stickyCta.style.transform = "translateY(0)";
    } else {
      if (backToTop) backToTop.classList.remove("show");
      if (stickyCta) stickyCta.style.transform = "translateY(100px)";
    }
  });
  
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }


  /* ===============================
     Theme Toggle (Dark/Light Mode)
     =============================== */
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDarkMode = document.body.classList.contains("dark-mode");
      themeToggle.innerHTML = isDarkMode ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
      localStorage.setItem('darkMode', isDarkMode);
    });
    // Check local storage for theme preference
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add("dark-mode");
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
  }


  /* ===============================
     AOS & Swiper Initialization
     =============================== */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out'
    });
  }

  if (typeof Swiper !== "undefined") {
    new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  /* ===============================
     Blog Swiper Initialization
     =============================== */
  if (typeof Swiper !== "undefined") {
    new Swiper(".mySwiperBlog", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }


  /* ===============================
     Button Ripple Effect
     =============================== */
  const rippleButtons = document.querySelectorAll('.btn.ripple');
  rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.classList.contains('animate')) return;
      this.classList.add('animate');
      setTimeout(() => {
        this.classList.remove('animate');
      }, 1000);
    });
  });

});