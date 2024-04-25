autowatch = 1;

inlets = 1;
outlets = 1;

function writeNote(clip_id, pitch, time, duration, velocity){
	var path = "id " + clip_id;
	var liveApiClip = new LiveAPI(path);

	if (parseInt(liveApiClip.get("is_arrangement_clip")) === 1) {
		var note = {"notes": [{"pitch": pitch, "start_time": time, "duration": duration, "velocity": velocity}]}
		liveApiClip.call("add_new_notes", note);
	}
}