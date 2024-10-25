import Joi from "joi";

export const saveFormValidator = Joi.object({
    requesterInfoFormGroup : Joi.object().required(),
    jobDetailsFormGroup : Joi.object().required(),
    recruitmentRequestFormGroup : Joi.object().required(),
    backgroundVerificationFormGroup : Joi.object().required()
})

export const getFormDataByIdValidator = Joi.object({
    id : Joi.string().required()
})

export const updateFormValidator = Joi.object({
    id : Joi.string().required(),
    requesterInfoFormGroup : Joi.object().required(),
    jobDetailsFormGroup : Joi.object().required(),
    recruitmentRequestFormGroup : Joi.object().required(),
    backgroundVerificationFormGroup : Joi.object().required()
})