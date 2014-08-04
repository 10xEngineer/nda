

var wrapper = document.getElementById("discloser_signature"),
    clearButton = wrapper.querySelector("[data-action=clear]"),
    saveButton = wrapper.querySelector("[data-action=save]"),
    canvas = wrapper.querySelector("canvas"),
    form = document.getElementById("form"),
    console.log('in signature pad');
    signaturePad;

function resizeCanvas() {
    var ratio =  window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

signaturePad = new SignaturePad(canvas);

clearButton.addEventListener("click", function (event) {
    signaturePad.clear();
    alert("Does not submit the form");
    return false;
});

saveButton.addEventListener("click", function (event) {
    if (signaturePad.isEmpty()) {
        alert("Please provide signature first.");
    } else {
        alert(signaturePad.toDataURL());
        alert("Does not submit the form");
    }
    return false;
});

form.onsubmit = function () { 
    var imageData = signaturePad.toDataURL();
    alert(imageData);
    alert("Does not submit the form");
    return false; 
};