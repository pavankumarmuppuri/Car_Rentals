'use strict';

/**
 * Navbar Toggle
 */
const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navToggleFunc = function () {
  navToggleBtn.classList.toggle("active");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

navToggleBtn.addEventListener("click", navToggleFunc);
overlay.addEventListener("click", navToggleFunc);

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navToggleFunc);
}

/**
 * Header Active on Scroll
 */
const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 10 ? header.classList.add("active")
    : header.classList.remove("active");
});

/**
 * Display Cars
 */
document.addEventListener('DOMContentLoaded', () => {
  const featuredCarList = document.getElementById('featured-car-list');

  const cars = JSON.parse(localStorage.getItem('cars')) || [];

  cars.forEach(car => {
    const carItem = document.createElement('li');
    carItem.innerHTML = `
      <div class="featured-car-card">
        <figure class="card-banner">
          <img src="${car.image}" alt="${car.name}" loading="lazy" width="440" height="300" class="w-100">
        </figure>
        <div class="card-content">
          <div class="card-title-wrapper">
            <h3 class="h3 card-title">
              <a href="#">${car.name}</a>
            </h3>
            <data class="year" value="${car.year}">${car.year}</data>
          </div>
          <ul class="card-list">
            <li class="card-list-item">
              <ion-icon name="people-outline"></ion-icon>
              <span class="card-item-text">${car.people} People</span>
            </li>
            <li class="card-list-item">
              <ion-icon name="flash-outline"></ion-icon>
              <span class="card-item-text">${car.fuel}</span>
            </li>
            <li class="card-list-item">
              <ion-icon name="speedometer-outline"></ion-icon>
              <span class="card-item-text">${car.mileage} / 1-litre</span>
            </li>
            <li class="card-list-item">
              <ion-icon name="hardware-chip-outline"></ion-icon>
              <span class="card-item-text">${car.transmission}</span>
            </li>
          </ul>
          <div class="card-price-wrapper">
            <p class="card-price">
              <strong>₹${car.price}</strong> / day
            </p>
            <button class="btn fav-btn" aria-label="Add to favourite list">
              <ion-icon name="heart-outline"></ion-icon>
            </button>
            <button class="btn">Rent now</button>
          </div>
        </div>
      </div>
    `;
    featuredCarList.appendChild(carItem);
  });
});

/**
 * Manage User Info and Sections
 */
document.addEventListener("DOMContentLoaded", () => {
  function getUserInfo() {
    return JSON.parse(localStorage.getItem("user"));
  }

  function setUserInfo(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  const user = getUserInfo();

  const navbarList = document.getElementById("navbar-list");
  const loginItem = document.getElementById("login-item");
  const registerItem = document.getElementById("register-item");
  const featuredCarSection = document.getElementById("featured-car");
  const getStartSection = document.querySelector(".get-start");
  const loginModal = document.getElementById("login-modal");
  const closeBtn = document.querySelector(".close-btn");
  const loginModalBtn = document.getElementById("login-modal-btn");

  if (user) {
    const userItem = document.createElement("li");
    userItem.innerHTML = `<a href="#" class="navbar-link" data-nav-link>Hi ${user.firstName}</a>`;

    const logoutItem = document.createElement("li");
    logoutItem.innerHTML = `<a href="#" class="navbar-link" data-nav-link id="logout-link">Logout</a>`;

    navbarList.replaceChild(userItem, loginItem);
    navbarList.replaceChild(logoutItem, registerItem);

    document.getElementById("logout-link").addEventListener("click", () => {
      localStorage.removeItem("user"); // Clear user info from localStorage
      window.location.reload();
    });

    if (getStartSection) {
      getStartSection.style.display = 'none';
    }

    if (featuredCarSection) {
      featuredCarSection.style.display = 'block';
    }
  } else {
    if (getStartSection) {
      getStartSection.style.display = 'block';
    }

    if (featuredCarSection) {
      featuredCarSection.style.display = 'none';
    }

    setTimeout(() => {
      loginModal.style.display = 'block';
    }, 5000);

    closeBtn.addEventListener('click', () => {
      loginModal.style.display = 'none';
    });

    loginModalBtn.addEventListener('click', () => {
      loginModal.style.display = 'none';
      window.location.href = 'login-page.html'; 
    });

    window.addEventListener('click', (event) => {
      if (event.target === loginModal) {
        loginModal.style.display = 'none';
      }
    });
  }
});

/**
 * Car Search Functionality
 */
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.hero-form');
  const carModelInput = document.getElementById('input-1');

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchQuery = carModelInput.value.toLowerCase();

    const cars = JSON.parse(localStorage.getItem('cars')) || [];
    const featuredCarList = document.getElementById('featured-car-list');
    featuredCarList.innerHTML = '';

    const filteredCars = cars.filter(car => car.name.toLowerCase().includes(searchQuery));

    if (filteredCars.length === 0) {
      featuredCarList.innerHTML = '<p>No cars found.</p>';
    } else {
      filteredCars.forEach(car => {
        const carItem = document.createElement('li');
        carItem.innerHTML = `
          <div class="featured-car-card">
            <figure class="card-banner">
              <img src="${car.image}" alt="${car.name}" loading="lazy" width="440" height="300" class="w-100">
            </figure>
            <div class="card-content">
              <div class="card-title-wrapper">
                <h3 class="h3 card-title">
                  <a href="#">${car.name}</a>
                </h3>
                <data class="year" value="${car.year}">${car.year}</data>
              </div>
              <ul class="card-list">
                <li class="card-list-item">
                  <ion-icon name="people-outline"></ion-icon>
                  <span class="card-item-text">${car.people} People</span>
                </li>
                <li class="card-list-item">
                  <ion-icon name="flash-outline"></ion-icon>
                  <span class="card-item-text">${car.fuel}</span>
                </li>
                <li class="card-list-item">
                  <ion-icon name="speedometer-outline"></ion-icon>
                  <span class="card-item-text">${car.mileage} / 1-litre</span>
                </li>
                <li class="card-list-item">
                  <ion-icon name="hardware-chip-outline"></ion-icon>
                  <span class="card-item-text">${car.transmission}</span>
                </li>
              </ul>
              <div class="card-price-wrapper">
                <p class="card-price">
                  <strong>₹${car.price}</strong> / day
                </p>
                <button class="btn fav-btn" aria-label="Add to favourite list">
                  <ion-icon name="heart-outline"></ion-icon>
                </button>
                <button class="btn">Rent now</button>
              </div>
            </div>
          </div>
        `;
        featuredCarList.appendChild(carItem);
      });
    }
  });
});
