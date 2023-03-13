import module from "../../module";


export default module(({unmount}) => {
    unmount(() => {
        console.log('单元1已经销毁');
    })
    return () => {
        console.log('单元1开始加载');
    }
})