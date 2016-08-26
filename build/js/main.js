var React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');
var Header = require('./header');
var Images = require('./images');

var PinClone = React.createClass({
    getInitialState: function(){
        return({
            loggedIn: false,
            buttonLogin: false,
            username: '',
            imgName: '',
            imgLink: '',
            showImageForm: false,
            userPinArr: []
        });
    },
    componentWillMount: function(){
        this.checkLogin();
        this.loadImages();
    },
    checkLogin: function(){
        $.get("/checklogin", function(data){
            if(data !== "false"){
                  this.setState({
                        loggedIn: true,
                        buttonLogin: false,
                        username: data.name
                  });
                  this.loadPinArr();
              } else {
                  this.setState({
                      loggedIn: false,
                      buttonLogin: true
                  });
              }
        }.bind(this));    
    },
    loadImages: function(){
        $.get("/getimage", function(data){
            this.setState({imageData: data}); 
        }.bind(this));  
    },
    loadPinArr: function(){
        $.get("/getpinbyuser/"+this.state.username, function(data){
            this.setState({
                userPinArr: data
            });
        }.bind(this));
    },
    togglePin: function(id, bool, index){
        var arr = this.state.userPinArr;
        var imgData = this.state.imageData;
        
        if(bool){
            arr= arr.slice(0,arr.indexOf(id)).concat(arr.slice(arr.indexOf(id)+1,arr.length));
            var pinNumber = imgData[index].pin;
            imgData[index].pin = Math.max(0,pinNumber - 1);
        } else{
            arr.push(id);
            imgData[index].pin ++;
        }
        this.setState({
            userPinArr: arr,
            imageData: imgData
        });
    },
    logout: function(){
        this.setState({
            loggedIn: false,
            buttonLogin: true,
            userData: {}
        });
        //clear all cookie
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });  
    },
    handleChangeForm: function(){
        this.setState({
            imgName: this.refs.imageName.value,
            imgLink: this.refs.imageLink.value
        });
    },
    showImageForm: function(){
        this.setState({
            showImageForm: true
        });
    },
    addImage: function(e){
        e.preventDefault();
        $.post("/addimage", {
           imgName: this.state.imgName,
           imgLink: this.state.imgLink,
           username: this.state.username
        }, function(data){
           console.log("add image successfully"); 
           var imgData = this.state.imageData;
           imgData.unshift(data);
           this.setState({
              imageData: imgData 
           });
        }.bind(this));
        this.setState({
            imgName: '',
            imgLink: ''
        });
    },
    action: function(val){
       switch(val){
           case 'all images':this.loadImages(); break;
           case 'linked images':this.linkedImages(); break;
           default: this.loadImgFromUser(val); break;
       }   
    },
    linkedImages: function(){
        var imgData = this.state.imageData;
        var userPinArr = this.state.userPinArr;
        var imgData = imgData.filter(function(val){
            return userPinArr.indexOf(val._id) > -1;
        });
        this.setState({imageData:imgData});
    },
    loadImgFromUser: function(name){
        var imgData = this.state.imageData;
        var imgData = imgData.filter(function(val){
            return val.username === name;
        });
        this.setState({imageData:imgData});
    },
    hideAddImageForm: function(e){
        e.preventDefault();
        this.setState({showImageForm: false});
    },
    render: function(){
        return(
            <div>
            <Header loggedIn={this.state.loggedIn} showButton={this.state.buttonLogin} username={this.state.username} 
                logout={this.logout} showImageForm={this.showImageForm} action={this.action} />
                
            {this.state.showImageForm === false ? "" :
            <section>
            <div className="row">
            <div className="col-md-6">
                <h3>Add a Image </h3><form className="form form-group" onSubmit={this.addImage}>
                    <input type="text" ref="imageName" placeholder="Image Name" value={this.state.imgName} className="form-control form-group" onChange={this.handleChangeForm} />
                    <input type="text" ref="imageLink" placeholder="Image Link" value={this.state.imgLink} className="form-control form-group" onChange={this.handleChangeForm} />
                    <input type="submit" value="add" className="btn btn-danger"/>&nbsp;
                    <input type="submit" value="hide form" className="btn btn-default" onClick={this.hideAddImageForm}/>
                </form>
            </div>
            </div>
            </section>
            }
            <main>
                <Images data={typeof this.state.imageData === "undefined" ? false : this.state.imageData} loggedIn={this.state.loggedIn}
                userPinArr={this.state.userPinArr} togglePin={this.togglePin}/>
            </main>
            </div>
        );
    }
});



ReactDOM.render(<PinClone />, document.querySelector(".container"));

