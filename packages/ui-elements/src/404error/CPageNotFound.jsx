import React from 'react';
//import { Image } from "react-bootstrap";
import './page-not-found.scss';

const CPageNotFound = props => {
  return (
    // <div className="error-page">
    // <div className="error-message">


    //     <Image src={require('./images/scream.gif')} className="loader" /> 
    //     <p className="text-center error-no">404 </p>
    //     <h2 className="message text-center">Page Not Found</h2>

    // </div>
    // </div>
    <div className="error-page">
      <div id="clouds">
        <div class="cloud x1"></div>

        <div class="cloud x2"></div>
        <div class="cloud x3"></div>
        <div class="cloud x4"></div>
        <div class="cloud x5"></div>
      </div>
      <div className="error-message">
      
{/*         
      <Image src={require('./images/scream.gif')} className="loader" />  */}
       <p className="text-center error-no">404 </p>
      <h2 className="message text-center">Page Not Found</h2>
        
      </div>
    </div>
  )
};

export default CPageNotFound;
