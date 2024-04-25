autowatch = 1;
inlets = 1;
outlets = 0;

var myPatcher;

var generalMidiInstruments = ["0. Acoustic Grand Piano", "1. Bright Acoustic Piano", "2. Electric Grand Piano", "3. Honky-tonk Piano", "4. Electric Piano 1", "5. Electric Piano 2", "6. Harpsichord", "7. Clavinet", "8. Celesta", "9. Glockenspiel", "10. Music Box", "11. Vibraphone", "12. Marimba", "13. Xylophone", "14. Tubular Bells", "15. Dulcimer", "16. Drawbar Organ", "17. Percussive Organ", "18. Rock Organ", "19. Church Organ", "20. Reed Organ", "21. Accordion", "22. Harmonica", "23. Tango Accordion", "24. Acoustic Guitar (nylon)", "25. Acoustic Guitar (steel)", "26. Electric Guitar (jazz)", "27. Electric Guitar (clean)", "28. Electric Guitar (muted)", "29. Overdriven Guitar", "30. Distortion Guitar", "31. Guitar Harmonics", "32. Acoustic Bass", "33. Electric Bass (finger)", "34. Electric Bass (pick)", "35. Fretless Bass", "36. Slap Bass 1", "37. Slap Bass 2", "38. Synth Bass 1", "39. Synth Bass 2", "40. Violin", "41. Viola", "42. Cello", "43. Contrabass", "44. Tremolo Strings", "45. Pizzicato Strings", "46. Orchestral Harp", "47. Timpani", "48. String Ensemble 1", "49. String Ensemble 2", "50. Synth Strings 1", "51. Synth Strings 2", "52. Choir Aahs", "53. Voice Oohs", "54. Synth Voice", "55. Orchestra Hit", "56. Trumpet", "57. Trombone", "58. Tuba", "59. Muted Trumpet", "60. French Horn", "61. Brass Section", "62. Synth Brass 1", "63. Synth Brass 2", "64. Soprano Sax", "65. Alto Sax", "66. Tenor Sax", "67. Baritone Sax", "68. Oboe", "69. English Horn", "70. Bassoon", "71. Clarinet", "72. Piccolo", "73. Flute", "74. Recorder", "75. Pan Flute", "76. Blown Bottle", "77. Shakuhachi", "78. Whistle", "79. Ocarina", "80. Lead 1 (square)", "81. Lead 2 (sawtooth)", "82. Lead 3 (calliope)", "83. Lead 4 (chiff)", "84. Lead 5 (charang)", "85. Lead 6 (voice)", "86. Lead 7 (fifths)", "87. Lead 8 (bass + lead)", "88. Pad 1 (new age)", "89. Pad 2 (warm)", "90. Pad 3 (polysynth)", "91. Pad 4 (choir)", "92. Pad 5 (bowed)", "93. Pad 6 (metallic)", "94. Pad 7 (halo)", "95. Pad 8 (sweep)", "96. FX 1 (rain)", "97. FX 2 (soundtrack)", "98. FX 3 (crystal)", "99. FX 4 (atmosphere)", "100. FX 5 (brightness)", "101. FX 6 (goblins)", "102. FX 7 (echoes)", "103. FX 8 (sci-fi)", "104. Sitar", "105. Banjo", "106. Shamisen", "107. Koto", "108. Kalimba", "109. Bagpipe", "110. Fiddle", "111. Shanai", "112. Tinkle Bell", "113. Agogo", "114. Steel Drums", "115. Woodblock", "116. Taiko Drum", "117. Melodic Tom", "118. Synth Drum", "119. Reverse Cymbal", "120. Guitar Fret Noise", "121. Breath Noise", "122. Seashore", "123. Bird Tweet", "124. Telephone Ring", "125. Helicopter", "126. Applause", "127. Gunshot"]; 

function extractParts(inputString) {
    // Regular expression to match the pattern "text [number]", ignoring surrounding quotes
    const regex = /["']?([^\[\]]+)\s*\[([^\[\]]+)\]["']?/; 
    const match = regex.exec(inputString);

    if (match) {
        return {
            text: match[1],   // Captured text before the brackets
            number: parseInt(match[2], 10) // Captured number, converted to integer
        };
    } else {
        post("No match for string.")
        return {
            text: inputString,   
            number: 0
        };
    }
}

function clear() {
    myPatcher = this.patcher;
    myPatcher.apply(function(obj) {
        if (obj.maxclass === "panel" && obj.varname && obj.varname.indexOf("trackRect_") === 0 ||
            obj.maxclass === "live.menu" && obj.varname && obj.varname.indexOf("trackMenu_") === 0 ||
            obj.maxclass === "live.text" && obj.varname && obj.varname.indexOf("stage_") === 0 ||
            obj.maxclass === "comment" && obj.varname && obj.varname.indexOf("trackName_") === 0 ||
            obj.maxclass === "live.path" && obj.varname && obj.varname.indexOf("lp_") === 0 ||
            obj.maxclass === "message" && obj.varname && obj.varname.indexOf("mes1_") === 0 ||
            obj.maxclass === "message" && obj.varname && obj.varname.indexOf("mes2_") === 0 ||
            obj.maxclass === "live.observer" && obj.varname && obj.varname.indexOf("lo_") === 0 ||
            obj.maxclass === "prepend" && obj.varname && obj.varname.indexOf("pp_") === 0 ||
            obj.maxclass === "js" && obj.varname && obj.varname.indexOf("jso1_") === 0 ||
            obj.maxclass === "js" && obj.varname && obj.varname.indexOf("jso2_") === 0 ||
            obj.maxclass === "deferlow" && obj.varname && obj.varname.indexOf("dl_") === 0 ||
            obj.maxclass === "prepend" && obj.varname && obj.varname.indexOf("stagepp_") === 0 ||
            obj.maxclass === "dict" && obj.varname && obj.varname.indexOf("stagedict_") === 0
            ) {
            myPatcher.remove(obj);
        }
    });
}

function nameChange(index, nm) {

    myPatcher = this.patcher;

    // post("Name change: " + nm + "\n");
    // post("Index: " + index + "\n");

    index = parseInt(index);

    var name_pn = extractParts(nm);
    var trackName = name_pn.text;
    var instrumentId = name_pn.number;

    // post('nameChange', index, trackName, instrumentId);

    var menu = myPatcher.getnamed("trackMenu_" + index);
    var comment = myPatcher.getnamed("trackName_" + index);

    // post("nameChange, " + index + ", " + trackName + ", " + instrumentId + "\n");
    // Update properties for live.menu
    menu.message("set", instrumentId);

    // Update properties for comment object
    var clippedTrackName = trackName.substring(0, 16) + (trackName.length > 16 ? ".." : "");
    comment.message("set", clippedTrackName);
}

function updateOrCreateRect(trackId, trackName, trackColor, instrumentId, index) {
    var rect = myPatcher.getnamed("trackRect_" + index);
    var menu = myPatcher.getnamed("trackMenu_" + index);
    var stage = myPatcher.getnamed("stage_" + index);
    var stagepp = myPatcher.getnamed("stagepp_" + index);
    var stagedict = myPatcher.getnamed("stagedict_" + index);

    // INTERFACE:

    if (!rect) {
        // Create new rectangle
        rect = myPatcher.newdefault(210, 30 + (index * 17), "panel");
        rect.varname = "trackRect_" + index;
        rect.border(0);
        rect.size(86, 15);
        rect.message("presentation", 1);
        rect.message("rounded", 0);
        myPatcher.message("script", "bringtofront", "trackRect_" + index);
    }
    // Update properties for rectangle
    rect.bgcolor([trackColor[0], trackColor[1], trackColor[2], 1]);

    if (!stage) {
        // Create new live.text
        stage = myPatcher.newdefault(300, 30 + (index * 17), "live.text");
        stage.varname = "stage_" + index;
        stage.size(53, 15);
        stage.message("_parameter_invisible", 2);
        stage.message("presentation", 1);
        stage.message("appearance", 2);
        stage.message("set", 1);
        myPatcher.message("script", "bringtofront", "stage_" + index);

        stagepp = myPatcher.newdefault(460, 30 + (index * 17), "prepend");
        stagepp.varname = "stagepp_" + index;
        stagepp.message("set", "set", index + "::staged");
        myPatcher.connect(stage, 0, stagepp, 0);

        stagedict = myPatcher.newdefault(520, 30 + (index * 17), "dict");
        stagedict.varname = "stagedict_" + index;
        stagedict.message("name", "trackInfo");
        myPatcher.connect(stagepp, 0, stagedict, 0);
    }

    // Update properties for live.text
    stage.message("texton", "Stage");
    stage.message("text", "Stage");

    if (!menu) {
        // Create new live.menu
        menu = myPatcher.newdefault(355, 30 + (index * 17), "live.menu");
        menu.varname = "trackMenu_" + index;
        menu.size(140, 20);
        menu.message("_parameter_invisible", 2);
        menu.message("presentation", 1);
        menu.message("appearance", 1);
        myPatcher.message("script", "bringtofront", "trackMenu_" + index);
    }
    // Update properties for live.menu
    var menuItemsMsg = ["_parameter_range"].concat(generalMidiInstruments);
    menu.message.apply(menu, menuItemsMsg);
    menu.message("set", instrumentId);

    var comment = myPatcher.getnamed("trackName_" + index);

    if (!comment) {
        // Create new comment object
        comment = myPatcher.newdefault(210, 30 + (index * 17), "comment");
        comment.varname = "trackName_" + index;
        comment.size(100, 15);
        comment.message("presentation", 1);
        comment.message("fontsize", 9);
        myPatcher.message("script", "bringtofront", "trackName_" + index);
    }

    // Update properties for comment object
    var clippedTrackName = trackName.substring(0, 16) + (trackName.length > 16 ? ".." : "");
    comment.message("set", clippedTrackName);

    // LISTENERS:

    // Change in track name --> update comment and menu

    var lp = myPatcher.getnamed("lp_" + index);
    var mes1 = myPatcher.getnamed("mes1_" + index);
    var mes2 = myPatcher.getnamed("mes2_" + index);
    var dl = myPatcher.getnamed("dl_" + index);
    var lo = myPatcher.getnamed("lo_" + index);
    var pp = myPatcher.getnamed("pp_" + index);
    var jso1 = myPatcher.getnamed("jso1_" + index);
    var jso2 = myPatcher.getnamed("jso2_" + index);

    if (!mes2) {
        mes2 = myPatcher.newdefault(210, 350 + (index * 300), "message");
        mes2.varname = "mes2_" + index;
        mes2.message("set", "path", "live_set", "tracks", index);
    }

    if (!lp) {
        lp = myPatcher.newdefault(210, 400 + (index * 300), "live.path");
        lp.varname = "lp_" + index;
        //lp.message("path", "live_set", "tracks", index);
    }

    if (!mes1) {
        mes1 = myPatcher.newdefault(210, 460 + (index * 300), "message");
        mes1.varname = "mes1_" + index;
        mes1.message("set", "property", "name");
    }

    if (!dl) {
        dl = myPatcher.newdefault(240, 430 + (index * 300), "deferlow");
        dl.varname = "dl_" + index;
        myPatcher.connect(lp, 1, dl, 0);
    }

    if (!lo) {
        lo = myPatcher.newdefault(210, 490 + (index * 300), "live.observer");
        lo.varname = "lo_" + index;
        myPatcher.connect(dl, 0, lo, 1);
        myPatcher.connect(mes1, 0, lo, 0);
        myPatcher.connect(mes2, 0, lp, 0);
        mes2.message("bang");
        mes1.message("bang");
    }

    if (!pp) {
        pp = myPatcher.newdefault(210, 520 + (index * 300), "prepend");
        pp.varname = "pp_" + index;
        pp.message("set", "nameChange", index);
    }

    if (!jso1) {
        jso1 = myPatcher.newdefault(210, 550 + (index * 300), "js");
        jso1.varname = "jso1_" + index;
        jso1.message("filename", "getTrackInfo.js");
    }

    if (!jso2) {
        jso2 = myPatcher.newdefault(350, 550 + (index * 300), "js");
        jso2.varname = "jso2_" + index;
        jso2.message("filename", "drawTracks.js");
    }

    myPatcher.connect(lo, 0, pp, 0);
    myPatcher.connect(pp, 0, jso1, 0);
    myPatcher.connect(pp, 0, jso2, 0);


    // TODO: output on instrument should write to track name / trackInfo???

}


function bang() {
    myPatcher = this.patcher;
    var liveSetApi = new LiveAPI("live_set");

    var trackInfo = new Dict("trackInfo");
    var numTracks = trackInfo.getkeys().length; //liveSetApi.getcount("tracks");

    for (var i = 0; i < numTracks; i++) { 
        var trackId = trackInfo.get(i + "::trackId");
        var trackName = trackInfo.get(i + "::trackName");
        var trackColor = trackInfo.get(i + "::trackColor");
        var instrumentId = trackInfo.get(i + "::instrumentId");

        updateOrCreateRect(trackId, trackName, trackColor, instrumentId, i); 
    }
}
