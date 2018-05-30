let NewAssignmentWindow;
let ViewAssignmentWIndow;
let EnterCodeWindow;
let EnterStudentIDWindow;

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

function EnterGroupCode(){
    EnterCodeWindow = new BrowserWindow({
        width: 400,
        height: 200,
        title: "About-OPAS",
        frame: false,
        parent: remote.getCurrentWindow(),
        modal: true,
        show: false
    });
    var theUrl = 'file://' + __dirname + '/student_entercode.html';
    EnterCodeWindow.loadURL(theUrl);
    EnterCodeWindow.once('ready-to-show', ()=>{
        EnterCodeWindow.show();
    });
    EnterCodeWindow.on('closed', function () {
        EnterCodeWindow = null;
    });
}
function EnterStudentID(){
    EnterStudentIDWindow = new BrowserWindow({
        width: 400,
        height: 200,
        title: "About-OPAS",
        frame: false,
        parent: remote.getCurrentWindow(),
        modal: true,
        show: false
    });
    var theUrl = 'file://' + __dirname + '/faculty_addstudent.html';
    EnterStudentIDWindow.loadURL(theUrl);
    EnterStudentIDWindow.once('ready-to-show', ()=>{
        EnterStudentIDWindow.show();
    });
    EnterStudentIDWindow.on('closed', function () {
        EnterStudentIDWindow = null;
    });
}