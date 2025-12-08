import { useQuery } from "@tanstack/react-query";

export interface Certificate {
    id: string;
    studentId: string;
    collectionId: string;
    name: string;
    tokenId: string;
    tokenUri: string;
    createdAt: string;
    updatedAt: string;
    collection: {
        id: string;
        address: string;
        name: string;
        description: string;
        type: string;
        institutionId: string;
        institution: {
            name: string;
        };
        createdAt: string;
        updatedAt: string;
    };
}

export const useGetStudentCertificates = (studentId: string | undefined) => {
    return useQuery({
        queryKey: ["student-certificates", studentId],
        queryFn: async (): Promise<Certificate[]> => {
            if (!studentId) return [];

            const response = await fetch(`/api/student/${studentId}`);

            if (!response.ok) {
                throw new Error("Failed to fetch certificates");
            }

            return response.json();
        },
        enabled: !!studentId,
    });
};
