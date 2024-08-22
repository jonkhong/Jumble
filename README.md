# Jumble

# Description:
This is a full stack implementation of a cipher encryptor called Jumble. The user's phrase will be encrypted with the Caeser and Square cipher.
The UI also includes a slider to adjust the cipher values.

# Text Input Logic:
```
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
```

# Square Cipher Logic:

```
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
```

# Caeser Cipher Logic:

```
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
```


