type IType = {
    // prototype: {
    push: (k: () => void) => any
    goOut: () => any
    runAll: () => any
    instace: any
    // }
    new(): IType
}

interface LocalFuncMap {
    mount: (func: () => any) => any;
    unmount: (func: () => any) => any;
}


const Stack: IType = function () {
    this._warehouse = <Array<() => void>>Array();
    return this as IType;
}
Stack.instace = new Stack();

Stack.prototype.push = function (k: () => void) {
    this._warehouse.push(k);
}

/** clear */
Stack.prototype.goOut = function () {
    this._warehouse.length = 0;
    this._warehouse = Array();
}

/** run function all */
Stack.prototype.runAll = function () {
    this._warehouse.map(i => i());
}


const mount: LocalFuncMap['mount'] = function(func) {
    // 等待执行
    this.push(func);
};

const unmount: LocalFuncMap['unmount'] = function(func){
    console.log(this, 'module thishis');
    this.push(func);
    Stack.instace.push(func);

}
const _unmountStack = new Stack();
const _mountStack = new Stack();

const module = (component: (obj: LocalFuncMap) => any) => {
    return component({ mount: mount.bind(_mountStack), unmount: unmount.bind(_unmountStack) })
}

export default module;