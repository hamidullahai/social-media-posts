export type AppMode = 'markhor' | 'skyronix' | 'general';

export interface MarkhorData {
  personImage: string | null;
  content: string;
  logo: string | null;
  topRightLogo: string | null;
  optionalTopText: string;
  aspectRatio: '1/1' | '4/5' | '9/16';
}

export interface SkyronixPoint {
  title: string;
  description: string;
  iconType: 'shield' | 'diamond' | 'star' | 'rocket' | 'check' | 'lightbulb';
}

export interface SkyronixData {
  userImage: string | null;
  name: string;
  description: string;
  content: string;
  title?: string;
  subHeadline?: string;
  points?: SkyronixPoint[];
  summary?: string;
}

export interface GeneralData {
  type: 'text' | 'picture' | 'question';
  input: string;
  result: string;
  imageResult: string | null;
}
