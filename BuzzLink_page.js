//Agrega TUS ANLACES DE FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyCg6cRoxb2MxLsQtk6DsHHwlAlAOFoc-8w",
    authDomain: "buzzlink123456.firebaseapp.com",
    databaseURL: "https://buzzlink123456-default-rtdb.firebaseio.com",
    projectId: "buzzlink123456",
    storageBucket: "buzzlink123456.appspot.com",
    messagingSenderId: "119355135183",
    appId: "1:119355135183:web:4525d0443d8afa661ad3ba"
  };   

firebase.initializeApp(firebaseConfig);


//almacenamos dentro de las variables
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

//función Send
function send() {
  msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
      name:user_name,
      message:msg,
      like:0
      })
      // actualizamos el valor del cuadro de entrada del mensaje a vacío
      document.getElementById("msg").value = "";
  }

 // actualizamos el valor del cuadro de entrada del mensaje a vacío



function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Inicia código
console.log(firebase_message_id);

name = message_data["name"];
message = message_data["message"];
like = message_data["like"];
name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

      row = name_with_tag + message_with_tag +like_button + span_with_tag;       
      document.getElementById("output").innerHTML += row;
//Termina código
      } });  }); }
getData();
function updateLike(message_id){
  buttton_id = message_id;
  like = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;

  firebase.database().ref(room_name).child(message_id).update({ like : updated_likes });
}
function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_name");
    window.location.replace("index.html");
    }
    
    