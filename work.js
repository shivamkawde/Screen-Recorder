let video = document.querySelector("#video");
let stop = document.querySelector("#stop");
let start = document.querySelector("#start");

let chunks = [];

var display = {
    video: {
        cursor: "always"
    },
    audio: false
}



start.addEventListener("click", async function (e) {

    try {
        stream = await navigator.mediaDevices.getDisplayMedia(display);
        //  chunks.push(video.srcObject);
        startRecording(stream)
        video.srcObject = stream
    }
    catch (err) {
        console.log('error');
    }
    //startCap()

})


stop.addEventListener("click", function (e) {
    stopCap()

})




function stopCap(e) {
    let tracks = video.srcObject.getTracks();
    tracks.forEach(tracks => tracks.stop())
    video.srcObject = null;
    console.log(chunks)
}


async function startRecording() {
    // stream = await navigator.mediaDevices.getDisplayMedia({
    //     video: true,
    //     audio:false
    // });
    let recorder = new MediaRecorder(stream);




    const chunks = [];
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = e => {
        const blob = new Blob(chunks, { type: "video/mp4" });
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
