const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", function() {
    let inpWord = document.getElementById("inp-word").value;

    fetch(`${url}${inpWord}`).then((response) => response.json()).then((data) => {
            console.log(data);
            result.innerHTML = `
        <div class="word">
            <h3>${inpWord}</h3>
            <button onclick="playSound()">
                <i class="fa fa-volume-up" aria-hidden="true"></i>
            </button>
        </div>
        <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>${data[0].phonetic}</p>
        </div>
        <p class="word-meaning">
            ${data[0].meanings[1].definitions[0].definition}
        </p>
        <p class="word-example">
            ${data[0].meanings[0].definitions[0].example || ""}
        </p>`;
            sound.setAttribute("src", `https:${data[0].phonetics[1].audio}`);
            console.log(sound);

        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">coudn't find the word</h3>`
        })
})

function playSound() {

    var playPromise = document.querySelector('audio').play();

    // In browsers that don’t yet support this functionality,
    // playPromise won’t be defined.
    if (playPromise !== undefined) {
        playPromise.then(function() {
            // Automatic playback started!
        }).catch(function(error) {
            // Automatic playback failed.
            // Show a UI element to let the user manually start playback.
        });
    }
}