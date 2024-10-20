/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';

inquirer
  .prompt([
   {
    type:"input",
    name :"links",
    message:"Which link do you want to convert to a qr code ?"
   }
  ])
  .then((answers) => {
    console.log(answers.links)
    const data = new Uint8Array(Buffer.from(answers.links));
    writeFile('message.txt', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }); 
  });

  
  
  