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
var captionText;
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var creatorText = document.getElementById("creator");
  var maker = element.getAttribute("data-maker");
  creatorText.innerHTML = maker;
  captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
  
  var supportsText = document.getElementById("supports");
  var supports = element.getAttribute("data-supports");
  supportsText.innerHTML = supports;
  var downloadText = document.getElementsByTagName("button");
  downloadLink = element.getAttribute("data-download");
  if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    var likeButton = document.getElementById("likeButton");
    likeButton.dataset.skinname = element.alt;
    likeButton.style.display = "";
    localStorage.captionText="1";
    if (localStorage.captionText){
      if(localStorage.captionText=="1"){
        likeButton.src="logos/liked.png"
      }
    }
  }
}
function downloadNow(){
  var url = decodeURIComponent(window.location.href).toString();
  if ((url.indexOf("?") > -1)){
     indexOfQ = url.indexOf("?");
    if (indexOfQ > 0)
       url = url.substring(0, indexOfQ);
  }
        url = url + '?name=' + downloadLink;
        document.location.href = url;
}
  //window.location.href=downloadLink;
  function trackedDownload() {
    var url = decodeURIComponent(document.location.href)
    if (url.indexOf("?") > -1){
        params = url.split('?')
        console.log(params);
        goDownload = params[1].toString();
        document.location.href = goDownload.substring(5,goDownload.length);
    }
  }
var images;
function loadImages(){
  trackedDownload();
  firebase();
  images = Array.from(document.getElementsByTagName("img"))
  images.splice(-2,2);
  sortBy("newold");
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
function sortBy(sort){
  if (sort == "newold"){
    var sortedImages = Array.from(document.getElementsByTagName("img"));
    sortedImages.splice(-2,2);
    sortedImages.sort(function(a,b){
      var contentA =parseInt(a.dataset.added,10);
      var contentB =parseInt(b.dataset.added,10);
      return (contentB - contentA);
    });
    var unsortedImages = Array.from(document.getElementsByTagName("img"));
    unsortedImages.splice(-2,2);
    const attrs = sortedImages.map(node => ({
      src: node.src,
      alt: node.alt,
      download: node.dataset.download,
      added: node.dataset.added,
      supports: node.dataset.supports,
      maker: node.dataset.maker,
    }))
    
    attrs.forEach((item, i) => {
      unsortedImages[i].src = item.src;
      unsortedImages[i].alt = item.alt;
      unsortedImages[i].dataset.download = item.download;
      unsortedImages[i].dataset.added = item.added;
      unsortedImages[i].dataset.supports = item.supports;
      unsortedImages[i].dataset.maker = item.maker;
    })
  } else if (sort == "oldnew"){
    var sortedImages = Array.from(document.getElementsByTagName("img"));
    sortedImages.splice(-2,2);
    sortedImages.sort(function(a,b){
      var contentA =parseInt(a.dataset.added,10);
      var contentB =parseInt(b.dataset.added,10);
      return (contentA - contentB);
    });
    var unsortedImages = Array.from(document.getElementsByTagName("img"));
    unsortedImages.splice(-2,2);
    const attrs = sortedImages.map(node => ({
      src: node.src,
      alt: node.alt,
      download: node.dataset.download,
      added: node.dataset.added,
      supports: node.dataset.supports,
      maker: node.dataset.maker,
    }))
    
    attrs.forEach((item, i) => {
      unsortedImages[i].src = item.src;
      unsortedImages[i].alt = item.alt;
      unsortedImages[i].dataset.download = item.download;
      unsortedImages[i].dataset.added = item.added;
      unsortedImages[i].dataset.supports = item.supports;
      unsortedImages[i].dataset.maker = item.maker;
    })
  }
}
function firebase(){
  // Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDUCeoBidHP45PhREHJETEfZLKjRde05mg',
  authDomain: 'delta-skins.firebaseapp.com',
  projectId: 'delta-skins'
});
var db = firebase.firestore();
}
function closeModal(){
  document.getElementById("modal01").style.display = "none";
}
function liked(element){
  
}