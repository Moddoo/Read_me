const fs = require('fs');
const inquirer = require('inquirer');
const util  = require('util')
const axios = require('axios');

inquirer
     .prompt([
         {
             type: 'input',
             message: 'Write Your GitHub UserName Correctly =>',
             name: 'username'
         },
         {
            type: 'input',
            message: 'What Is Your Project Title? =>',
            name: 'title'
         },
         {
            type: 'input',
            message: 'Write The Idea Of Your Project =>',
            name: 'description'
         },
         {
            type: 'input',
            message: 'Write The Steps The User Need To Install Your Project =>',
            name: 'installation'
         },
         {
            type: 'input',
            message: 'Provide instructions and examples for use =>',
            name: 'usage'
         },
         {
            type: 'input',
            message: 'List your collaborators, if any, with links to their GitHub profiles =>',
            name: 'credits'
         },
         {
            type: 'list',
            message: 'Choose License =>',
            name: 'license',
            choices: ['MIT License', 'Boost Software License 1.0', 'The Unlicense','Apache License 2.0', 'Mozilla Public License 2.0']
         },
         {
            type: 'input',
            message: 'Add badge => ',
            name: 'tests'
         },
         {
            type: 'input',
            message: 'Write Your Email Address => ',
            name: 'question'
         },
     ])
     .then(ans => {
         const queryUrl = `https://api.github.com/users/${ans.username}`;
         function generateReadMe(response) {
            console.log(ans)
            return `
# ReadMe Generator

## Description

${ans.description}

## Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Tests](#tests)
* [Question](#question)
                 
## Installation

${ans.installation}
                
## Usage

${ans.usage}

## Credits
 
${ans.credits} 

## License

${ans.license} 
                
## Tests

${ans.tests}
                
## Question

![github photo]('${response.data.avatar_url}')                  
${ans.question}
              `
         }
         
         axios.get(queryUrl)
              .then(res => {
               // console.log(generateReadMe())
                 fs.writeFile('README.md', generateReadMe(res), (err) => console.log(err))

                })
     })

    