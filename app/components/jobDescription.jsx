var React = require('react');

var Home = React.createClass({

 //
 //  onSubmit: function(e){
 //    e.preventDefault();
 //    var httpOptions = {
 //      port: config.port,
 //      path: "/job",
 //      method: "GET", // insert data
 //      headers: {
 //        'Content-Type' : 'application/x-www-form-urlencoded',
 //        'Accept' : 'application/json'
 //      }
 //    }
 //    var output = '';
 //
 //    //  console.log("body: " + JSON.stringify(data));
 //
 //    console.log("sending");
 //
 //    var req = http.request(httpOptions, function(res){
 //
 //    console.log('sent');
 //
 //    res.on('data', function (dataBlob){
 //      output += dataBlob;
 //
 //
 //    //var ObjOutput = JSON.parse('{ output:[{"_id":"57fd722abe68932791009aba","CompanyName":"Screend","Location":"Tor","Certification":"Nothing","Requirededucation":"College","Experience":"None","Salary":"None","Description":"Work","__v":0},{"_id":"57fda3d96f8df629ef1e8af8","JobTitle":"software developer","CompanyName":"Microsoft","Location":"mississauga","Certification":"C=++","Requirededucation":"prog","Experience":"2","Salary":"30000","Description":"kdfjlasfjalksdfjldsa","__v":0}][{"_id":"57fd722abe68932791009aba","CompanyName":"Screend","Location":"Tor","Certification":"Nothing","Requirededucation":"College","Experience":"None","Salary":"None","Description":"Work","__v":0},{"_id":"57fda3d96f8df629ef1e8af8","JobTitle":"software developer","CompanyName":"Microsoft","Location":"mississauga","Certification":"C=++","Requirededucation":"prog","Experience":"2","Salary":"30000","Description":"kdfjlasfjalksdfjldsa"]}');
 //
 //   var parse = JSON.parse(output);
 //   var index = 0;
 //   var id = 0;
 //   for ( var i = 0 ; i < parse.length(); i++){
 //   if ( id != parse[i]._id){
 //     continue;
 //   }else {
 //    index = i;
 //  }
 // }
 //
 //
 //
 //
 //    var JobTitle = document.createTextNode(parse[index].JobTitle);
 //    document.getElementById("companyname").appendChild(JobTitle);
 //
 //    var certification = document.createTextNode(parse[index].Certification);
 //    document.getElementById("certification").appendChild(certification);
 //
 //    var experience = document.createTextNode(parse[index].requiredexperience);
 //    document.getElementById("requiredexperience").appendChild(experience);
 //
 //    var location = document.createTextNode(parse[index].location);
 //    document.getElementById("location").appendChild(location);
 //
 //    var requirededucation = document.createTextNode(parse[index].Requirededucation);
 //    document.getElementById("requirededucation").appendChild(requirededucation);
 //
 //    var experience = document.createTextNode(parse[index].Experience);
 //    document.getElementById("Experience").appendChild(Experience);
 //
 //    var Description = document.createTextNode(parse[index].Description);
 //    document.getElementById("description").appendChild(Description);
 //
 //    var salary = document.createTextNode(parse[index].salary);
 //    document.getElementById("salary").appendChild(salary);
 //
 //    var salary = document.createTextNode(parse[index].salary);
 //    document.getElementById("salary").appendChild(salary);
 //
 //    // var location =document.createTextNode(parse[i].Location);
 //    // z.appendChild(location);
 //
 //    // var certification =document.createTextNode(parse[i].Certification);
 //    // z.appendChild(certification);
 //    //
 //    // var Requirededucation =document.createTextNode(parse[i].Requirededucation);
 //    // z.appendChild(Requirededucation);
 //    //
 //    // var Experience =document.createTextNode(parse[i].Experience);
 //    // z.appendChild(Experience);
 //    //
 //    // var Salary =document.createTextNode(parse[i].Salary);
 //    // z.appendChild(Salary);
 //    //
 //    // var Description =document.createTextNode(parse[i].Description);
 //    // z.appendChild(Description);
 //
 //
 //  },

  render: function(){
    return(
         <div>

           <div>
              <label>Company Name:</label>
              <label id="companyname"></label>
           </div>

            <div>
              <label>Certification:</label>
              <label id="certification"></label>
            </div>

            <div>
              <label>Required Experience:</label>
              <label id="requiredexperience"></label>
            </div>

            <div>
              <label>Location:</label>
              <label id="location"></label>
            </div>

            <div>
              <label>Required Education:</label>
              <label id="requirededucation"></label>
            </div>

            <div>
              <label>Salary:</label>
              <label id="salary"></label>
            </div>

            <div>
              <label>Description:</label>
            </div>

            <div>
              <p id="description"></p>
            </div>

            <div>
              <select>
                  <option value="resume">Resume</option>
              </select>
            </div>


          <form ref="jobDescription" method="post">
            <div>
              <button type="submit" value="Apply For Job">Submit Resume</button>
            </div>
          </form>
        </div>
    );
  }
});

module.exports = Home;
