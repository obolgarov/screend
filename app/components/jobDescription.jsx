var React = require('react');

var Home = React.createClass({
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
