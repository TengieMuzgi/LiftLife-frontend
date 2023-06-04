export type UserProps = {
  avatar?: string;
  firstName: string;
  lastName: string;
  planType?: string;
  accountType: 'CLIENT' | 'COACH' | 'ADMIN';
  id: string;
  registerDate: string;
  hasAvatar: boolean;
};
