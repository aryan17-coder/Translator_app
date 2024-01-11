let langoption = document.querySelectorAll('select');
let fromText = document.querySelector('.fromText');
let transText = document.querySelector('.toTranslate');
let fromVoice = document.querySelector('.from');
let toVoice = document.querySelector('.to');
let cpybtn = document.querySelector('.bx-copy');
let countValue = document.querySelector('.code_length');
let exchangLang = document.querySelector('.bx-transfer');
langoption.forEach((get, con) => {
    for (let countryCode in language) {
        let selected;
        if (con == 0 && countryCode == "en-GB") {
            selected = "selected";

        } else if (con == 1 && countryCode == "hi-IN") {
            selected = "selected";
        }
        let option = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`;
        get.insertAdjacentHTML('beforeend', option);


        }
})

fromText.addEventListener('input', function (){
    let content = fromText.value;
    fromContent = langoption[0].value;
    transContent = langoption[1].value;
    // fromContent = langoption.options[0].value;  // Corrected line
    // transContent = langoption.options[1].value;
    
    let transLINK = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${transContent}`;
    fetch(transLINK).then(translate => translate.json()).then(data => {
        transText.value = data.responseData.translatedText;
        //console.log(data);
    });


})

fromVoice.addEventListener('click', function () {
    let fromTalk;
    fromTalk = new SpeechSynthesisUtterance(fromText.value);
    fromTalk.lang = langoption[0].value;
    speechSynthesis.speak(fromTalk);
})

toVoice.addEventListener('click', function () {
    let fromTalk;
    fromTalk = new SpeechSynthesisUtterance(transText.value);
    fromTalk.lang = langoption[1].value;
    speechSynthesis.speak(fromTalk);
})

cpybtn.addEventListener('click', function () {
    navigator.clipboard.writeText(transText.value);
})

fromText.addEventListener('keyup', function () {
    countValue.innerHTML = `${fromText.value.length}/5000`;
})

exchangLang.addEventListener('click', function () {
    let tempText = fromText.value;
    fromText.value = transText.value;
    transText.value = tempText;

    let tempOpt = langoption[0].value;
    langoption[0].value = langoption[1].value;
    langoption[1].value=tempOpt;
})
