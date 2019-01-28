// Initialize Firebase
var config = {
    apiKey: "AIzaSyCxyqOXzuvtsGMMemiIVfOIgnSnj9BF6v4",
    authDomain: "aiiburtel-5a752.firebaseapp.com",
    databaseURL: "https://aiiburtel-5a752.firebaseio.com",
    projectId: "aiiburtel-5a752",
    storageBucket: "aiiburtel-5a752.appspot.com",
    messagingSenderId: "39758121316"
};
var app = firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore(app);

// Disable deprecated features
const settings = { timestampsInSnapshots: true };
db.settings(settings);

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'left',
        hoverEnabled: false
    });
});
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {
        edge: 'left',
        draggable: true
    });
});
// let commissionRate = [];

document.querySelector(".collapsible-header").addEventListener("click", toggle);
document.querySelector(".sidenav-trigger").addEventListener("click", slide);

function toggle() {
    document.querySelector(".collapsible-body").classList.toggle("active");
}
loadMessages = () => {
    db.collection("commission").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().prodct}`);
            displayMessage(doc.id, doc.data().prodct, doc.data().percent)
            // let obj = {
            //     name: doc.data().prodct, pcnt: doc.data().percent
            // }
            // commissionRate.push(obj);
        });

    });
}
loadMessages();
document.getElementById("btn").addEventListener("click", (e) => {
    e.preventDefault();
    let product = document.getElementById("pro").value;
    let percent = document.getElementById("per").value;

    db.collection("commission").add({
        prodct: product,
        percent: percent
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById("form").reset();
            loadMessages();

        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
            alert("unable to saved, check internet connection")
        });
});

function slide() {
    document.querySelector(".sidenav").classList.toggle("listslide");
}



var MESSAGE_TEMPLATE =
    '<tr class="highlight">' +
    '<td class="product"></td>' +
    '<td class="perct"></td>' +
    '</tr>'
    ;

// Displays a commission in the UI.
function displayMessage(index, product, percentage) {
    var tbody = document.getElementById(index);
    // If an element for that message does not exists yet we create it.
    if (!tbody) {
        var container = document.createElement('tbody');
        container.innerHTML = MESSAGE_TEMPLATE;
        tbody = container.firstChild;
        tbody.setAttribute('id', index);
        messageListElement.appendChild(tbody);
    }

    tbody.querySelector('.product').textContent = product;
    tbody.querySelector('.perct').textContent = percentage;


}
var messageListElement = document.getElementById('commissions');

// loadCommission = (...args) => {
//     args.map(comm => {
//         for (i = 0; i < comm.length; i++)
//             displayMessage(i, comm[i].name, comm[i].pcnt)
//     })

// }
// loadCommission(commissionRate);