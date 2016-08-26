var React = require('react');
var $ = require('jquery');

var Header = React.createClass({
    getInitialState: function(){
        return({
            
        });
    },
    viewAllImages: function(){
        this.props.action('all images');  
    },
    loadImgFromUser: function(){
        this.props.action(this.props.username);  
    },
    myLinkedImages: function(){
        this.props.action('linked images');  
    },
    render: function(){
        return (
            <header>
            <nav className="navbar navbar-default" role="navigation">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">Pinterest Clone</a>
            </div>
            <div className="collapse navbar-collapse" id="collapse">
                <ul className="nav navbar-nav navbar-right">
                    {this.props.loggedIn === false ? "" :
                        [<li key="-1"><a href="/">Home</a></li>,
                        <li key="0"><a>Welcome {this.props.username}</a></li>,
                        <li key="2"><a onClick={this.loadImgFromUser}>My Images</a></li>,
                        <li key="1"><a onClick={this.myLinkedImages}>My Pinned Images</a></li>,
                        <li key="4"><a onClick={this.props.showImageForm}>Add Image</a></li>,
                        <li key="5"><a onClick={this.viewAllImages}>All Images</a></li>,
                        <li key="3"><a onClick={this.props.logout}>Logout</a></li>
                        ]
                    }
                </ul>
                {this.props.loggedIn === true ? "" :
                    <form className="navbar-form navbar-right form-inline" action="/login" method="GET" 
                    style={{display: this.props.showButton === true ? "inline-block" : "none"}}>
                    <button type="submit" className="btn btn-primary"><img src="https://g.twimg.com/dev/documentation/image/Twitter_logo_white_16.png" /> Login with Twitter</button>
                    </form>
                }
            </div>
            </nav>
            </header>    
        );
    }
});

module.exports = Header;