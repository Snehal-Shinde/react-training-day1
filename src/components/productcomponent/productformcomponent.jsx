import React, { Component } from 'react'
import DropDownComponent from './../selectcomponent/dropdoencomponent';
import {Categories, Manufacturers} from './.././../mdoels/constants';
import { Logic} from './../../mdoels/logic';
import DynamicTableComponent from './../tablecomponent/dynamictablecomponent';
class ProductFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            ProductId:0,
            ProductName: '',
            CategoryName: '',
            Manufacturer: '',
            Price: 0,
            categories: Categories,
            manufacturers: Manufacturers,
            products: []

        };
        this.logic = new Logic();
    }
    // when an event is raised on UI element
    // the state property wll be updated based on name of the UI element
    // the matches with the state property name
    handleChange =(evt)=> {
        // update the state property
        this.setState({[evt.target.name]: evt.target.value});
    }
    clear =()=> {
        this.setState({
                ProductId:0, 
                ProductName:'', 
                CategoryName:'',
                Manufacturer:'',
                Price:0
            });
    }
    selectRow=(val)=> {
       this.setState({
                ProductId:this.state.products[val].ProductId, 
                ProductName:this.state.products[val].ProductName, 
                CategoryName:this.state.products[val].CategoryName,
                Manufacturer:this.state.products[val].Manufacturer,
                Price:this.state.products[val].Price
            });
    }
    deleteRow=(val)=> {
            
        let temp = this.state.products.slice(0, val).concat(this.state.products.slice(val+1, this.state.products.length)) ;   
        this.setState({
            products : temp
        });
    }

    getCategory=(val)=> {
        this.setState({CategoryName: val}, ()=> {});
    }
    getManufacturer=(val)=> {
        this.setState({Manufacturer: val}, ()=>{});
    }
    save=()=> {
        
        let prd = {
            ProductId: this.state.ProductId,
            ProductName: this.state.ProductName,
            CategoryName: this.state.CategoryName,
            Manufacturer: this.state.Manufacturer,
            Price: this.state.Price
        };
        // define a temp array having same structire of the products array in state

        let tempProduct = this.state.products.slice();
        // push data in temp array
        tempProduct.push(prd);
        // update the products state
        this.setState({products: tempProduct}, ()=>{}); 
        //alert(JSON.stringify(prd));
    }
    render() { 
        return (
            <div className="container">
                <form name="frmProduct">
                    <div className="form-group">
                        <label>Product Id</label>
                        <input type="text" className="form-control" value={this.state.ProductId}
                        name="ProductId" 
                        onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" className="form-control" 
                        name="ProductName"
                        onChange={this.handleChange.bind(this)}
                        value={this.state.ProductName}/>
                    </div>
                    <div className="form-group">
                        <label>Category Name</label>
                        <DropDownComponent dataSource={this.state.categories}
                         data={this.state.CategoryName}
                         selectedValue={this.getCategory.bind(this)}></DropDownComponent>
                        {/* <select type="text" className="form-control" 
                        name="CategoryName"
                        onChange={this.handleChange.bind(this)}
                        value={this.state.CategoryName}>
                            {
                                this.state.categories.map((v,i)=> (
                                <option key={i} value={v}>{v}</option>
                                ))
                            }
                        </select> */}
                    </div>
                    <div className="form-group">
                        <label>Manufacturer</label>
                        <DropDownComponent  dataSource={this.state.manufacturers}
                        data={this.state.Manufacturer}
                        selectedValue={this.getManufacturer.bind(this)}></DropDownComponent>
                        {/* <select type="text" className="form-control" 
                        name="Manufacturer"
                        onChange={this.handleChange.bind(this)}
                        value={this.state.Manufacturer}>
                              {
                                this.state.manufacturers.map((v,i)=> (
                                <option key={i} value={v}>{v}</option>
                                ))
                            }
                        </select> */}
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="text" className="form-control" 
                        name="Price"
                        onChange={this.handleChange.bind(this)}
                        value={this.state.Price}/>
                    </div>
                    <div className="form-group">
                       <input type="button" value="Clear" className="btn btn-warning" onClick={this.clear.bind(this)}/>
                       <input type="button" value="Save" className="btn btn-success" onClick={this.save.bind(this)}/>
                    </div>
                </form>
                <br/>

                <DynamicTableComponent dataSource={this.state.products} canDelete={true} canSelectRow={true} selectedRow={this.selectRow.bind(this)} deletedRow={this.deleteRow.bind(this)}/>
            </div>
        );
    }
}
 
export default ProductFormComponent;
