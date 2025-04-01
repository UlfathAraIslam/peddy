let pets = [];
let activeCategoryPets = [];
function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}
function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (let cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button id="btn-${cat.category}" onclick="loadCategoryPets('${cat.category}')" class="btn lg:p-8 hover:bg-[#0E7A8110] hover:rounded-[120px] hover:border-[#0E7A81]">
            <img src="${cat.category_icon}" alt="" class="w-6">
          ${cat.category}</button>
        `;
    categoryContainer.append(categoryDiv);
  }
}
function loadPets() {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      pets = data.pets; // Store globally
      displayPets(pets); // Display initially
    });
}
function displayPets(pets) {
  const petsContainer = document.getElementById("pets-container");
  petsContainer.innerHTML = "";
  if (pets.length == 0) {
    petsContainer.innerHTML = `
    <div class="col-span-full bg-slate-50 p-8  text-center rounded-xl space-y-5">
      <div>
        <img class="mx-auto" src="./images/error.webp" alt="">
      </div>
      <h4 class="text-xl">No Information Available</h4>
      <p class="text-xs text-gray-600">It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br>its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>`;
    return;
  }
  for (let pet of pets) {
    const petsContainerDiv = document.createElement("div");
    petsContainerDiv.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
          <img class="w-[250px] p-5" src="${pet.image}" alt="">
          <div class="card-body">
            <h5 class="text-xl font-bold">${pet.pet_name}</h5>
          <p class="flex items-center gap-2 text-gray-600">
            <i class="fas fa-dna"></i> Breed: ${pet.breed}
          </p>

          <p class="flex items-center gap-2 text-gray-600"><i class="fas fa-calendar-alt"></i>birth ${new Date(
            pet.date_of_birth
          ).getFullYear()}</p>
          <p class="flex items-center gap-2 text-gray-600"><i class="fas fa-venus-mars"></i> </i>Gender:${
            pet.gender
          }</p>
          <p class="flex items-center gap-2 text-gray-600"><i class="fas fa-dollar-sign"></i>${
            pet.price
          }$</p>
          <hr class="text-gray-500">
          <div class="flex justify-between gap-1">
            <button onclick=loadLikedImg(${pet.petId}) class="btn like-btn btn-xs lg:btn-lg btn-outline text-gray-500"><i class="fas fa-thumbs-up"></i></button>
             <button onclick="handleAdoptButtonClick(this,${pet.petId})"  id="adopt-btn-${pet.petId}" class="btn btn-xs lg:btn-lg btn-outline text-[#0E7A81]">Adopt</button>
            <button onclick=loadPetDetails(${
              pet.petId
            }) class="btn btn-xs lg:btn-lg btn-outline text-[#0E7A81]">Details</button>
          </div>
          </div>
        </div>`;
    petsContainer.append(petsContainerDiv);
    // Add an event listener to the Adopt button
    const adoptButton = document.getElementById(`adopt-btn-${pet.petId}`);
    adoptButton.addEventListener("click",function(){
      handleAdoptButtonClick(adoptButton);
    })
  }
}
const loadCategoryPets = (category) => {
  const url = `https://openapi.programming-hero.com/api/peddy/category/${category}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${category}`);
      clickedButton.classList.add("active");
      activeCategoryPets = data.data;
      displayPets(activeCategoryPets);
    });
};
const removeActiveClass = () => {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
};
const loadPetDetails = (petId) => {
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayPetDetails(data.petData);
    });
};

const displayPetDetails = (pet) => {
  document.getElementById("pet_details").showModal();
  const petDetailsContainer = document.getElementById("details-container");
  petDetailsContainer.innerHTML = `
<div class="card bg-base-100">
  <figure>
    <img
      src="${pet.image}"
      class="w-full" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${pet.pet_name}</h2>
        <div class="grid grid-cols-2">
        <p class="flex items-center gap-2 text-gray-600">
            <i class="fas fa-dna"></i> Breed: ${pet.breed}
        </p>
         <p class="flex items-center gap-2 text-gray-600">
            <i class="fas fa-calendar-alt"></i> Birth: ${new Date(
              pet.date_of_birth
            ).getFullYear()}
          </p>
          <p class="flex items-center gap-2 text-gray-600"><i class="fas fa-venus-mars"></i> </i>Gender:${
            pet.gender
          }</p>
          <p class="flex items-center gap-2 text-gray-600"><i class="fas fa-dna"></i>${
            pet.vaccinated_status
          }</p>
          <p class="flex items-center gap-2 text-gray-600"><i class="fas fa-dollar-sign"></i>${
            pet.price
          }$</p>
        </div>
          <div>
            <h5 class="font-bold">Details Information</h5>
            <p class="text-gray-600">${pet.pet_details}</p>
        </div>
  </div>
</div>
`;
};
const loadLikedImg=(petId)=>{
  const likedPets = [];
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
      // console.log(data);
       const pet =  data.petData;
       likedPets.push(pet)
       displayLikedPets(pet);
    })
}
const displayLikedPets = (pet) => {
  const likedPetsContainer = document.getElementById("liked-pets-container");
  const imgElement = document.createElement("div");
  imgElement.innerHTML=`
  <img class="w-full rounded-lg" src="${pet.image}"></img>
  `
  likedPetsContainer.appendChild(imgElement)
};

// Sorting function for the button
document.getElementById("sort-by-price-btn").addEventListener("click", () => {
  if (activeCategoryPets.length > 0) {
    activeCategoryPets.sort((a, b) => b.price - a.price); // Sort active category pets
    displayPets(activeCategoryPets);
  } else {
    pets.sort((a, b) => b.price - a.price); // Sort all pets if no category is active
    displayPets(pets);
  }
});

function handleAdoptButtonClick(button) {
  let countdown = 3;
  button.disabled = true;
  
  showModal();

  const countdownText = document.getElementById("countdownText");

  const countdownInterval = setInterval(() => {
      countdownText.textContent = `${countdown}`;
      countdown--;

      if (countdown <0) {
        clearInterval(countdownInterval);
        closeModal(); 
        button.textContent = "Adopted";
        button.classList.add("bg-gray-400", "text-gray-700", "cursor-not-allowed");
    }
  }, 1000);
}

function showModal() {
  document.getElementById("adoptModal").showModal();
}

function closeModal() {
  document.getElementById("adoptModal").close();
}
loadPets();
loadCategories();
