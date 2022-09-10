const displayText = document.querySelector('textarea')
const speedBtn = document.querySelector('input[type="number"]')
const readBtn = document.querySelector('.read')
const pauseBtn = document.querySelector('.pause')
const stopBtn = document.querySelector('.stop')
let currentChar



function readText(testText) {
    if (speechSynthesis.paused && speechSynthesis.speaking) {
        return speechSynthesis.resume()
    }

    if (speechSynthesis.speaking) return

    utterance.text = testText
    utterance.rate = speedBtn.value || 1
    displayText.disabled = true
    speechSynthesis.speak(utterance)
}

function pauseText() {
    if (speechSynthesis.speaking) speechSynthesis.pause()
}

function stopText() {
    speechSynthesis.resume()
    speechSynthesis.cancel()
}

function speedText() {
    stopText()
    readText(utterance.text.substring(currentChar))
}



const utterance = new SpeechSynthesisUtterance()

utterance.addEventListener('end', function() {
    displayText.disabled = false
})
utterance.addEventListener('boundary', function(e) {
    currentChar = e.charIndex
})

readBtn.addEventListener('click', function() {
    readText(displayText.value)
})
pauseBtn.addEventListener('click', pauseText)
stopBtn.addEventListener('click', stopText)
speedBtn.addEventListener('input', speedText)