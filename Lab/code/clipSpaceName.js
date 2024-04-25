inlets = 1;
outlets = 1;

function parse(name) {
    if (name.length > 12) {
        name = name.substring(0, 12) + "...";
    }

    outlet(0, name);
}


