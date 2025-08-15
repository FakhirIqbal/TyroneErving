import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setUserData } from '../redux/features/userSlice';

const useUser = () => {
  const user = useSelector((state: RootState) => state.userData);
  const dispatch = useDispatch();
  const handleSetUser = (payload: any) => {
    dispatch(setUserData(payload));
  };

  return {
    handleSetUser,
    user,
  };
};
export default useUser;
