// Script to open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}
 
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}
var downloadLink;
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var creatorText = document.getElementById("creator");
  var maker = element.getAttribute("data-maker");
  creatorText.innerHTML = maker;
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
  var supportsText = document.getElementById("supports");
  var supports = element.getAttribute("data-supports");
  supportsText.innerHTML = supports;
  var downloadText = document.getElementsByTagName("button");
  downloadLink = element.getAttribute("data-download");
  //downloadText.onclick = window.location.href=download;
}
function downloadNow(){
  window.location.href=downloadLink;
}
var images;
function loadImages(){
  images = Array.from(document.getElementsByTagName("img"))
  images.splice(-1,1)
}
function filterSkinsSupport(filterType){
  for(i in images){
    images[i].classList.remove("hideSupport");
  }
  if(filterType == "new"){
  for(i in images){
    if (images[i].getAttribute("data-supports").includes("8")){
      images[i].classList.add("hideSupport");
    }
  }
}else if(filterType == "old"){
  for(i in images){
    if (images[i].getAttribute("data-supports").includes("X")){
      images[i].classList.add("hideSupport");
    }
  }
}
}
function showFilters(element){
  if (element.innerHTML=="<b>Show Filters</b>"){
  document.getElementById("filters").style.display="block";
  element.innerHTML = "<b>Hide Filters</b>"
} else{
  document.getElementById("filters").style.display="none";
  element.innerHTML = "<b>Show Filters</b>"
}
}
function filterSkinsCreator(filterType){
  
  for(i in images){
    images[i].classList.remove("hideCreator");
  }
  if(filterType!=""){
  for(i in images){
    if(!(images[i].getAttribute("data-maker").includes(filterType))){
      images[i].classList.add("hideCreator")
    }
  }
  }
}
function includeLandscape(element){
  if(element.checked){
    for(i in images){
      if(!(images[i].getAttribute("data-supports").includes("landscape"))){
      images[i].classList.add("hidePortrait")
    }
    }
  }else {
    for(i in images){
      images[i].classList.remove("hidePortrait")
    }
  }
}
var eventHandler = function (event) {
    // Only run for iOS full screen apps
    if (('standalone' in window.navigator) && window.navigator.standalone) {
        // Only run if link is an anchor and points to the current page
        if ( event.target.tagName.toLowerCase() !== 'a' || event.target.hostname !== window.location.hostname || event.target.pathname !== window.location.pathname || !/#/.test(event.target.href) ) return;

        // Open link in same tab
        event.preventDefault();
        window.location = event.target.href;
    }
}
window.addEventListener('click', eventHandler, false);
