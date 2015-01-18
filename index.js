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

function onRecogStart() {
  console.log("Recog started");
}

function onRecogError() {
  console.log(arguments);
}

function initRecog(options) {
  console.log("Recog starting");

  getRecog(options)
    .start();
}

function getRecog(options) {
  var recog = new webkitSpeechRecognition();

  recog.continuous = true;
  recog.onresult = options.onResults;
  recog.onstart = onRecogStart;
  recog.onerror = onRecogError;
  recog.onend = initRecog;

  return recog;
}

function onResults(event) {
  if (!event.results || event.results.length === 0) {
    return;
  }

  _.each(event.results, eachResult);
}

function eachResult(result) {
  _.each(result, eachAlternative);
}

function eachAlternative(alternative) {
  console.log(alternative);
}

initRecog({
  onResults: onResults
});
initSynth();
