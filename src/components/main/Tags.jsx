import React, { Component } from 'react';
import '../../App.css';
import { Tag } from 'antd';
import {
    withRouter
} from 'react-router-dom';
// import { createStore } from 'redux';


class Tags extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            arr :[],
            menuList:[],
            selectedKey:0,
            openKey:0

        };
    };
    componentDidMount(){
        console.log(0)
        this.state.arr = this.props.arr;
        this.state.menuList = this.props.menuList;
        for (let i = 0; i < this.state.menuList.length; i++) {
        if(this.state.menuList[i].children.length === 0 && window.location.hash.substr(2) === this.state.menuList[i].path){
            this.state.arr[0].color = '';
          this.state.arr.push({
            name:this.state.menuList[i].name,
            path:this.state.menuList[i].path,
            color:'blue'
          })
        }
      }
        this.setState({
          arr: this.state.arr
        });
    };
    onClose(path,name,e){
        var arrInner = this.state.arr;
        for (let i = 0; i < this.state.arr.length; i++) {
          if(name === this.state.arr[i].name){
            if(this.state.arr[i].color === 'blue'){
                arrInner[0].color='blue';
                this.props.history.push("home");
            }
            arrInner.splice(i,1);

          }
        }
        this.setState({
          arr: arrInner,
        });
        e.stopPropagation();
    };
    LinkTo(path,name,e){
        this.props.history.push(path);
        const hash = window.location.hash;
        this.state.selectedKey = String(hash.substr(2));
        this.state.openKey = String(hash.substr(2));
        for (let i = 0; i < this.state.arr.length; i++) {
          if(name === this.state.arr[i].name){
            this.state.arr[i].color = 'blue';
          }else{
            this.state.arr[i].color = '';
          }
        }
        this.setState({
            arr: this.state.arr,
            selectedKey: this.state.selectedKey ,
            openKey: this.state.openKey 
        });
        console.log(this.state)
        this.props.LinkTo(this.state)
        e.stopPropagation();
    };
    render() {
        return (
            <div  id="tags">
                {
                    this.state.arr.map(function(name){  
                        if(name.name === "首页"){
                            return  <Tag key={ name.name } color={ name.color }  onClick={this.LinkTo.bind(this,name.path,name.name)}>{ name.name }</Tag>
                        }else{
                            return  <Tag className="tag-item" key={ name.name } closable color={ name.color } onClose={this.onClose.bind(this,name.path,name.name)}  onClick={this.LinkTo.bind(this,name.path,name.name)}>{ name.name }</Tag>
                        }
                    },this)  
                }
            </div>
        );
    }
}

export default withRouter(Tags);
