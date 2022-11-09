    var prediction = "";
    var gesture = "";
    Webcam.set({
        width:350,
        height:300,
        image_format:'png',
        png_quality:90
    });

  camera = document.getElementById("camera");

  Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/hEvpPAaAG/model.json', modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!')
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);    
}

function gotResult(error, results){
   
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction = document.getElementById("result_object_name").innerHTML = results[0].label;
        gesture = results[0].label;
        if(gesture == "Ok"){
            document.getElementById("gesture_icon").innerHTML = "&#128077";
        }
        else if(gesture == "Peace"){
            document.getElementById("gesture_icon").innerHTML = "&#9996";
        }
        else if(gesture == "Perfect"){
            document.getElementById("gesture_icon").innerHTML = "&#128076";
        }
        else if(gesture == "Rock N' Roll"){
            document.getElementById("gesture_icon").innerHTML = "&#129304";
        }
        speak();
        }
    }


function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
  }
