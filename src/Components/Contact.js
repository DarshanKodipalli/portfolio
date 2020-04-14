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

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Get In Touch.</span></h1>

            </div>

            <div className="ten columns">

                  <p className="lead">{message}</p>

            </div>

         </div>

         <div className="row">
            <div className="eight columns">

               <form id="contactForm" onSubmit={this.submitHandler} name="contactForm">
					<fieldset>

                  <div>
						   <label htmlFor="contactName">Name <span className="required">*</span></label>
						   <input type="text" defaultValue="" size="35" id="contactName" name="contactName"  onChange={this.handleNameChange}/>
                  </div>

                  <div>
						   <label htmlFor="contactEmail">Email <span className="required">*</span></label>
						   <input type="text" defaultValue="" size="35" id="contactEmail" name="contactEmail" onChange={this.handleEmailChange}/>
                  </div>

                  <div>
						   <label htmlFor="contactSubject">Subject</label>
						   <input type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject" onChange={this.handleSubjectChange}/>
                  </div>

                  <div>
                     <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                     <textarea cols="50" rows="15" id="contactMessage" name="contactMessage" onChange={this.handleMessageChange}></textarea>
                  </div>

                  <div>
                     <button type="submit" disabled={this.state.disabled}>Send</button>
                     <div>
                      {(this.state.showLoader == true) ? (
                         <span id="image-loader">
                            <img alt="" src="images/loader.gif" />
                         </span>
                       ) : (
                          <div id="message-warning"></div>
                       )}
                     </div>
                  </div>
					</fieldset>
				   </form>
           <div>
  				   {(this.state.disabled == true) ? (
             <div id="message-success">
                    <i className="fa fa-check"></i>Your message was sent, thank you {this.state.emailContent.name}<br />
  				   </div> ) : (
                <div id="message-warning"> </div>
             )}
           </div>

           </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

					   <h4>Address and Phone</h4>
					   <p className="address">
						   {name}<br />
						   {street} <br />
						   {city}, {state} {zip}<br />
						   <span>{phone}</span>
					   </p>
				   </div>
            </aside>
      </div>
   </section>
    );
  }
}

export default Contact;
