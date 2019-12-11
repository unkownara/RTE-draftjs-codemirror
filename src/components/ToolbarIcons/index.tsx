import React from 'react';


type ToolbarIconPropsT = {
    icon: string
};

export const ToolbarIcon: React.SFC<ToolbarIconPropsT> = props => {
    const { icon } = props;

    return (
        <>
            <img style={{ width: 20, padding: "10px 0", margin: "5px" }} src={icon} />
        </>
    )
}