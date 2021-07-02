let video = document.querySelector("#video");
let stop = document.querySelector("#stop");
let start = document.querySelector("#start");
// let startR = document.querySelector("#startR");
// let stopR = document.querySelector("#stopR");

let chunks = [];

var display = {
    video: {
        cursor: 'always'
    },
    Audio: true
}



start.addEventListener("click", function (e) {
    startCap()
    startRecording()
})


stop.addEventListener("click", function (e) {
    stopCap()

})

async function startCap(e) {
    try {
        video.srcObject = await navigator.mediaDevices.getDisplayMedia(display);
        //  chunks.push(video.srcObject);

    }
    catch (err) {
        console.log('error');
    }
}



function stopCap(e) {
    let tracks = video.srcObject.getTracks();
    tracks.forEach(tracks => tracks.stop())
    video.srcObject = null;
    console.log(chunks)
}


async function startRecording() {
    stream = await navigator.mediaDevices.getDisplayMedia(display);
    let recorder = new MediaRecorder(stream);




    const chunks = [];
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = e => {
        const blob = new Blob(chunks, { type: chunks[0].type });
        console.log(blob);
        stream.getVideoTracks()[0].stop();

        filename = "yourCustomFileName"
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
        }
        else {
            var elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
        }
    };
    recorder.start();


}
