import React, { Component } from 'react';
import { ValidationsArray} from './../../mdoels/constants';

class ValidatorComponent extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {  
    //         propertyName:'',
    //         errorMsg:''
    //     };
    // }

    render() {
        const  errorData = this.props.errorData;
        return (
            <div className="alert alert-danger">
                {
                                errorData.map((v,i)=> (
                                <p key={i}> {v.propertyName} {v.errorMsg}</p>
                                ))
                            }
            </div>
        );
    }
}
 
export default ValidatorComponent;
