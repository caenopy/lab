{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 5,
			"revision" : 6,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 531.0, 265.0, 640.0, 480.0 ],
		"bglocked" : 0,
		"openinpresentation" : 1,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"assistshowspatchername" : 0,
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-2",
					"linecount" : 5,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 53.0, 114.0, 100.0, 76.0 ],
					"text" : "/Users/npb/Desktop/anticipation/lab/LabLoop/patchers/LabLoopPatch.maxpat"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 53.0, 23.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 53.0, 23.0, 35.0, 22.0 ],
					"text" : "open"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 53.0, 63.0, 51.0, 22.0 ],
					"text" : "pcontrol"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-3", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-2::obj-119" : [ "Tab Open", "Tab Open", 0 ],
			"obj-2::obj-141" : [ "loop.toggle", "loop.toggle", 0 ],
			"obj-2::obj-167" : [ "live.text[5]", "live.text[5]", 0 ],
			"obj-2::obj-22" : [ "Generate", "Generate", 0 ],
			"obj-2::obj-24" : [ "cancel", "cancel", 0 ],
			"obj-2::obj-34" : [ "Model[1]", "Model", 0 ],
			"obj-2::obj-425" : [ "live.text[15]", "live.text[15]", 0 ],
			"obj-2::obj-61" : [ "live.dial", "Density", 0 ],
			"obj-2::obj-64" : [ "live.button", "live.button", 0 ],
			"obj-2::obj-68" : [ "live.dial[1]", "Top P", 0 ],
			"obj-2::obj-69" : [ "live.dial[2]", "Temp", 0 ],
			"parameterbanks" : 			{
				"0" : 				{
					"index" : 0,
					"name" : "",
					"parameters" : [ "-", "-", "-", "-", "-", "-", "-", "-" ]
				}

			}
,
			"inherited_shortname" : 1
		}
,
		"dependency_cache" : [ 			{
				"name" : "LabLoopPatch.maxpat",
				"bootpath" : "~/Desktop/anticipation/lab/LabLoop/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "clearNotes.js",
				"bootpath" : "~/Desktop/anticipation/lab/LabLoop/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "clipSpaceName.js",
				"bootpath" : "~/Desktop/anticipation/lab/LabLoop/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "drawTracks.js",
				"bootpath" : "~/Desktop/anticipation/lab/LabLoop/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "fit_jweb_to_bounds.js",
				"bootpath" : "C74:/packages/Node for Max/patchers/debug-monitor",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "getArrangementState.js",
				"bootpath" : "~/Desktop/anticipation/lab/LabLoop/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "getClipNotesFromState.js",
				"bootpath" : "~/Desktop/anticipation/lab/LabLoop/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "getEmptyClipIds.js",
				"bootpath" : "~/Desktop/anticipation/lab/LabLoop/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "getFilePath.js",
				"bootpath" : "~/Desktop/anticipation/lab/LabLoop/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "getTrackInfo.js",
				"bootpath" : "~/Desktop/anticipation/lab/LabLoop/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "gradio.js",
				"bootpath" : "~/Desktop/anticipation/lab/LabLoop/node_content/dist",
				"patcherrelativepath" : "../node_content/dist",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "multimap-unmap.svg",
				"bootpath" : "~/Desktop/anticipation/lab/LabLoop/media",
				"patcherrelativepath" : "../media",
				"type" : "svg",
				"implicit" : 1
			}
, 			{
				"name" : "n4m.monitor.maxpat",
				"bootpath" : "C74:/packages/Node for Max/patchers/debug-monitor",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "resize_n4m_monitor_patcher.js",
				"bootpath" : "C74:/packages/Node for Max/patchers/debug-monitor",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "sr-arrow-down-11x11.svg",
				"bootpath" : "~/Desktop/anticipation/lab/LabLoop/media",
				"patcherrelativepath" : "../media",
				"type" : "svg",
				"implicit" : 1
			}
, 			{
				"name" : "sr-arrow-right-11x11.svg",
				"bootpath" : "~/Desktop/anticipation/lab/LabLoop/media",
				"patcherrelativepath" : "../media",
				"type" : "svg",
				"implicit" : 1
			}
, 			{
				"name" : "updateProgress.js",
				"bootpath" : "~/Desktop/anticipation/lab/LabLoop/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "writeNote.js",
				"bootpath" : "~/Desktop/anticipation/lab/LabLoop/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
