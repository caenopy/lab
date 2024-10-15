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
		"rect" : [ 34.0, 100.0, 919.0, 848.0 ],
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
		"title" : "Lab",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-26",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 42.5, 523.0, 58.0, 22.0 ],
					"text" : "loadbang"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-25",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 42.5, 565.0, 58.0, 22.0 ],
					"text" : "title Lab"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-19",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 42.5, 604.0, 67.0, 22.0 ],
					"save" : [ "#N", "thispatcher", ";", "#Q", "end", ";" ],
					"text" : "thispatcher"
				}

			}
, 			{
				"box" : 				{
					"comment" : "Unused",
					"id" : "obj-16",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 582.0, 90.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "Active",
					"id" : "obj-9",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1326.891591519117355, 366.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 1326.891591519117355, 288.513816509097751, 40.0, 22.0 ],
					"text" : "active"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-393",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 61.0, 293.207205059752482, 54.0, 22.0 ],
					"text" : "deferlow"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-392",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 61.0, 153.513511362299937, 54.0, 22.0 ],
					"text" : "deferlow"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4870",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 58.267217099666595, 391.481271060929316, 24.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-3939",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 104.711394980549812, 327.805675032362956, 35.0, 22.0 ],
					"text" : "clear"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-3852",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "bang", "" ],
					"patching_rect" : [ 61.0, 183.077362502813344, 29.5, 22.0 ],
					"text" : "t b l"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-3856",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 61.0, 222.305675032362956, 91.0, 22.0 ],
					"text" : "property tracks"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-3857",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 42.5, 90.0, 131.0, 22.0 ],
					"text" : "loadmess path live_set"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-3858",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 42.5, 121.917142356634145, 56.0, 22.0 ],
					"text" : "live.path"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-3859",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 61.0, 259.917142356634145, 80.0, 22.0 ],
					"saved_object_attributes" : 					{
						"_persistence" : 0
					}
,
					"text" : "live.observer"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-78",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 58.267217099666595, 325.805675032362956, 24.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-73",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 58.267217099666595, 365.487556191906947, 99.0, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "getTrackInfo.js",
						"parameter_enable" : 0
					}
,
					"text" : "js getTrackInfo.js"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-7",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 58.5, 425.039280148968714, 94.0, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "drawTracks.js",
						"parameter_enable" : 0
					}
,
					"text" : "js drawTracks.js"
				}

			}
, 			{
				"box" : 				{
					"comment" : "Bound Toggle",
					"id" : "obj-17",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 887.598033399412998, 366.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "Calculate Density Button",
					"id" : "obj-15",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1263.391591519117355, 366.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "Density",
					"id" : "obj-14",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1193.420924752950668, 366.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "Temperature",
					"id" : "obj-13",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1136.459110069275084, 366.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "TopP",
					"id" : "obj-12",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1077.161177039146423, 366.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "Model Selector",
					"id" : "obj-11",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1007.573577061295509, 366.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "Cancel",
					"id" : "obj-10",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 749.122869908809662, 366.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "Loop",
					"id" : "obj-8",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 817.552265554666519, 366.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "Generate",
					"id" : "obj-6",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 663.604002118110657, 366.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "Progress Status",
					"id" : "obj-5",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1006.868659198284149, 90.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "Progress Bar",
					"id" : "obj-4",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 855.748429536819458, 90.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "Progress Percentage",
					"id" : "obj-3",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 779.439650562405404, 90.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "Space Indicator",
					"id" : "obj-2",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 669.0, 90.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"annotation" : "Enable looper",
					"appearance" : 1,
					"hint" : "Enable looper",
					"id" : "obj-141",
					"maxclass" : "live.text",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 817.552265554666519, 293.513816509097751, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 137.21104471385479, 198.416666567325592, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_info" : "Enable looper",
							"parameter_invisible" : 2,
							"parameter_longname" : "loop.toggle",
							"parameter_mmax" : 1,
							"parameter_shortname" : "loop.toggle",
							"parameter_type" : 2
						}

					}
,
					"text" : "Loop",
					"texton" : "Loop",
					"varname" : "looptoggle"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-70",
					"maxclass" : "live.comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 779.439650562405404, 160.0, 40.044358998537064, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 83.079024501447691, 67.204688936471939, 34.284745000000001, 18.0 ],
					"saved_attribute_attributes" : 					{
						"textcolor" : 						{
							"expression" : "themecolor.live_lcd_control_fg"
						}

					}
,
					"text" : "0%",
					"textcolor" : [ 1.0, 0.709803921568627, 0.196078431372549, 1.0 ],
					"textjustification" : 2
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.156862745098039, 0.156862745098039, 0.156862745098039, 1.0 ],
					"elementcolor" : [ 0.156862745098039, 0.156862745098039, 0.156862745098039, 1.0 ],
					"id" : "obj-33",
					"ignoreclick" : 1,
					"knobcolor" : [ 1.0, 0.709803921568627, 0.196078431372549, 1.0 ],
					"knobshape" : 4,
					"maxclass" : "slider",
					"numinlets" : 1,
					"numoutlets" : 1,
					"orientation" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 855.748429536819458, 160.0, 125.0, 12.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 5.999999501447689, 71.00468893647195, 80.0, 10.0 ],
					"saved_attribute_attributes" : 					{
						"bgcolor" : 						{
							"expression" : "themecolor.live_lcd_bg"
						}
,
						"elementcolor" : 						{
							"expression" : "themecolor.live_lcd_bg"
						}
,
						"knobcolor" : 						{
							"expression" : "themecolor.live_lcd_control_fg"
						}

					}
,
					"size" : 100.0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-182",
					"linecolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 0.18 ],
					"maxclass" : "live.line",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1266.842972919344902, 217.331373024433788, 53.566047310829163, 9.063998217582707 ],
					"presentation" : 1,
					"presentation_rect" : [ 407.035149208824578, 18.746542096138, 87.334166996181011, 10.327751398086548 ],
					"saved_attribute_attributes" : 					{
						"linecolor" : 						{
							"expression" : ""
						}

					}

				}

			}
, 			{
				"box" : 				{
					"id" : "obj-183",
					"linecolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 0.18 ],
					"maxclass" : "live.line",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1266.842972919344902, 228.87126434698655, 53.566047310829163, 10.048213790060061 ],
					"presentation" : 1,
					"presentation_rect" : [ 234.839385010302067, 18.916666567325592, 116.786878637969465, 10.157626926898956 ],
					"saved_attribute_attributes" : 					{
						"linecolor" : 						{
							"expression" : ""
						}

					}

				}

			}
, 			{
				"box" : 				{
					"fontname" : "Ableton Sans Medium",
					"fontsize" : 9.5,
					"id" : "obj-184",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1266.842972919344902, 195.641962513327599, 122.0, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 351.566571624110281, 6.916666567325592, 55.0, 18.0 ],
					"text" : "Instrument",
					"textcolor" : [ 0.501960784313725, 0.501960784313725, 0.501960784313725, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Ableton Sans Medium",
					"fontsize" : 9.5,
					"id" : "obj-185",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1266.842972919344902, 175.641962513327599, 122.0, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 204.954633936285973, 6.916666567325592, 55.999999999999972, 18.0 ],
					"text" : "Track",
					"textcolor" : [ 0.501960784313725, 0.501960784313725, 0.501960784313725, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"appearance" : 1,
					"id" : "obj-167",
					"maxclass" : "live.text",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 887.598033399412998, 288.513816509097751, 60.924448072910309, 35.03810541331768 ],
					"presentation" : 1,
					"presentation_rect" : [ 137.21104471385479, 215.416666567325592, 60.666665852069855, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_invisible" : 2,
							"parameter_longname" : "live.text[5]",
							"parameter_mmax" : 1,
							"parameter_shortname" : "live.text[5]",
							"parameter_type" : 2
						}

					}
,
					"text" : "Bound",
					"texton" : "Bound",
					"varname" : "live.text[5]"
				}

			}
, 			{
				"box" : 				{
					"annotation" : "Cancel request to model.",
					"annotation_name" : "Cancel",
					"fontsize" : 6.0,
					"hint" : "Cancel request to model",
					"id" : "obj-24",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 749.122869908809662, 288.513816509097751, 25.0, 25.0 ],
					"pictures" : [ "multimap-unmap.svg", "multimap-unmap.svg" ],
					"presentation" : 1,
					"presentation_rect" : [ 102.73932485931968, 215.076008051633835, 15.0, 15.0 ],
					"remapsvgcolors" : 1,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_annotation_name" : "Cancel",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_info" : "Cancel request to model.",
							"parameter_invisible" : 2,
							"parameter_longname" : "cancel",
							"parameter_mmax" : 1,
							"parameter_shortname" : "cancel",
							"parameter_type" : 2
						}

					}
,
					"text" : "X",
					"texton" : "x",
					"usepicture" : 1,
					"usesvgviewbox" : 1,
					"varname" : "live.text[4]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.156862745098039, 0.156862745098039, 0.156862745098039, 1.0 ],
					"id" : "obj-63",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1227.911497281024822, 199.099980488419533, 23.332454919815063, 19.309601274430747 ],
					"presentation" : 1,
					"presentation_rect" : [ 202.954633936285973, 2.916666567325592, 294.995157956700268, 230.609093174486162 ],
					"proportion" : 0.39,
					"saved_attribute_attributes" : 					{
						"bgfillcolor" : 						{
							"expression" : "themecolor.live_lcd_bg"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Ableton Sans Medium",
					"fontsize" : 9.5,
					"id" : "obj-93",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1006.868659198284149, 160.0, 75.872667580842972, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 40.01692995429039, 51.499093279242516, 73.189136743545532, 18.0 ],
					"saved_attribute_attributes" : 					{
						"textcolor" : 						{
							"expression" : "themecolor.live_lcd_control_fg"
						}

					}
,
					"text" : "waiting",
					"textcolor" : [ 1.0, 0.709803921568627, 0.196078431372549, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Ableton Sans Medium",
					"fontsize" : 9.5,
					"id" : "obj-92",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1228.536497221420177, 141.196879707350718, 49.391232013702393, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 6.494203001260757, 51.454805493354797, 44.0, 18.0 ],
					"text" : "Status",
					"textcolor" : [ 0.862745098039216, 0.862745098039216, 0.862745098039216, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Ableton Sans Medium",
					"fontsize" : 9.5,
					"id" : "obj-91",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1228.536497221420177, 121.376123301758753, 49.391232013702393, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 6.494203001260757, 34.454805493354797, 44.0, 18.0 ],
					"text" : "Space",
					"textcolor" : [ 0.862745098039216, 0.862745098039216, 0.862745098039216, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Ableton Sans Medium",
					"fontsize" : 9.5,
					"id" : "obj-89",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 669.0, 160.0, 75.872667580842972, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 40.01692995429039, 34.454805493354797, 73.189136743545532, 18.0 ],
					"saved_attribute_attributes" : 					{
						"textcolor" : 						{
							"expression" : "themecolor.live_lcd_control_fg"
						}

					}
,
					"text" : "http://127.0...",
					"textcolor" : [ 1.0, 0.709803921568627, 0.196078431372549, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-74",
					"maxclass" : "live.line",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1284.182721004913219, 94.338391356244074, 7.708870514204136, 64.858488351106644 ],
					"presentation" : 1,
					"presentation_rect" : [ 123.188330858945847, 6.916666567325592, 5.0, 223.684210538864136 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Ableton Sans Medium",
					"fontsize" : 9.5,
					"id" : "obj-75",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1293.891591519117355, 98.376123301758753, 106.0, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2.539400786161423, 6.916666567325592, 45.0, 18.0 ],
					"saved_attribute_attributes" : 					{
						"textcolor" : 						{
							"expression" : "themecolor.live_control_fg"
						}

					}
,
					"text" : "Model",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Ableton Sans Medium",
					"fontsize" : 9.5,
					"id" : "obj-76",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1228.536497221420177, 98.376123301758753, 49.391232013702393, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 127.668114989995956, 6.916666567325592, 47.508771896362305, 18.0 ],
					"saved_attribute_attributes" : 					{
						"textcolor" : 						{
							"expression" : "themecolor.live_control_fg"
						}

					}
,
					"text" : "Controls",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"annotation" : "Higher temperatures flatten the note probability distribution, making less likely notes more probable. This results in more randomness and diversity in the output.",
					"annotation_name" : "Temperature Selector",
					"hint" : "Set the temperature for sampling from the model",
					"id" : "obj-69",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1136.459110069275084, 263.013816509097751, 44.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 123.668114989995956, 31.416666567325592, 44.0, 48.0 ],
					"prototypename" : "transp",
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_annotation_name" : "Temperature Selector",
							"parameter_info" : "Higher temperatures flatten the note probability distribution, making less likely notes more probable. This results in more randomness and diversity in the output.",
							"parameter_initial" : [ 1.0 ],
							"parameter_initial_enable" : 1,
							"parameter_invisible" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "live.dial[2]",
							"parameter_mmax" : 1.0,
							"parameter_shortname" : "Temp",
							"parameter_type" : 0,
							"parameter_unitstyle" : 1
						}

					}
,
					"varname" : "live.dial[2]"
				}

			}
, 			{
				"box" : 				{
					"annotation" : "Select size of Anticipatory Music Transformer.",
					"annotation_name" : "Model Selector",
					"hint" : "Select model",
					"id" : "obj-34",
					"maxclass" : "live.tab",
					"num_lines_patching" : 1,
					"num_lines_presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 967.073577061295509, 291.013816509097751, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2.539400786161423, 94.100877106189728, 115.694127857685089, 16.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_annotation_name" : "Model Selector",
							"parameter_enum" : [ "small", "med", "large" ],
							"parameter_info" : "Select size of Anticipatory Music Transformer.",
							"parameter_longname" : "Model[1]",
							"parameter_mmax" : 2,
							"parameter_shortname" : "Model",
							"parameter_type" : 2,
							"parameter_unitstyle" : 9
						}

					}
,
					"varname" : "Model[1]"
				}

			}
, 			{
				"box" : 				{
					"annotation" : "Set top P for nucleus sampling.",
					"annotation_name" : "Top P",
					"hint" : "Set top P for nucleus sampling",
					"id" : "obj-68",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1077.161177039146423, 263.013816509097751, 44.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 156.954633936285973, 61.100877106189728, 44.0, 48.0 ],
					"prototypename" : "Q",
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_annotation_name" : "Top P",
							"parameter_exponent" : 3.5,
							"parameter_info" : "Set top P for nucleus sampling.",
							"parameter_initial" : [ 0.99 ],
							"parameter_initial_enable" : 1,
							"parameter_linknames" : 1,
							"parameter_longname" : "live.dial[1]",
							"parameter_mmax" : 1.0,
							"parameter_shortname" : "Top P",
							"parameter_type" : 0,
							"parameter_unitstyle" : 1
						}

					}
,
					"varname" : "live.dial[1]"
				}

			}
, 			{
				"box" : 				{
					"annotation" : "Not implemented.",
					"annotation_name" : "Placeholder Density Calculator",
					"hint" : "Not implemented.",
					"id" : "obj-64",
					"maxclass" : "live.button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1263.891591519117355, 296.013816509097751, 15.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 171.454633936285973, 111.416396141052246, 15.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_annotation_name" : "Placeholder Density Calculator",
							"parameter_enum" : [ "off", "on" ],
							"parameter_info" : "Not implemented.",
							"parameter_longname" : "live.button",
							"parameter_mmax" : 1,
							"parameter_shortname" : "live.button",
							"parameter_type" : 2
						}

					}
,
					"varname" : "live.button"
				}

			}
, 			{
				"box" : 				{
					"annotation" : "Not implemented.",
					"annotation_name" : "Placeholder Density Selector",
					"hint" : "Not implemented.",
					"id" : "obj-61",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1193.420924752950668, 263.013816509097751, 44.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 124.168114989995956, 78.416396141052246, 44.0, 48.0 ],
					"prototypename" : "amount",
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_annotation_name" : "Placeholder Density Selector",
							"parameter_info" : "Not implemented.",
							"parameter_initial" : [ 0 ],
							"parameter_initial_enable" : 1,
							"parameter_linknames" : 1,
							"parameter_longname" : "live.dial",
							"parameter_mmax" : 100.0,
							"parameter_shortname" : "Density",
							"parameter_type" : 0,
							"parameter_unitstyle" : 5
						}

					}
,
					"varname" : "live.dial"
				}

			}
, 			{
				"box" : 				{
					"annotation" : "Click to prompt the model.",
					"annotation_name" : "Generate",
					"focusbordercolor" : [ 0.627450980392157, 0.627450980392157, 0.627450980392157, 0.0 ],
					"hint" : "Click to prompt the model",
					"id" : "obj-22",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 663.604002118110657, 293.513816509097751, 60.03773558139801, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2.914956144033425, 215.076008051633835, 97.824368715286255, 15.0 ],
					"saved_attribute_attributes" : 					{
						"focusbordercolor" : 						{
							"expression" : ""
						}
,
						"valueof" : 						{
							"parameter_annotation_name" : "Generate",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_info" : "Click to prompt the model.",
							"parameter_invisible" : 2,
							"parameter_longname" : "Generate",
							"parameter_mmax" : 1,
							"parameter_shortname" : "Generate",
							"parameter_type" : 2
						}

					}
,
					"text" : "Generate",
					"texton" : "Generate",
					"varname" : "live.text"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.156862745098039, 0.156862745098039, 0.156862745098039, 1.0 ],
					"id" : "obj-50",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1227.911497281024822, 175.641962513327599, 23.332454919815063, 18.208768263459206 ],
					"presentation" : 1,
					"presentation_rect" : [ 2.539400786161423, 31.454805493354797, 114.824368715286255, 56.904457479715347 ],
					"proportion" : 0.39,
					"saved_attribute_attributes" : 					{
						"bgfillcolor" : 						{
							"expression" : "themecolor.live_lcd_bg"
						}

					}

				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-141", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-17", 0 ],
					"source" : [ "obj-167", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-89", 0 ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-22", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 0 ],
					"source" : [ "obj-24", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-19", 0 ],
					"source" : [ "obj-25", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-25", 0 ],
					"source" : [ "obj-26", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-70", 0 ],
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"source" : [ "obj-34", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.501961, 0.501961, 0.501961, 0.901961 ],
					"destination" : [ "obj-3856", 0 ],
					"source" : [ "obj-3852", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.501961, 0.501961, 0.501961, 0.901961 ],
					"destination" : [ "obj-3859", 1 ],
					"midpoints" : [ 81.0, 215.917142356634145, 169.5, 215.917142356634145, 169.5, 247.917142356634145, 131.5, 247.917142356634145 ],
					"source" : [ "obj-3852", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.501961, 0.501961, 0.501961, 0.901961 ],
					"destination" : [ "obj-3859", 0 ],
					"source" : [ "obj-3856", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3858", 0 ],
					"source" : [ "obj-3857", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-392", 0 ],
					"source" : [ "obj-3858", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-393", 0 ],
					"source" : [ "obj-3859", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3852", 0 ],
					"source" : [ "obj-392", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3939", 0 ],
					"order" : 0,
					"source" : [ "obj-393", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-78", 0 ],
					"order" : 1,
					"source" : [ "obj-393", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"midpoints" : [ 114.211394980549812, 357.305674793944377, 158.634579166769981, 357.305674793944377, 158.634579166769981, 417.340157869086283, 83.634579166769981, 417.340157869086283, 83.634579166769981, 417.305674793944377, 68.0, 417.305674793944377 ],
					"source" : [ "obj-3939", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-33", 0 ],
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-4870", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-93", 0 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"source" : [ "obj-61", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"source" : [ "obj-64", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 0 ],
					"source" : [ "obj-68", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"source" : [ "obj-69", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4870", 0 ],
					"source" : [ "obj-73", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-73", 0 ],
					"source" : [ "obj-78", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-141" : [ "loop.toggle", "loop.toggle", 0 ],
			"obj-167" : [ "live.text[5]", "live.text[5]", 0 ],
			"obj-22" : [ "Generate", "Generate", 0 ],
			"obj-24" : [ "cancel", "cancel", 0 ],
			"obj-34" : [ "Model[1]", "Model", 0 ],
			"obj-61" : [ "live.dial", "Density", 0 ],
			"obj-64" : [ "live.button", "live.button", 0 ],
			"obj-68" : [ "live.dial[1]", "Top P", 0 ],
			"obj-69" : [ "live.dial[2]", "Temp", 0 ],
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
				"name" : "drawTracks.js",
				"bootpath" : "~/Desktop/anticipation/lab/Lab/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "getTrackInfo.js",
				"bootpath" : "~/Desktop/anticipation/lab/Lab/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "multimap-unmap.svg",
				"bootpath" : "~/Desktop/anticipation/lab/Lab/media",
				"patcherrelativepath" : "../media",
				"type" : "svg",
				"implicit" : 1
			}
 ],
		"autosave" : 0,
		"bgcolor" : [ 0.129412, 0.129412, 0.129412, 1.0 ],
		"editing_bgcolor" : [ 0.129412, 0.129412, 0.129412, 1.0 ],
		"saved_attribute_attributes" : 		{
			"editing_bgcolor" : 			{
				"expression" : "themecolor.theme_textcolor"
			}
,
			"locked_bgcolor" : 			{
				"expression" : "themecolor.theme_textcolor"
			}

		}

	}

}
