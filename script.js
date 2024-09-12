document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector(".go-square");
    const searchInput = document.querySelector(".rectangle-box");
    const newsContainer = document.querySelector(".grid-container");
    const apiKey = '683bb1a173af4e879ab8f9114305ecee';

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            fetchNews(query);
        }
    });

    async function fetchNews(query) {
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`);
            const data = await response.json();

            if (data.articles && data.articles.length > 0) {
                updateNewsContent(data.articles);
                // console.log(data.articles)
            } else {
                newsContainer.innerHTML = '<p>No articles found.</p>';
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p>Failed to fetch articles.</p>';
        }
    }

    function updateNewsContent(articles) {
        newsContainer.innerHTML = ''; 
        articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.className = 'all-images-parent';

            const image = article.urlToImage ? `<img class="all-images" alt="news image" src="${article.urlToImage}">` : '';
            const title = `<div class="head-line">${article.title}</div>`;
            const description = `<div class="description">${article.description || ''}</div>`;
            const readMoreLink =   `<div class="read-full-article-parent">
                                        <div class="newsapi">Read full article </div>
                                        <a class="a" href="${article.url}" target="_blank">--&gt;</a>
                                    </div>`;

            articleElement.innerHTML = image + title + description + readMoreLink;
            newsContainer.appendChild(articleElement);
        });
    }
});
