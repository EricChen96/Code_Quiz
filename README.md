# Code_Quiz

# Random_Password_Generator


![Code Quiz](.mainScreen_Screenshot.png)

[Link to site](https://ericchen96.github.io/Random_Password_Generator/) <br>
[Link to Github repository](https://github.com/EricChen96/Random_Password_Generator)

## Installation

Go to Github and download

## Description

The following password generator would prompt the user for the length of their password, ask them for whether they want lowercase, uppercase, numeric or special characters, and then generate a password. 

## Additions:

1. If the user confirms they want a type of character, the generator would ensure that one character from that type is in the password. The function checkIfCharUsed(checkCharacterUsed, checkPassword, checkCharacterSheet) returns true if the password uses that character. It accepts a boolean first to see if user wanted that type of character to be used. Then accepts the password to check, and the characters to check for. 

``` 
function checkIfCharUsed(checkCharacterUsed, checkPassword, checkCharacterSheet) {
  if (checkCharacterUsed) {
    for (var i = 0; i < checkPassword.length; i++) {
      for (var j = 0; j < checkCharacterSheet.length; j++) {
        if (checkPassword[i] === checkCharacterSheet[j]) {
          return true
        }
      }
    }
  }
  else {
    return true;
  }
  return false;
}
```

This code block uses the checkIfCharUsed function to check the password and would loop to create a new password until the password contains a character type that the user selected

```
do {
    tempPassword = "";
    for (var i = 0; i < passwordLength; i++) {
      tempPassword += characterSheet[Math.floor(Math.random() * characterSheet.length)];
    }
  } while (!checkIfCharUsed(allowLowercase, tempPassword, lowercaseSheet) || !checkIfCharUsed(allowUppercase, tempPassword, uppercaseSheet) || !checkIfCharUsed(allowNumeric, tempPassword, numericSheet) || !checkIfCharUsed(allowSpecial, tempPassword, specialSheet))
```

2. The other addition was an auto-copy to clipboard once the password was generated
```
  var copyText = document.querySelector("#password");
  copyText.focus();
  copyText.select();
  document.execCommand('copy');
```