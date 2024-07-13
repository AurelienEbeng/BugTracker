import PersonIcon from '@mui/icons-material/Person';
import "./demoUser.scss"

const DemoUserLogin = () => {
  return (
    <div className='content'>
        <div className='demoUsers'>
            <h1>Demo Users Login</h1>
            <div className='row'>
                <div className='demoUser'>
                    <PersonIcon style={{fontSize:"100px"}}/>
                    <p>Admin</p>
                </div>
                <div className='demoUser'>
                    <PersonIcon color='warning' style={{fontSize:"100px"}} />
                    <p>Project Manager</p>
                </div>
            </div>
            <div className='row'>
                <div className='demoUser'>
                    <PersonIcon color='success' style={{fontSize:"100px"}}/>
                    <p>Developer</p>
                </div>
                <div className='demoUser'>
                    <PersonIcon color='primary' style={{fontSize:"100px"}}/>
                    <p>Quality Assurance</p>
                </div>
            </div>
            <div className='extra'><p>Have an account? Login</p></div>
        </div>
    </div>
  )
}

export default DemoUserLogin