class Pomodoro{
	constructor(taskName="", pomoTime = 25, short = 5, long = 15) {
		this.taskName = taskName;
		this.pomodoroTime = pomoTime;
		this.shortBreakTime = short;
		this.longBreakTime = long;
	}

	start(taskName)	{
		this.taskName = taskName;
		return taskName;
	}
	
	nowTime() {
		// console.log("start nowtime()")
		const now = new Date();
		const second = now.getSeconds();
		const hour = now.getHours();
		const nowTime = `${hour}:${second}`;
		return nowTime;
	}

	formatedText() {
		const nowTime = this.nowTime()
		const text = `[${this.taskName}] ${nowTime}`;
		return text;
	}
}

module.exports = Pomodoro;
