import User from "./user";

export default interface Faq {
    id: string;
    title: string;
    imageUrl: string;
    content: string;
    isActive?: boolean;
    createdBy?: User;
    category: string;
};

export interface FaqRequest {
    title: string;
    content: string;
    imageId: string;
    category: string;
};
