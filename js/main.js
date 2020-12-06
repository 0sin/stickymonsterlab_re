// https://youtu.be/6oGctyyeZ6E //더보기란에 강의 링크 참고하세요...

// Fetch the items from the JSON file
function loadItems() {
  return fetch('data/data.json')
  .then(response => response.json())
  .then(json => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector('.card-container');
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// Create HTML item from the given data item
function createHTMLString(item) {
  return `
  <article class="card-item">
    <div class="item-wrap">
        <a href="#" rel="bookmark">
          <img src="${item.image}" alt="${item.type}">
          <div class="txt-container">
              <div class="bgcolor" style="background-color: ${item.bgcolor}"></div>
              <div class="txt-wrap">
                <h2 class="txt-title">${item.title}</h2>
                <p class="txt-category">${item.category}</p>
              </div>
          </div>
        </a>
    </div>
  </article>
  `;
}

function onCategoryClick(event, items) {
  const target = event.target;
  const key = target.dataset.key;
  const sub = target.dataset.sub;
  const value = target.dataset.value;

  if (key == null || value == null) {
    return;
  }

  // 아래는 html 전체 업로드
  const filtered = items.filter(item => item[key] === value || item[sub] === value );
  displayItems(filtered);
  // console.log(filtered);
  // console.log(event.target.dataset.value);



   // 아래는 class.add로 html은 그대로 두고 보였다 안보였다 하는 방법
  // updateItems(items, key, value);
}

// function updateItems(items, key, value) {
//   items.forEach(item => {
//     if (item.dataset[key] === value) {
//       item.classList.remove('invisible');
//     } else {
//       item.classList.add('invisible')
//     }
//   });
// }




function setEventListeners(items) {
  const all = document.getElementById('all');
  const category = document.querySelector('.work-category');
  all.addEventListener('click', () => displayItems(items));
  category.addEventListener('click', event => onCategoryClick(event, items));
}



// main
loadItems()
.then(items => {
  // console.log(items);
    displayItems(items);
    setEventListeners(items);
})
.catch(console.log);