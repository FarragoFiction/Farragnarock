
// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const electron = require('electron')
const http = require('http');
var url = require('url');

  var greenworks;
  try {
    // if greenworks is installed in a node_modules folder, this will work
    greenworks = require('greenworks');
  } catch(e) {
    greenworks = require('../../greenworks');
  }
    console.log("hello world");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
var path = require('path')

const Menu = electron.Menu;


function createWindow () {

  // Create the browser window.
   mainWindow = new BrowserWindow({width: 1400, height: 1000,      icon: path.join(__dirname, 'icon.ico')})
   mainWindow.maximize();
   mainWindow.zoomFactor = (0.05);

  // and load the index.html of the app.
  mainWindow.loadFile('title.html');

  const template = [
    {
      label: 'Think Like a Waste',
      submenu: [
        {label: "You Know You Want To",
        click: (item, focusedWindow) => {
            mainWindow.toggleDevTools();
        }
        }
      ]
    },{
            label: '>Be The Other Guy',
            submenu: [
              {label: "Hub World?",
              click: (item, focusedWindow) => {
                  mainWindow.loadFile('title.html')
              }
              },
                 {label: "Reaper",
                 click: (item, focusedWindow) => {
                     mainWindow.loadFile('LOHAE/index.html')
                 }
                 }
              ,{label: "Guide",
                click: (item, focusedWindow) => {
                    mainWindow.loadFile('LOMAT/index.html')
                }
                }
            ]
          }
    ];
  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu)


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//experimenting to see if running a tiny server is viable for achievements
const hostname = '127.0.0.1';
const port = 215; //game comes out on 2/15/19

const server = http.createServer((req, res) => {
    //never got cors figured out but it still unlocks the achievement even if it cant get a resp
  //res.setHeader('Access-Control-Allow-Headers', "http://localhost:61422/");
  stats = ["unique_fruit","nidhoggs_purified","nidhoggs_killed","nidhoggs_awoken"];
  achievements = ["LOHAE","Killed_Nidhogg","purified_nidhogg","Woke_Nidhogg","i_gave_myself_this_achievement","true_name","secret_aligator","myserty"];
  res.statusCode = 200;
  query = req.url.replace("/","");
  res.setHeader('Content-Type', 'text/plain');
 if(query.startsWith("clear")){
    query = query.replace("clear_","");
     clearAchievement(query);
 }else if(query.startsWith("get")){
      query = query.replace("get_","");
      //TODO look at letting this end
       getStat(query,res);
   }else if(stats.indexOf(query) != -1){
 res.write("stat found\n");
   setStat(query);
 }else if (achievements.indexOf(query) != -1){
      res.write("achievement found to unlock\n");
   unlockAchievement(query);
 }else{
    res.write("JR NOTE: UNKNOWN ACHIEVEMENT OR STAT ", req.url);
 }
    res.end(query);

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//will end when it got got
//experimenting with passing along res
function getStat(name, res){
    res.write("Getting stat: ", name);
    console.log("getting stat: ", name);
    greenworks.getStatInt(name,
            function(stat) { console.log(stat) },
        function(err) {
           res.statusCode = 404;
          console.log("ERROR: ", name, ": NOT FOUND!!! AB: There is a MATH percent chance you fucked something up, dunkass. ");
        });

}


function unlockAchievement(name){
    greenworks.activateAchievement(name,
        function() { console.log("Activating achievement",name, " successfully"); },
         function(err) { console.log('Failed on activating achievement.'); });
}

function clearAchievement(name){
    greenworks.clearAchievement(name,
        function() { console.log("Clearing achievement",name, " successfully"); },
         function(err) { console.log('Failed on activating achievement.'); });
}

//TODO probably need to get the prev value of the stat and set it to stat + 1???
function setStat(name){
    greenworks.setStat(name,10,
        function() { console.log("Setting stat",name, " successfully"); },
         function(err) { console.log('Failed on activating achievement.'); });
}



function testSteamAPI() {
    console.log("test steam api");
  var os = require('os');

  if (!greenworks) {
    console.log('Greenworks not support for ' + os.platform() + ' platform');
  } else {
    if (!greenworks.init()) {
      console.log('Error on initializing steam API.');
    } else {
      console.log('Steam API initialized successfully.');

      console.log('Cloud enabled: ' + greenworks.isCloudEnabled());
      console.log('Cloud enabled for user: ' + greenworks.isCloudEnabledForUser());

      greenworks.on('steam-servers-connected', function() { console.log('connected'); });
      greenworks.on('steam-servers-disconnected', function() { console.log('disconnected'); });
      greenworks.on('steam-server-connect-failure', function() { console.log('connected failure'); });
      greenworks.on('steam-shutdown', function() { console.log('shutdown'); });

      greenworks.saveTextToFile('test_file.txt', 'test_content',
          function() { console.log('Save text to file successfully'); },
          function(err) { console.log('Failed on saving text to file'); });

      greenworks.readTextFromFile('test_file.txt', function(message) {
          console.log('Read text from file successfully.'); }, function(err) {
          console.log('Failed on reading text from file'); });

      greenworks.getCloudQuota(
          function() { console.log('Getting cloud quota successfully.') },
          function(err) { console.log('Failed on getting cloud quota.') });



     greenworks.getStatInt('totallyfake',
               function(stat) { console.log('got stat back',stat); },
               function(err) { console.log('Failed on getting stat.'); });


      greenworks.getNumberOfPlayers(
          function(a) { console.log("Number of players " + a) },
          function(err) { console.log ('Failed on getting number of players'); });

      console.log("Numer of friends: " +
          greenworks.getFriendCount(greenworks.FriendFlags.Immediate));
      var friends = greenworks.getFriends(greenworks.FriendFlags.Immediate);
      var friends_names = [];
      for (var i = 0; i < friends.length; ++i)
        friends_names.push(friends[i].getPersonaName());
      console.log("Friends: [" + friends_names.join(',') + "]");
    }
  }
}

testSteamAPI();

