import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getFirestore, setDoc, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
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
const id = urlParams.get('id');
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


//Saving and drafts
//Drafts get their own Firestore collection (e.g. document 'drafts/CODE/')
//When saving a draft for the first time, create a unique id like for publishing
//Add that code to URL (e.g /write?id=CODE)
//When JS detects a code in the URL, it tries to load data from that document
//Saving a draft again saves it under that code



async function loadPost(){
  var docSnap = await getDoc(doc(db, "drafts", id));
  if(docSnap.exists()){
    var title = docSnap.data().title;
    var body = docSnap.data().body;

    $(".title").val(title);
    $(".post-writer").val(body);
  }
}

if(id) loadPost();

async function setPost(title, body){
    var date = Date.now();
    var id = makeid(15);
    await setDoc(doc(db, "posts", id), {
      title: title,
      body: body,
      timeToRead: Math.ceil(body.length / 1250),
      date: date,
      postId: id,
    });
}

async function saveAsDraft(title, body){
  var date = Date.now();
  if(id){
    //Save to that id
    await updateDoc(doc(db, "drafts", id), {
      title: title,
      body: body,
      timeToRead: 0,
      date: date,
      postId: id,
    });
    return;
  }
  //Create a new id and set the doc
  var newId = makeid(15);
  await setDoc(doc(db, "drafts", newId), {
    title: title,
    body: body,
    timeToRead: 2,
    date: date,
    postId: newId,
  });
  window.location.href = "?id="+newId;
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

$(".draft").click(function (){
  saveAsDraft($(".title").val(), $(".post-writer").val());
});

function checkForScreenSize(){
  if($(window).width() <= 1000){
    //Too small to write a blog post, show error page
    $(".mobile-error").show();
    $(".wrapper").hide();
  }else{
    $(".mobile-error").hide();
    $(".wrapper").show();
  }
}

$(window).resize(function (){
  checkForScreenSize();
});



//This is needed to check the size when the page loads, as resize is not called
checkForScreenSize();