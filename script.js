var $VIEW = document.querySelector('.view');
function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
        'animation':'animationend',
        'OAnimation':'oAnimationEnd',
        'MozAnimation':'mozAnimationEnd',
        'WebkitAnimation':'webkitAnimationEnd'
    };
    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}
/* Listen for a transition! */
var transitionEvent = whichTransitionEvent();
$VIEW.addEventListener(transitionEvent, function(e){
    e.target.remove();
    getPerson();
});
function add( name ){
    $VIEW.children[0].className += ' '+name;
}
function getPerson(cb){
    var url = "https://randomuser.me/api/";
    var oReq = new XMLHttpRequest();
        oReq.addEventListener('load', function(){
            var data = JSON.parse(this.responseText);
            data = data.results[0].user;
            var html = '<div class="user-card"><img class="user-card__picture" src="'+data.picture.large+'"></img><h1 class="user-card__name">'+data.name.first+' '+data.name.last+'</h1></div>';
            $VIEW.innerHTML = html;
        });
        oReq.open("get", url, true);
        oReq.send();
}
getPerson();