export const IMAGE_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const IMAGE_MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const ATTACHMENT_ALLOWED_TYPES = [
  'application/pdf',
  'application/x-hwp',
  'application/haansofthwp',
  'application/vnd.hancom.hwp',
  'application/haansofthwpx',
  'application/vnd.hancom.hwpx',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip',
];
export const ATTACHMENT_ALLOWED_EXTENSIONS = [
  '.pdf', '.hwp', '.hwpx', '.doc', '.docx',
  '.ppt', '.pptx', '.xls', '.xlsx', '.zip',
];
export const ATTACHMENT_MAX_SIZE = 10 * 1024 * 1024; // 10MB
export const ATTACHMENT_MAX_COUNT = 5;

export function validateImageFile(file: File): string | null {
  if (!IMAGE_ALLOWED_TYPES.includes(file.type)) {
    return '이미지는 JPG, PNG, WEBP 형식만 허용됩니다.';
  }
  if (file.size > IMAGE_MAX_SIZE) {
    return `이미지 파일 크기는 5MB 이하여야 합니다. (현재: ${(file.size / 1024 / 1024).toFixed(1)}MB)`;
  }
  return null;
}

export function validateAttachmentFile(file: File): string | null {
  const ext = '.' + file.name.split('.').pop()?.toLowerCase();
  const isAllowedExt = ATTACHMENT_ALLOWED_EXTENSIONS.includes(ext);
  if (!isAllowedExt) {
    return `허용되지 않는 파일 형식입니다: ${ext}. 허용 형식: ${ATTACHMENT_ALLOWED_EXTENSIONS.join(', ')}`;
  }
  if (file.size > ATTACHMENT_MAX_SIZE) {
    return `첨부파일 크기는 10MB 이하여야 합니다. (현재: ${(file.size / 1024 / 1024).toFixed(1)}MB)`;
  }
  return null;
}

export function validateAttachmentCount(existingCount: number, newCount: number): string | null {
  if (existingCount + newCount > ATTACHMENT_MAX_COUNT) {
    return `첨부파일은 게시글당 최대 ${ATTACHMENT_MAX_COUNT}개까지 허용됩니다.`;
  }
  return null;
}
