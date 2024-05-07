// const fs = require("node:fs");

// const writeDataToFile = () => {

//     let strToWrite = "this is a log file the data is here";

//     fs.writeFile("tasks.txt", strToWrite, (err) => {
//         if (err) {
//             console.log(err);
//             return
//         }
//         console.log("file written successfuly");
//     });
// }

// writeDataToFile();


const fs = require('fs');
const path = require('path');
const readline = require('readline');

const dataFilePath = path.join(__dirname, 'tasks.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addTask(task) {
  fs.appendFile(dataFilePath, task + '\n', (err) => {
    if (err) throw err;
    console.log('Task added successfully.');
    rl.close();
  });
}

function viewTasks() {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) throw err;
    const tasks = data.split('\n').filter(task => task.trim() !== '');
    console.log('List of Tasks:');
    tasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task}`);
    });
    rl.close();
  });
}

function markTaskComplete(index) {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) throw err;
    const tasks = data.split('\n').filter(task => task.trim() !== '');
    if (index >= 0 && index < tasks.length) {
      tasks[index] = '[X] ' + tasks[index];
      fs.writeFile(dataFilePath, tasks.join('\n'), (err) => {
        if (err) throw err;
        console.log('Task marked as complete.');
        rl.close();
      });
    } else {
      console.log('Invalid task index.');
      rl.close();
    }
  });
}

function removeTask(index) {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) throw err;
    let tasks = data.split('\n').filter(task => task.trim() !== '');
    if (index >= 0 && index < tasks.length) {
      tasks.splice(index, 1);
      fs.writeFile(dataFilePath, tasks.join('\n'), (err) => {
        if (err) throw err;
        console.log('Task removed successfully.');
        rl.close();
      });
    } else {
      console.log('Invalid task index.');
      rl.close();
    }
  });
}

function askQuestion(question, callback) {
  rl.question(question, (answer) => {
    callback(answer);
  });
}

function main() {
  console.log('1. Add a new task');
  console.log('2. View list of tasks');
  console.log('3. Mark a task as complete');
  console.log('4. Remove a task');

  askQuestion('Choose an option: ', (option) => {
    switch (parseInt(option)) {
      case 1:
        askQuestion('Enter the task: ', addTask);
        break;
      case 2:
        viewTasks();
        break;
      case 3:
        askQuestion('Enter the index of the task to mark as complete: ', (index) => markTaskComplete(parseInt(index) - 1));
        break;
      case 4:
        askQuestion('Enter the index of the task to remove: ', (index) => removeTask(parseInt(index) - 1));
        break;
      default:
        console.log('Invalid option.');
        rl.close();
    }
  });
}

main();

