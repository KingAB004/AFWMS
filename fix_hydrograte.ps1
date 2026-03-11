$path = 'c:\projects\AFWMS\simulation\admin\js\hydrograte.js'
$content = Get-Content $path -Raw
$old = @"
// Init Hydrograte Status
function initHydrograteStatus() {
    renderHydrogratesList();
    renderHydrograteStatus();
    attachHydrograteEventListeners();
}
