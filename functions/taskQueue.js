const TaskQueue = (concurrency) => {
    var running = 0;
    const tasks = [];

    return async (task) => {
        tasks.push(task);
        if (running >= concurrency) return;

        ++running;
        while (tasks.length) {
            try {
                await tasks.shift()();
            } catch(err) {
                console.error(err);
            }
        }
        --running;
    }
}

module.exports = TaskQueue;