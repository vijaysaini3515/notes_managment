import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import './Navbar.scss'
// import imgs from '../../images/lbs.jpeg'

const Navbar = () => {
  const [showIcon,setShowIcon] = useState(false);
  const auth = localStorage.getItem('user');
  const navigate = useNavigate()

  const logoutHandle =()=>{
   localStorage.clear()
   navigate('/signup')
  }

  return (
    <>
        <div className={showIcon ?"nav_mobile":"nav_container"}>
        {
          auth?<ul>
                <li> <Link className="link " to="/">Home</Link> </li>
                <li><Link className="link" to="/collection">Collection</Link> </li>
                <li><Link className="link" to="/uploade">Upload</Link></li>
                <li><Link className="link" to="/circket">Circket</Link></li>


                <li><Link className="link"  to="/signup">
                <li onClick={logoutHandle}>LogOut({JSON.parse(auth).name})</li>       
                </Link></li>
          </ul> :
          <ul>
                 <li><Link className="link" to="/signup">SignUp</Link></li>
                 <li><Link className="link" to="/login" list="logout">LogIn</Link></li>
                 <datalist id='logout'>
                  <option value="hello">hello</option>
                 </datalist>
          </ul>
        }
            <button className='mobile_menu_icon'onClick={()=>(setShowIcon(!showIcon))}>
              {showIcon ? <i class="fa-solid fa-xmark"></i>: <i class="fa-solid fa-bars"></i>}
            </button>
        </div>
    </>
  )
}

export default Navbar


