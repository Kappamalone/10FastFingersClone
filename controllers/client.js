/*===========GLOBAL VARS===========*/
wordCounter = 1; //used to access the current word
wordsPerPage = 3; //how many words per page displayed to user
wordBatchFinished = false; //determine if words per page has been completed

console.log(wordCounter)

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
        if (!correctFlag){
            currentWord.style.backgroundColor = 'red'
        } else {
            currentWord.style.backgroundColor = 'transparent'
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
                wordBatchFinished = true //TODO: change word batch
                //TODO: remove all css from word1 -> wordsPerPage
                resetCSS()
            }
            console.log(wordCounter)
    
            document.getElementById('inputText').value = '' //Reset input
        }
    }
}


/*===========HELPER FUNCTIONS===========*/
function randWords(){
    //Read text file of 200 words and return
    //10 random words
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