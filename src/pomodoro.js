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

	countDown() {
		// const timer = setTimeout(() => {
			
		// }, 1000);
		// if (i === 10) {
		// 	clearInterval
		// }
		return true;
	}

	formatedText() {
		const nowTime = this.nowTime()
		const text = `[${this.taskName}] ${nowTime}`;
		return text;
	}
}

module.exports = Pomodoro;
