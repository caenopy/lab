autowatch = 1;

inlets = 1;
outlets = 1;

var clips = []; 

function list() {
    clips = arguments;
    post("(clearNotes.js) Setting clip_ids to: ", clips, "\n");
}

function clearNotes(){
    post("(clearNotes.js) Clearing notes from clips with ids: ", clips, "\n");
	for (var i = 0; i < clips.length; i++){
		var path = "id " + clips[i];
		var liveApiClip = new LiveAPI(path);

		liveApiClip.call("remove_notes_extended", 0, 128, 0, parseFloat(liveApiClip.get("length")));
	}
}