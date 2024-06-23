 const searchBar = document.querySelector("#input");
 const button = document.querySelector("#button");
 const word = document.querySelector("#word");
 const wordType = document.querySelector("#wordType");
 const pronounciation = document.querySelector("#pronounciation");
 const audioIcon = document.querySelector("#audioIcon");
 const definition = document.querySelector("#definition");
 const example = document.querySelector("#example");
 const div = document.querySelector("#div");

button.onclick = () => {
    fetchData();
} 

async function fetchData(){
    userInput = searchBar.value;
    try{
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}/`);
            if(!response.ok){
                throw new Error(error);
            }
            data = await response.json();
            console.log(data);
            div.classList.remove("disappear");
            audioIcon.classList.remove("disappear");
            word.textContent = `${userInput[0].toUpperCase()}${userInput.slice(1).toLowerCase()}`; 
            wordType.textContent = data[0].meanings[0].partOfSpeech;
            data[0].phonetics.length == 1 ? pronounciation.textContent = data[0].phonetics[0].text : pronounciation.textContent = data[0].phonetics[1].text;
            definition.textContent = `Definition: ${data[0].meanings[0].definitions[0].definition}`;
            example.textContent = `Example: ${data[0].meanings[0].definitions[0].example}`;
    }
    catch(error){
        word.textContent = "word not found.";
        console.error("unexpected error.");
        div.classList.add("disappear");
    }
}

audioIcon.addEventListener("click" ,function(e){
    let audio = new Audio(`${data[0].phonetics[0].audio}`);
    audio.play();
})