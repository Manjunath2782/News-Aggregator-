const API_KEY = '7c3e6cdf912e49e0808dc89b11a17057'; // Replace with your NewsAPI key
const BASE_URL = 'https://newsapi.org/v2/top-headlines';
const newsContainer = document.getElementById('newsContainer');
const categorySelect = document.getElementById('category');
const searchInput = document.getElementById('searchInput');

window.onload = () => {
  fetchNews();
  categorySelect.addEventListener('change', fetchNews);
};

function fetchNews() {
  const category = categorySelect.value;
  const url = `${BASE_URL}?country=in&category=${category}&apiKey=${API_KEY}`;

  fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.articles))
    .catch(err => console.error('Error fetching news:', err));
}

function searchNews() {
  const query = searchInput.value.trim();
  if (!query) return;

  const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;

  fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.articles))
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
        <img src="${article.urlToImage || 'https://via.placeholder.com/300x180'}" class="card-img-top" alt="News image">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${article.title}</h5>
          <p class="card-text">${article.description || ''}</p>
          <a href="${article.url}" class="btn btn-outline-primary mt-auto" target="_blank">Read More</a>
        </div>
      </div>
    `;

    newsContainer.appendChild(col);
  });
}
