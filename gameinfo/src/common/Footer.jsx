import { AiFillGithub } from "react-icons/ai"
import './Footer.css'


const Footer = () => {


    return (
        <div style={{width: '100%', borderTop: '1px solid gray'}}>
            
            <div className="footer-div">
                <div className="footer-content" style={{color: 'gray', fontSize: '20px', fontWeight: 'bold'}}>CONTACT</div> 
                <div className="footer-content"><a href="https://github.com/MoMoon-LKH"><AiFillGithub size={30}/></a></div>
                <div className="footer-content" style={{color: 'gray'}}>Email: rlgh28@gmail.com</div>
            </div>
            <div style={{fontSize: '13px', color: 'gray', marginBottom: '10px'}}>
                이 사이트는 개인 포토폴리오 사이트입니다
            </div>
        </div>
    )
}
export default Footer