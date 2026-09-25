export type FeatureRequestStatus = 'planned' | 'in-progress' | 'completed';

export interface FeatureRequest {
    id: string;
    projectName: string;
    title: string;
    description: string;
    category: string;
    status: FeatureRequestStatus;
    createdAt: string;
    voteCount: number;
    hasVoted?: boolean;
}
