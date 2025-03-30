function loadCategories(){
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res)=> res.json())
    .then((data)=>displayCategories(data.categories
    ))
}
function displayCategories(categories){
    const categoryContainer = document.getElementById("category-container");
    for (let cat of categories){
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML=`
        <button class="btn lg:p-10">
            <img src="${cat.category_icon}" alt="" class="w-6">
          ${cat.category}</button>
        `
        categoryContainer.append(categoryDiv)
    }
}
loadCategories();