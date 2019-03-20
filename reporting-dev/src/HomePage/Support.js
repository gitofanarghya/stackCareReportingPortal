import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';


export class Support extends React.Component {
    
    render() {
  
      return (
        <Fragment>
        <Typography style={{fontSize: 13, color: '#707070', height: '35px', fontWeight: '500'}}>
            Support
        </Typography>  
        <Typography style={{fontSize: 14, height: '35px', fontWeight: '400'}}>
            Questions? We're here to help. Contact us at <a href="mailto:support@stack.care" target="_top">support@stack.care</a>.
        </Typography>  
        
        </Fragment>
        )
    }
} 