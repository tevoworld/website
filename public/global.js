function redirect(url) {
  window.location.href = url;
}

localStorage.currentpage = window.location.href;

if (localStorage.name == "") {
  redirect("index.html");
}

window.addEventListener("load", function () {
  var time_text = document.getElementById("time_text");

  if (time_text) {
    function updateLocalTime() {
      var now = new Date();
      var timeString = now.toLocaleTimeString();
      time_text.textContent = timeString;
    }
    setInterval(updateLocalTime, 1000);
  }

  var names = document.getElementsByClassName("name");

  for (var i = 0; i < names.length; ++i) {
    var text = names[i];
    text.innerHTML = localStorage.name;
  }

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
      document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
      elmnt.ontouchstart = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.ontouchend = closeDragElement;
      document.onmousemove = elementDrag;
      document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.ontouchend = null;
      document.onmousemove = null;
      document.ontouchmove = null;
    }
  }

  boxes = document.getElementsByClassName("draggable_box");

  for (let i in boxes) {
    dragElement(boxes[i]);
  }
});
