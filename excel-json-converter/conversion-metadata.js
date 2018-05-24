
var ServiceMetadata = require('odata-v4-service-metadata').ServiceMetadata;
var fs = require('fs');
var format = require('xml-formatter');
// $metadata express.js route
var s = ServiceMetadata.defineEntities({
    namespace: 'Default',
    containerName: 'Container',
    entities: [
        {
            name: 'WebContentStat',
            collectionName: ['webcontent_stat_daily'],
            keys: ['id'],
            computedKey: true,
            properties: {
                timestamphour: 'Edm.String',
                aggregationlevel: 'Edm.String',
                content: 'Edm.String',
                pcdurl: 'Edm.String',
                objecttype: 'Edm.String',
                visits: 'Edm.String',
                custom: 'Edm.String',
                id: 'Edm.String',
            },
            annotations:null
        },
        {
            name: 'WebContentStat',
            collectionName: ['webcontent_stat_monthly'],
            annotations:null
        },
        {
            name: 'WebContentStat',
            collectionName: ['webcontent_stat_weekly'],
            annotations:null
        }
    ]
});

console.log(s.data);
fs.writeFile("./tmp/metadata.xml", format(s.data), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 