import Page from 'components/Page';
import FormData from './FormData';
import React from 'react';
import {
    Card, CardBody, CardHeader, Col, Row, Table, Button, Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Input
} from 'reactstrap';
import { Tooltip } from 'reactstrap';
import TableData from './TableData';


var Q = require('q');

class SchoolPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolTableData: [],
            schoolResponseData: [],
            modal: false,
            buttonText: 'Submit',
            school: this.initialState,
            validate: this.initalValidate,
            tooltipOpen:false,
            search:''
        };
        this.changeTextField = this.changeTextField.bind(this);
    }

    changeTextField(name, value) {
        this.setState({
            tooltipOpen: false
        });
        if (name.indexOf('.') > -1) {
            let names = name.split('.');
            let obj = this.state.school[names[0]];
            obj[names[1]] = value;
            this.setState(prevState => ({
                school: {
                    ...prevState.school,
                    [names[0]]: obj
                }
            }));

        }
        else {
            this.setState(prevState => ({
                school: {
                    ...prevState.school,
                    [name]: value
                }
            }));
        }

    }

    get isSubmit() {
        return this.state.buttonText == "Submit"
    }

    get initialState() {

        return {
            id: null,
            name: '',
            email: '',
            website: '',
            address: {
                block: '',
                village: '',
                city: '',
                district: '',
                state: '',
                pincode: ''
            },
            contact: {
                phoneNo: ''
            },
            dealStatus: 'pending'
        };
    }

    get initalValidate() {
        return {
            emailState: "",
            nameState: "",
            pincodeState: "",
            blockState: '',
            villageState: '',
            stateState: '',
            contactState: ''
        }
    }

    get successValidate(){
        return{
            emailState: "has-success",
            nameState: "has-success",
            pincodeState: "has-success",
            blockState: 'has-success',
            villageState: 'has-success',
            stateState: 'has-success',
            contactState: 'has-success'
        }
    }

    handleSearch=(event)=>{
        console.log(event.target.value);
        this.setState({
            search:event.target.value
        })

    }

    handleViewEdit = (id) => {
        let data = this.state.schoolResponseData;

        data.map((school, index) => {
            if (school.id == id) {
                delete school.userDetail;
                this.setState({
                    validate:this.successValidate,
                    school: school,
                    modal: !this.state.modal,
                    buttonText: 'Update'

                });
            }
        })
    }

    toggle = modal => () => {

        this.setState({
            modal: !this.state.modal,
            buttonText: 'Submit',
            school: this.initialState,
            validate:this.initalValidate,
            tooltipOpen:false
        });
    };

    toggleToolTip=()=>{
        this.setState({
            tooltipOpen:!this.state.tooltipOpen
        })
    }

    handleSubmit = event => {
        let dataPost = true;
        const validateData = this.state.validate;
        for (let key in validateData) {
            if (validateData[key] == "has-danger" || validateData[key] == "") {
                dataPost = false;
                this.setState({
                    tooltipOpen: !this.state.tooltipOpen
                });

                break;
            }
        }
        if (dataPost == true) {
            postData('http://localhost:8080/addSchool', this.state.school, 'post')
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    console.log(result);
                    if (result.status == "success") {
                        console.log("status  success");
                        this.setState({
                            modal: !this.state.modal,
                            school: this.initialState,
                            validate:this.initalValidate,
                            tooltipOpen:false
                        });
                        this.loadTableData();
                    }
                    else {
                        console.log("status failure");
                    }
                })
                .catch((err)=>{
                    this.props.history.push("/");
                })
        }

    };

    handleUpdate = event => {
        let dataPost = true;
        const validateData = this.state.validate;
        for (let key in validateData) {
            if (validateData[key] == "has-danger" || validateData[key] == "") {
                dataPost = false;
                this.setState({
                    tooltipOpen: !this.state.tooltipOpen
                });

                break;
            }
        }
        if(dataPost==true){
            postData('http://localhost:8080/updateSchool', this.state.school, 'post')
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    console.log(result);
                    if (result.status == "success") {
                        console.log("status  success");
                        this.setState({
                            modal: !this.state.modal,
                            school: this.initialState,
                            validate:this.initalValidate,
                            tooltipOpen:false
                        });
                        this.loadTableData();
                    }
                    else {
                        console.log("status failure");
                    }
                })
                .catch((err)=>{
                    this.props.history.push("/");
                })
        }

    };

    loadTableData() {
        let keyId = localStorage.getItem("keyId");
        fetch('http://localhost:8080/getAllSchool', {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": keyId
            }
        })
            .then(handleErrors)
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                    this.setState({
                        schoolResponseData: result.responseObject
                    });
            })
            .catch((err)=>{
                this.props.history.push("/");
            });
    }

    componentWillMount() {
        this.loadTableData();
    }

    render() {
        return (
            <Page
                title="School Details"
                breadcrumbs={[{name: 'school', active: true}]}
                className="TablePage">
                <Row>
                    <Col>
                        <Card className="mb-3">
                            <CardHeader className="d-flex justify-content-between">
                                <p></p>
                                <Button onClick={this.toggle()}>Add School</Button>
                                <Modal
                                    isOpen={this.state.modal}
                                    toggle={this.toggle()}
                                    className={this.props.className}>
                                    <ModalHeader>School Detail</ModalHeader>
                                    <ModalBody>
                                        <FormData school={this.state.school} changeTextField={this.changeTextField}
                                                  validate={this.state.validate}/>
                                    </ModalBody>
                                    <ModalFooter>
                                        <div>
                                        {this.isSubmit ? (

                                                <Button id="TooltipExample" color="primary" onClick={this.handleSubmit}>
                                                    Submit
                                                </Button>


                                        ) : (
                                            <Button id="TooltipExample" color="primary" onClick={this.handleUpdate}>
                                                Update
                                            </Button>
                                        )}
                                            <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="TooltipExample">
                                                Please check the mandatory fields
                                            </Tooltip>
                                        </div>

                                        {' '}
                                        <Button color="secondary" onClick={this.toggle()}>
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </Modal>
                            </CardHeader>
                            <CardBody>
                                <Input type="text" id="search" placeholder="Search by school name..." value={this.state.search} onChange={this.handleSearch} />
                                <Table responsive id="">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Status</th>
                                        <th>View/Edit</th>
                                    </tr>
                                    </thead>
                                    <TableData data={this.state.schoolResponseData} searchText={this.state.search} handleViewEdit={this.handleViewEdit}/>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        );
    }

}

function postData(url, data, methodType) {
    var defer = Q.defer();
    let keyId = localStorage.getItem("keyId");
    fetch(url, {
        method: methodType,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": keyId
        }
    })
        .then(handleErrors)
        .then((response) => {
        defer.resolve(response);
    })
        .catch((err)=>{
            defer.reject(err);
        })
    return defer.promise;
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status);
    }
    return response;
}


export default SchoolPage;
