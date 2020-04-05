const colors = ['green', 'yellow', 'blue', 'red', 'black']
const colorsText = ['verde', 'amarelo', 'azul', 'vermelho', 'preto']

let curColor = {
    text: '',
    color: '', 
    answer: ''
}


const h1Color = document.querySelector('.content h1')
const h5Timer = document.querySelector('.content div h5')
const h5Score = document.querySelector('.buttonMenu h5')
const h2Msg = document.querySelector('.content div h2')

let score = 0

let timeLimit = 2
let time = 0
let timer

const recognition = new webkitSpeechRecognition()
recognition.interimResults = true
recognition.lang = 'pt-BR'
recognition.continuous = true
//recognition.onresult = checkAnswer(event)

recognition.onresult = function (event) {

    var i = event.resultIndex

    if (event.results[i].isFinal) {
        const words = event.results[i][0].transcript.split(' ')

        //console.log(words)

        words.forEach(word => {

            //console.log(curColor.answer.toLowerCase() + ' == ' + word.toLowerCase())
            if (curColor.answer.toLowerCase() == word.toLowerCase()){
                
                score++
                h5Score.innerHTML = score
                
                h2Msg.innerHTML = 'ACERTOU!!!'
            } else {
                h2Msg.innerHTML = ''
            }
            
        });


    }
    //console.log(event)

}



function startGame(){
    
    h5Score.innerHTML = score

    timer = setInterval(() => {

        if (time == 0){
            
            curColor = getColor()
            setColor(curColor)
            time = timeLimit

        } else {
            time--
        }
    
        setTimer(time)
    
    }, 1000)
            
    recognition.start()

}

function stopGame(){
    clearInterval(timer)
    
    recognition.stop()
}


function checkAnswer(event){

    console.log(event)

}

function getColor(){

    const colorsIndex = Math.floor(Math.random() * (colors.length - 0) + 0)

    const color = colors[colorsIndex]
    const answer = colorsText[colorsIndex]

    const text = colorsText[Math.floor(Math.random() * (colors.length - 0) + 0)]

    return {text, color, answer}
}



function setColor(colors){
    h1Color.innerHTML = colors.text
    h1Color.style.color = colors.color
}

function setTimer(time){
    h5Timer.innerHTML = time
}






