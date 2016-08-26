var React = require('react');
var $ = require('jquery');

var Img = React.createClass({
    getInitialState: function(){
        return({
            
        });
    },
    componentDidMount: function(){
        $("img").on("error", function(){
            $(this).attr("src", "http://dummyimage.com/300x200/ccc/a88ca8.png&text=Image+Broken");
        })
    },
    togglePin: function(){
        this.props.togglePin(this.props._id, this.props.pinned, this.props.number);
        $.post("/pinorunpin", {
            name: this.props.username,
            pin: this.props.pinned === true ? -1 : +1,
            _id: this.props._id
        }, function(data){
            
        }.bind(this));
    },
    render: function(){
        return (
            <div className="grid-item">
                <img src={this.props.link} />
                <h4>{this.props.name}</h4>
                <button className="btn btn-info form-control">Upload by: {this.props.username}</button>
                <button onClick={this.togglePin} disabled={!this.props.loggedIn} className="btn btn-danger form-control">pin/unpin ({this.props.pin})</button>
                {this.props.pinned === true ? <p>Pinned by you</p> : ""}
            </div>
        );
    }
});

module.exports = Img;