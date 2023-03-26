import React from "react"

interface SpInputProps {
    value?:string
}
declare class SpInput extends React.Component<SpInputProps> {
    onChange():void
}

export default SpInput