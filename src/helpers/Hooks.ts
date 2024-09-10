class Hooks {
    hookedFunctions: Array<CallableFunction>;

    constructor() {
        this.hookedFunctions = [];
    }

    add(f: CallableFunction): void {
        if (this.hookedFunctions.includes(f)) return;
        this.hookedFunctions.push(f);
    }

    get(index: number): CallableFunction {
        return this.hookedFunctions[index];
    }

    count(): number {
        return this.hookedFunctions.length;
    }

    getAll(): Array<CallableFunction> {
        return this.hookedFunctions;
    }
}

export default Hooks;