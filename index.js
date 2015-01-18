var voices = [];

function onVoicesChanged() {
  voices = window.speechSynthesis.getVoices();
}

function getVoice() {
  return voices[Math.floor(Math.random() * voices.length)];
}

function onMessage(text) {
  var utterance = new SpeechSynthesisUtterance(text);

  utterance.voice = getVoice();

  window.speechSynthesis.speak(msg);
}

function initSynth() {
  window.speechSynthesis.onvoiceschanged = onVoicesChanged;
}

function onRecogResult(event) {
  console.log("%c" + event.results[event.results.length - 1][0].transcript, "color: blue");
}

function onRecogStart() {
  console.log("Recog started");
}

function onRecogError() {
  console.log(arguments);
}

function initRecog() {
  console.log("Recog starting");

  getRecog()
    .start();
}

function getRecog() {
  var recog = new webkitSpeechRecognition();

  recog.continuous = true;
  recog.onresult = onRecogResult;
  recog.onstart = onRecogStart;
  recog.onerror = onRecogError;
  recog.onend = initRecog;

  return recog;
}

initRecog();
initSynth();
