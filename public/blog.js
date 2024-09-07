var dir = "/blog/"


/* Resort to using arrays next time. */

var pages = ["info", "Test Post"]

function load_post(post) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', post, true);
    xhr.onreadystatechange= function() {
        if (this.readyState!==4) return;
        if (this.status!==200) return; // or whatever error handling you want
        document.getElementById('post_box').innerHTML= this.responseText;
    };
    xhr.send();
};

function load_list() {
    var list_box = document.getElementById("post_list");

    for (page_name in pages) {
        var page = dir + page_name + ".html"

        var new_div = document.createElement('div');
        new_div.className = 'blog_list_entry';
        list_box.appendChild(new_div);

        var new_title = document.createElement('h4');
        new_title.innerHTML = page_name;
        new_div.appendChild(new_title);

        new_div.addEventListener('click', function (event) {
        load_post(page);
        });
    };
     
};
load_list();