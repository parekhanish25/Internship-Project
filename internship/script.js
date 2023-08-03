const form = document.querySelector('form');
const resultdiv = document.querySelector('.result');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value);
})
const getWordInfo = async (word) => {
    console.log(word)
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        let v = data[0].meanings[0].definitions[0];
        resultdiv.innerHTML = `
        <h2><strong>Word:</strong>${data[0].word}</h2>
        <p><strong>PartofSpeech:</strong><br>${data[0].meanings[0].partOfSpeech}</p>
        <p><strong>Meaning:</strong><br>${v.definition === undefined ? `<span>Not Found</span>` : v.definition}</p>
        <p><strong>Example:</strong><br>${v.example === undefined ? "Not Found" : v.example}</p>
        <br>
    `;
        if (v.antonyms.length === 0)
            resultdiv.innerHTML += `<strong>Antonyms:</strong><br><span>Not Found</span><br><br>`;
        if (v.synonyms.length === 0)
            resultdiv.innerHTML += `<strong>synonyms:</strong><br><span>Not Found</span>`;
        else {
            resultdiv.innerHTML += `<strong>Antonyms:</strong>`
            for (let i = 0; i < v.antonyms.length; i++) {
                resultdiv.innerHTML += `<li>${v.antonyms[i]}</li>`
            }
            `<br>`
            resultdiv.innerHTML += `<strong>Synonyms:</strong>`
            for (let i = 0; i < v.synonyms.length; i++) {
                resultdiv.innerHTML += `<li>${v.synonyms[i]}</li>`
            }
        }
        resultdiv.innerHTML += `<div><a href=${data[0].sourceUrls} target="_blank">Read More</a></div>`;
    }
    catch (error) {
        resultdiv.innerHTML += `<p>Word Not Found</p>`
    }
}