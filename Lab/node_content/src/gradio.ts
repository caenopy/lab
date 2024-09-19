// global.fetch = require('node-fetch');
import { client } from "@gradio/client"; 
const maxAPI = require("max-api");
const fs = require('fs');
const path = require('path');

// hack to get Gradio client v0.8 working
global.EventSource = require('eventsource');

// process.argv[0] - is the path of the Node executable used
// process.argv[1] - is the path of the JS program that is executed
const args = process.argv.slice(2)
// now args[0] is the name of the HF Space or URL of Gradio app

// Note: these defaults must match the Lab device and Gradio backend defaults.
var topP = 0.99;
var model = "small";
var temperature = 1.0;

var patcherpath = "";

var jobs = [];

function openFileAsJson(filePath: string): any {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    return jsonData;
  } catch (error) {
    maxAPI.post(`Error opening file as JSON: ${error}`);
    return null;
  }
}

async function sendState(currTimeInSeconds: number) {
  maxAPI.post("Generate: sending to Gradio");
  maxAPI.post("model: " + model);
  maxAPI.post("topP: " + topP);
  maxAPI.post("temperature: " + temperature);
  maxAPI.post("currTimeInSeconds: " + currTimeInSeconds);

  var filePath = path.join(patcherpath, '../../tmp/OutgoingArrangementState.json');

  if (filePath.startsWith("Macintosh HD:")) {
    filePath = filePath.replace("Macintosh HD:", "");
  }

  const app = await client(args[0]);
  // const api_info = await app.view_api();

  // var tracks = dummyData;
  var tracks = openFileAsJson(filePath);

  maxAPI.post(tracks.length);
  
  const job = app.submit("/predict", [model, currTimeInSeconds, JSON.stringify(tracks), topP, temperature])
  
  job.on("data", (data) => {
    const incomingArrangementState = JSON.stringify(data.data[0]);
    const filePath = path.join(patcherpath, '../../tmp/IncomingArrangementState.json');
    fs.writeFileSync(filePath, incomingArrangementState);
    maxAPI.outlet("data", JSON.stringify(data.data[0]));
  });
  job.on("status", (status) => {
    if (status["stage"] === "complete") {
      jobs.pop();
    }
    maxAPI.outlet("status", JSON.stringify(status));
  });
  
  jobs.push(job);
}

maxAPI.addHandler('setTopP', (inputTopP: number) => {
  topP = inputTopP;
});

maxAPI.addHandler('setModel', (inputModel: string) => {
  model = inputModel;
});

maxAPI.addHandler('setTemperature', (inputTemperature: number) => {
  temperature = inputTemperature;
});

maxAPI.addHandler('cancel', () => {
  if (jobs.length == 0) {
    return;
  }
  var job = jobs[jobs.length - 1];
  if (job) {
    job.cancel();
    jobs.pop();
  }
});

maxAPI.addHandler('sendState', (currTimeInSeconds: number) => {
  sendState(currTimeInSeconds);
});

maxAPI.addHandler('setPath', (path: string) => {
  if (path.startsWith("Macintosh HD:")) {
    path = path.replace("Macintosh HD:", "");
  }
  patcherpath = path;
});

// Depricated, use sendState instead
maxAPI.addHandler('tracks', (tracksJsonString: string) => {
    send(tracksJsonString);
});

// Depricated, use sendState instead
async function send(tracksJsonString) {
  maxAPI.post("Generate: sending to Gradio");
  maxAPI.post("model: " + model);
  maxAPI.post("topP: " + topP);

  const app = await client(args[0]);
  // const api_info = await app.view_api();

  // const arrangementState = JSON.stringify(dummyData);

  var tracks = JSON.parse(tracksJsonString);
  
  const job = app.submit("/predict", [model, JSON.stringify(tracks), topP])
  
  job.on("data", (data) => maxAPI.outlet("data", JSON.stringify((data.data[0]))))
  job.on("status", (status) => {
    if (status["stage"] === "complete") {
      jobs.pop();
    }
    maxAPI.outlet("status", JSON.stringify(status));
  });
  
  jobs.push(job);
}

var dummyData = [
    {
      "id": "2",
      "name": [
        "1-MIDI"
      ],
      "instrument": 0,
      "clips": [
        {
          "id": 3,
          "name": [
            ""
          ],
          "start_time": 0,
          "end_time": 4,
          "notes": [
            {
              "note_id": 1,
              "pitch": 65,
              "start_time": 0,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 3,
              "pitch": 70,
              "start_time": 1,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 4,
              "pitch": 72,
              "start_time": 2,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 2,
              "pitch": 83,
              "start_time": 3,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            }
          ]
        },
        {
          "id": 4,
          "name": [
            "Empty"
          ],
          "start_time": 4,
          "end_time": 20,
          "notes": [
            {
              "note_id": null,
              "pitch": 79,
              "start_time": 0,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 76,
              "start_time": 1,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 69,
              "start_time": 2,
              "duration": 0.5,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 72,
              "start_time": 2,
              "duration": 0.5,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 74,
              "start_time": 2.5,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 77,
              "start_time": 2.5,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 67,
              "start_time": 3.5,
              "duration": 0.5,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 71,
              "start_time": 3.5,
              "duration": 0.5,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 65,
              "start_time": 4,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 69,
              "start_time": 4,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 70,
              "start_time": 5,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 72,
              "start_time": 6,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 71,
              "start_time": 7,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 69,
              "start_time": 8,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 70,
              "start_time": 9,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 69,
              "start_time": 10,
              "duration": 0.5,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 74,
              "start_time": 10.5,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 72,
              "start_time": 11.5,
              "duration": 0.5,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 72,
              "start_time": 12,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 71,
              "start_time": 13,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 69,
              "start_time": 14,
              "duration": 0.5,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 74,
              "start_time": 14.5,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 72,
              "start_time": 15.5,
              "duration": 0.5,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            }
          ]
        },
        {
          "id": 9,
          "name": [
            ""
          ],
          "start_time": 26,
          "end_time": 30,
          "notes": [
            {
              "note_id": 1,
              "pitch": 65,
              "start_time": 0,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 3,
              "pitch": 70,
              "start_time": 1,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 4,
              "pitch": 72,
              "start_time": 2,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 2,
              "pitch": 83,
              "start_time": 3,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            }
          ]
        },
        {
          "id": 10,
          "name": [
            "Empty"
          ],
          "start_time": 30,
          "end_time": 46,
          "notes": [
            {
              "note_id": null,
              "pitch": 79,
              "start_time": 0,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 76,
              "start_time": 1,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 69,
              "start_time": 2,
              "duration": 0.5,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 72,
              "start_time": 2,
              "duration": 0.5,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 74,
              "start_time": 2.5,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 77,
              "start_time": 2.5,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 67,
              "start_time": 3.5,
              "duration": 0.5,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 71,
              "start_time": 3.5,
              "duration": 0.5,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 65,
              "start_time": 4,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 69,
              "start_time": 4,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 70,
              "start_time": 5,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 72,
              "start_time": 6,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 71,
              "start_time": 7,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 69,
              "start_time": 0,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 70,
              "start_time": 1,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 69,
              "start_time": 0,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 81,
              "start_time": 0,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            }
          ]
        }
      ]
    },
    {
      "id": "5",
      "name": [
        "2-MIDI"
      ],
      "instrument": 5,
      "clips": [
        {
          "id": 6,
          "name": [
            ""
          ],
          "start_time": 0,
          "end_time": 20,
          "notes": [
            {
              "note_id": 2,
              "pitch": 64,
              "start_time": 3,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 5,
              "pitch": 64,
              "start_time": 7,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 9,
              "pitch": 64,
              "start_time": 11,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 13,
              "pitch": 64,
              "start_time": 15,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 17,
              "pitch": 64,
              "start_time": 19,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 4,
              "pitch": 65,
              "start_time": 2,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 6,
              "pitch": 65,
              "start_time": 6,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 10,
              "pitch": 65,
              "start_time": 10,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 14,
              "pitch": 65,
              "start_time": 14,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 18,
              "pitch": 65,
              "start_time": 18,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 3,
              "pitch": 67,
              "start_time": 1,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 7,
              "pitch": 67,
              "start_time": 5,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 11,
              "pitch": 67,
              "start_time": 9,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 15,
              "pitch": 67,
              "start_time": 13,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 19,
              "pitch": 67,
              "start_time": 17,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 1,
              "pitch": 69,
              "start_time": 0,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 8,
              "pitch": 69,
              "start_time": 4,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 12,
              "pitch": 69,
              "start_time": 8,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 16,
              "pitch": 69,
              "start_time": 12,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 20,
              "pitch": 69,
              "start_time": 16,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            }
          ]
        },
        {
          "id": 11,
          "name": [
            ""
          ],
          "start_time": 26,
          "end_time": 40,
          "notes": [
            {
              "note_id": 2,
              "pitch": 64,
              "start_time": 3,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 5,
              "pitch": 64,
              "start_time": 7,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 9,
              "pitch": 64,
              "start_time": 11,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 4,
              "pitch": 65,
              "start_time": 2,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 6,
              "pitch": 65,
              "start_time": 6,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 10,
              "pitch": 65,
              "start_time": 10,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 3,
              "pitch": 67,
              "start_time": 1,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 7,
              "pitch": 67,
              "start_time": 5,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 11,
              "pitch": 67,
              "start_time": 9,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 15,
              "pitch": 67,
              "start_time": 13,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 1,
              "pitch": 69,
              "start_time": 0,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 8,
              "pitch": 69,
              "start_time": 4,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 12,
              "pitch": 69,
              "start_time": 8,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 16,
              "pitch": 69,
              "start_time": 12,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            }
          ]
        },
        {
          "id": 12,
          "name": [
            "Empty"
          ],
          "start_time": 40,
          "end_time": 43,
          "notes": [
            {
              "note_id": null,
              "pitch": 65,
              "start_time": 0,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 64,
              "start_time": 1,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 69,
              "start_time": 2,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            }
          ]
        }
      ]
    },
    {
      "id": "13",
      "name": [
        "3-MIDI"
      ],
      "instrument": 12,
      "clips": [
        {
          "id": 14,
          "name": [
            ""
          ],
          "start_time": 26,
          "end_time": 38,
          "notes": [
            {
              "note_id": 2,
              "pitch": 64,
              "start_time": 3,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 5,
              "pitch": 64,
              "start_time": 7,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 9,
              "pitch": 64,
              "start_time": 11,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 4,
              "pitch": 65,
              "start_time": 2,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 6,
              "pitch": 65,
              "start_time": 6,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 10,
              "pitch": 65,
              "start_time": 10,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 3,
              "pitch": 67,
              "start_time": 1,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 7,
              "pitch": 67,
              "start_time": 5,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 11,
              "pitch": 67,
              "start_time": 9,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 1,
              "pitch": 69,
              "start_time": 0,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 8,
              "pitch": 69,
              "start_time": 4,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            },
            {
              "note_id": 12,
              "pitch": 69,
              "start_time": 8,
              "duration": 1,
              "velocity": 100,
              "mute": 0,
              "probability": 1,
              "velocity_deviation": 0,
              "release_velocity": 64
            }
          ]
        },
        {
          "id": 15,
          "name": [
            "Empty"
          ],
          "start_time": 38,
          "end_time": 50,
          "notes": [
            {
              "note_id": null,
              "pitch": 69,
              "start_time": 0,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 67,
              "start_time": 1,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 65,
              "start_time": 0,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 64,
              "start_time": 1,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            },
            {
              "note_id": null,
              "pitch": 69,
              "start_time": 2,
              "duration": 1,
              "velocity": 72,
              "mute": null,
              "probability": null,
              "velocity_deviation": null,
              "release_velocity": null
            }
          ]
        }
      ]
    }
  ]