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
if (typeof jQuery != 'undefined') {
    jQuery(document).ready(function($) {
      var filetypes = /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav|deltaskin)$/i;
      var baseHref = '';
      if (jQuery('base').attr('href') != undefined) baseHref = jQuery('base').attr('href');
  
      jQuery('a').on('click', function(event) {
        var el = jQuery(this);
        var track = true;
        var href = (typeof(el.attr('href')) != 'undefined' ) ? el.attr('href') :"";
        var isThisDomain = href.match(document.domain.split('.').reverse()[1] + '.' + document.domain.split('.').reverse()[0]);
        if (!href.match(/^javascript:/i)) {
          var elEv = []; elEv.value=0, elEv.non_i=false;
          if (href.match(/^mailto\:/i)) {
            elEv.category = "email";
            elEv.action = "click";
            elEv.label = href.replace(/^mailto\:/i, '');
            elEv.loc = href;
          }
          else if (href.match(filetypes)) {
            var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
            elEv.category = "download";
            elEv.action = "click-" + extension[0];
            elEv.label = href.replace(/ /g,"-");
            elEv.loc = baseHref + href;
          }
          else if (href.match(/^https?\:/i) && !isThisDomain) {
            elEv.category = "external";
            elEv.action = "click";
            elEv.label = href.replace(/^https?\:\/\//i, '');
            elEv.non_i = true;
            elEv.loc = href;
          }
          else if (href.match(/^tel\:/i)) {
            elEv.category = "telephone";
            elEv.action = "click";
            elEv.label = href.replace(/^tel\:/i, '');
            elEv.loc = href;
          }
          else track = false;
  
             if (track) {
            _gaq.push(['_trackEvent', elEv.category.toLowerCase(), elEv.action.toLowerCase(), elEv.label.toLowerCase(), elEv.value, elEv.non_i]);
            if ( el.attr('target') == undefined || el.attr('target').toLowerCase() != '_blank') {
              setTimeout(function() { location.href = elEv.loc; }, 400);
              return false;
        }
      }
        }
      });
    });
  }