import React from 'react';

const UpdateNavbar = OrignalComponent => {
    class NewComponent extends React.Component{
        render(){
            const logo = "TestUrKnowledge.App";
            return (
                <OrignalComponent logo={logo}/>
            );
        }
    }
    return NewComponent
} 

export default UpdateNavbar;