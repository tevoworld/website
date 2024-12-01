function redirect(url) {
    window.location.href = url;
}

localStorage.currentpage = window.location.href


if (localStorage.name == "") {
    redirect("index.html")
}

window.addEventListener('load', function () {
    var names = document.getElementsByClassName('name');

    for (var i = 0; i < names.length; ++i) {
        var text = names[i];  
        text.innerHTML = localStorage.name
    }
})
