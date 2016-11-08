
var fs = require('fs');
var PDFParser = require("pdf2json");
var tmp = require('tmp');
var os = require('os');
var txt = require('textract');



/**
 * This progSkills array is to be used in the same sense as the skillHeaders.
 Once we have isolated the headers we would then run the content under the programming skills header
 and loop it against this progSkills array. This array should also grow over time.
 */
var progSkills = ["Java",
  "R",
  "C#",
  "CS",
  "CSS",
  "HTML",
  "C",
  "C++",
  "Unity",
  "SQL",
  "MySQL",
  "T-SQL",
  "Ruby",
  "NodeJS",
  "Javascript",
  "PHP",
  "Python",
  "Go"
];
//This is the header list, this list should/likely will need to grow
//I intended to use get an idea of how probable the isolated header (I think I got) is to an actual header in this list
//So if the header is experience, and we do an include on each value when looping through this array.
//If we add a counter to see how many hits we get, we can use that as a guide to whether its a header or not
//Once we find our headers in it a brand new array KEY:VALUE array should be made, with the header as the key, and the value being the content
//beneath the header
var skillHeaders = ["Programming Languages",
  "Programming Knowledge",
  "COMPETENCIES/SKILLS",
  "COMPETENCIES",
  "SKILLS",
  "Qualifications",
  "Experience",
  "Work History",
  "Freelance",
  "Freelance Experience",
  "Training",
  "Academic Background",
  "Academic Experience",
  "Programs",
  "Courses",
  "Related Courses",
  "Education",
  "Educational Background",
  "Educational Qualifications",
  "Educational Training",
  "Education and Training",
  "Training",
  "Academic Training",
  "Professional Training",
  "Course Project Experience",
  "Related Course Projects",
  "Internship Experience",
  "Internships",
  "Programming"
];
var customMadeArray = {};
//This is where textract is used, and all parsing is done within the fromFileWithPath function
txt.fromFileWithPath('./pdf/Resume.docx', {
  preserveLineBreaks: true
}, function(error, text) {
  console.log('error:' + error);



  var splitOnLine = text.split('\n');

  for (q in splitOnLine) {
    //set headersFound to 0 at start of each line
    var headersFound = 0;
    //first if is just to check if this is the start of the text
    if (q == 0) {
      //These ifs are where I am checking the split on line above and below
      //These IFs will change for text that is not the beginning of the text object
      if (splitOnLine[q + 1] == "" || splitOnLine[q + 1] == " ") {

        var lengthCheck = splitOnLine[q].split(/[ ,]+/);
        //Check if line has more then 3 separate words based on split from a SPACE and COMMA
        //If line has less, potential header
        if (lengthCheck.length <= 3) {

          for (o in lengthCheck) {
            for (u in skillHeaders) {
              if (lengthCheck[o].includes(skillHeaders[u])) {
                //increment headersFound to get an idea of how many headers it may have isolated
                headersFound++;
              }
            }
          }
          //checking if any found
          console.log(headersFound);

        } else {

        }
        //After this lengthCheck if, if headersFound is not 0, then odds are we have a header
        //add splitOnLine[q] as the KEY to our custom KEY:VALUE array
      }
    } else {
      //main entry point, will always enter passed very first line
      //stringifying gives a good way of finind navigation ways
      var tester = JSON.stringify(splitOnLine[q]);
      console.log(tester);
      var check = false;
      /*
      Struggling to think of a consistent way of determinig if we are in a header section or not
      If we are, we set check to true, and then add all those line items belonging to a section
      as the value to the header it belongs to... Contemplated using a for loop, that would run X amount of times
      not sure what X needs to be. Considered using a static integer, but that will obviously run into issues
      if thousands of resumes are ran across this. for example if the integer was 20, we would back track 20 lines
      and check each line to see if one of them is a key in our customMadeArray
      */
      //Could potentially use emptyLineChecker as a means of preventing the for loop below from going passed the correct header we are looking for
      var emptyLineChecker = 0;
      for (var i = 1; i < 20; i++) {
        for (e in customMadeArray) {
          //would maybe check if empty line in here
          if (splitOnLine[q - i] == "" || splitOnLine[q - i] == " ") {
            emptyLineChecker++;
          }
          //check if our array has its own key property
          if (customMadeArray.hasOwnProperty(e)) {
            //then check if that key property is equal to splitOnLine value
            if (emptyLineChecker == 1) {
              //if enter here, very good chance the next line may be the most recent header
              //not sure if this logic is necessary or not
            }
            if (splitOnLine[q - i].includes(e)) {
              //we have found a matching header key on one of the 19 lines we checked above

              check = true;

            }
          }
        }
      }
      if (check) {
        //If check is true, that means we are in a section that we have previously established to be a header

      }
      /*
  Long if beneath is doing two things, checking if the line below is either "" or " "
  I noticed when checking the text with stringify that, atleast with my resume, and I can only imagine loads of others out there
  they have managed to have a space in the empty line.
  and then I check above if its either "" or " ". If this statement is entered, odds are we are at some sort of header
*/
      else if (splitOnLine[q - 1] == "" || splitOnLine[q - 1] == " " && splitOnLine[q + 1] == "" || splitOnLine[q + 1] == " ") {

        //new line above and below current line, likely header
        //Split line by spaces and check array length
        //anything above 3 or 4 likely not a header
        var lengthCheck = splitOnLine[q].split(/[ ,]+/);
        //check if line has less then 3 words, considering using 4. Although not many headers I found were more then 3 separate words
        if (lengthCheck.length <= 3) {

          for (o in lengthCheck) {
            for (u in skillHeaders) {
              if (lengthCheck[o].includes(skillHeaders[u])) {
                //Again looping through skillHeaders and incrementing headersFound to give an idea
                headersFound++;
              }
            }
          }

          console.log("ELSE");
        } else {
          //If more then 3 or 4 words, likely not a header, but can do further checking
          //loop through length check and compare to skillheaders, see how many match an includes
        }
        //if headersFound is above 0, odds are we have a header
        //add it to customMadeArray
      } else if (splitOnLine[q - 1] == "") {
        //new line above

      } else if (splitOnLine[q + 1] == "") {
        //new line below

      }
    }


  }

});
