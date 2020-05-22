import React from "react"
import { Router, Route, Link } from "react-router-dom"
import { createBrowserHistory } from "history"
import { Layout, Menu, Button} from 'antd';
import SignUp from "./signUp"
import SignIn from "./signIn"
import MatchStringForm from './matchStringForm'
import MatchList from './matchList'

const { Header, Content, Footer } = Layout;
const history = createBrowserHistory()

export default function App() {
  const token = localStorage.getItem('token')
  const path = history.location.pathname.replace('/','')
  const handleSignOut = () => {
    localStorage.clear('token')
    history.push('/sign_in')
  }

  return (
    <Router history={history}>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          {
            token && 
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={path || 'list'}>
              <Menu.Item key="list"><Link to="/list"><Button type="primary">Home</Button></Link></Menu.Item>
              <Menu.Item key="new"><Link to="/new"><Button type="primary">Match String</Button></Link></Menu.Item>
              <Menu.Item key="signout">
                <Button type="primary" onClick={handleSignOut}>Sign Out</Button>
              </Menu.Item>
            </Menu>
          }
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Route history={history} exact path="/" component={token ? MatchList : SignIn} />
            <Route history={history} path={"/sign_up"} component={SignUp} />
            <Route history={history} path={"/sign_in"} component={SignIn} />
            <Route history={history} path={"/new"} component={MatchStringForm} />
            <Route history={history} path={"/list"} component={MatchList} />
          </div>
        </Content>
        <Footer />
      </Layout>
    </Router>
  )
}
