export type UserProps = {
  avatar?: string;
  name: string;
  membership: string;
  planType: string;
  accountType: 'user' | 'coach' | 'admin';
};
