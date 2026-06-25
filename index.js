const result = document.getElementById('result');
const filter = document.getElementById('filter');
const listItems = [];

filter.addEventListener('input', e => filterData(e.target.value));

getData();

async function getData() {
  try {
    const res = await fetch('https://randomuser.me/api?results=50');
    const { results } = await res.json();

    result.innerHTML = '';

    const fragment = document.createDocumentFragment();

    results.forEach(user => {
      const li = document.createElement('li');

      li.innerHTML = `
        <img src="${user.picture.large}" alt="${user.name.first}">
        <div class="user-info">
          <h4>${user.name.first} ${user.name.last}</h4>
          <p>${user.location.city}, ${user.location.country}</p>
        </div>
      `;

      listItems.push(li);
      fragment.appendChild(li);
    });

    result.appendChild(fragment);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    result.innerHTML = '<li>Failed to load users.</li>';
  }
}

function filterData(searchTerm) {
  const term = searchTerm.toLowerCase();

  listItems.forEach(item => {
    item.classList.toggle(
      'hide',
      !item.textContent.toLowerCase().includes(term)
    );
  });
}
