var dir = "/blog/"


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
    console.log("Loading list...")
    var list_box = document.getElementById("post_list");
    console.log(list_box)

    $.ajax({url: dir}).then(function(html) {
        var ndocument = $(html);
        console.log(ndocument)

        ndocument.find('a[href$=".html"]').each(function() {
            var Name = $(this).attr('title').slice(0, $(this).attr('title').lastIndexOf('.'));
            console.log(Name)
            var Url = $(this).attr('href');
            
            var new_div = document.createElement('div');
            new_div.className = 'blog_list_entry';
            list_box.appendChild(new_div);

            var new_title = document.createElement('h4');
            new_title.innerHTML = Name;
            new_div.appendChild(new_title);

            new_div.addEventListener('click', function (event) {
                load_post(Url);
            });
        });
    });
     
};
load_list();