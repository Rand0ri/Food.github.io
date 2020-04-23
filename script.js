const TypeWriter = function(txtElement, words, wait = 3000) { // Take in span element, words from array, amount it wait before it stars deleting. Big first letter because of const
    this.txtElement = txtElement;  // If we have constructive fucntion we can assign properties using this keyword
    this.words = words; 
    this.txt = ''; // Represents whatever in this area
    this.wordIndex = 0; // Which word we are on ( array )
    this.wait = parseInt(wait, 10); // whatever passed as argument of our function. We need make sure it is an integer so we use JS function
    this.type(); // We need this main method which associates with this typewriter which does everything
    this.isDeleting = false; // Represents the state if its deleting or not

}

// Type Method. To add method we need to use prototype
TypeWriter.prototype.type = function () {
    // Get the current index of word
    const current = this.wordIndex % this.words.length; // Use module operator to get total words of the array
    // Get the full text of current word
    const fullTxt = this.words[current]; // Current index of the word in array

    // Check if deleting
    if (this.isDeleting) { // Checking this property. By defaul false
        // Remove character
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // Add character
        // Whatever currently in the span
        this.txt = fullTxt.substring(0, this.txt.length + 1);// Whatever the length is we are adding 1 to it
    }

    // Insert txt into element. (Output whatever in this.txt)
    // Insert span into our html span
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`; // Backticks for template literal
   
    setTimeout(() => this.type(), 200); // Call this method and how often 
}

// Init on DOM Load . (Initializing)
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
    // We need to grab the whole element(span) and attributes
    const txtElement = document.querySelector(".txt-type");
    // Method for Parsing
    const words = JSON.parse(txtElement.getAttribute("data-words")); // We need to parse it so we can use it in our JS otherwise it will be string 
    const wait = txtElement.getAttribute("data-wait");
    //Init TypeWriter
    new TypeWriter(txtElement, words, wait);

}

