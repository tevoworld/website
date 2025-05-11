const time_gate = document.querySelector(".time_gate_body")

window.addEventListener("load", function () {
    if (localStorage.time_gate_target == null || localStorage.time_gate_target == "") {
        window.location.href = "index.html"
    } else {
        window.location.href = localStorage.time_gate_target
        localStorage.time_gate_target = ""
    }
})