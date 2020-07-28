import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import setAuthToken from './content/utils/setAuthToken';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Profile from './content/components/Profile'
import Welcome from './Welcome'
import Main from './Main'
import Request from './Request'
import Friends from './Friends' 
import Navbar from './content/components/Navbar'
import Login from './content/components/Login'
import Signup from './content/components/Signup'
{/*import FriendsCarousel from './content/components/FriendsCarousel'*/}

const PrivateRoute = ({ component: Component, ...rest }) => {

  const user = localStorage.getItem(`jwtToken`)

  return <Route {...rest} render={(props) => (
        user ? <Component {...rest} {...props} /> : <Redirect to='/login' />
      )} 
  />
}

function App() {

  let [currentUser, setCurrentUser] = useState("")
  let [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    let token;
    if(localStorage.getItem('jwtToken') === null) {
      setIsAuthenticated(false)
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.jwtToken);
      setCurrentUser(token);
      setIsAuthenticated(true);
    }
  }, [])

  let nowCurrentUser = (userData) => {
    console.log("oh hey this is even running")
    setCurrentUser(userData);
    setIsAuthenticated(true)
  }

  let handleLogout = () => {
    if(localStorage.getItem('jwtToken') !== null) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  console.log('Current User = ', currentUser);
  console.log('Authenticated = ', isAuthenticated);


  const data = {
          imgUrl: "http://placekitten.com/300/200", 
          name: "Luke Myers! " ,
          phone:"Looking for friends that like computers. I am a new software engineer and like friends that can code !",
          date: "July 17th, 2020",
  }

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Welcome </Link>
          <Link to="/Main">Main</Link>
          <Link to="/Profile">Profile</Link>
          <Link to="/Requests">Request</Link> 
          <Link to="/Friends">Friends</Link> 
          <Link to="/Login">Login</Link> 
          <Link to="/Signup">Signup</Link> 
          <Navbar handleLogout={handleLogout} isAuthed={isAuthenticated}/>
        </nav> 
      </div>
      <div className="App">
        <Route exact path="/" component={Welcome} />
        <PrivateRoute path='/Profile' component={ Profile } user={currentUser} />
        <Route path="/Main" render={() => <Main blog={data} />} />  
        <Route path="/Requests" component={Request} /> 
        <Route path="/Friends" render={() => <Friends blog={data} />} /> 
        <Route path='/Login' render={ (props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser} /> } />
        <Route path="/Signup" component={Signup} /> 
      </div>
    </Router>
  );
}

export default App;