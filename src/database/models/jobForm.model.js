export const jobFormModel = (sequelize, DataTypes) => {
  const recruitmentFormDetails = sequelize.define(
    "recruitmentFormDetails",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      requesterInfoFormGroup: {   
        type: DataTypes.JSON,
        defaultValue: null
      },
      jobDetailsFormGroup: {   
        type: DataTypes.JSON,
        defaultValue: null
      },
      recruitmentRequestFormGroup: {   
        type: DataTypes.JSON,
        defaultValue: null
      },
      backgroundVerificationFormGroup: {   
        type: DataTypes.JSON,
        defaultValue: null
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      timestamps: true, 
    }
  );

  return recruitmentFormDetails;
};
