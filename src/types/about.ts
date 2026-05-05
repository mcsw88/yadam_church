/**
 * Leader 사진 URL. `public/images/about/`에 파일이 있으면
 * `/images/about/<basename>.<ext>` 형태. 아직 없으면 `''`.
 */
export type LeaderPortraitUrl = '' | `/images/about/${string}`;

export interface VisionItem {
  id: string;
  title: string;
  description?: string;
}

export interface LeaderInfo {
  id: string;
  name: string;
  role: string;
  image: LeaderPortraitUrl;
  description?: string;
}
