document.addEventListener('DOMContentLoaded', () => {
  const addCarForm = document.getElementById('admin-form');
  const removeCarForm = document.getElementById('remove-car-form');
  const imageInput = document.getElementById('car-image');
  const imagePreview = document.getElementById('image-preview');
  const carListContainer = document.getElementById('car-list-container');

  // Preview image
  imageInput.addEventListener('change', () => {
      const file = imageInput.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = () => {
              imagePreview.src = reader.result;
              imagePreview.style.display = 'block';
          };
          reader.readAsDataURL(file);
      }
  });

  // Add car
  addCarForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const carName = document.getElementById('car-name').value;
      const carYear = document.getElementById('car-year').value;
      const carImage = imagePreview.src;
      const carPeople = document.getElementById('car-people').value;
      const carFuel = document.getElementById('car-fuel').value;
      const carMileage = document.getElementById('car-mileage').value;
      const carTransmission = document.getElementById('car-transmission').value;
      const carPrice = document.getElementById('car-price').value;

      const cars = JSON.parse(localStorage.getItem('cars')) || [];
      cars.push({
          name: carName,
          year: carYear,
          image: carImage,
          people: carPeople,
          fuel: carFuel,
          mileage: carMileage,
          transmission: carTransmission,
          price: carPrice
      });
      localStorage.setItem('cars', JSON.stringify(cars));

      // Clear form
      addCarForm.reset();
      imagePreview.style.display = 'none';
      displayCarList(); // Update car list display
  });

  // Display car list
  function displayCarList() {
      const cars = JSON.parse(localStorage.getItem('cars')) || [];
      carListContainer.innerHTML = '';

      cars.forEach(car => {
          const carItem = document.createElement('div');
          carItem.classList.add('car-item');
          carItem.innerHTML = `
              <div class="car-info">
                  <img src="${car.image}" alt="${car.name}" class="car-image" />
                  <div class="car-details">
                      <h4>${car.name}</h4>
                      <p>Year: ${car.year}</p>
                      <p>People: ${car.people}</p>
                      <p>Fuel: ${car.fuel}</p>
                      <p>Mileage: ${car.mileage} / 1-litre</p>
                      <p>Transmission: ${car.transmission}</p>
                      <p>Price: ₹${car.price} / day</p>
                  </div>
              </div>
              <button class="remove-car-btn" data-car-name="${car.name}">Remove Car</button>
          `;
          carListContainer.appendChild(carItem);
      });

      // Attach event listeners to remove buttons
      const removeButtons = document.querySelectorAll('.remove-car-btn');
      removeButtons.forEach(button => {
          button.addEventListener('click', (event) => {
              const carName = event.target.dataset.carName;
              removeCar(carName);
          });
      });
  }

  // Remove car
  function removeCar(carName) {
      let cars = JSON.parse(localStorage.getItem('cars')) || [];
      cars = cars.filter(car => car.name !== carName);
      localStorage.setItem('cars', JSON.stringify(cars));
      displayCarList(); // Update car list display
  }

  // Initial display of cars
  displayCarList();
});
