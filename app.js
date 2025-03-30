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
        <button onclick="loadCategoryPets('${cat.category}')" class="btn lg:p-8 hover:bg-[#0E7A8110] hover:rounded-[120px] hover:border-[#0E7A81]">
            <img src="${cat.category_icon}" alt="" class="w-6">
          ${cat.category}</button>
        `;
    categoryContainer.append(categoryDiv);
  }
}
function loadPets() {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets));
}
function displayPets(pets) {
  const petsContainer = document.getElementById("pets-container");
  petsContainer.innerHTML = "";
  if(pets.length== 0){
    petsContainer.innerHTML=`
    <div class="col-span-full bg-slate-50 p-8  text-center rounded-xl space-y-5">
      <div>
        <img class="mx-auto" src="./images/error.webp" alt="">
      </div>
      <h4 class="text-xl">No Information Available</h4>
      <p class="text-xs text-gray-600">It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br>its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>`
    return;
}
  for (let pet of pets) {
    const petsContainerDiv = document.createElement("div");
    petsContainerDiv.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
          <img class="w-[250px] p-5" src="${pet.image}" alt="">
          <div class="card-body">
            <h5>Breed: ${pet.breed}</h5>
          <p class="flex items-center gap-2 text-gray-600">
            <i class="fas fa-dna"></i> Birth: ${new Date(pet.date_of_birth).getFullYear()}
          </p>

          <p class="flex items-center gap-2 text-gray-600"><i class="fas fa-calendar-alt"></i>birth</p>
          <p class="flex items-center gap-2 text-gray-600"><i class="fas fa-venus-mars"></i> </i>Gender:${pet.gender}</p>
          <p class="flex items-center gap-2 text-gray-600"><i class="fas fa-dollar-sign"></i>${pet.price}$</p>
          <hr class="text-gray-500">
          <div class="flex justify-between gap-1">
            <button class="btn btn-xs lg:btn-lg btn-outline text-gray-500"><i class="fas fa-thumbs-up"></i></button>
             <button class="btn btn-xs lg:btn-lg btn-outline text-[#0E7A81]">Adopt</button>
            <button class="btn btn-xs lg:btn-lg btn-outline text-[#0E7A81]">Details</button>
          </div>
          </div>
        </div>`;
    petsContainer.append(petsContainerDiv);
  }
}
const loadCategoryPets=(category)=>{
const url = `https://openapi.programming-hero.com/api/peddy/category/${category}`
console.log(url);
fetch(url)
.then((res)=>res.json())
.then((data)=>displayPets(data.data))
}
loadPets();
loadCategories();
