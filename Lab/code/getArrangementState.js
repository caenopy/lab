autowatch = 1;

inlets = 1;
outlets = 1;

var liveSet;
var timeSelectionStart;
var timeSelectionLength;
var DEBUG = false;

function Track(id, name, instrument, clips) {
    this.id = id;
    this.name = name;
    this.instrument = instrument;
    this.clips = clips; // list of clips
}

function Clip(id, name, start_time, end_time, notes) {
    this.id = id;
    this.name = name;
    this.start_time = start_time;
    this.end_time = end_time;
    this.notes = notes;
}

function bang() {
    liveSet = new LiveAPI("live_set");
    post("Generate initialized.\n")
}

function getLoopSelection() {
    timeSelectionStart = parseFloat(liveSet.get("loop_start"));
    timeSelectionLength = parseFloat(liveSet.get("loop_length"));
    post("Generate: Loop selection from:", timeSelectionStart, "to", timeSelectionStart + timeSelectionLength, "\n");
}

function getNotesInLoop() {

    // TODO: restrict to loop (loopStartTime, loopStartTime + loopLength)

    var loopStartTime = parseFloat(liveSet.get("loop_start"));
    var loopLength = parseFloat(liveSet.get("loop_length"));
    var loopEndTime = loopStartTime + loopLength;

    var trackInfo = new Dict("trackInfo");
    var numMidiTracks = trackInfo.getkeys().length;

    // First keep a list of all unstaged tracks. TODO: handle this in the main loop.
    var unstagedTrackIDs = [];
    for (var i = 0; i < numMidiTracks; i++) {
        post('i: ' + i + '\n')
        var staged = parseInt(trackInfo.get(i + "::staged"));
        if (staged === 0) {
            unstagedTrackIDs.push(parseInt(trackInfo.get(i + "::trackId")));
        }
    }

    var tracks = [];
    var numTracks = liveSet.getcount("tracks");
    var trackIDs = liveSet.get("tracks");

    var skipTrack = false;

    // Loop through all tracks    
    for (var i = 0; i < numTracks; i++) {
        skipTrack = false;
        var trackApi = new LiveAPI("live_set tracks " + i);
        var numClips = trackApi.getcount("arrangement_clips");
        var arrangementClipIDs = trackApi.get("arrangement_clips");

        // Skip non-MIDI tracks
        if (parseFloat(trackApi.get("has_midi_input")) === 0) {
            continue;
        }

        // Skip unstaged tracks
        var trackID = trackIDs[1 + 2*i];
        for (var j = 0; j < unstagedTrackIDs.length; j++) {
            post('Comparing trackID: ' + trackID + ' to unstagedTrackID: ' + unstagedTrackIDs[j] + '\n')
            if (parseInt(trackID) === unstagedTrackIDs[j]) {
                skipTrack = true;
                continue;
            }
        }
        if (skipTrack) {
            continue;
        }

        var trackName_i = String(trackApi.get("name"));
        
        var instrumentNumber = trackName_i.match(/\[(\d+)\]/);

        // Set instrument
        // Defaults to track number; this isn't ideal, but it avoids duplicate instruments.
        var inst_i;
        if (instrumentNumber) {
            inst_i = parseInt(instrumentNumber[1]);
        } else {
            inst_i = i; 
        }

        var track = new Track(trackApi.id, trackName_i, inst_i, []);

        for (var j = 0; j < numClips; j++) {
            var clipId = arrangementClipIDs[1 + 2*j];
            var clipApi = new LiveAPI("id " + clipId);
            // Clip bounds in global time (beats)
            var clipStartTime = parseFloat(clipApi.get("start_time"));
            var clipEndTime = parseFloat(clipApi.get("end_time"));
            // Clip loop bounds in local time (beats)
            var clipLoopStartTime = parseFloat(clipApi.get("loop_start"));
            var clipLoopEndTime = parseFloat(clipApi.get("loop_end"));
            // Start marker in local time of clip view in arrangement
            var clipStartMarker = parseFloat(clipApi.get("start_marker"));
            
            if (DEBUG) {
                post('(clipStartTime, clipEndTime):                  ' + clipStartTime + ', ' + clipEndTime + '\n');
                post('(clipLoopStartTime, clipLoopEndTime):  ' + clipLoopStartTime + ', ' + clipLoopEndTime + '\n');    
            }
            
            var clipLengthInView = clipEndTime - clipStartTime;

            // The call to get_notes_extended takes arguments: from_pitch[int], to_pitch[int], from_time[float], time_span[float].
            // This grabs all the notes, and we filter later as needed.
            var notesJson = clipApi.call("get_notes_extended", 0, 128, 0, parseFloat(clipApi.get("length")));
            var notesObject = JSON.parse(notesJson);
            var notesArray = notesObject.notes;
            // Account for clip position and looping.
            var instanceNotesObject = getClipInstanceInArrangement(notesObject, clipLoopEndTime - clipLoopStartTime, clipStartMarker, clipStartMarker + clipLengthInView);
            var instanceNotesArray = instanceNotesObject.notes;

            if (DEBUG) {
                post('clipLengthInView: ' + clipLengthInView + ' start: ' + clipStartMarker + ' end: ' + parseFloat(clipStartMarker + clipLengthInView) + '\n');
                post('Num notes: ' + notesArray.length + '\n');
                post('Num new notes: ' + instanceNotesArray.length + '\n');
                post('-----\n');
            }
            
            var clip = new Clip(clipId, clipApi.get("name"), clipStartTime, clipEndTime, instanceNotesArray);
            track.clips.push(clip);
        }
        tracks.push(track);
    }

    saveToFile("OutgoingArrangementState.json", tracks);
    var tracksJson = JSON.stringify(tracks, null, 2);
    outlet(0, tracksJson);
}

function sendDummy() {

    var tracksJson = JSON.stringify(dummyData, null, 2);
    outlet(0, tracksJson);
}

function getClipInstanceInArrangement(notesObject, clipLength, startTime, endTime) {
    const notes = notesObject.notes;
    var newNotes = [];

    // Helper function to add notes based on adjusted start time
    function addNotes(offset) {
        for (var i = 0; i < notes.length; i++) {
            var note = notes[i];
            var newStartTime = note.start_time + offset - startTime;

            // If the note's start is within our window
            if (newStartTime >= 0 && newStartTime < endTime - startTime) {
                // Clone the note object without the spread operator
                var newNote = {};
                for (var key in note) {
                    newNote[key] = note[key];
                }
                newNote.start_time = newStartTime;

                // If the note exceeds the endTime relative to the instantiation, adjust its duration
                if (newStartTime + note.duration > endTime - startTime) {
                    newNote.duration = (endTime - startTime) - newStartTime;
                }

                newNotes.push(newNote);
            }
        }
    }

    // Calculate the total length to be filled
    var totalLength = endTime - startTime;

    // Determine how many full loops can fit within the total length
    var fullLoops = Math.floor(totalLength / clipLength);

    // Add notes for each full loop
    for (var j = 0; j < fullLoops; j++) {
        addNotes(j * clipLength);
    }

    // Add notes for the remainder of the loop
    addNotes(fullLoops * clipLength);

    return { notes: newNotes };
}

function openJsonFile(filename) {
    var f = new File(filename, "read");
    if (f.isopen) {
        var json = f.readstring(f.eof);
        f.close();
        return json;
    } else {
        post("Error: could not open file " + filename + "\n");
    }
}

function saveToFile(filename, jsonData) {
    var filepath = this.patcher.filepath;
    var folderPath = filepath.substring(0, filepath.lastIndexOf("/")); // Remove the patch name, OS specific '/' for macOS '\\' for Windows
    folderPath = folderPath.substring(0, folderPath.lastIndexOf("/") + 1) + "tmp/"; // Go one directory up and into 'tmp'
    var completePath = folderPath + filename;

    var f = new File(completePath, "write", "TEXT");
    if (f.isopen) {
        f.eof = 0; // Truncate the file, setting the end of the file to the beginning
        var jsonString = JSON.stringify(jsonData, null, 2);
        try {
            var chunkSize = 1024; // Size of each chunk in characters
            for (var i = 0; i < jsonString.length; i += chunkSize) {
                var chunk = jsonString.substring(i, Math.min(i + chunkSize, jsonString.length));
                f.writestring(chunk);
            }
        } catch (e) {
            post("Error during write: " + e.message + "\n");
        } finally {
            f.close();
        }
    } else {
        post("Failed to open file for writing\n");
    }
}


