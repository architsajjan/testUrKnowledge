// IMPORTS
import React from 'react';

export default function Submit() {
    return (
        <div className="landing">
                { 
                   setTimeout(()=>{
                    history.pushState(null, null, location.href);
                    window.onpopstate = function() {
                        history.go(1);
                    };
                    }, 500)
                }
                <div className="">
                    <div className="instructions-main dark-overlay">
                        <h1>A copy of your result will be downloaded on successfull submission of your Test.</h1>
                    </div>
                </div>
                <div className="instructions-side">
                    <div className="container">
                        <h1 className="large text-primary">Note:</h1>
                        <p>
                            To go to the home page you could click the logo on navbar.
                        </p>
                    </div>    
                </div>
            </div>
        );
}

