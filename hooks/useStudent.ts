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
    image?: string; // Added image property
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

export interface SimpleCertificate {
    id: string;
    name: string;
    tokenUri: string;
    mintingDate: string;
    institution: string;
    image?: string;
}

export interface StudentCertificatesResponse {
    certificates: SimpleCertificate[];
    degrees: SimpleCertificate[];
}

export const useGetStudentCertificates = (studentId: string | undefined) => {
    return useQuery({
        queryKey: ["student-certificates", studentId],
        queryFn: async (): Promise<StudentCertificatesResponse> => {
            if (!studentId) return { certificates: [], degrees: [] };

            const response = await fetch(`/api/student/${studentId}`);

            if (!response.ok) {
                throw new Error("Failed to fetch certificates");
            }

            const data: StudentCertificatesResponse = await response.json();

            const fetchImages = async (items: SimpleCertificate[]) => {
                return Promise.all(
                    items.map(async (item) => {
                        try {
                            if (item.tokenUri) {
                                const uri = item.tokenUri.startsWith("ipfs://")
                                    ? item.tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/")
                                    : item.tokenUri;

                                const metadataResponse = await fetch(uri);
                                if (metadataResponse.ok) {
                                    const metadata = await metadataResponse.json();
                                    return { ...item, image: metadata.image };
                                }
                            }
                        } catch (error) {
                            console.error(`Failed to fetch metadata for cert ${item.id}`, error);
                        }
                        return item;
                    })
                );
            };

            const [certificates, degrees] = await Promise.all([
                fetchImages(data.certificates),
                fetchImages(data.degrees),
            ]);

            return { certificates, degrees };
        },
        enabled: !!studentId,
    });
};

export const useGetCertificateById = (id: string | undefined) => {
    return useQuery({
        queryKey: ["certificate", id],
        queryFn: async (): Promise<Certificate> => {
            if (!id) throw new Error("Certificate ID is required");

            const response = await fetch(`/api/certificate/${id}`);

            if (!response.ok) {
                throw new Error("Failed to fetch certificate");
            }

            const cert: Certificate = await response.json();

            // Fetch metadata
            if (cert.tokenUri) {
                try {
                    // Handle IPFS URIs if necessary
                    const uri = cert.tokenUri.startsWith("ipfs://")
                        ? cert.tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/")
                        : cert.tokenUri;

                    const metadataResponse = await fetch(uri);
                    if (metadataResponse.ok) {
                        const metadata = await metadataResponse.json();
                        return { ...cert, image: metadata.image };
                    }
                } catch (error) {
                    console.error(`Failed to fetch metadata for cert ${cert.id}`, error);
                }
            }

            return cert;
        },
        enabled: !!id,
    });
};
