export default interface Help {
    id: string;
    name: string;
    email: string,
    imageUrl: string;
    message: string;
    isResponded?: boolean;
};

export interface HelpRequest {
    name: string;
    message: string;
    imageId: string;
    email: string;
};
