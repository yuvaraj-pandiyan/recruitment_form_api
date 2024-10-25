import * as CONSTANT from '../common/constant.js';


export const apiResponse = (status, message, responseData = null) => {
    return {
        statusCode: CONSTANT.STATUS_CODES[status] || status,
        message: message,
        data: responseData,
    };
};

export const sendErrorResponse = (res, error, data=null) => {
    const { statusCode, message } = error?.isOperational 
        ? { statusCode: error.statusCode, message: error.message } 
        : { statusCode: 500, message: CONSTANT.STATUS_MESSAGES.INTERNAL_ERROR };

    return res.status(statusCode).send(apiResponse(error?.isOperational ? statusCode : 'ERROR', message, data));
};

export const sendSuccessResponse = (res, message, data) => {
    return res.status(200).send(apiResponse('SUCCESS', message, data));
};
