/**
 * 局限： 只改变函数，非类，非继承类
* @example
    class A{
        @bind
        change(){}
    }
 */
function bind(target, key, { value: fn, configurable, enumerable }) {
  if (typeof fn !== 'function') return '';
  return {
    enumerable,
    configurable,
    get() {
      if (this == target) return fn;
      if (
        this.constructor !== target.constructor &&
        Object.getPrototypeOf(this).constructor === constructor
      ) {
        return fn;
      }
      // 不处理继承
      if (
        this.constructor !== target.constructor &&
        key in this.constructor.prototype
      ) {
        throw Error('重写super');
      }
      const trans = fn.bind(this);
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: false,
        value: trans,
        writable: true
      });
      return trans;
    },
    set(newValue) {
      Object.defineProperty(this, key, {
        configurable,
        enumerable,
        writable: true,
        value: newValue
      });
      return newValue;
    }
  };
}

export default bind;
