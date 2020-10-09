import React, { Component } from 'react';
import Axios from 'axios';

class Contact extends Component {

    state = {
      emailContent:{name:"John Doe", email:"johndoe@example.com",subject:"Enter the Subject here...",message:"Enter the Message here..."},
      disabled:"",
      showLoader:"",
      emailSent:false    
    }
    constructor(props) {
        super(props);
    }


    submitHandler = (event) => {
      event.preventDefault();
      this.setState({                        
          showLoader:true
      });
        console.log(this.state.emailContent);
        Axios.post('http://localhost:3030/api/email', this.state)
            .then(res => {
              console.log(res);
                if(res.data.status == 1) {
                    console.log("emailSent");
                    this.setState({                        
                        disabled: true,
                        emailSent: true,
                        showLoader:false
                    });
                } else {
                    this.setState({
                        disabled: false,
                        emailSent: false
                    });
                }
            })
            .catch(err => {
                console.log(err);

                this.setState({
                    disabled: false,
                    emailSent: false
                });
            })
    }
  handleNameChange = (event)=>{
      this.state.emailContent.name = event.target.value;
      console.log(this.state.emailContent.name);
  }
  handleEmailChange = (event)=>{
      this.state.emailContent.email = event.target.value;
      console.log(this.state.emailContent.email);
  }
  handleSubjectChange = (event)=>{
      this.state.emailContent.subject = event.target.value;
      console.log(this.state.emailContent.subject);
  }
  handleMessageChange = (event)=>{
      this.state.emailContent.message = event.target.value;
      console.log(this.state.emailContent.message);
  }

  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }

    return (
      <section id="contact">
         <div className="row">
          <h4>Address and Phone</h4>
          <p className="address">
            {name}<br />
            {street} <br />
            {city}, {state} {zip}<br />
            <span>{phone}</span>
          </p>
      </div>
   </section>
    );
  }
}

export default Contact;
