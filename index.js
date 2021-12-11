import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getFirestore, getDocs, collection, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
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

async function getBlogPosts(){
  var posts = await getDocs(query(collection(db, "posts")), orderBy("date", "desc"));

  posts.forEach((doc) => {
    var data = doc.data();
    var title = data.title;
    var timeToRead = data.timeToRead;
    const options = { weekday: undefined, year: 'numeric', month: '2-digit', day: '2-digit' };
    var date = new Date(data.date);
    var formattedDate = date.toLocaleDateString('et', options);
    console.log(date);
    var postTemplate = 
    `
    <div class="blog-post-thumbnail">

    <a class="link" href="posts?href=`+data.postId+`">`+title.toUpperCase()+`</a>
    <br>
    <p class="project-text inline">`+timeToRead+` MIN READ</p>
    <p class="inline">•</p>
    <p class="float-right inline">`+formattedDate+`</p>
    <br><br><br>
    
    </div>
    `;
    
    $(".posts").append(postTemplate);
    
  });

}




getBlogPosts();
