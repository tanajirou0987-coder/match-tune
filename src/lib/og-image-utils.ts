/**
 * OG画像生成用のユーティリティ関数
 */

/**
 * OG画像URLを生成
 * @param params OG画像のパラメータ
 * @returns OG画像のURL
 */
export function generateOGImageUrl(params: {
  type: string;
  rank: string;
  rankLabel?: string;
  comment: string;
  service?: string;
}): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const searchParams = new URLSearchParams({
    type: params.type,
    rank: params.rank,
    comment: params.comment,
  });

  if (params.rankLabel) {
    searchParams.set('rankLabel', params.rankLabel);
  }

  if (params.service) {
    searchParams.set('service', params.service);
  }

  return `${baseUrl}/api/og?${searchParams.toString()}`;
}

/**
 * SNS共有用のURLを生成
 * @param params 共有パラメータ
 * @returns SNS共有用のURL
 */
export function generateShareUrl(params: {
  type?: string;
  rank?: string;
  comment?: string;
  [key: string]: string | undefined;
}): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  return `${baseUrl}/share?${searchParams.toString()}`;
}

/**
 * Twitter共有用のURLを生成
 * @param text 共有テキスト
 * @param url 共有URL
 * @returns Twitter共有用のURL
 */
export function generateTwitterShareUrl(text: string, url: string): string {
  const params = new URLSearchParams({
    text,
    url,
  });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

/**
 * LINE共有用のURLを生成
 * @param text 共有テキスト
 * @param url 共有URL
 * @returns LINE共有用のURL
 */
export function generateLineShareUrl(text: string, url: string): string {
  const params = new URLSearchParams({
    text: `${text}\n${url}`,
  });
  return `https://social-plugins.line.me/lineit/share?${params.toString()}`;
}
