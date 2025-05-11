function redirect(url) {
  window.location.href = url;
}

localStorage.currentpage = window.location.href;

if (localStorage.name == null || localStorage.name == "") {
  redirect("index.html");
}

function trigger_time_gate(e) {
  localStorage.time_gate_target = e.target.getAttribute("time_gate_target");
  redirect("time_gate.html");
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

  var draggable_controller = new AbortController;

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "_header")) {
      document.getElementById(elmnt.id + "_header").addEventListener("mousedown", dragMouseDown);
      document.getElementById(elmnt.id + "_header").addEventListener("touchstart", dragMouseDown);
    } else {
      elmnt.addEventListener("mousedown", dragMouseDown);
      elmnt.addEventListener("touchstart", dragMouseDown);
    }

    function dragMouseDown(e) {
      e.preventDefault();
      if (e.type == "touchmove") {
        pos3 = e.changedTouches[0].clientX;
        pos4 = e.changedTouches[0].clientY;
      } else {
        pos3 = e.clientX;
        pos4 = e.clientY;
      }
      document.addEventListener("mouseup", closeDragElement, { signal: draggable_controller.signal, passive: false });
      document.addEventListener("touchend", closeDragElement, { signal: draggable_controller.signal, passive: false });
      document.addEventListener("mousemove", elementDrag, { signal: draggable_controller.signal, passive: false });
      document.addEventListener("touchmove", elementDrag, { signal: draggable_controller.signal, passive: false });
    }

    function elementDrag(e) {
      e.preventDefault();
      if (e.type == "touchmove") {
        pos1 = pos3 - e.changedTouches[0].clientX;
        pos2 = pos4 - e.changedTouches[0].clientY;
        pos3 = e.changedTouches[0].clientX;
        pos4 = e.changedTouches[0].clientY;
      } else {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
      }
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      draggable_controller.abort();
      draggable_controller = new AbortController;
    }
  }

  boxes = document.getElementsByClassName("draggable_box");

  for (let i = 0; i < boxes.length; i++) {
    dragElement(boxes[i]);
    
  }

  time_gates = document.getElementsByClassName("time_gate");

  for (let i = 0; i < time_gates.length; i++) {
    time_gates[i].addEventListener("mousedown", trigger_time_gate);
    time_gates[i].addEventListener("touchstart", trigger_time_gate);
  }
});
