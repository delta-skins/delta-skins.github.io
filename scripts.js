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
  //downloadText.onclick = window.location.href=download;
}
function downloadNow(){
  //ga('send', 'event', 'deltaskin', 'download', captionText);
  window.location.href=downloadLink;
}
var images;
function loadImages(){
  images = Array.from(document.getElementsByTagName("img"))
  images.splice(-1,1)
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
    sortedImages.splice(-1,1);
    sortedImages.sort(function(a,b){
      var contentA =parseInt(a.dataset.added,10);
      var contentB =parseInt(b.dataset.added,10);
      return (contentB - contentA);
    });
    var unsortedImages = Array.from(document.getElementsByTagName("img"));
    unsortedImages.splice(-1,1);
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
    sortedImages.splice(-1,1);
    sortedImages.sort(function(a,b){
      var contentA =parseInt(a.dataset.added,10);
      var contentB =parseInt(b.dataset.added,10);
      return (contentA - contentB);
    });
    var unsortedImages = Array.from(document.getElementsByTagName("img"));
    unsortedImages.splice(-1,1);
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