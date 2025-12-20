# カードゲーム風OG画像生成機能

## 概要

Next.js（App Router）を使用した、カードゲーム風デザインのSNSシェア用OG画像（シェアカード）の動的生成機能です。
トレーディングカード / ソシャゲカード風のデザインで、SNSで一瞬で意味が伝わるビジュアルを実現します。

## デザインコンセプト

- **カードゲーム風デザイン**: トレーディングカード / ソシャゲカード風
- **縦長カード**: 中央配置、角丸、太めの枠線
- **情報階層**: ランク → 診断タイプ名（最重要） → コメント → サービス名
- **若者向け**: ゲーム感あり、でもゴチャゴチャしない

## カード構成

```
┌─────────────────────────┐
│   [ランクバッジ]        │ ① 上部：ランク表示（S / 神相性）
│   ランクラベル          │
│                         │
│   診断タイプ名          │ ② 中央：診断タイプ名（最重要・一番大きく）
│   （最重要・最大）      │
│                         │
│   一言コメント          │ ③ 下部：一言コメント（フレーバーテキスト）
│                         │
│   Pairly Lab            │ ④ 最下部：サービス名（小さめ）
└─────────────────────────┘
```

## API エンドポイント

### `/api/og`

**クエリパラメータ:**
- `type` (必須): 診断タイプ名（例: "AAAタイプ"）
- `rank` (必須): ランク（例: "S", "A", "B"）
- `rankLabel` (任意): ランクラベル（例: "神相性"）
- `comment` (必須): 一言コメント（例: "最高の相性です！"）
- `service` (任意): サービス名（デフォルト: "Pairly Lab"）

**例:**
```
/api/og?type=AAAタイプ&rank=S&rankLabel=神相性&comment=最高の相性です！
```

## 使用方法

### 1. OG画像URLの生成

```typescript
import { generateOGImageUrl } from '@/lib/og-image-utils';

const ogImageUrl = generateOGImageUrl({
  type: 'AAAタイプ',
  rank: 'S',
  rankLabel: '神相性',
  comment: '最高の相性です！',
  service: 'Pairly Lab',
});
```

### 2. 結果ページでのmetadata設定

#### Server Componentの場合

```typescript
// app/diagnoses/compatibility-18/result/page.tsx
import { Metadata } from 'next';
import { generateResultMetadata } from './metadata-example';

export async function generateMetadata({ 
  searchParams 
}: { 
  searchParams: { type: string; rank: string; comment: string } 
}): Promise<Metadata> {
  return generateResultMetadata({
    type: searchParams.type || 'AAAタイプ',
    rank: searchParams.rank || 'S',
    rankLabel: '神相性',
    comment: searchParams.comment || '最高の相性です！',
    serviceName: 'Pairly Lab',
    pageUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/diagnoses/compatibility-18/result?type=${searchParams.type}&rank=${searchParams.rank}`,
  });
}
```

### 3. SNS共有ボタンの実装

```typescript
import { generateOGImageUrl, generateTwitterShareUrl, generateLineShareUrl } from '@/lib/og-image-utils';

function ShareButtons({ type, rank, rankLabel, comment }: Props) {
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/result?type=${type}&rank=${rank}`;
  const shareText = `${type} - ${rank} ${rankLabel} | ${comment}`;
  
  const twitterUrl = generateTwitterShareUrl(shareText, pageUrl);
  const lineUrl = generateLineShareUrl(shareText, pageUrl);
  
  return (
    <div>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
        Twitterで共有
      </a>
      <a href={lineUrl} target="_blank" rel="noopener noreferrer">
        LINEで共有
      </a>
    </div>
  );
}
```

## デザインカスタマイズ

カードデザインを変更する場合は、`/src/app/api/og/route.tsx` を編集してください。

### カスタマイズ可能な要素

- **背景グラデーション**: `background: 'linear-gradient(...)'`
- **カードサイズ**: `width: '680px', height: '520px'`
- **カード背景色**: `backgroundColor: '#ffffff'`
- **枠線**: `border: '8px solid #e0e0e0'`
- **角丸**: `borderRadius: '24px'`
- **フォントサイズ**: 各要素の `fontSize`
- **ランクバッジの色**: ランクバッジの `background`

### 例: ランク別の色分け

```typescript
// ランクに応じてバッジの色を変更
const getRankBadgeColor = (rank: string) => {
  switch (rank) {
    case 'S':
      return 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)'; // 金色
    case 'A':
      return 'linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%)'; // 銀色
    case 'B':
      return 'linear-gradient(135deg, #cd7f32 0%, #daa520 100%)'; // 銅色
    default:
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; // デフォルト
  }
};
```

## トラブルシューティング

### OG画像が表示されない場合

1. **環境変数の確認**
   ```bash
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

2. **APIルートの確認**
   - `/api/og` が正しく動作しているか確認
   - ブラウザで直接アクセスして画像が生成されるか確認

3. **metadata設定の確認**
   - `generateMetadata` 関数が正しく実装されているか確認
   - `ogImageUrl` が正しく生成されているか確認

### 画像のサイズが正しくない場合

- Twitter推奨サイズ: 1200x630px
- 現在の設定: `width: 1200, height: 630`

## 参考

- [Next.js OG Image Generation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
