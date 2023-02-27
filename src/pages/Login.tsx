
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import arrowRight from '../assets/icons/arrow_right.svg'
import { useInput } from '../hooks/use-input'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/userSlice'
import { Link, useNavigate } from 'react-router-dom'

const Login:React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const email = useInput('', { isEmpty: true, isEmail: true, })
  const pass = useInput('', { isEmpty: true })
  const hendleLogin = (email: string, password: string) => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
              dispatch(setUser({
                   id: user.uid,
                   email: user.email,
              }))
              console.log('dfsdf')
              navigate("/admin");
         })
         .catch((error) => {
              console.log(error)
              switch (error.code) {
                   case 'auth/wrong-password':
                        alert("Неправильно введен пароль")
                        break;
                   case 'auth/user-not-found':
                        alert("Пользователя с таким email не существует")
                        break;
              }
          })
  }
  return (
    <div>
        
        <div className="wrapper--login">
               <h1>Вход в аккаунт администратора</h1>
               <form className="signin">
                    <input 
                    type="text"
                    value={email.value}
                    onChange={e => email.onChange(e)}
                    onBlur={e => email.onBlure(e)}
                    placeholder="Email..." />


                    <input 
                    type="password" 
                    value={pass.value}
                    onChange={e => pass.onChange(e)}
                    onBlur={e => pass.onBlure(e)}
                    placeholder="Пароль..." />
                    

                    <button onClick={() => hendleLogin(email.value, pass.value)} type="button"><img className='submit--img' src={arrowRight}/></button>
               </form>
               <Link to='/'>Вернуться назад в меню</Link>
        </div>
    </div>
  )
}


export default Login
