const loadCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  showCategory(data.categories);
};
const showCategory = (categories) => {
  categories.forEach((element) => {
    // console.log(element);
    const categoryContainer = document.getElementById("category-container");
    const div = document.createElement("div");
    div.innerHTML = `
<button onclick="loadPets('${element.category}')" class="btn p-8">
<img class="w-8" src=${element.category_icon} alt="">
${element.category}
</button>
`;
    categoryContainer.appendChild(div);
  });
};
const loadPets = async (categoryName) => {
  document.getElementById("status").style.display="none";
  document.getElementById("petsContainer").style.display="block";
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await response.json();
  // console.log(data.data);
  displayPets(data.data);
};
const displayPets = (pets) => {
    console.log(pets);
    const petsContainer = document.getElementById("petsContainer");
    petsContainer.innerHTML = "";
    if (pets.length<1){
        document.getElementById("petsContainer").style.display="none";
        document.getElementById("status").style.display="block";
        return;
    }
  pets.forEach((pet) => {
    console.log(pet);
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src="${pet.image}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${pet.breed}</h2>
    <p>${pet.pet_details.slice(0,100)}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
      <button class="btn bg-red-500">Select</button>
    </div>
  </div>
</div>
        `;
        petsContainer.appendChild(div)
  });
};
loadPets("cat");
loadCategory();
