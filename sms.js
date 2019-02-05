$(document).ready(function () {
    var recipient;
    var contacts = [];

    var config = {
        apiKey: "AIzaSyDkQtf0m_J285chLPN33FKzu9S_Qw4mEFI",
        authDomain: "customer-engagement-manager.firebaseapp.com",
        databaseURL: "https://customer-engagement-manager.firebaseio.com",
        projectId: "customer-engagement-manager",
        storageBucket: "customer-engagement-manager.appspot.com",
        messagingSenderId: "213181401102"
    };
    var app = firebase.initializeApp(config);

    // Initialize Cloud Firestore through Firebase
    const db = firebase.firestore(app);

    // Disable deprecated features
    const settings = {
        timestampsInSnapshots: true
    };
    db.settings(settings);

    var MESSAGE_TEMPLATE =
        '<tr>' +
        '<td class="name"></td>' +
        '<td class="contact"></td>' +
        '<td>' +
        '<label>' +
        '<input name="options" type="checkbox" />' +
        '<span></span>' +
        '</label>' +
        '</td>' +
        '</tr>';

    var messageListElement = document.getElementById('summary');
    loadContact = () => {
        db.collection("vendorCallSummary").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${doc.data().name}`);
                displayContacts(doc.id, doc.data().name, doc.data().phoneNo);
                contacts.push(doc.data().phoneNo);
                recipient = contacts.join(",");
            });
        });
    }

    function displayContacts(key, name, phone) {
        var tbody = document.getElementById(key);
        // If an element for that message does not exists yet we create it.
        if (!tbody) {
            var container = document.createElement('tbody');
            container.innerHTML = MESSAGE_TEMPLATE;
            tbody = container.firstChild;
            tbody.setAttribute('id', key);
            messageListElement.appendChild(tbody);
        }
        tbody.querySelector('.name').textContent = name;
        tbody.querySelector('.contact').textContent = phone;
    }
    loadContact();

    document.querySelector(".collapsible-header").addEventListener("click", toggle);

    function toggle() {
        document.querySelector(".collapsible-body").classList.toggle("active")
    }
    // var request = new Request("http://api.smartsmssolutions.com/smsapi.php?username=adepelumi1996@gmail.com&password=sapphire001&balance=true&");
    // fetch(request, {
    //     mode: 'no-cors',
    //     method: "GET",
    // }).then(response => { if (response.ok) { return response.text() } })
    //     .then(balance => alert("balance is:", balance))
    //     .catch(error => console.log(error))

    $('#send').click(function (e) {
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();
        const senderid = $('#senderId').val();
        const message = $('#message').val();
        console.log("message pending");

        url = `http://api.smartsmssolutions.com/smsapi.php?username=${username}
    &password=${password}&sender=${senderid}&recipient=${recipient}&message=${message}`;

        function apiCall(myUrl) {
            $.ajax({
                type: "POST",
                url: myUrl,
                response: "text",
                success: function (response) {
                    alert("message sent successfully");
                },
                error: function (request, status, error) {
                    alert(error);
                }
            });
        }
        apiCall(url);
    })
    $.fn.checkboxMaster = function (list) {
        return this.on('click', function () {
            $(list).prop('checked', $(this).prop('checked'));
            document.getElementById("contactLenght").innerHTML = contacts.length;
        });
    }
    $('#chkSelect').checkboxMaster('input[name=options]');

    // $.fn.elements = function (arr) {
    //     return this.on('click', function () {
    //         $(arr).prop('checked', $(this).prop('checked'));
    //         for (var i = 0; i < elements.lenght; i++) {
    //             elements[i].onclick = function () {
    //                 if (this.checked == true) {
    //                     console.log("checked");
    //                 } else {
    //                     var itemtoRemove = arr[i];
    //                     arr.splice($.inArray(itemtoRemove, arr), 1);
    //                     console.log("recipient");
    //                 }
    //             };
    //         }
    //     });
    // }
    // $('input[name=options]').checkboxMaster(contacts);
})
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'top'
    });
});
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {
        edge: 'left',
        draggable: true
    });

});

document.querySelector(".fixed-action-btn").addEventListener("hover", toggleAction);
document.querySelector(".sidenav-trigger").addEventListener("click", slide);

function toggleAction() {
    document.querySelector(".fixed-action-btn").classList.toggle("activeAction")
}

function slide() {
    document.querySelector(".sidenav").classList.toggle("listslide");
}