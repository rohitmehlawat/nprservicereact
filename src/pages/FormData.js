import React from "react";
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    FormFeedback,
} from 'reactstrap';

class FormData extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            validate:this.props.validate
        };
        this.changeTextField = this.changeTextField.bind(this);

    }

    validateEmail(value) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state;
        if (emailRex.test(value)) {
            validate.emailState = 'has-success'
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({ validate })
    }
    validateLength(value,name){
        const {validate}=this.state;

        if(value.length>0){
            if(name=="name")
                validate.nameState='has-success'
            else if(name=="address.block")
                validate.blockState='has-success'
            else if(name=="address.village")
                validate.villageState='has-success'
        }
        else{
            if(name=="name")
                validate.nameState = 'has-danger'
            else if(name=="address.block")
                validate.blockState='has-danger'
            else if(name=="address.village")
                validate.villageState='has-danger'
        }
    }
    validateNumber(value,name){
        const {validate}=this.state;
        if(value.length==0 || isNaN(value)){
            if(name=="address.pincode")
                validate.pincodeState='has-danger'
            else
                validate.contactState='has-danger'
        }
        else{
            if(name=="address.pincode")
                validate.pincodeState='has-success'
            else
                validate.contactState='has-success'
        }
    }
    validateSelectState(value){
        const {validate}=this.state;
        if(value=="Select"){
            validate.stateState='has-danger'
        }
        else{
            validate.stateState="has-success"
        }

    }

    changeTextField(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        if(name=="email"){
            this.validateEmail(value);
        }
        else if((name=="name") || (name=="address.block") || (name=="address.village") ){
            this.validateLength(value,name);
        }
        else if(name=="address.state"){
            this.validateSelectState(value);
        }
        else if(name=="address.pincode" || name=="contact.phoneNo"){
            this.validateNumber(value,name);
        }
        this.props.changeTextField(name, value);
    }

    render() {

        return (
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardBody>
                                <FormGroup>
                                    <Label for="name">Name*</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="enter school name"
                                        bsSize="sm"
                                        value={this.props.school.name}
                                        onChange={this.changeTextField}
                                        valid={ this.state.validate.nameState === 'has-success' }
                                        invalid={ this.state.validate.nameState === 'has-danger' }

                                    />
                                    <FormFeedback valid>
                                        That's a tasty looking name you've got there.
                                    </FormFeedback>
                                    <FormFeedback invalid>
                                        Uh oh! Looks like there is an issue with your school name. Please input a correct name.
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email*</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="enter email address"
                                        bsSize="sm"
                                        value={this.props.school.email}
                                        onChange={this.changeTextField}
                                        valid={ this.state.validate.emailState === 'has-success' }
                                        invalid={ this.state.validate.emailState === 'has-danger' }
                                    />
                                    <FormFeedback valid>
                                        That's a tasty looking email you've got there.
                                    </FormFeedback>
                                    <FormFeedback invalid>
                                        Uh oh! Looks like there is an issue with your email. Please input a correct email.
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="website">Website</Label>
                                    <Input
                                        type="text"
                                        name="website"
                                        placeholder="enter website URL"
                                        bsSize="sm"
                                        value={this.props.school.website}
                                        onChange={this.changeTextField}
                                    />
                                </FormGroup>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <FormGroup>
                                            <Label for="block">Block/Flat No.*</Label>
                                            <Input
                                                type="text"
                                                name="address.block"
                                                placeholder="enter block or street No."
                                                bsSize="sm"
                                                value={this.props.school.address.block}
                                                onChange={this.changeTextField}
                                                valid={ this.state.validate.blockState === 'has-success' }
                                                invalid={ this.state.validate.blockState === 'has-danger' }
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <FormGroup>
                                            <Label for="village/town">Village/Town*</Label>
                                            <Input
                                                type="text"
                                                name="address.village"
                                                placeholder="enter village/town"
                                                bsSize="sm"
                                                value={this.props.school.address.village}
                                                onChange={this.changeTextField}
                                                valid={ this.state.validate.villageState === 'has-success' }
                                                invalid={ this.state.validate.villageState === 'has-danger' }
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <FormGroup>
                                            <Label for="city">City</Label>
                                            <Input
                                                type="text"
                                                name="address.city"
                                                placeholder="enter city"
                                                bsSize="sm"
                                                value={this.props.school.address.city}
                                                onChange={this.changeTextField}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <FormGroup>
                                            <Label for="district">District</Label>
                                            <Input
                                                type="text"
                                                name="address.district"
                                                placeholder="enter district"
                                                bsSize="sm"
                                                value={this.props.school.address.district}
                                                onChange={this.changeTextField}
                                            />
                                        </FormGroup>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <FormGroup>
                                            <Label for="city">Select State*</Label>
                                            <Input type="select" name="address.state" bsSize="sm"
                                                   value={this.props.school.address.state}
                                                   onChange={this.changeTextField}
                                                   valid={ this.state.validate.stateState === 'has-success' }
                                                   invalid={ this.state.validate.stateState === 'has-danger' }
                                            >
                                                <option>Select</option>
                                                <option>Delhi</option>
                                                <option>Haryana</option>
                                                <option>Uttar Pradesh</option>
                                                <option>Rajasthan</option>
                                                <option>Punjab</option>
                                            </Input>
                                        </FormGroup>

                                    </Col>
                                    <Col xs={12} md={6}>
                                        <FormGroup>
                                            <Label for="pincode">pincode*</Label>
                                            <Input
                                                type="text"
                                                name="address.pincode"
                                                placeholder="enter pincode"
                                                bsSize="sm"
                                                value={this.props.school.address.pincode}
                                                onChange={this.changeTextField}
                                                valid={ this.state.validate.pincodeState === 'has-success' }
                                                invalid={ this.state.validate.pincodeState === 'has-danger' }
                                            />
                                            <FormFeedback valid>
                                                we are good with this.
                                            </FormFeedback>
                                            <FormFeedback invalid>
                                                Uh oh! Looks like there is an issue with your pincode.
                                            </FormFeedback>
                                        </FormGroup>

                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Label for="contact no">Contact No*</Label>
                                    <Input
                                        type="text"
                                        name="contact.phoneNo"
                                        placeholder="enter contact number"
                                        bsSize="sm"
                                        value={this.props.school.contact.phoneNo}
                                        onChange={this.changeTextField}
                                        valid={ this.state.validate.contactState === 'has-success' }
                                        invalid={ this.state.validate.contactState === 'has-danger' }
                                    />
                                </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default FormData;