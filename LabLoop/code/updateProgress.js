inlets = 1;
outlets = 2;

// {
//     "type": "status",
//     "endpoint": "/predict",
//     "fn_index": 0,
//     "time": "2023-11-15T21:07:25.058Z",
//     "queue": true,
//     "stage": "pending",
//     "progress_data": [
//       {
//         "index": 2,
//         "length": 6,
//         "unit": "steps",
//         "progress": null,
//         "desc": "Regions to fill"
//       },
//       {
//         "index": 350,
//         "length": 800,
//         "unit": "steps",
//         "progress": null,
//         "desc": null
//       }
//     ]
//   }

function status(updateJsonString) {
    var update = JSON.parse(updateJsonString);
    outlet(1, update['stage']);

    if (update.hasOwnProperty('progress_data') && update['progress_data'].length > 1) {
        var totalProgress = 0;
        var outerIndex = update['progress_data'][0]['index'];
        var outerLength = update['progress_data'][0]['length'];
        var innerIndex = update['progress_data'][1]['index'];
        var innerLength = update['progress_data'][1]['length'];

        totalProgress = ((outerIndex - 1) / outerLength) + (innerIndex / innerLength) * (1 / outerLength);
        
        outlet(0, Math.min(Math.round(totalProgress * 100), 100));
    }
}
