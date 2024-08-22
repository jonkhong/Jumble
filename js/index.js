/*
Jonathan Khong
Index.js
Description: backend of jumble, includes cipher logic, text input, shuffle logic.
*/

// list of alphabet
var squareAlpha = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R",
                   "S","T","U","V","W","X","Y"];
const express = require('express');
var serveIndex = require('serve-index');
const app = express();
const port = 5000;
const hostname = '127.0.0.1';

// Helper method for when the slider takes an input, the value is displayed
// next to it and then calls another method to update the text
function slideInput() {
    var slider = document.getElementById("slider");
    var output = document.getElementById("slideNum");

    output.innerHTML = slider.value;    
    textInput();
}

// A method that displays the encyrpted cypher text on screen.
function textInput(){

    var newText = document.getElementById('text').value;
    var caeserText = document.getElementById('caeserText');
    var squareText = document.getElementById('squareText');
    // Encrypt with caeser helper methods
    var caeserRes = caeserCypher(newText);
    caeserText.innerHTML = caeserRes;
    // Encrypt with square helper methods
    var squareRes = squareCypher(newText);
    squareText.innerHTML = squareRes;
    
}
// Method that caesar encrypts the given string parameter.
// shift amount comes from slider
function caeserCypher(string) {
    var str = string;
    var shamt = document.getElementById("slider").value;
    var strLen = str.length;
    for (var i = 0; i < strLen; i++) { // Iterate through and find corresponding encryption letter and ascii value for each.
        var charCode = str.charCodeAt(i);
        var chr = str.charAt(i);
        var newCode = Number(charCode) + Number(shamt);
        if ((97 <= charCode && charCode <= 122 && newCode > 122) || 
            (65 <= charCode && charCode <= 90 && newCode > 90)) {
            newCode = newCode - 26;
            chr = String.fromCharCode(newCode);
        } else if ((97 <= charCode && charCode <= 122) || (65 <= charCode && charCode <= 90)) {
            chr = String.fromCharCode(newCode);
        }
        str = str.substring(0,i) + chr + str.substring(i+1);
    }
    return str;
}

// A helper method used to display the table on the page with the correct key for the square cypher
function displayTable() {
    grid = document.getElementById('grid');
    for (var i = 0; i < squareAlpha.length; i++){
        // For each element in the table, display the corresponding jumbled 
        // letter with the same index
        grid.getElementsByTagName('td')[i].innerHTML = squareAlpha[i];
    }
}

// shuffles the square 
function shuffleSquare(){
    // For each letter in the array of characters
    for (var i = 0; i < squareAlpha.length; i++)  {
        // random index
        var randInd = parseInt(Math.random() * squareAlpha.length);
        // Swap letters
        var randCh = squareAlpha[randInd];
        squareAlpha[randInd] = squareAlpha[i];
        squareAlpha[i] = randCh;
    }
    displayTable();
    textInput();
}

// Encrypts square cypher string
function squareCypher(string) {
    var str = string;
    var strLen = str.length;
    // For each letter in the parameter string
    for (var i = 0; i < strLen; i++) {
        // Retrieve the letter and its ascii code
        var charCode = str.charCodeAt(i);
        var chr = str.charAt(i);
        if ((97 <= charCode && charCode <= 121) || (65 <= charCode && charCode <= 89)) {
            // If it is a lowercase letter
            if ((97 <= charCode && charCode <= 121)) {
                var index = charCode - 97;
            } else {
                // If it is an upeprcase letter
                var index = charCode - 65;
            }
            chr = squareAlpha[index];
            str = str.substring(0,i) + chr + str.substring(i+1);
        } 
    }
    return str;
}

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`); 
});
