autowatch = 1;

inlets = 1;
outlets = 1;

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

function sendState() {
    var filepath = this.patcher.filepath;
    var folderPath = filepath.substring(0, filepath.lastIndexOf("/")); // Remove the patch name, OS specific '/' for macOS '\\' for Windows
    folderPath = folderPath.substring(0, folderPath.lastIndexOf("/") + 1) + "tmp/"; // Go one directory up and into 'tmp/'
    var completePath = folderPath + 'OutgoingArrangementState.json';

    var clipIds = [];
    var tracksString = openJsonFile(completePath);
    var tracks = JSON.parse(tracksString);

    tracks.forEach(function(track) {
        track.clips.forEach(function(clip) {
            if (clip.notes.length === 0) {
                clipIds.push(clip.id);
            }
        });
    });

    outlet(0, clipIds);
}

// Depricated, use sendState()
function tracks(arrangementState) {
    var clipIds = [];
    var tracks = JSON.parse(arrangementState);

    tracks.forEach(function(track) {
        track.clips.forEach(function(clip) {
            if (clip.notes.length === 0) {
                clipIds.push(clip.id);
            }
        });
    });

    outlet(0, clipIds);
}
