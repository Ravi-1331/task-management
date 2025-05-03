import React,{ useState } from 'react'
import icon from '../img/icon.png'
import { toast } from "react-toastify";
import AxiosService from '../../components/utils/ApiService';
import { useNavigate,  } from "react-router-dom";
import './Signin.css';

function Signin() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        setLoading(true);
  
        const res = await AxiosService.post(`/user/login`, {
          email,
          password,
        });
  
        if (res.status === 200) {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("userData", JSON.stringify(res.data.userData));
          if (res.data.userData.status === "InActive") {
            navigate("/");
            toast.error("You are not Allow to login");
          } else if (res.data.userData.role === "customer") {
            toast.success(res.data.message);
            navigate("/slider");
          } else {
            toast.success(res.data.message);
            navigate("/userdash");
          }
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <>
 {loading && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
        </div>
      )}
      <section>
      <div className='logfull'  >
      <div className="login" style={{height:"570px",paddingTop:"35px"} }>
      <div className="avatar" style={{width:"80px", height:"80px"}}>
        <img src={icon} />
      </div>
        <h2  >Login</h2>
        <h3>Welcome back!</h3>

        <form className="login-form">
          <div className="textbox">
            <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            <span className="material-symbols-outlined"> email </span>
          </div>

          <div className="textbox">
            <input
              type={showPassword ? 'text' : 'password'} // Here is the change
              placeholder="Password" onChange={(e)=>setPassword(e.target.value)}
            />
            <span  className="material-symbols-outlined">
              {' '}
              lock{' '}
            </span>
           </div>

           <div  id='ch' style={{display:'flex',marginTop:"px"}}>
            <input style={{width:"10px",margin:"-8px 6px 0px 0px"}}
              type="checkbox"
              checked={showPassword}
              onChange={togglePasswordVisibility}
              
            /> 
            
            <span id='sp' style={{marginRight:"45px",color:'#157ae1' }}>
              Show Password
            </span>
            &nbsp; &nbsp;
            <span id='sp' style={{ color: '#157ae1', cursor: 'pointer' }} onClick={()=>navigate('/forgetpassword')}>
              Forgot Password ?{' '}
            </span>

</div>

          <button type="submit"  onClick={(e)=>handleLogin(e)} > LOGIN</button>

          {/* <p style={{ color: '#157ae1', fontSize: '18px' }}>
            Don't have Account?&nbsp; &nbsp;{' '} <br/>
            <span style={{ cursor: 'pointer', backgroundColor: '#157ae1', color: 'white', padding: '4px',
                            borderRadius: '4px'}} onClick={() => navigate('/signup')}>
              {' '}
              User
            </span>{' '}
              <br/>
              <br/>
            <span style={{ cursor: 'pointer', backgroundColor: '#157ae1', color: 'white', padding: '4px',
                            borderRadius: '4px' }} onClick={() => navigate('/signupCustomer')}>
              {' '}
              Custormer
            </span>{' '}
          </p> */}
          <div style={{ color: '#157ae1', fontSize: '14px' }}>Donot have account?</div>
          {/* <button>Employee</button>
          <button>Customer</button> */}
          <div>
          <div style={{ cursor: 'pointer', backgroundColor: '#157ae1', color: 'white',
                            borderRadius: '4px'}} onClick={() => navigate('/signup')}>
              {' '}
              User
            </div>{' '}
            <div style={{ cursor: 'pointer', backgroundColor: '#157ae1', color: 'white', padding: '4px',
                            borderRadius: '4px', marginTop:'10px' }} onClick={() => navigate('/signupCustomer')}>
              {' '}
              Custormer
            </div>
            </div>
          {/* <p style={{ color: '#157ae1', fontSize: '18px' }}>
            Create Account For Customer ?&nbsp; &nbsp;{' '} <br/>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/signupCustomer')}>
              {' '}
              Signup
            </span>{' '}
          </p> */}
        </form>
      </div>
      </div>
      </section>
      </>
    );
}

export default Signin
