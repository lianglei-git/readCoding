import { SpButton } from "@/components/RewriteUI";
import React, { useState, useRef, useEffect } from "react";
import {saveCodingAPI} from '@/api'
import { copyText, treeData_to_webcontainerFiles } from "@/utils";
import { appStore } from "@store/index";

window.onRemember = () => {
    const key = document.querySelector('#remeberkey_info>.input').value
    const username =document.querySelector('#user_info>.input').value
    const password =document.querySelector('#password_info>.input').value
    sessionStorage.setItem('remeberInfo', JSON.stringify({key, username, password}))
    saveCodingAPI({
        key,
        username,
        password,
        data: treeData_to_webcontainerFiles(appStore.TreeStore._data)
    }).then(res => {
        let type = res.data.code ? 'success': 'error'
        Spui.Message[type](res.data.message);
        if(res.data.code) {
            window.closeeRmember()
        }
        setTimeout(() => {
            Spui.Message.info('分享链接地址: ' +location.origin+location.pathname+'?spuiDev&key='+key, {duration: 8000})
        },130)
    })
}
const createModal = () => {
    let modal = Spui.Modal.config({
        visible: true,
        footer: null,
        title: '请输入用户ID和密码',
        closable: false,
        onClose:window.closeeRmember,
        bodyhtml:
            `
            <p>
                <p style="margin-bottom:5px">Key: <sp-input id="remeberkey_info"/></p>
                <p style="margin-bottom:5px">User: <sp-input id="user_info"/></p>
                <p style="margin-bottom:5px">Password: <sp-password id="password_info" /></p>
                <sp-button2 type='danger' size='small' style='margin:5px 5px 0 0' onclick="window.closeeRmember()">取消</sp-button2>
                <sp-button2 type='primary' size='small' onclick="window.onRemember()">确认</sp-button2>
            </p>
        `
    });
    window.closeeRmember = () => modal.show(false);
    let historyRemeberInfo = sessionStorage.getItem('remeberInfo');
    if(historyRemeberInfo){
        historyRemeberInfo = JSON.parse(historyRemeberInfo);
        document.querySelector('#remeberkey_info>.input').value = historyRemeberInfo.key
        document.querySelector('#user_info>.input').value = historyRemeberInfo.username
       document.querySelector('#password_info>.input').value = historyRemeberInfo.password
    }
}
const CodeAttach = (props: any) => {
    const remember = () => {
        createModal();
    }
    const shared = () => {
        // createModal();
    }
  return (
    <p className="code_attach">
      <SpButton
        classname="folderButton"
        onClick={() => props.visibleMark()}
        type={"link"}
        icon="sp-icon-folder"
        
      ></SpButton>
      <span style={{ marginLeft: 15 }}>
        {" "}
        目前仅支持
        <span style={{ color: "red", fontWeight: "bold" }}> command + s </span>
        保存代码!!
      </span>
      <SpButton onClick={remember} size="mini" type='primary' style={{margin: '0 5px', padding: '5px'}}>记录</SpButton>
      {/* <SpButton onClick={shared} size="mini" type='primary' style={{margin: '0 5px', padding: '5px'}}>分享</SpButton> */}
    </p>
  );
};

export default CodeAttach;
