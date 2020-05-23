const TypeWriter = function(txtElement, words, wait = 3000) { 
    this.txtElement = txtElement; 
    this.words = words; 
    this.txt = ''; 
    this.wordIndex = 0; 
    this.wait = parseInt(wait, 10); 
    this.type(); 
    this.isDeleting = false; 
}

// Type Method
TypeWriter.prototype.type = function () {
    // Get the current index of word
    const current = this.wordIndex % this.words.length; 
    // Get the full text of current word
    const fullTxt = this.words[current]; 

    // Check if deleting
    if (this.isDeleting) { 
        // Remove character
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // Add character
       
        this.txt = fullTxt.substring(0, this.txt.length + 1);// Whatever the length is we are adding 1 to it
    }

    
    // Insert span into our html span
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`; 
   
    setTimeout(() => this.type(), 200); 
}

// Init on DOM Load .
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
 
    const txtElement = document.querySelector(".txt-type");

    const words = JSON.parse(txtElement.getAttribute("data-words")); 
    const wait = txtElement.getAttribute("data-wait");
    //Init TypeWriter
    new TypeWriter(txtElement, words, wait);

}

