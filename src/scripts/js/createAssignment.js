let NewAssignmentWindow;
let ViewAssignmentWIndow

function CreateAssignmentWindow(){
    NewAssignmentWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: "About-OPAS",
        frame: false,
        parent: remote.getCurrentWindow(),
        modal: true,
        show: false
    });
    var theUrl = 'file://' + __dirname + '/faculty_createNewAssignment.html';
    NewAssignmentWindow.loadURL(theUrl);
    NewAssignmentWindow.once('ready-to-show', ()=>{
        NewAssignmentWindow.show();
    });
    NewAssignmentWindow.on('closed', function () {
        NewAssignmentWindow = null;
    });
}

function CreateAssignmentView(){
    ViewAssignmentWIndow = new BrowserWindow({
        width: 800,
        height: 600,
        title: "About-OPAS",
        frame: false,
        parent: remote.getCurrentWindow(),
        modal: true,
        show: false
    });
    var theUrl = 'file://' + __dirname + '/faculty_assignment_viewsubmissions.html';
    ViewAssignmentWIndow.loadURL(theUrl);
    ViewAssignmentWIndow.once('ready-to-show', ()=>{
        ViewAssignmentWIndow.show();
    });
    ViewAssignmentWIndow.on('closed', function () {
        ViewAssignmentWIndow = null;
    });
}