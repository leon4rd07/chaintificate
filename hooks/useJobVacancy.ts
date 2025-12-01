import { useQuery } from '@tanstack/react-query';

export interface JobVacancy {
    id: string;
    companyName: string;
    position: string;
    category: string;
    jobDescription: string[];
    jobRequirements: string[];
    location: string;
    type: string;
    salary: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface Meta {
    total: number;
    page: number;
    lastPage: number;
}

interface JobVacancyResponse {
    data: JobVacancy[];
    meta: Meta;
}

export const useJobVacancy = (page: number = 1) => {
    return useQuery<JobVacancyResponse>({
        queryKey: ['job-vacancies', page],
        queryFn: async () => {
            const response = await fetch(`/api/job-vacancies?page=${page}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
    });
};
