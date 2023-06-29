const NEWSAPI_URL = 'https://gnews.io/api/v4/top-headlines?lang=en';
// const API_KEY = '5b1783d718478d2f477e54c462bd460f';
const API_KEY = 'e6cb652c7624842be4bb38aeadf4c534'
const userId=null;

const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');

dropdownItems.forEach(function(item) {
  item.addEventListener('click', function() {
    const selectedCategory = item.textContent;
    const country = currentUser.country;
    fetchNews(selectedCategory, country);
    document.querySelector('.btn-info.dropdown-toggle').textContent = selectedCategory;
  });
});


async function fetchNews(category, country) {
    try {
        const url = `${NEWSAPI_URL}&category=${category}&country=${country}&apikey=${API_KEY}`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('API response:', data);
        console.log(Array.isArray(data.articles));
        if (data.articles && Array.isArray(data.articles)) {
            displayNews(data.articles);
        } else {
            console.error('Invalid data format:', data);
            alert('An error occurred while fetching news. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


function displayNews(news) {
  const newsContainer = document.getElementById('newsList');

  if (Array.isArray(news)) {

    newsContainer.innerHTML = '';

    const row = document.createElement('div');
    row.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4');

    news.forEach((article) => {
      const col = document.createElement('div');
      col.classList.add('col');

      const newsArticle = document.createElement('div');
      newsArticle.classList.add('card', 'h-100');

      const image = document.createElement('img');
      image.src = article.image;
      image.alt = article.title;
      image.classList.add('card-img-top');
      image.style.height = '250px';

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body', 'd-flex', 'flex-column');

      const title = document.createElement('h5');
      title.classList.add('card-title', 'mb-3', 'clamp-3');
      title.innerText = article.title;

      const description = document.createElement('p');
      description.classList.add('card-text', 'description', 'clamp-3');
      description.innerText = article.description;

      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('mt-auto', 'text-end');

      const readMoreButton = document.createElement('a');
      readMoreButton.href = article.url;
      readMoreButton.target = '_blank';
      readMoreButton.classList.add('btn', 'btn-info', 'read-more-btn');
      readMoreButton.innerText = 'Read More';

      const saveButton = document.createElement('button');
      saveButton.classList.add('btn', 'btn-info', 'save-btn');
      saveButton.innerText = 'Save';
      saveButton.addEventListener('click', () => {
        saveArticle(currentUser.id, article);
      });

      buttonContainer.appendChild(readMoreButton);
      buttonContainer.appendChild(saveButton);

      cardBody.appendChild(title);
      cardBody.appendChild(description);
      cardBody.appendChild(buttonContainer);
      newsArticle.appendChild(image);
      newsArticle.appendChild(cardBody);
      col.appendChild(newsArticle);
      row.appendChild(col);
    });

    newsContainer.appendChild(row);
  } else {
    console.error('Invalid news data. Expected an array.');
  }
}


const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
    searchContent(searchInput.value);
});

function searchContent(keyword) {
    const newsArticles = document.querySelectorAll('#newsList .card');
    newsArticles.forEach(function(article) {
        const title = article.querySelector('.card-title').innerText;
        const description = article.querySelector('.description').innerText;

        if (title.toLowerCase().includes(keyword.toLowerCase()) || description.toLowerCase().includes(keyword.toLowerCase())) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}


const userInformation = localStorage.getItem("userInformation");
const currentUser = userInformation ? JSON.parse(userInformation)[0] : null;
if (currentUser && window.location.href.includes('news.html')) {
  const country = currentUser.country;
  fetchNews("general", country);
}




function toggleProfile(){
  window.location.href = "profile.html";
 }

 function logout() {
  window.location.href = "login.html";
}


/************ saving the article ******************/

function saveArticle(userId, article) {
  fetch(`http://localhost:3000/users/${userId}`)
    .then(response => response.json())
    .then(user => {
      if (user.savedArticles) {
        user.savedArticles.push(article);
      } else {
        user.savedArticles = [article];
      }

      fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(updatedUser => {
          alert(`Article saved successfully ! `);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

const viewSavedArticlesBtn = document.getElementById('viewSavedArticles');
viewSavedArticlesBtn.addEventListener('click', viewSavedArticles);
function viewSavedArticles() {
  console.log(currentUser.id);
  window.location.href = "savedArticles.html";
}

if (window.location.href.includes('savedArticles.html')) {
  fetchSavedArticles(currentUser.id);
}


async function fetchSavedArticles(userId) {
  const url = `http://localhost:3000/users?id=${userId}`;

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('API response:', data[0].savedArticles);
      if (data[0].savedArticles && Array.isArray(data[0].savedArticles)) {
        displaySavedNews(data[0].savedArticles);
      } else {
        console.error('Invalid data format:', data);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


function displaySavedNews(news) {
  const newsContainer2 = document.getElementById('newsList2');

  if (Array.isArray(news)) {
    newsContainer2.innerHTML = '';

    const row = document.createElement('div');
    row.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4');

    news.forEach((article) => {
      const col = document.createElement('div');
      col.classList.add('col');

      const newsArticle = document.createElement('div');
      newsArticle.classList.add('card', 'h-100');

      const image = document.createElement('img');
      image.src = article.image;
      image.alt = article.title;
      image.classList.add('card-img-top');
      image.style.height = '250px';

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body', 'd-flex', 'flex-column');

      const title = document.createElement('h5');
      title.classList.add('card-title', 'mb-3', 'clamp-3');
      title.innerText = article.title;

      const description = document.createElement('p');
      description.classList.add('card-text', 'description', 'clamp-3');
      description.innerText = article.description;

      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('mt-auto', 'text-end');

      const readMoreButton = document.createElement('a');
      readMoreButton.href = article.url;
      readMoreButton.target = '_blank';
      readMoreButton.classList.add('btn', 'btn-info', 'read-more-btn');
      readMoreButton.innerText = 'Read More';

      const removeButton = document.createElement('button');
      removeButton.classList.add('btn', 'btn-info', 'remove-btn');
      removeButton.innerText = 'Remove';
      removeButton.addEventListener('click', () => {
      removeArticle(currentUser.id, article);
    });

      buttonContainer.appendChild(readMoreButton);
      buttonContainer.appendChild(removeButton);

      cardBody.appendChild(title);
      cardBody.appendChild(description);
      cardBody.appendChild(buttonContainer);
      newsArticle.appendChild(image);
      newsArticle.appendChild(cardBody);
      col.appendChild(newsArticle);
      row.appendChild(col);
    });
    newsContainer2.appendChild(row);
  } else {
    console.error('Invalid news data. Expected an array.');
  }
}

/*************** Deleting the article  ***************/

function removeArticle(userId, article) {
  fetch(`http://localhost:3000/users/${userId}`)
    .then(response => response.json())
    .then(data => {
      if (data.savedArticles && Array.isArray(data.savedArticles)) {
        const updatedArticles = data.savedArticles.filter(savedArticle => savedArticle.title !== article.title);
        data.savedArticles = updatedArticles;

        fetch(`http://localhost:3000/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(updatedUser => {
            alert(`Article removed successfully !`);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
