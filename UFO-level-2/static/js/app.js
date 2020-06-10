
// from data.js



function runEnter()
{
    // Prevent the page from refreshing
    d3.event.preventDefault();
    var dateInput = d3.select("#datetime");
    var cityInput = d3.select("#city");
    var stateInput = d3.select("#state");
    var countryInput = d3.select("#country");
    var shapeInput = d3.select("#shape");
    // Get the value property of the input element
    var filteredObj={};
    var dateInputValue = dateInput.property("value");
    if(dateInputValue != "") {
        filteredObj["datetime"] = dateInputValue
        };
    var cityInputValue = cityInput.property("value");
    if(cityInputValue != ""){
        filteredObj["city"] = cityInputValue
    };
    var stateInputValue = stateInput.property("value");
    if(stateInputValue != ""){
        filteredObj["state"]= stateInputValue
        };
    var countryInputValue = countryInput.property("value");
    if(countryInputValue != ""){
        filteredObj["country"]= countryInputValue

    };
    var shapeInputValue = shapeInput.property("value");
    if(shapeInputValue != ""){
        filteredObj["shape"]= shapeInputValue

    };
    // remove any children from the list to
    d3.select("#ufo-table").select('tbody').html("");
    console.log(filteredObj);
    /*var filteredData= data.filter(function(obj){
        return filteredCollection.reduce(function(a, f) {
            //return a && (obj[f.key] === f.value);
            return (obj[f.key] === f.value);
        }, false);
    });*/
    var filteredData= data.filter(function(item) {
        for (var key in filteredObj) {
            if (item[key] === undefined || item[key] != filteredObj[key])
                return false;
        }
        return true;
    });
    console.log(filteredData);
    ufoActivities(filteredData);
    // var filteredData = data.filter(data => data.datetime === dateInputValue && data.city=== cityInputValue && data.state=== stateInputValue && data.country=== countryInputValue && data.shape===shapeInputValue);

}

function ufoActivities(data) {
    var tableData = data;
    var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]
// YOUR CODE HERE!
    var table = d3.select("#ufo-table");
    var tablebody = table.select('tbody');
    rows = tablebody.selectAll('tr')
        .data(tableData)
        .enter()
        .append('tr');

    cells = rows.selectAll("td")
        .data(function (row) {
                return columns.map(function (column) {
                    return {column: column, value: row[column]}
                })
            }
        )
        .enter()
        .append('td')
        .text(function (d) {
            return d.value
        })



}

// Now that we can see all the data the next steps are

// Select the button
var button = d3.select("#filter-btn");

// select the refresh button
var refreshbtn = d3.select("#refresh-btn");

// Select the form
//var form = d3.select("form");

// Create event handlers
button.on("click", runEnter);
//form.on("submit", runEnter);
//form.onsubmit(runEnter());
//refreshbtn.on("click",ufoActivities(data));

d3.select("form").on("submit", function() {
    //console.log("I am here");
    runEnter();
    return false;
});






