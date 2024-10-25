import { Op } from 'sequelize';
import  db from '../database/connection.js'
import AppError from '../common/AppError.js'
import * as CONSTANT from '../common/constant.js'   
import * as QUERY_CONSTANT from '../common/query.constant.js';



export const saveJobForm = async (payload) => {
    try {
        const savedForm = await db.jobFormModel.create(payload);
        return savedForm
    } catch (error) {
        console.log('Error in saveJobForm service ', error?.message || error);
        throw error;
    }
};

export const getJobFormById = async (id) => {
    try {
      const jobForm = await db.jobFormModel.findOne({
        where: { id,  is_deleted: false },
     
      });
  
      if (!jobForm) {
        throw new AppError(CONSTANT.STATUS_MESSAGES.FETCH_DATA_NOT_FOUND, 404); 
      }
  
      return jobForm;
    } catch (error) {
      console.log('Error in getJobFormById service:', error?.message || error);
      throw error; 
    }
  };


  export const softDeleteJobFormById = async (id) => {
    try {
      const jobForm = await db.jobFormModel.findOne({ where: { id } });
  
      if (!jobForm) {
        throw new AppError(CONSTANT.STATUS_MESSAGES.FETCH_DATA_NOT_FOUND, 404);
      }
  
      jobForm.is_deleted = true; 
      await jobForm.save();
  
      return jobForm;
    } catch (error) {
      console.log('Error in softDeleteJobFormById service:', error.message || error);
      throw error; 
    }
  };
  
  export const updateJobForm = async (id, payload) => {
    try {

    const updated = await db.jobFormModel.update(payload, {
         where: { id, is_deleted: false },
         returning: true, 
      });

      if (!updated?.[1]) {
        throw new AppError(CONSTANT.STATUS_MESSAGES.FETCH_DATA_NOT_FOUND, 404);
      }

      const jobForm = await db.jobFormModel.findOne({ where: { id } });
      
      return jobForm;
    } catch (error) {
      console.log('Error in updateJobForm service ', error?.message || error);
      throw error;
    }
  };
  

  export const getJobTableData = async () => {
    try {
     
      const [results] = await db.sequelize.query(QUERY_CONSTANT.RECRUITMENT_FORM_DETAILS_QUERY.JOB_TABLE);
  
      if (results?.length === 0) {
        throw new AppError(CONSTANT.STATUS_MESSAGES.FETCH_DATA_NOT_FOUND, 404);
      }
  

      return results;
    } catch (error) {
      console.error('Error in getJobTableData service:', error.message || error);
      throw error; 
    }
  };
  