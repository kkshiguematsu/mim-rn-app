export type User = {
  id: string;
  firstName: string;
  lastName?: string;
  username?: string;

  email: string;
  password: string;
  phone?: string;

  avatarUrl?: string;
  coverPhotoUrl?: string;

  website?: string;

  birthDate?: string;
  gender?: 'Masculino' | 'Feminino' | 'Outros';

  location?: {
    country?: string;
    state?: string;
    city?: string;
  };
};
