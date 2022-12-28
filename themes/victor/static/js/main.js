function addClass(el, className){
    if (el.classList)
        el.classList.add(className);
    else
        el.className += ' ' + className;
}
function removeClass(el, className){
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');

}
function hasClass(el, className){
    if (el.classList)
        return el.classList.contains(className);
    else
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}
function toggleClass(el, className){

    if (el.classList) {
        el.classList.toggle(className);
    } else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);
    
        if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
        else
        classes.push(className);
    
        el.className = classes.join(' ');
    }
  
}
document.querySelectorAll('div.highlight').forEach(el => {
    const newNode = document.createElement("div");
    newNode.className= 'copy-code hidden';
    newNode.innerHTML = 'Copy'; 
    newNode.addEventListener("click", e => {
        e.preventDefault();
        const code = el.querySelector('code');
        navigator.clipboard.writeText(code.innerText).then(function() {
            newNode.innerText = 'Copied';
            setTimeout(function(){newNode.innerText = 'Copy'}, 1000);
          }, function(err) {
            console.error('Async: Could not copy text: ', err);
          });
    });
    el.insertBefore(newNode, el.firstChild);
    el.addEventListener("mouseover", e => {
        e.preventDefault();
        if (hasClass(newNode, 'hidden'))
            toggleClass(newNode, 'hidden');
    });
    el.addEventListener("mouseout", e => {
        e.preventDefault();
        addClass(newNode, 'hidden');
    });
});


document.querySelectorAll('blockquote p.task').forEach(el => {
   	addClass(el.parentElement, "task");
});

document.querySelectorAll('blockquote p.reto').forEach(el => {
   	addClass(el.parentElement, "reto");
});

document.querySelectorAll('blockquote p.hint').forEach(el => {
   	addClass(el.parentElement, "hint");
});

document.querySelectorAll('blockquote p.info').forEach(el => {
   	addClass(el.parentElement, "info");
});

document.querySelectorAll('blockquote p.warning').forEach(el => {
   	addClass(el.parentElement, "warning");
});

document.querySelectorAll('blockquote p.alert').forEach(el => {
   	addClass(el.parentElement, "alert");
});

document.querySelectorAll('blockquote p.toogle').forEach(el => {
   	
   	var firstParagraf = el.parentNode.querySelector("p");
   	//<summary>Click to toggle contents of `code`</summary>
	var that = el.parentElement;

	var p = document.createElement('details');
	addClass(p, "toogle");

	// move all elements in the other container.
	while(that.firstChild) {
		p.appendChild(that.firstChild);
	}
	that.parentNode.replaceChild(p,that);
	
	const newNode = document.createElement("summary");
	newNode.innerHTML = firstParagraf.innerText;
	if (firstParagraf.innerText != "")
		newNode.innerHTML = firstParagraf.innerText;
	else{
		newNode.innerHTML = firstParagraf.innerHTML;
	}
	el.parentElement.insertBefore(newNode, el.parentElement.firstChild);
	el.parentElement.removeChild(firstParagraf);
});

//Sequence
document.querySelectorAll('code.language-sequence').forEach((el , i) => {
   	addClass(el.parentElement, "language-sequence");
   	const newNode = document.createElement("div");
    	newNode.id= 'diagram-' + i;
        el.parentElement.insertBefore(newNode, el.parentElement.firstChild);
        var diagram = Diagram.parse(el.innerText);
        diagram.drawSVG(newNode.id, {theme: 'simple'});
        addClass(el, "hidden");
});

//Mermaid
document.querySelectorAll('code.language-mermaid').forEach((el , i) => {
   	addClass(el, "mermaid");
   	const newNode = document.createElement("div");
    	newNode.className= 'mermaid-container';
    	el.parentElement.insertBefore(newNode, el.parentElement.firstChild);
    	newNode.appendChild(el);
});

//Flowchart
document.querySelectorAll('code.language-flow').forEach((el , i) => {
   	addClass(el.parentElement, "language-flow");
   	const newNode = document.createElement("div");
    	newNode.id= 'flow-diagram-' + i;
        el.parentElement.insertBefore(newNode, el.parentElement.firstChild);
        var diagram = flowchart.parse(el.innerText);
        diagram.drawSVG(newNode.id);
        addClass(el, "hidden");
});

