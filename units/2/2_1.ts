import module from "../../module";


export default module(({unmount}) => {
    unmount(() => {
        console.log('单元2.1已经销毁');

    })
    return () => {
        console.log('单元2.1开始加载');
    }
})