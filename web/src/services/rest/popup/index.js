import { useDispatch } from "react-redux";
import { setPopupActivation, setPopupMessage } from '../../redux/popup-reducer';

const dispatch = useDispatch();


export const handlePopup = () => {
    dispatch(setPopupActivation(true));
    dispatch(setPopupMessage("XXXXXXXXXXXXXXXXXXXXXXXX"))
}