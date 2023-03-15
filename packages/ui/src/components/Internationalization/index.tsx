import React from "react";

/** internationalization */
const IL = (props: string | {children: JSX.Element}) => {
    if(typeof props == 'string') {
        return props
    }
    return props.children
}

export default IL;