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

export const useJobVacancy = (page: number = 1, category?: string, type?: string) => {
    return useQuery<JobVacancyResponse>({
        queryKey: ['job-vacancies', page, category, type],
        queryFn: async () => {
            const params = new URLSearchParams({ page: page.toString() });
            if (category) params.append('category', category);
            if (type) params.append('type', type);

            const response = await fetch(`/api/job-vacancies?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
    });
};
