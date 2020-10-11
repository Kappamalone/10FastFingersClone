/*===========GLOBAL VARS===========*/
wordCounter = 1; //used to access the current word
wordsPerPage = 3; //how many words per page displayed to user
wordBatchFinished = false; //determine if words per page has been completed
wordCorrect = true //determine if word entered was correct (going the extra mile to mimic 10FastFingers here =.=)

console.log(wordCounter)

/*===========DOM FUNCTIONS===========*/
function handleInput(){
    //compare both words to highlight either green or red
    let currentTyped = document.getElementById('inputText').value
    let currentWord = getCurrentWord().textContent
    let correctFlag = true //Whether or not what is typed is actually correct

    if (currentTyped){ //Make sure theres actually something there in the field
        correctFlag = verifyInput(currentTyped,currentWord)
        console.log(correctFlag)

        //Manipulate color of current word
        if (!correctFlag){ //TODO: Look to changing the background
            getCurrentWord().style.color = 'red'
            wordCorrect = false
        } else {
            //Remove color if all text deleted
            getCurrentWord().style.color = 'black'
        }
    }
}

function wordEntered(){
    if (event.key === 'Enter'){
        //Handles setting color of word entered
        //TODO: Look to changing the background
        if (wordCorrect){
            getCurrentWord().style.color = 'green'
        }

        wordCorrect = true

        //Handles wrapping of the word counter
        wordCounter += 1
        if (wordCounter > wordsPerPage){
            wordCounter %= wordsPerPage
            wordBatchFinished = true //TODO: change word batch
            //TODO: remove all css from word1 -> wordsPerPage
        }
        console.log(wordCounter)

        document.getElementById('inputText').value = '' //Reset input
    }
}


/*===========HELPER FUNCTIONS===========*/
function randWords(){
    //Read text file of 200 words and return
    //10 random words
}

function getCurrentWord(){
    //gets current word
    let currWord = document.getElementById('word'+String(wordCounter))
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