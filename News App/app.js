document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent the default form submission
        fetchNews();
    });

    async function fetchNews() {
        const query = document.getElementById('searchInput').value;
        const apiKey = 'af322c16306443918c91527b29f03b96';  // Replace with your News API key
        const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            console.error('Error fetching the news:', error);
        }
    }

    function displayNews(articles) {
        const newsContainer = document.getElementById('newsContainer');
        newsContainer.innerHTML = '';

        articles.forEach(article => {
            // const colElement = document.createElement('div');
            // colElement.classList.add('col-md-4', 'mb-4');  // Column for medium-sized screens

            const newsElement = document.createElement('div');
            newsElement.classList.add('card', 'mb-4', 'news-card');
            newsElement.style.width = '18rem';
            newsElement.style.height = '23rem';
            newsElement.style.marginRight = '17px';

            const imageUrl = article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/150';

            newsElement.innerHTML = `
            <img src="${imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p class="card-text">${article.description}</p>
                <a href="${article.url}" target="_blank" class="btn btn-primary">Read more</a>
            </div>
        `;

            newsContainer.appendChild(newsElement);
        });
    }
});