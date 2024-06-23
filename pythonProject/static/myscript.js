
    document.addEventListener("DOMContentLoaded", function() {
        var formContainer = document.getElementById("formContainer");
        var openFormButton = document.getElementById("openFormButton");

        openFormButton.addEventListener("click", function() {
            if (formContainer.style.display === "block") {
                formContainer.style.display = "none";
            } else {
                formContainer.style.display = "block";
                document.getElementById("formTitle").textContent = "Пост";
            }
        });

        document.getElementById("uploadForm").addEventListener("submit", function(event) {
            event.preventDefault();
            savePublication();
        });
    });

    function savePublication() {
        var form = document.getElementById('uploadForm');
        var formData = new FormData(form);

        fetch('/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            displayNewPublication(data.title, data.imageSrc, data.text);
            document.getElementById("formContainer").style.display = "none"; // Приховуємо форму після успішного збереження
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function displayNewPublication(title, imageSrc, text) {
        var newsContainer = document.querySelector('.news-container');
        var newsItem = document.createElement('div');
        newsItem.className = 'news-item';

        var titleElement = document.createElement('h2');
        titleElement.textContent = title;

        var imageElement = document.createElement('img');
        imageElement.src = imageSrc;
        imageElement.alt = 'Зображення новини';

        var textElement = document.createElement('p');
        textElement.textContent = text;

        newsItem.appendChild(titleElement);
        newsItem.appendChild(imageElement);
        newsItem.appendChild(textElement);

        newsContainer.appendChild(newsItem);

    }

    var musicPlayer = document.getElementById("musicPlayer");
    var audioPlayer = document.getElementById("audioPlayer");

    var musicTracks = [
        "static/music/mu1.mp3",
        "static/music/mu2.mp3",
        "static/music/mu3.mp3"
    ];

    var currentTrackIndex = 0;

    // Function to play music
    function playMusic() {
        audioPlayer.src = musicTracks[currentTrackIndex];
        audioPlayer.currentTime = 0; // Reset audio playback to the beginning
        audioPlayer.play();

        // Event listener for when current track ends
        audioPlayer.addEventListener("ended", function() {
            // Move to the next track
            currentTrackIndex++;
            // Check if there are more tracks in the array
            if (currentTrackIndex < musicTracks.length) {
                audioPlayer.src = musicTracks[currentTrackIndex];
                audioPlayer.currentTime = 0; // Reset audio playback to the beginning
                audioPlayer.play(); // Play the next track
            } else {
                // If this was the last track, you can perform actions like stopping the player or notifying about end of playlist
                console.log("All tracks played");
            }
        });
    }

    // Event listener for emptyButton to toggle music player visibility
    emptyButton.addEventListener("click", function() {
        if (musicPlayer.style.display === "block") {
            musicPlayer.style.display = "none";
            pauseMusic();
        } else {
            musicPlayer.style.display = "block";
            playMusic(); // Start playing music again when the player is shown
        }
    });

    // Function to pause music
    function pauseMusic() {
        audioPlayer.pause();
    }

    document.addEventListener("DOMContentLoaded", function() {
        // Лайки
        var likeButton = document.getElementById("likeButton");
        var likeCount = 0;
        likeButton.addEventListener("click", function() {
            likeCount++;
            likeButton.textContent = `👍 Лайків (${likeCount})`;
        });

        // Коментарі
        var commentButton = document.getElementById("commentButton");
        commentButton.addEventListener("click", function() {
            var comment = prompt("Введіть свій коментар:");
            if (comment) {
                var commentSection = document.createElement("div");
                commentSection.className = "comment";
                commentSection.textContent = comment;
                document.querySelector(".news-container").appendChild(commentSection);
            }
        });

        // Поділитись
        var shareButton = document.getElementById("shareButton");
        shareButton.addEventListener("click", function() {
            alert("Поділитись не реалізовано в цьому прикладі, але може бути додано подібно до інших кнопок.");
        });
    });

    document.addEventListener("DOMContentLoaded", function() {
        var searchInput = document.getElementById("search");
        var searchButton = document.querySelector(".search-button");
    
        // Обробник події для кнопки пошуку
        searchButton.addEventListener("click", function() {
            var searchText = searchInput.value.trim(); // Отримати текст з поля пошуку, видаливши зайві пробіли
            if (searchText !== "") {
                search(searchText); // Виклик функції пошуку з отриманим текстом
            } else {
                // Якщо поле пошуку порожнє, можна відобразити повідомлення або інше відповідне поведінку
                alert("Будь ласка, введіть текст для пошуку");
            }
        });
    
        // Обробник події для поля пошуку для пошуку при натисканні Enter
        searchInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                var searchText = searchInput.value.trim();
                if (searchText !== "") {
                    search(searchText);
                } else {
                    alert("Будь ласка, введіть текст для пошуку");
                }
            }
        });
    
        // Функція пошуку, яка викликається при введенні тексту і натисканні на кнопку пошуку або Enter
        function search(query) {
            var newsItems = document.querySelectorAll('.news-item'); // Отримуємо всі елементи з класом .news-item
        
            newsItems.forEach(function(newsItem) {
                var textElement = newsItem.querySelector('p'); // Отримуємо елемент <p> в кожному .news-item
        
                var html = textElement.innerHTML; // Оригінальний HTML вміст <p>
                var highlightedHtml = html.replace(new RegExp('(' + query + ')', 'gi'), '<span class="highlighted">$1</span>'); // Заміна тексту на виділений з HTML-класом
        
                textElement.innerHTML = highlightedHtml; // Застосовуємо змінений HTML-вміст
            });
        }
    });
    
    document.addEventListener("DOMContentLoaded", function() {
        var searchInput = document.getElementById("search");
        var searchButton = document.querySelector(".search-button");
    
        // Обробник події для кнопки пошуку
        searchButton.addEventListener("click", function() {
            var searchText = searchInput.value.trim(); // Отримати текст з поля пошуку, видаливши зайві пробіли
            if (searchText !== "") {
                search(searchText); // Виклик функції пошуку з отриманим текстом
            } else {
                // Якщо поле пошуку порожнє, можна відобразити повідомлення або інше відповідне поведінку
                alert("Будь ласка, введіть текст для пошуку");
            }
        });
    
        // Обробник події для поля пошуку для пошуку при натисканні Enter
        searchInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                var searchText = searchInput.value.trim();
                if (searchText !== "") {
                    search(searchText);
                } else {
                    alert("Будь ласка, введіть текст для пошуку");
                }
            }
        });
    
        // Функція пошуку, яка викликається при введенні тексту і натисканні на кнопку пошуку або Enter
        function search(query) {
            var newsItems = document.querySelectorAll('.news-item'); // Отримуємо всі елементи з класом .news-item
    
            newsItems.forEach(function(newsItem) {
                // Пошук і виділення в <h2>
                var titleElement = newsItem.querySelector('h2');
                var originalTitleText = titleElement.textContent;
                titleElement.innerHTML = originalTitleText;
    
                var titleRegex = new RegExp('(' + query + ')', 'gi');
                titleElement.innerHTML = titleElement.innerHTML.replace(titleRegex, '<span class="highlighted">$1</span>');
    
                // Пошук і виділення в <p>
                var textElement = newsItem.querySelector('p');
                var originalText = textElement.textContent;
                textElement.innerHTML = originalText;
    
                var regex = new RegExp('(' + query + ')', 'gi');
                textElement.innerHTML = textElement.innerHTML.replace(regex, '<span class="highlighted">$1</span>');
            });
        }
    });
    
    