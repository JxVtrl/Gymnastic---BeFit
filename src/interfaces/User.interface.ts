export interface iUser {
  id?: number;
  name: string | null;
  uid: string;
  photoURL: string | null;
  username?: string | null;
  email: string | null;
  infos?: iUserInfo;
}

export interface iUserInfo {
  height?: number | string;
  weight?: number | string;
  workoutTime?: string;
  biotype?: string;
  makeAerobyc?: string;
  smoke?: string;
  drinks?: string;
  alergy?: string;
}
