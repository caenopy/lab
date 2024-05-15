outlets = 1;

function bang() {
    var patcherPath = this.patcher.filepath;
    outlet(0, patcherPath);
}
