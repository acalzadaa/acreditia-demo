import { createOptions } from '$lib/components/common/utils/formUtils';
import { JOB_SCOPE, JOB_TYPE } from '$lib/schemas/shared.schema';

export const jobScopeOptions = createOptions(JOB_SCOPE);
export const jobTypeOptions = createOptions(JOB_TYPE);
