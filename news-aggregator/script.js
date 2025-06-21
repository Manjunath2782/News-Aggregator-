const API_KEY = 'pub_dd442e33984c4efba0452e92af31c6fa'; 
const BASE_URL = 'https://newsdata.io/api/1/news';
const newsContainer = document.getElementById('newsContainer');
const categorySelect = document.getElementById('category');
const searchInput = document.getElementById('searchInput');

window.onload = () => {
  fetchNews();
  categorySelect.addEventListener('change', fetchNews);
};

function fetchNews() {
  const category = categorySelect.value;
  const url = `${BASE_URL}?apikey=${API_KEY}&country=in&category=${category}&language=en`;

  fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.results || []))
    .catch(err => console.error('Error fetching news:', err));
}

function searchNews() {
  const query = searchInput.value.trim();
  if (!query) return;

  const url = `${BASE_URL}?apikey=${API_KEY}&q=${query}&language=en`;

  fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.results || []))
    .catch(err => console.error('Error searching news:', err));
}

function displayNews(articles) {
  newsContainer.innerHTML = '';
  if (articles.length === 0) {
    newsContainer.innerHTML = '<p class="text-center">No articles found.</p>';
    return;
  }

  articles.forEach(article => {
    const col = document.createElement('div');
    col.className = 'col-md-4';

    col.innerHTML = `
      <div class="card h-100">
        <img src="${article.image_url || 'https://via.placeholder.com/300x180'}" class="card-img-top" alt="News image">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${article.title}</h5>
          <p class="card-text">${article.description || ''}</p>
          <a href="${article.link}" class="btn btn-outline-primary mt-auto" target="_blank">Read More</a>
        </div>
      </div>
    `;

    newsContainer.appendChild(col);
  });
}
