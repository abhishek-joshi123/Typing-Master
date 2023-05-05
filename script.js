import {str} from './Data.js'

const cont = document.querySelector('.container')
const time = document.querySelector('#Time')
const timer = document.querySelector('.Timer')
const error = document.querySelector('.Error')
const accuracy = document.querySelector('.Accuracy')
const WPM = document.querySelector('.WPM')
const start = document.querySelector('#Start')
const counters = document.querySelector('.counters')
const result = document.querySelector('.Result')
const errorscore = document.querySelector('.ErrorScore')
const wpmscore = document.querySelector('.WPMScore')



const alpahbets = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',  
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'Backspace', ' ', ',', ';', '.', "'", ':', '?', '/', '!', '|', '0'
    , '1', '2', '3', '4', '5', '6', '7', '8', '9'
]


function createSpans(arr) {
    arr.forEach(char => {
        const Span = document.createElement('span')
        Span.innerText = char
        cont.appendChild(Span)
    });
}


async function GetNextText(){
    const data = str
    let i = Math.floor(Math.random() * 10000);
    const Text = data.slice(i, i+200);
    const arr = Text.split('')
    createSpans(arr)
}


let StartTime = 1
let currTime = 1

function startTimer(){
    timer.innerText = currTime
    setInterval(() => {
        timer.innerText = currTime--
    }, 1000)
}

function strartGame() {

    if(flag == false){
        flag = true
        start.remove()
        counters.style.cssText = 'opacity: 1;'
        GetNextText()
        startTimer()
    }
}


function ShowResult() {
    let correctWords = rightchar/5
    let timeleft = StartTime - currTime 
    let wpm = (correctWords/timeleft)*60
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
    WPM.innerText = Math.floor(wpm)

    cont.remove()
    counters.remove()
    result.style.cssText = 'display: block'
    errorscore.innerText = totalErrors
    wpmscore.innerText = Math.floor(wpm)
    document.removeEventListener('keydown', handleClick)
}


let index = 0
let flag = false;
let errorsCount = 0; 
let rightchar = 0; 
let totalchar = 0; 
let totalErrors = 0; 

function handleClick(e) {
    const TypedText = e.key
    if(TypedText == 'Enter'){
        if(time.value == 'No time'){
            StartTime = 0
            currTime = 0
        }
        else{
            StartTime = Number(time.value)
            currTime = Number(time.value)    
        }

        time.remove()
        strartGame()

        setTimeout(() => {
            ShowResult()
        }, StartTime * 1000)
    }
 
    else{

        if(!cont.contains(start)){
            const Spans = cont.querySelectorAll('span')
            let len = Spans.length

            if(index == len-1){
                index = 0
                cont.innerText = ''
                GetNextText()
            }

            let span = Spans[index]
            span.classList.add('active')

            if(index > 0){
                Spans[index-1].classList.remove('active')
            }

            if(alpahbets.includes(TypedText)){

                if(TypedText == 'Backspace'){
                    if(index <= 0){
                        return
                    }
                    
                    if(Spans[index-1].classList.contains('inCorrect')) {
                        errorsCount--;
                        error.innerText = errorsCount
                    }
                    if(Spans[index-1].classList.contains('Correct')) {
                        rightchar--;
                    }
                    
                    index--
                    Spans[index].classList.remove('Correct', 'inCorrect')
                    if(index > 0)
                        Spans[index-1].classList.add('active')
                    span.classList.remove('active')
                    totalchar--
                }
                
                else if(TypedText == ' ' && span.innerText != ' '){
                    return
                }

                else if(TypedText == span.innerText){
                    span.classList.add('Correct')
                    index++
                    totalchar++
                    rightchar++
                }
                else{
                    span.classList.add('inCorrect')
                    errorsCount++
                    totalErrors++
                    error.innerText = errorsCount
                    index++
                    totalchar++
                }
            }
        }

        if(rightchar == 0)
            accuracy.innerHTML = `${0}%`
        else
            accuracy.innerHTML = `${Math.floor((rightchar/totalchar)*100)}%`
        }
        
        let correctWords = rightchar/5
        let timeleft = StartTime - currTime 
        let wpm = (correctWords/timeleft)*60
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
        WPM.innerText = Math.floor(wpm)

}

 
document.addEventListener('keydown', handleClick)

