import React, {Component} from 'react';

export default class TableComponent extends Component{
    renderTable(){
        if(this.props.tableConfig.bodyTable.length === 0){
            return (
                <div>
                    Empty table
                </div>
            );
        }else{
            return (
                <table className={"table"}>
                    <thead>
                    <tr>
                        <th>#</th>
                        {this.renderHeaderTable(this.props.tableConfig.headerTable, this.props.tableConfig.operation)}
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderBodyTable(this.props.tableConfig.bodyTable, this.props.tableConfig.operation)}
                    </tbody>
                </table>
            );
        }
    }
    renderTitleTable(tableConfig){
        return (
            <div style={{position:'relative'}}>
                <h2>{tableConfig.title}</h2>
                <button style={{position:'absolute',top: 0,right: 0}} type="button" className={"btn btn-info"} onClick={() => tableConfig.addCallback()}>
                    Add
                </button>
            </div>
        );
    }
    renderHeaderTable(arrayHeader, operation ){
        if(operation.enable){
            arrayHeader.push('Operation');
        }
        return arrayHeader.map((header,index) => {
            return (
                <th key={index}>{header}</th>
            );
        });
    }
    renderItem(item, operation){
        let arrayTemp = [];
        for(let attribute in item){
            if (item.hasOwnProperty(attribute)) {
                if(attribute !== 'id'){
                    arrayTemp.push(
                        <td>
                            {item[attribute]}
                        </td>
                    );
                }
            }
        }
        if(operation.enable){
            arrayTemp.push(
                <td>
                    <button type="button" className={"btn btn-primary"} onClick={() => operation.editCallback(item.id)}>
                        Edit
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button type="button" className={"btn btn-primary"} onClick={() => operation.removeCallback(item.id)}>
                        Delete
                    </button>
                </td>
            );
        }
        return arrayTemp;
    }
    renderBodyTable(arrayItemList, operation){
        return arrayItemList.map((item, index)=>{
            return (
                <tr key={item.id}>
                    <th scope="row">{index}</th>
                    {this.renderItem(item, operation)}
                </tr>
            );
        });
    }
    render(){
        return (
            <div>
                {this.renderTitleTable(this.props.tableConfig)}
                {this.renderTable()}
            </div>
        );
    }
}