export type AppMode = 'markhor' | 'skyronix' | 'general';

export interface MarkhorData {
  personImage: string | null;
  content: string;
  logo: string | null;
  topRightLogo: string | null;
  optionalTopText: string;
}

export interface SkyronixData {
  userImage: string | null;
  name: string;
  description: string;
  content: string;
}

export interface GeneralData {
  type: 'text' | 'picture' | 'question';
  input: string;
  result: string;
  imageResult: string | null;
}
