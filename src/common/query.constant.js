export const RECRUITMENT_FORM_DETAILS_QUERY = {
    JOB_TABLE: ` SELECT 
    id, 
    jobDetailsFormGroup ->> '$.jobTitle' AS jobTitle,
    jobDetailsFormGroup ->> '$.roleType' AS jobType,
    jobDetailsFormGroup ->> '$.industry' AS industry,
    jobDetailsFormGroup ->> '$.workExperience' AS yearOfExperience,
    jobDetailsFormGroup ->> '$.department' AS department
FROM recruitmentFormDetails
WHERE is_deleted = false
ORDER BY createdAt DESC;
`
}