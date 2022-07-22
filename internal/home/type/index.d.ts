export interface OverviewData {
    total_trucks?:        number;
    total_users?:         number;
    total_jobs?:          number;
    total_by_job_status?: TotalByJobStatus;
}

export interface TotalByJobStatus {
    complete?: number;
    partial?:  number;
    pending?:  number;
    process?:  number;
}
