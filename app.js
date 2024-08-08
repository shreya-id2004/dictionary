

const input = document.querySelector('#input');
const btn = document.querySelector('#search');
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const def = document.querySelector('.def');
const audio = document.querySelector('.audio');
const not = document.querySelector('.not_found');

btn.addEventListener('click', async function(e){
    e.preventDefault();
    console.log(await getword());
});

async function getword(){
    try {
        let word = input.value;
        let res = await axios.get(`${url}${word}`);

        if (res.data && res.data.length > 0) {
            let data = res.data[0];
            console.log(data)
            let meaning = data.meanings[0]?.definitions[0]?.definition;
            let example = data.meanings[0].definitions[0]?.example ;
            let synonyms = data.meanings[0].synonyms.slice(0,3);
            let audioUrl = data.phonetics[0]?.audio;

            def.innerHTML = `<b>${meaning}</b> </br> <b>example:</b> ${example} <br> <b>synonyms :</b> ${synonyms}`|| 'Definition not found';
            
            audio.innerHTML = audioUrl ? `<audio controls src="${audioUrl}"></audio>` : '';
            not.textContent = ''; // Clear the not found message
        } else {
            throw new Error('No data found');
        }
    } catch (e) {
        console.log("error", e);
        def.textContent = '';
        audio.innerHTML = '';
        not.textContent = 'No words are available or there was an error fetching the data.';
    }
}