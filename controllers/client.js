/*===========GLOBAL VARS===========*/
wordCounter = 1; //used to access the current word
wordsPerPage = 9; //how many words per page displayed to user
wordBatch = null

/*===========DOM FUNCTIONS===========*/
function handleInput(){
    //compare both words to highlight either green or red
    let currentTyped = document.getElementById('inputText').value
    let currentWord = getCurrentWord(wordCounter)
    let correctFlag = true //Whether or not what is typed is actually correct

    if (currentTyped){ //Make sure theres actually something there in the field
        correctFlag = verifyInput(currentTyped,currentWord.textContent)
        console.log(correctFlag)

        //Manipulate background of current word
        if (correctFlag){
            currentWord.style.backgroundColor = 'grey'
        } else {
            currentWord.style.backgroundColor = 'red'
        }
    } else {
        //Remove color if all text deleted
        currentWord.style.backgroundColor = 'transparent'
    }
}

function wordEntered(){
    let currentTyped = document.getElementById('inputText').value
    let currentWord = getCurrentWord(wordCounter)
    if (currentTyped){
        if (event.key === 'Enter'){
            //Handles setting color of word entered
            currentWord.style.backgroundColor = 'transparent'
            if (currentTyped === currentWord.textContent){
                currentWord.style.color = 'green'
            } else {
                currentWord.style.color = 'red'
            }
    
            //Handles wrapping of the word counter
            wordCounter += 1
            if (wordCounter > wordsPerPage){
                wordCounter %= wordsPerPage

                resetCSS() //resets css of word components
                setWordBatch(randWords()) //sets a new batch of words
            }
            console.log(wordCounter)
    
            document.getElementById('inputText').value = '' //Reset input
        }
    }
}

/*===========VUE COMPONENTS===========*/

Vue.component('type-word', {
    //Takes word data and renders to screen
    props: ['words'],
    template: "<span class = 'mr-5'>{{words.text}}</span>"
})

var app = new Vue({
    el: '#app',
    data: {
      wordBatchData: wordBatch
    }
})


/*===========HELPER FUNCTIONS===========*/
function readWordFile(){
    //Read textfile into memory
    let filePath = '../model/wordList.txt'
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filePath, false);
    rawFile.onreadystatechange = function ()
    {
        if (rawFile.readyState === 4)
        {
            if (rawFile.status === 200 || rawFile.status == 0)
            {
                document.textfile = rawFile.responseText.split('\n');
            }
        }
    }
    rawFile.send(null);
    setWordBatch(randWords())
}

function randWords(){
    //Read text file of 1000 words and return
    //9 random words
    let randWordList = []
    for (let i = 0; i < wordsPerPage; i++){
        let randWord = document.textfile[Math.floor(Math.random() * document.textfile.length)].trim() //remember to trim whitespace!
        randWordList.push({id: i, text: randWord})
    }
    console.log(randWordList)
    return randWordList
}

function getCurrentWord(index){
    //gets current word
    let currWord = document.getElementById('word'+String(index))
    return currWord
}

function verifyInput(currentTyped, currentWord){
    //checks if what is inputted and current word is correct
    for (let i = 0; i < currentTyped.length; i++){
        if (currentTyped[i] != currentWord[i]){
            return false
        }
    }
    return true
}

function resetCSS(){
    //Reset CSS of the finished batch of words
    for (let i = 0; i < wordsPerPage; i++){
        let element = document.getElementById('word'+String(i+1)) 
        element.style.color = 'black'
    }
}

function setWordBatch(wordList){
    //Set vue word data to new wordlist
    app.wordBatchData = wordList
}