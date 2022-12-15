import { 
    EMAIL_DOES_NOT_EXIST, 
    TRY_AGAIN_LATER, 
    WRONG_PASSWORD,
    USER_ALREADY_EXIST,
    SOMETHING_WENT_WRONG
} from '../../../data/errors/server/index';


export const handleServerError = (err) => {
    let error = "";
    switch (err) {
        case 400:
            error = EMAIL_DOES_NOT_EXIST;
            break;
        case 401:
            error = WRONG_PASSWORD;
            break;
        case 404:
            error = SOMETHING_WENT_WRONG;
            break;
        case 409:
            error = USER_ALREADY_EXIST;
            break;
        default:
            error = TRY_AGAIN_LATER;
            break;
    };
    return error;
};