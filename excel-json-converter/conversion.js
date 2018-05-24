var convertExcel = require('excel-as-json').processFile

var options = {
    sheet:'1',
    isColOriented: false,
    omitEmtpyFields: false
};
    
 
convertExcel(
    "excel/Copy of Historical (Hourly Aggregation) Activity Report.xlsx", 
    "tmp/row.json", 
    options, 
(err, data) => {
    if(err){
        console.log("JSON conversion failure: #{err}");
    }
});