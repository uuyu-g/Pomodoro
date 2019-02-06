const {
  Tray
} = require('electron');

class Pomodoro{
	constructor(taskName="", pomoTime = 25, short = 5, long = 15) {
		this.taskName = taskName;
		this.pomodoroTime = pomoTime;
		this.shortBreakTime = short;
		this.longBreakTime = long;
		// createTray();
	}

	start(section, func)	{
		let time;
		switch (section) {
			case 'task':
				time = this.pomodoroTime;
				break;
			case 'shortBreak':
				time = this.shortBreakTime;
				break;
			case 'longBreak':
				time = this.longBreakTime;
			default:
				time = 0.1 //テスト用に６秒で
				break;
		}
		this.countDownOfMinutes(time, func);
	}

	nowTime() {
		// console.log("start nowtime()")
		const now = new Date();
		const seconds = now.getSeconds();
		const minutes = now.getMinutes();
		const nowTime = `${minutes}:${seconds}`;
		return nowTime;
	}



	countDownOfMinutes(time, func) {
		let limitTime = time * 60;
		
		const timer = setInterval(() => {
			limitTime--;
			let text = this.formatedText(limitTime);
			console.log(limitTime);
			if (limitTime === 0) {
				text = '';
				clearInterval(timer);
			}
			func(text);
			// setTrayText(text);
		}, 1000);
	}

	//formatedText(25) => 1555からカウントダウン
	formatedText(i) {
		let minutes = 0;
		let seconds = 0;
		if (i >= 60) {
			minutes = Math.floor(i / 60);
			seconds = i % 60;
		} else {
			minutes = 0;
			seconds = i;
		}
		const text = `[${this.taskName}] ${minutes}:${seconds}`;
		return text;
	}
}

module.exports = Pomodoro;
