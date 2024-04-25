// This script will put track metadata in a Max Dict called "trackInfo" as well as output the track ids.
autowatch = 1;

inlets = 1;
outlets = 1;

setoutletassist(0,"track ids (list)");

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

function nameChange(nm) {
	// could be made simpler by just updating the track name in the Max Dict
	getTrackInfo();
}

function getTrackInfo() {

	var liveSet = new LiveAPI("live_set");
	
	var trackIds = [];
	var trackColors = [];
	var trackNames = [];
	var trackInstrumentIds = [];

	var trackInfo = new Dict("trackInfo");
	var trackInfoJson = {}; // Max Dicts are weird, so we'll create a JSON then throw it in a Max Dict

	trackInfo.clear();

	var numTracks = liveSet.getcount("tracks");

    for (var i = 0; i < numTracks; i++) {
        var trackApi = new LiveAPI("live_set tracks " + i);

		var color = parseFloat(trackApi.get("color"));
		var nm = trackApi.get("name");
		var id = parseInt(trackApi.id);

		var red = (color >> 16) & 0xFF;
		var green = (color >> 8) & 0xFF;
		var blue = color & 0xFF;
		var alpha = 1.0;

		red /= parseFloat(255.0);
		green /= parseFloat(255.0);
		blue /= parseFloat(255.0);

		var rgba = [red, green, blue, alpha];

		var name_pn = extractParts(nm);

		// Currently, this is never reached
		if (name_pn === null) { error("Invalid format for track name. Use: 'name [program number]'"); continue; }

		trackIds.push(id);
		trackColors.push(rgba);
		trackNames.push(name_pn.text);
		trackInstrumentIds.push(name_pn.number);

		trackInfoJson[i] = {
			"trackId": id,
			"trackColor": rgba,
			"trackName": name_pn.text,
			"instrumentId": name_pn.number
		};
    }

	trackInfo.parse(JSON.stringify(trackInfoJson));

	outlet(0, trackIds);
}

function bang() {
	getTrackInfo();
}