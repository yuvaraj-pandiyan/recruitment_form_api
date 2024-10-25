import express from "express";
import * as CONSTANT from '../common/constant.js'   
import * as VALIDATOR from '../validators/form.validator.js';
import * as SERVICE from '../services/form.service.js';
import {sendSuccessResponse, sendErrorResponse} from '../common/apiResponse.service.js';
import AppError from '../common/AppError.js'

const router = express.Router();


router.post('/save', async (req, res) => {
  try {
   
    const { error, value } = VALIDATOR.saveFormValidator.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const {
      requesterInfoFormGroup,
      jobDetailsFormGroup,
      recruitmentRequestFormGroup,
      backgroundVerificationFormGroup,
    } = value;

    const payload = {
      requesterInfoFormGroup,
      jobDetailsFormGroup,
      recruitmentRequestFormGroup,
      backgroundVerificationFormGroup,
    };


    const formSavedResponse = await SERVICE.saveJobForm(payload);
    sendSuccessResponse(res, CONSTANT.STATUS_MESSAGES.SAVE_DATA_SUCCESSFULLY, formSavedResponse);
  } catch (error) {
    sendErrorResponse(res, error, error?.message );
  }
});

router.get('/details/:id', async (req, res) => {
  try {
   

    const { error, value } = VALIDATOR.getFormDataByIdValidator.validate(req.params);
    if (error) {
      throw new AppError(error.details[0]?.message, 400);
    }
    const {id} = value;
    const formResponse = await SERVICE.getJobFormById(id);

    sendSuccessResponse(res, CONSTANT.STATUS_MESSAGES.FETCH_DATA_SUCCESSFULLY, formResponse);
 
    
  } catch (error) {

    sendErrorResponse(res, error, error?.message );

  }
});

router.delete('/details/:id', async (req, res) => {
  try {
    const { error, value } = VALIDATOR.getFormDataByIdValidator.validate(req.params);
    if (error) {
      throw new AppError(error.details[0]?.message, 400);
    }

    const { id } = value;
    const deleteResponse = await SERVICE.softDeleteJobFormById(id);

    sendSuccessResponse(res, CONSTANT.STATUS_MESSAGES.DATA_DELETED_SUCCESSFULLY, deleteResponse);
  } catch (error) {
    sendErrorResponse(res, error, error.message || 'An error occurred while deleting the data');
  }
});

router.put('/details/:id', async (req, res) => {
  try {
    const { error, value } = VALIDATOR.updateFormValidator.validate({...req.body, ...req.params});
    
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }
 
    const {
      id,
      requesterInfoFormGroup,
      jobDetailsFormGroup,
      recruitmentRequestFormGroup,
      backgroundVerificationFormGroup,
    } = value;

    const payload = {
      requesterInfoFormGroup,
      jobDetailsFormGroup,
      recruitmentRequestFormGroup,
      backgroundVerificationFormGroup,
    };

    const formUpdatedResponse = await SERVICE.updateJobForm(id, payload);
    sendSuccessResponse(res, CONSTANT.STATUS_MESSAGES.UPDATE_DATA_SUCCESSFULLY, formUpdatedResponse);
  } catch (error) {
    sendErrorResponse(res, error, error?.message);
  }
});

router.get('/tableData', async (req, res) => {
  try {
   
    const formResponse = await SERVICE.getJobTableData();

    sendSuccessResponse(res, CONSTANT.STATUS_MESSAGES.FETCH_DATA_SUCCESSFULLY, formResponse);
 

  } catch (error) {

    sendErrorResponse(res, error, error?.message );

  }
});




export default router;
