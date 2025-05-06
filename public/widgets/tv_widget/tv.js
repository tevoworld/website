var cube = document.querySelector('.cube');
var body = document.querySelector('.tv_body');
var mouse_pos;
var current_anim = '';

function do_anim(anim) {;
  if ( current_anim ) {
    cube.classList.remove(current_anim);
  };
  cube.classList.add(anim);
  current_anim = anim;
}

cube.addEventListener("animationend", function(event) {
  switch (event.animation_name) {
    default:
      do_anim("tv_idle");
      break;
  }
});

window.onload = function() {
  do_anim("start_opening");
  
  body.classList.add("show");

};


const cube_bounding_rect = cube.getBoundingClientRect();
const cube_center = {
    x: cube_bounding_rect.left + cube_bounding_rect.width / 2,
    y: cube_bounding_rect.top + cube_bounding_rect.height / 2
};

const vertical_angle_limit = 25
const horizontal_angle_limit = 45

cube.style.setProperty('--look-angle-x', "0deg")
cube.style.setProperty('--look-angle-y', "0deg")

window.top.addEventListener('mousemove', function(event) {
    cube.style.setProperty('--look-angle-x', `${Math.min(Math.max(-vertical_angle_limit, Math.atan2(-(event.pageY - cube_center.y), window.top.innerWidth / 2) * (180 / Math.PI)), vertical_angle_limit)}deg`);
    cube.style.setProperty('--look-angle-y', `${Math.min(Math.max(-horizontal_angle_limit, Math.atan2(event.pageX - cube_center.x, window.top.innerHeight / 2) * (180 / Math.PI)), horizontal_angle_limit)}deg`);
}, true);
