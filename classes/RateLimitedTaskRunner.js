class RateLimitedTaskRunner {
    constructor(concurrencyLimit) {
        this.concurrencyLimit = concurrencyLimit;
        this.delayBetweenTasks = 10;
        this.tasks = [];
        this.results = [];
    }

    async addTask(task) {
        this.tasks.push(task);
    }

    async runTasks() {
        const totalTasks = this.tasks.length;

        for (let i = 0; i < totalTasks; i += this.concurrencyLimit) {
            const concurrentTasks = this.tasks.slice(i, i + this.concurrencyLimit);
            const promises = concurrentTasks.map(task => task());

            const resultsChunk = await Promise.all(promises);
            this.results.push(...resultsChunk);

            if (i + this.concurrencyLimit < totalTasks) {
                await new Promise(resolve => setTimeout(resolve, this.delayBetweenTasks));
            }
        }

        console.log('All tasks completed successfully.');

    }
}

module.exports = RateLimitedTaskRunner;