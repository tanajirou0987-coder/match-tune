/**
 * 結果ページでのmetadata設定例
 * 
 * このファイルは参考用です。実際の結果ページに適用する場合は、
 * Server Componentでmetadataを設定するか、generateMetadata関数を使用してください。
 */

import type { Metadata } from 'next';
import { generateOGImageUrl } from '@/lib/og-image-utils';

/**
 * 結果ページ用のmetadataを生成
 * 
 * 使用例：
 * export const metadata: Metadata = generateResultMetadata({
 *   type: 'AAAタイプ',
 *   rank: 'Sランク',
 *   rankLabel: '神相性',
 *   comment: '最高の相性です！',
 *   serviceName: 'Pairly Lab',
 * });
 */
export function generateResultMetadata(params: {
  type: string;
  rank: string;
  rankLabel?: string;
  comment: string;
  serviceName?: string;
  pageUrl?: string;
}): Metadata {
  const ogImageUrl = generateOGImageUrl({
    type: params.type,
    rank: params.rank,
    rankLabel: params.rankLabel,
    comment: params.comment,
    service: params.serviceName,
  });

  const pageUrl = params.pageUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const title = `${params.type} - ${params.rank} ${params.rankLabel || ''} | ${params.serviceName || 'Pairly Lab'}`;
  const description = `${params.comment} ${params.serviceName || 'Pairly Lab'}で相性診断してみませんか？`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: params.serviceName || 'Pairly Lab',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${params.type} - ${params.rank}`,
        },
      ],
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

/**
 * Server Componentでの使用例
 * 
 * // app/diagnoses/compatibility-18/result/page.tsx
 * import { generateResultMetadata } from './metadata-example';
 * 
 * export async function generateMetadata({ searchParams }: { searchParams: { type: string; rank: string } }): Promise<Metadata> {
 *   return generateResultMetadata({
 *     type: searchParams.type || 'AAAタイプ',
 *     rank: searchParams.rank || 'Sランク',
 *     rankLabel: '神相性',
 *     comment: '最高の相性です！',
 *     serviceName: 'Pairly Lab',
 *     pageUrl: `https://your-domain.com/diagnoses/compatibility-18/result?type=${searchParams.type}&rank=${searchParams.rank}`,
 *   });
 * }
 */
