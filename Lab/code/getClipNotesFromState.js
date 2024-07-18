autowatch = 1;

inlets = 1;
outlets = 1;

var clips = []; 
var currTimeInSeconds = 0;

function list() {
    clips = arguments;
    post("(getClipNotesFromState.js) Setting clip_ids to: ", clips, "\n");
}

function setCurrTime(time) {
    currTimeInSeconds = time;
}

function printClips() {
    post("(getClipNotesFromState.js) Clips: ", clips, "\n");
}

function openJsonFile(filename) {
    var f = new File(filename, "read");
    var chunkSize = 4096; // Size of each chunk in bytes
    var json = "";

    if (f.isopen) {
        while (f.position < f.eof) {
            json += f.readstring(chunkSize);
        }
        f.close();
        return json;
    } else {
        post("Error: could not open file " + filename + "\n");
    }
}

function sendState() {;
    var filepath = this.patcher.filepath;
    var folderPath = filepath.substring(0, filepath.lastIndexOf("/")); // Remove the patch name, OS specific '/' for macOS '\\' for Windows
    folderPath = folderPath.substring(0, folderPath.lastIndexOf("/") + 1) + "tmp/"; // Go one directory up and into 'tmp'
    var completePath = folderPath + 'IncomingArrangementState.json';
    
    var tracks = JSON.parse(openJsonFile(completePath));
    post("Getting new notes from returned state.\n");
    if (clips.length === 0) {
        error("Generate: no clips to get notes from.\n");
    }
    getNotesFromClips(tracks, clips);
}

// Depricated, use sendState()
function tracks(arrangementState) {;
    var tracks = JSON.parse(arrangementState);
    post("Getting new notes from returned state.\n");
    if (clips.length === 0) {
        error("Generate: no clips to get notes from.\n");
    }
    getNotesFromClips(tracks, clips);
}

function getNotesFromClips(jsonData, clipIds) {
    var notesList = [];

    post("(getClipNotesFromState.js) using clipIds: ", clips, "\n");

    // TODO: change to only send notes after currTimeInSeconds
    // TODO: don't write out chord track

    jsonData.forEach(function(track) {
        track.clips.forEach(function(clip) {
            for (var i = 0; i < clipIds.length; i++) {
                if (clip.id === clipIds[i]) {
                    clip.notes.forEach(function(note) {
                        var noteString = [
                            clip.id,
                            note.pitch,
                            note.start_time,
                            note.duration,
                            note.velocity,
                        ].join(' ');
                        notesList.push(noteString);
                        post(currTimeInSeconds, "\n");
                        outlet(0, noteString);
                    });
                }
            }
        });
    });

    return notesList;
}
