function cipher(type) {
  // Create an array of letters
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  // Convert string input to uppercase
  let string = document.getElementById('textInput').value.toUpperCase();
  let stringLetters = string.split('');
  let outputString = '';
  let incrementer = 0;

  if (string) {
    // If validate regex returns null then we know there is no match
    if ((validate(string) != null)) {
      for (let x = 0; x <= stringLetters.length - 1; x++) {
        let n = stringLetters[x];

        // Determine how much we need to increment or decrement depending on whether we are encoding or decoding
        if (type == 'encode') {
          // To deal with X, Y and Z while encoding we decrement by 23 so X, Y, and Z can be encoded to A, B and C
          incrementer = ((n === 'X') || (n === 'Y') || (n === 'Z')) ? -23 : 3;
        } else if (type == 'decode') {
          // To deal with X, Y and Z while decoding we increment by 23 so A, B, and C can be decoded to X, Y and Z
          incrementer = ((n === 'A') || (n === 'B') || (n === 'C')) ? +23 : -3;
        } else {
          // If type is not specified or is incorrect then return an error
          document.getElementById('textOutput').textContent = 'Error: Type not specified.';
          return false;
        }
        
        // Here we create an output string from the letters array
        outputString += letters[letters.indexOf(stringLetters[x]) + incrementer];
      } 
    } else {
      // If the string input is not alphabetical return an error
      outputString = 'Error: Please enter letters only.';
    }
  } else {
    // If there is no string input return an error
    outputString = 'Error: Please enter some text.';
  }
  
  // Print the output on screen
  document.getElementById('textOutput').textContent = outputString;
}

function validate(string) {
  // Validate input for letters only
  return string.match(/^[A-Za-z]+$/g);
}

function clearText() {
  document.getElementById('textInput').value = '';
  document.getElementById('textOutput').textContent = '';
}
