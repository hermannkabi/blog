import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getFirestore, deleteDoc, doc, getDocs, collection, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
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

async function deleteDraft(draftId){
  var post = doc(db, "drafts", draftId);
  await deleteDoc(post);
  await getBlogPosts();
}


async function getBlogPosts(){
  var posts = await getDocs(query(collection(db, "drafts")), orderBy("date", "desc"));
  $(".posts").empty();
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

    <a class="link" href="/write?id=`+data.postId+`">`+title.toUpperCase()+`</a>
    <br>
    <p class="project-text inline">`+timeToRead+` MIN READ</p>
    <p class="inline">•</p>
    <p class="float-right inline">`+formattedDate+`</p>
    <a id=`+data.postId+` class="link float-right inline delete-link" style="color:red; font-size: 16px">Delete</a>

    <br><br><br>
    
    </div>
    `;
    
    $(".posts").append(postTemplate);
    
  });
  $(".delete-link").click(function (){
    var postId = $(this).attr("id");
    if(confirm("Are you sure you want to delete this post?")){
      deleteDraft(postId);
    }
  });

}








function checkPassword(){
  var passwordEntered = prompt("Salasõna");
  if(passwordEntered == "hermann"){
    getBlogPosts();

    

  }else {
    checkPassword();
  }
}

checkPassword();