const createDate = {
  url: "voiceRecorder.html",
  type: "popup",
  width: 400,
  height: 200
};

chrome.windows.create(createDate);




const stream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });

chrome.windows.create({ url: chrome.runtime.getURL("recorder.html") });

chrome.tabCapture.getMediaStreamId({ targetTabId: tabId }, async (id) => {
  const media = await navigator.mediaDevices.getUserMedia({
    audio: {
      mandatory: {
        chromeMediaSource: "tab",
        chromeMediaSourceId: id,
      },
    },
    video: {
      mandatory: {
        chromeMediaSource: "tab",
        chromeMediaSourceId: id,
      },
    },
  });

  // Continue to play the captured audio to the user.
  const output = new AudioContext();
  const source = output.createMediaStreamSource(media);
  source.connect(output.destination);
});