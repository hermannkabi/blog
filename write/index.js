import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCHExhBICb909d7nRAb9R3Ce0HtZNNZGrw",
  authDomain: "notes-hermannkabi.firebaseapp.com",
  projectId: "notes-hermannkabi",
  storageBucket: "notes-hermannkabi.appspot.com",
  messagingSenderId: "293200248021",
  appId: "1:293200248021:web:3b41f389538c9bdafa365c",
  measurementId: "${config.measurementId}"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('href');
console.log(id);
var converter = new showdown.Converter();

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}


async function setPost(title, body){
    var date = Date.now();
    var id = makeid(15);
    await setDoc(doc(db, "posts", id), {
      title: title,
      body: body,
      timeToRead: 2,
      date: date,
      postId: id,
    });
}


$(".preview").click(function (){
  if($(".preview").text()==="EELVAADE"){
    var text = $(".post-writer").val();
    $(".post-writer").hide();
    $(".link-box").prepend('<div id="temp-post">'+ converter.makeHtml(text) + '</div>');
    $(".preview").text("TAGASI");
  }else{
    $("#temp-post").remove();
    $(".post-writer").show();
    
    $(".preview").text("EELVAADE");
  }

});


$(".publish").click(function (){
  setPost($(".title").val(), $(".post-writer").val()).then(function (){
    window.location.href = "/";
  });
});
