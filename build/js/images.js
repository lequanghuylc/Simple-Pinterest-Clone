var React = require('react');
var $ = require('jquery');
var Masonry = require('react-masonry-component');
var Img = require('./img');


var Image = React.createClass({
    getInitialState: function(){
        return({
            
        });
    },
    checkPinned: function(val){
        return this.props.userPinArr.indexOf(val) === -1 ? false : true;  
    },
    render: function(){
        return (
            <section>
            {this.props.data === false || this.props.data.length === 0 ? "No Images" :
            <Masonry className="grid" updateOnEachImageLoad={true}>
                {this.props.data.map(function(val, index){
                    return(
                        <Img key={index} number={index} link={val.imgLink} like={val.like} username={val.username} name={val.imgName} 
                        _id={val._id} pin={val.pin} loggedIn={this.props.loggedIn} pinned={this.checkPinned(val._id)}
                        togglePin={this.props.togglePin} />
                    );
                }.bind(this))}    
            </Masonry>
            }
            </section>
        );
    }
});

module.exports = Image;