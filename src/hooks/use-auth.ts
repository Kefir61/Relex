import { selectUser } from './../redux/slices/userSlice';
import { useSelector } from 'react-redux';


export function useAuth() {
     const { email, id } = useSelector(selectUser)

     return {
          isAuth: !!id,
          email,
          id
     }
}