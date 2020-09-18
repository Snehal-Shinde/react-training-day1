import React, { Component } from 'react'
import ValidatorComponent from './../validations/validator';
import { ValidationsArray} from './../../mdoels/constants';

class FormValidationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            EmpNo:0,
            EmpName: '',
            isEmpNoValid: true,
            isEmpNameValid:true,
            isFormValid:true,
            
            errors : []
        };
        this.handleMaxLengthError = this.handleMaxLengthError.bind(this);
    }
    handleInputChanges=(evt)=> {
        this.setState({[evt.target.name]:evt.target.value});
        this.validateForm(evt.target.name, evt.target.value);
    }

    handleMaxLengthError(max, value){
        //debugger;
        if(typeof value === 'number'){
            if(parseInt(value) < 0 || value.length > max) {
                    return true;
            } else {
                    return false;
            }
        }
        if(typeof value === 'string'){
            if(value === '' || value.length > 10) {
                    return true;
            } else {
                    return false;
            }
        }
    }
    // contains validation rules for execution
    validateForm(name,value){
        let errorObject ;
        let arrayTemp = [];
        let object = ValidationsArray.filter((obj) => obj.propertyName === name)
        console.log("rule", object)
        if(object[0].rule === "MaxLength"){
            let result = this.handleMaxLengthError(object[0].limit, value);
            if(result){
                errorObject = {
                    propertyName: object[0].propertyName,
                    errorMsg : object[0].errorMsg
                }
                let tempObj = this.state.errors.slice();

        // push data in temp array
        let duplicate = tempObj.filter((obj) => obj.propertyName === name && obj.errorMsg === errorObject.errorMsg)
        if(!duplicate.length>0){
            tempObj.push(errorObject);
        }
        
        // update the products state
        this.setState({errors: tempObj}, ()=>{}); 
            }
        }
        console.log("result==",this.state.errors);
        
    }
    render() { 
        return ( 
            <div className="container">
                <form name="empForm">
                    <div className="form-group">
                        <label htmlFor="EmpNo">Emp No</label>
                        <input type="text" className="form-group" 
                        name="EmpNo"
                        value={this.state.EmpNo}
                        onChange={this.handleInputChanges.bind(this)}/>
                        {/* <div className="alert alert-danger" hidden={this.state.isEmpNoValid}>
                            EmpNo is must and length must be less than 5
                        </div> */}
                        hidden={this.state.isEmpNoValid}
                    </div>
                    <div className="form-group">
                        <label htmlFor="EmpName">Emp Name</label>
                        <input type="text" className="form-group" 
                        name="EmpName"
                        value={this.state.EmpName}
                        onChange={this.handleInputChanges.bind(this)}/>
                        {/* <div className="alert alert-danger" hidden={this.state.isEmpNameValid}>
                            Emp Name is must and length must be less than 10
                        </div> */}
                    </div>
                    <div className="form-group">
                        <input type="button" disabled={!this.state.isFormValid} value="Save" className="btn btn-success"/>
                    </div>
                    <div>
                        {<ValidatorComponent hidden={this.state.errors.length>0} errorData={this.state.errors}/>}
                    </div>
                </form>
            </div>
        );
    }
}
 
export default FormValidationComponent; 