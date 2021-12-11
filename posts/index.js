import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
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

async function getBlogPosts(){

  var post = await getDoc(doc(db, "posts", id));
  if(post.exists()){
    var data = post.data();
  
    var title = data.title;
    var timeToRead = data.timeToRead;
    const options = { weekday: undefined, year: 'numeric', month: '2-digit', day: '2-digit' };
    var date = new Date(data.date.seconds*1000);
    var formattedDate = date.toLocaleDateString('et', options); 
    var converter = new showdown.Converter();
    $(document).ready(function (){
      $("#title").text(title);
      $(".link-box").append(converter.makeHtml(data.body));
    });
  }else{
    console.log("Does not exist");
    $("#title").text("VIGA");

    $(".link-box").append('<p>Vabandust, ei leitud sellist postitust. Soovi korral <a href="/contact">võta ühendust</a></p>');
  }
 

}




getBlogPosts();
