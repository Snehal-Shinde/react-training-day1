import React, { Component } from 'react'
class DynamicTableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    handleDeleteClick=(evt)=> {
        //debugger;
        this.props.deletedRow(evt.currentTarget.dataset.button_id);
    }

    handleSelectClick=(evt)=> {
        this.props.selectedRow(evt.currentTarget.dataset.tr_id);
    }

    handleSortClick=(evt)=> {
        //this.props.selectedRow(evt.currentTarget.dataset.tr_id);
    }

    renderHeaders() {
     
      let header = Object.keys(this.props.dataSource[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }


    renderTableRows() {
        return this.props.dataSource.map((row, index) => (
            <tr key={index} data-tr_id={index} onClick={this.handleSelectClick.bind(this)}>
                {Object.values(row).map((rowValue, index) => 
                    <th key={index}>{rowValue}</th>
                )}
                <input data-button_id={index} type="button" value="Delete" className="btn btn-success" onClick={this.handleDeleteClick.bind(this)}/>
            </tr>
        ))
   }


    render() { 
        let products = this.props.dataSource;
        console.log("products",products.length)
        return (
            
            <div>
            {products.length>0 ?
            <div>
            <h1 id='title'>Details</h1>
            <input type="button" value="SortBy" className="btn btn-success" onClick={this.handleSortClick.bind(this)}/>
            <table className="table table-bordered table-striped">
               <tbody>
                  <tr>
                  {this.renderHeaders()}
                  </tr>
                  {this.renderTableRows()}
               </tbody>
            </table>
            </div>
            :''
            }
         </div>
        );
    }
}
 
export default DynamicTableComponent;