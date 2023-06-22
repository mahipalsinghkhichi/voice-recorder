const focusedWindow = () => {
  chrome.windows.getCurrent({}, w => {
    chrome.windows.update(w.id, { focused: true });
  });
}

const voiceRecorder = () => {
  const record = document.getElementById("record");
  const stop = document.getElementById("stop");
  const audio = document.getElementById("audio");

  const constraints = { audio: true };
  let chunks = [];

  const onSuccess = (stream) => {
    const mediaRecorder = new MediaRecorder(stream);

    record.onclick = () => {
      mediaRecorder.start();
      record.style.background = "red";

      stop.disabled = false;
      record.disabled = true;
    }

    stop.onclick = () => {
      mediaRecorder.stop();
      record.style.background = "";
      record.style.color = "";

      stop.disabled = true;
      record.disabled = false;
    }

    mediaRecorder.onstop = (e) => {
      const blob = new Blob(chunks, { "type": "audio/ogg; codecs=opus" });
      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
    }

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    }
  }

  const onError = (err) => {
    console.log(err);
  }

  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
}

focusedWindow();
voiceRecorder();