// アプリケーション作成用のモジュールを読み込み
const {
  app,
  BrowserWindow,
  Tray,
  ipcMain
} = require('electron');

// メインウィンドウ
let mainWindow;

function createWindow() {
  // メインウィンドウを作成します
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
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

let trayIcon = null;

function createTray() {
  trayIcon = new Tray(__dirname + '/icon24.png');
}

function setTrayText(text) {
  trayIcon.setTitle(text);
}

//  初期化が完了した時の処理
app.on('ready', () => {
  createWindow();
  createTray();
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

let pomo = new Pomodoro("タスク名");
pomo.start('task', setTrayText);


