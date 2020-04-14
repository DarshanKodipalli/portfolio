import React, { Component } from 'react';

class Certification extends Component {
  render() {
    if(this.props.data){
      var certificates = this.props.data.certificates.map(function(certificates){
        var certificateImage = 'images/portfolio/'+certificates.image;
        return <div key={certificates.title} className="columns certificate-item">
           <div className="item-wrap">
            <a href={certificates.url} title={certificates.title}>
               <img alt={certificates.title} src={certificateImage} />
               <div className="overlay">
                  <div className="certificate-item-meta">
                 <h5>{certificates.title}</h5>
                     <p>{certificates.category}</p>
                  </div>
                </div>
              <div className="link-icon"><i className="fa fa-link"></i></div>
            </a>
          </div>
        </div>
      })
    }

    return (
      <section id="certificate">

      <div className="row">

         <div className="twelve columns collapsed">

            <h1>My Certifications and Licenses</h1>

            <div id="certificate-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                {certificates}
            </div>
          </div>
      </div>
   </section>
    );
  }
}

export default Certification;
