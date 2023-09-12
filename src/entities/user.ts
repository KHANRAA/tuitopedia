import Role from './role';

export default interface User {
    id: string;
    name: string;
    role: string;
    email: string;
    isAdmin: boolean;
    avatarUrl: string;
    isActive: boolean;
    tuitoPediaToken?: string;
}
