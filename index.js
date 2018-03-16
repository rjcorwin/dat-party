#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
var datArchives = []

function datShare(dir) {
  exec(`cd ${dir} && dat share`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`${stdout}`);
    console.log(`${stderr}`);
  });
  setTimeout(() => {
    exec(`cd ${dir} && dat status`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`Sharing ${dir} 🎉  `)
      console.log(`${stdout}`);
      console.log(`${stderr}`);
    })
  }, 2000)
}

setInterval(() => {
  fs.readdir(process.cwd(), (err, files) => {
    files.forEach(file => {
      if (fs.statSync(file).isDirectory() && !datArchives.includes(file)) {
        datArchives.push(file)
        datShare(file)
      }
    })
  })
}, 2000)

console.log(``)
console.log(` 🎉  Starting the party 🎉  `)
console.log(``)
