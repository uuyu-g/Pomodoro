// アプリケーション作成用のモジュールを読み込み
const {
  app,
  BrowserWindow,
  Tray,
  ipcMain
} = require('electron');
const menubar = require('menubar');

// メインウィンドウ
let mainWindow;
let mb = menubar({
  width:300,
  height:40,
});

mb.on('ready', () => {
  console.log('メニューバーが起動')
})

function createWindow() {
  // メインウィンドウを作成します
  mainWindow = new BrowserWindow({
    width: 800,
    height: 40,
    frame: false,
  });

  // メインウィンドウに表示するURLを指定します
  // （今回はmain.jsと同じディレクトリのindex.html）
  mainWindow.loadFile('index.html');

  // デベロッパーツールの起動
  // mainWindow.webContents.openDevTools();

  // メインウィンドウが閉じられたときの処理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// let trayIcon = null;

// function createTray() {
//   trayIcon = new Tray(__dirname + '/icon24.png');
//   trayIcon.window = new BrowserWindow({
//     width: 800,
//     height: 40,
//     frame: false,
//     show: false,});
//   trayIcon.window.loadFile('index.html');

//   trayIcon.on('click', () => {
//     console.log('トレイアイコンがクリックされた')
//     if (trayIcon.window.isVisible()) {
//       trayIcon.window.hide();
//     } else {
//       trayIcon.window.show();
//     }
//   });
// }

function setTrayText(text) {
  mb.tray.setTitle(text);
  mb.window.hide();
}

//  初期化が完了した時の処理
app.on('ready', () => {
  // createWindow();
  // createTray();
});

// 全てのウィンドウが閉じたときの処理
app.on('window-all-closed', () => {
  // macOSのとき以外はアプリケーションを終了させます
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// アプリケーションがアクティブになった時の処理 （Macだと、Dockがクリックされた時）
app.on('activate', () => {
  // メインウィンドウが消えている場合は再度メインウィンドウを作成する
  if (mainWindow === null) {
    createWindow();
  }
});

const Pomodoro = require('./pomodoro');

// let pomo = new Pomodoro("タスク名");
// pomo.start('task', setTrayText);

ipcMain.on('async', (event, text) => {
  let pomo = new Pomodoro(text);
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    },10000)
    pomo.start(0.5, setTrayText);
  })
  promise.then(() => {
    createWindow();
  })
})

