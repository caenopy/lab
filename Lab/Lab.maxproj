{
	"name" : "Lab",
	"version" : 1,
	"creationdate" : 3781297746,
	"modificationdate" : 3804014040,
	"viewrect" : [ 783.0, -876.0, 297.0, 466.0 ],
	"autoorganize" : 0,
	"hideprojectwindow" : 0,
	"showdependencies" : 1,
	"autolocalize" : 0,
	"contents" : 	{
		"patchers" : 		{
			"LabGUI.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1
			}
,
			"LabWindowGUI.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1,
				"singleton" : 				{
					"bootpath" : "~/Desktop/anticipation/lab/Lab/patchers",
					"projectrelativepath" : "./patchers"
				}

			}
,
			"LabPatch.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1,
				"toplevel" : 1,
				"singleton" : 				{
					"bootpath" : "~/Desktop/anticipation/lab/Lab/patchers",
					"projectrelativepath" : "./patchers"
				}

			}
,
			"LivePrototyping.maxpat" : 			{
				"kind" : "patcher",
				"local" : 1,
				"singleton" : 				{
					"bootpath" : "~/Desktop/anticipation/lab/Lab/patchers",
					"projectrelativepath" : "./patchers"
				}

			}

		}
,
		"media" : 		{
			"multimap-unmap.svg" : 			{
				"kind" : "vectorimagefile",
				"local" : 1
			}
,
			"sr-arrow-down-11x11.svg" : 			{
				"kind" : "vectorimagefile",
				"local" : 1
			}
,
			"sr-arrow-right-11x11.svg" : 			{
				"kind" : "vectorimagefile",
				"local" : 1
			}
,
			"teaser.png" : 			{
				"kind" : "imagefile",
				"local" : 1
			}

		}
,
		"code" : 		{
			"clipSpaceName.js" : 			{
				"kind" : "javascript",
				"local" : 1
			}
,
			"drawTracks.js" : 			{
				"kind" : "javascript",
				"local" : 1
			}
,
			"getArrangementState.js" : 			{
				"kind" : "javascript",
				"local" : 1
			}
,
			"getClipNotesFromState.js" : 			{
				"kind" : "javascript",
				"local" : 1
			}
,
			"getEmptyClipIds.js" : 			{
				"kind" : "javascript",
				"local" : 1
			}
,
			"getFilePath.js" : 			{
				"kind" : "javascript",
				"local" : 1
			}
,
			"getTrackInfo.js" : 			{
				"kind" : "javascript",
				"local" : 1
			}
,
			"gradio.js" : 			{
				"kind" : "javascript",
				"local" : 1
			}
,
			"updateProgress.js" : 			{
				"kind" : "javascript",
				"local" : 1
			}
,
			"writeNote.js" : 			{
				"kind" : "javascript",
				"local" : 1
			}
,
			"density.js" : 			{
				"kind" : "javascript",
				"local" : 1,
				"singleton" : 				{
					"bootpath" : "~/Desktop/anticipation/lab/Lab/node_content/dist",
					"projectrelativepath" : "./node_content/dist"
				}

			}

		}

	}
,
	"layout" : 	{

	}
,
	"searchpath" : 	{
		"0" : 		{
			"bootpath" : "~/Desktop/anticipation/lab/Lab/code",
			"projectrelativepath" : "./code",
			"label" : "js",
			"recursive" : 1,
			"enabled" : 1,
			"includeincollective" : 1
		}
,
		"1" : 		{
			"bootpath" : "~/Desktop/anticipation/lab/Lab/node_content",
			"projectrelativepath" : "./node_content",
			"label" : "Node Content",
			"recursive" : 1,
			"enabled" : 1,
			"includeincollective" : 1
		}

	}
,
	"detailsvisible" : 0,
	"amxdtype" : 1835887981,
	"readonly" : 0,
	"devpathtype" : 0,
	"devpath" : ".",
	"sortmode" : 0,
	"viewmode" : 0,
	"includepackages" : 0
}
