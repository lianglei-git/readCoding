import {Treebeard} from 'react-treebeard';
import React, {useState} from 'react';

const data2 = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'loading parent',
            loading: true,
            children: []
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
};
const decorators = {
    Loading: (props) => {
        return (
            <div style={props.style}>
                loading...
            </div>
        );
    },
    Toggle: (props) => {
        return (
            <div style={props.style}>
                <svg height={props.height} width={props.width}>
                    // Vector Toggle Here
                </svg>
            </div>
        );
    },
    Header: (props) => {
        return (
            <div style={props.style}>
                {/* {props.node.name} */}
                99999
            </div>
        );
    },
    Container: (props) => {
        return (
            <div onClick={props.onClick}>
                // Hide Toggle When Terminal Here
                <props.decorators.Toggle/>
                <props.decorators.Header/>
            </div>
        );
    }
};



const TreeExample = () => {
    const [data, setData] = useState(data2);
    const [cursor, setCursor] = useState(false);
    
    const onToggle = (node, toggled) => {
        if (cursor) {
            cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        setCursor(node);
        setData(Object.assign({}, data))
    }
    
    return (
       <Treebeard data={data} onToggle={onToggle} decorators={decorators}/>
    )
}

export default TreeExample;