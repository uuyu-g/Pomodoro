// アプリケーション作成用のモジュールを読み込み
const {
  app,
  BrowserWindow,
  Tray,
  ipcMain
} = require('electron');

const Pomodoro = require('./pomodoro');

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

function nowTime() {
  const nowTime = new Date();
  const second = nowTime.getSeconds();
  return second.toString();
}

//  初期化が完了した時の処理
app.on('ready', () => {
  createWindow();
  createTray('テスト');
});

// 全てのウィンドウが閉じたときの処理
app.on('window-all-closed', () => {
  // macOSのとき以外はアプリケーションを終了させます
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
app.on('activate', () => {
  // メインウィンドウが消えている場合は再度メインウィンドウを作成する
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * ipc処理　非同期
 *
 * @param {async}
 */
ipcMain.on('async', (event, arg) => {
  let second = nowTime();
  let pomo = new Pomodoro("タスク名");
  console.log(pomo);
  let trayText = pomo.formatedText();
  console.log(pomo.formatedText());
  setTrayText(trayText);
});

