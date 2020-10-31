import React, { Component } from 'react';
import { Button, Card, CardImg, CardText, CardTitle, CardBody, Breadcrumb, BreadcrumbItem, Label, Modal, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm , Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment= this.handleComment.bind(this); 
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleComment(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
        this.toggleModal();
    }  

    render() { 
        return ( 
            <div>
                <Button outline onClick={this.toggleModal}><i className="fa fa-pencil fa-lg"/> Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <LocalForm onSubmit={values => this.handleComment(values)} > 
                        <div className="form-group m-3">
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select
                            model=".rating"
                            id="rating"
                            name="rating"
                            className="form-control"> 
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                        </div>
                        <div className="form-group m-3">
                        <Label htmlFor="author">Your Name</Label>
                        <Control.text
                            model=".author"
                            id="author"
                            name="author"
                            placeholder="Your Name"
                            className="form-control"
                            validators={{
                                required,
                                minLength: minLength(2),
                                maxLength: maxLength(15)
                            }} /> 
                        <Errors
                            className="text-danger"
                            model=".author"
                            show="touched"
                            component="div"
                            messages={{
                                required: 'Required',
                                minLength: 'Must be at least 2 characters',
                                maxLength: 'Must be 15 characters or less'
                            }} />
                        </div>
                        <div className="form-group m-3">
                        <Label htmlFor="text">Comment</Label>
                        <Control.textarea
                            model=".text"
                            id="text"
                            name="text"
                            rows="6"
                            className="form-control"
                            > 
                        </Control.textarea>
                        </div>

                        <Button type="submit" color="primary" className="m-3">
                        Submit
                        </Button>

                    </LocalForm>
                </Modal>
            </div>

        ); 
    }

} 

function RenderCampsite({campsite}) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
        
    }

    function RenderComments({comments}) {
        if (comments) {
            return (
                <div className='col-md-5 m-1'>
                    <h4>Comments</h4>
                    {comments.map((comment) => {
                        return (
                            <div key={comment.id}>
                                <p>
                                    {comment.text}
                                    <br></br>
                                    -- {comment.author}, {''} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                </p>
                            </div>
                        );
                    })}
                    <CommentForm />
                </div>
            );
        }
            return <div />
    }
    
    function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        }
        return <div />;
    }
    
    export default CampsiteInfo;