import Role from './role';

export default interface User {
    id: string;
    name: string;
    role: string;
    email: string;
    avatarUrl: string;
    isActive: boolean;
    tuitoPediaToken?: string;
}
