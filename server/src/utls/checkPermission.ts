import { Types } from 'mongoose';
import CustomError from '../errors/';

const checkPermission = (userId: Types.ObjectId, resourceUserId: Types.ObjectId) => {

    if (resourceUserId.equals(userId)) return;
    throw new CustomError.UnauthenticatedError('Not authorized to access this route')
}

export default checkPermission;