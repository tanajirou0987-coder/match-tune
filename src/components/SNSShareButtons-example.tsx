/**
 * SNS共有ボタンの使用例
 * 
 * このファイルは参考用です。実際のコンポーネントに適用してください。
 */

'use client';

import { generateTwitterShareUrl, generateLineShareUrl, generateOGImageUrl } from '@/lib/og-image-utils';

interface SNSShareButtonsProps {
  type: string;
  rank: string;
  rankLabel?: string;
  comment: string;
  serviceName?: string;
  pageUrl: string;
}

export function SNSShareButtons({
  type,
  rank,
  rankLabel,
  comment,
  serviceName = 'Pairly Lab',
  pageUrl,
}: SNSShareButtonsProps) {
  // OG画像URLを生成
  const ogImageUrl = generateOGImageUrl({
    type,
    rank,
    rankLabel,
    comment,
    service: serviceName,
  });

  // 共有テキスト
  const shareText = `${type} - ${rank} ${rankLabel || ''} | ${comment}`;

  // Twitter共有URL
  const twitterUrl = generateTwitterShareUrl(shareText, pageUrl);

  // LINE共有URL
  const lineUrl = generateLineShareUrl(shareText, pageUrl);

  return (
    <div className="flex gap-4">
      {/* Twitter共有ボタン */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-[#1DA1F2] text-white rounded-lg font-semibold hover:bg-[#1a8cd8] transition-colors"
      >
        Twitterで共有
      </a>

      {/* LINE共有ボタン */}
      <a
        href={lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-[#06C755] text-white rounded-lg font-semibold hover:bg-[#05b34a] transition-colors"
      >
        LINEで共有
      </a>

      {/* Web Share API（モバイル対応） */}
      <button
        onClick={async () => {
          if (navigator.share) {
            try {
              await navigator.share({
                title: `${type} - ${rank}`,
                text: shareText,
                url: pageUrl,
              });
            } catch (error) {
              console.log('共有がキャンセルされました');
            }
          } else {
            // フォールバック: URLをクリップボードにコピー
            await navigator.clipboard.writeText(pageUrl);
            alert('URLをクリップボードにコピーしました');
          }
        }}
        className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
      >
        共有
      </button>
    </div>
  );
}

/**
 * 使用例：
 * 
 * import { SNSShareButtons } from '@/components/SNSShareButtons-example';
 * 
 * <SNSShareButtons
 *   type="AAAタイプ"
 *   rank="Sランク"
 *   rankLabel="神相性"
 *   comment="最高の相性です！"
 *   serviceName="Pairly Lab"
 *   pageUrl="https://your-domain.com/diagnoses/compatibility-18/result?type=AAA&rank=S"
 * />
 */
