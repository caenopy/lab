// This script updates a track name with a new instrument number.
autowatch = 1;

inlets = 1;

function extractParts(inputString) {
    // Regular expression to match the pattern "text [number]"
    const regex = /^(.*?)\s*\[(\d+)\]$/;

    const match = regex.exec(inputString);

    if (match) {
        return {
            text: match[1],   // Captured text before the brackets
            number: parseInt(match[2], 10) // Captured number, converted to integer
        };
    } else {
        return {
            text: inputString,   
            number: 0
        };
    }
}

function instrChange(idx, new_instr) {
	var track = new LiveAPI("live_set tracks " + idx);
	var name = track.get("name");
	var parts = extractParts(name);
	var new_name = parts.text + " [" + new_instr + "]";
	track.set("name", new_name); // this should trigger a refresh of getTrackInfo and drawTracks, updating the trackInfo dict in the process.
}
