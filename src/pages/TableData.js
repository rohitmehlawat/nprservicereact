import React from "react";
import Link from './LinkButton';
class TableData extends React.Component{
    constructor(props){
        super(props);
    }

    handleViewEdit=(id)=>{
        this.props.handleViewEdit(id);
    };


    render(){


        const schoolData=this.props.data;
        const searchText=this.props.searchText;
        const rows=[];
        if(schoolData!==undefined){
            schoolData.map((school,index)=>{
                if(school.name.indexOf(searchText)===-1){
                    return;
                }
                rows.push(
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{school.name}</td>
                        <td>{school.address.block}, {school.address.village}, {school.address.city}, {school.address.state}</td>
                        <td>{school.dealStatus}</td>
                        <td><Link handleViewEdit={this.handleViewEdit} sid={school.id}/></td>
                    </tr>
                );
            })
        }
        return(
            <tbody>
                {rows}
            </tbody>
        );
    }
}

export default TableData;