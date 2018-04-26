import React, { Component } from 'react';
import './App.css';
import { Layout } from 'antd';
// import { browserHistory } from 'react-router';
import {
  HashRouter,
  Route
} from 'react-router-dom';
import Tags from './components/main/Tags';
import HeaderCustom from './components/main/HeaderCustom';
import SliderCustom from './components/main/SliderCustom';
import Home from './components/home/home';
import One from './components/pages/one/one';
import Two from './components/pages/two/two';


const { Header, Content, Sider } = Layout;


class App extends Component {
  constructor(props, context) {
        super(props, context);
        this.state = {
          collapsed: false,
          openKey:'',
          selectedKey:'',
          codeKey:{},
          firstHide:false,
          arr :[
              {
                  name : '首页',
                  path : 'home',
                  color : 'blue'
              }
          ],
          menuList:[
              {
                name: 'ONE',
                path: 'one',
                type: 'pie-chart',
                children: []
              },
              {
                name: 'TWO',
                path: 'two',
                type: 'desktop',
                children: []
              },
              {
                name: 'THREE',
                type: 'user',
                path: 'three',
                children:[
                  {
                    name: 'THREE1',
                    path: 'three1'
                  },
                  {
                    name: 'THREE2',
                    path: 'three2'
                  },
                  {
                    name: 'THREE3',
                    path: 'three3'
                  }
                ]
              },
              {
                name: 'FOUR',
                type: 'team',
                path: 'four',
                children:[
                  {
                    name: 'FOUR1',
                    path: 'four1'
                  },
                  {
                    name: 'FOUR2',
                    path: 'four2'
                  },
                  {
                    name: 'FOUR3',
                    path: 'four3'
                  }
                ]
              },
              {
                name: 'FIVE',
                path: 'five',
                type: 'file',
                children: []
              }
            ]
        }
  };
  toggle(){
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  componentDidMount(){
    
    // this.props.history.push(window.location.hash.substr(2));
    // console.log(window.location.hash)
  };
  menuClick(e) {
    this.state.arr = e;
  };
  LinkTo(stateObj){
    this.state.codeKey = stateObj;
    this.state.openKey = this.state.codeKey.openKey;
    this.state.selectedKey = this.state.codeKey.selectedKey
    console.log(stateObj)
    this.setState({
      openKey: this.state.openKey,
      selectedKey:this.state.selectedKey,
      firstHide: false
    });
    console.log(this.state.codeKey.openKey)
  }
  render() {
    return (
      <HashRouter>
        <Layout>
          <Sider collapsed={this.state.collapsed} >
            <SliderCustom selectedKey={this.state.selectedKey} openKey={this.state.openKey} collapsed={this.state.collapsed} menuList={this.state.menuList}  arr={this.state.arr} menuClick={this.menuClick.bind(this)} />
          </Sider>
          <Layout>
            <Header   style={{ background: '#fff', padding: 0 }}>
              <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} />
            </Header>
            <Content style={{ padding:'10px',position:'relative' }}>
              <Tags  menuList={this.state.menuList} arr={this.state.arr} LinkTo={this.LinkTo.bind(this)}/>
              <div style={{ border: '1px solid gray',position:'absolute', bottom:0,right:0,left:0,top:'32px',margin:'10px' }}>
                  <Route exact path="/" component={Home}/>
                  <Route path="/one" component={One}/>
                  <Route path="/two" component={Two}/>
              </div>
            </Content>
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
}

export default App;
