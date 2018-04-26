import React, { Component } from 'react';
import '../../App.css';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
// import { createStore } from 'redux';
// import createHistory from 'history/createBrowserHistory';
// import configureStore from './redux/configureStore';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;


class SlideCustoom extends Component { 
  constructor(props, context) {
        super(props, context);
        this.state = {
            collapsed: false,
            mode: 'inline',
            openKey: '',
            selectedKey: '',
            firstHide: true, 
            arr:[],
            menuList:[]
        }
  };
  componentDidMount() {
      this.state.arr = this.props.arr;
      this.state.menuList = this.props.menuList;
      this.setMenuOpen(this.props);
      console.log(this.props.selectedKey)
      const hash = window.location.hash;
      this.setState({
          selectedKey: hash.substr(2),
          openKey: String(hash.substr(2)),
          firstHide: false
      });
  }
  componentWillReceiveProps(nextProps) {
      this.onCollapse(nextProps.collapsed);
      this.setMenuOpen(nextProps);
  }
  setMenuOpen = props => {
  };
  onCollapse = (collapsed) => {
      this.setState({
          collapsed,
          firstHide: collapsed,
          mode: collapsed ? 'vertical' : 'inline',
      });
  };
  menuClick = e => {
      if(JSON.stringify(this.state.arr).indexOf(JSON.stringify(e.key)) === -1){
        this.state.arr.push({
          name : e.item.props.name,
          path : e.key,
          color : 'blue'
        })
        for (let i = 0; i < this.state.arr.length-1; i++) {
          this.state.arr[i].color = '';
        }
        this.setState({
          arr:this.state.arr
        });
      }else{
        for (let i = 0; i < this.state.arr.length; i++) {
          if(e.key === this.state.arr[i].path){
            this.state.arr[i].color = 'blue';
          }else{
            this.state.arr[i].color = '';
          }
        }
      }
      if(e.key === '/one' || e.key === '/two' || e.key === '/five'){
          this.setState({
            selectedKey: e.key,
            openKey: e[e.length - 1]
          });
      }
      this.setState({
        selectedKey: e.key,
        firstHide: false
      });
      const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
      popoverHide && popoverHide();
      this.props.menuClick(this.state.arr)
  };
  openMenu = v => {
      console.log(v);
      this.setState({
          openKey: v[v.length - 1],
          firstHide: false
      })
  };
  render() {
    return (
        <Sider
          collapsible
          collapsed={this.props.collapsed}
          trigger={null}
        >
          <div className="logo" />
          <Menu 
            theme="dark" 
            defaultSelectedKeys={['three1']}
            mode="inline"
            onClick={this.menuClick.bind(this)}
            selectedKeys={[this.state.selectedKey]}
            openKeys={this.state.firstHide ? null : [this.state.openKey]}
            onOpenChange={this.openMenu}
            >
            {
              this.state.menuList.map(function(item){  
                  if(item.children.length === 0){
                    return (
                      <Menu.Item key={item.path} name={item.name}>
                        <Link to={ item.path }>
                            <Icon type={ item.type } />
                            <span>{item.name}</span>
                        </Link>
                      </Menu.Item>
                    )
                  }else if(item.children.length !== 0){
                    return (
                      <SubMenu
                        key={ item.path }
                        title={<span><Icon type={ item.type } /><span>{item.name}</span></span>}
                      >
                        { item.children.map(function(child){ 
                           return(<Menu.Item key={ child.path }  name={child.name}><Link to={ child.path }>{child.name}</Link></Menu.Item>)
                          })
                        }
                      </SubMenu>
                    )
                  }
              })  
            }
            
          </Menu>
        </Sider>
    );
  }
}

export default SlideCustoom;
