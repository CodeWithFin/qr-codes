/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';
import qr from "qr-image";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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
    const newData = new Uint8Array(Buffer.from(answers.links));

    writeFile('message.txt', newData, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }); 
      const filePath = path.join(__dirname, 'message.txt');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    const qrCode = qr.image(data.trim(), { type: 'png' });

    qrCode.pipe(fs.createWriteStream('message_qrcode.png'));
});
  });

  