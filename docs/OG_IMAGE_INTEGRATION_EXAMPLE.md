# OG画像機能を組み込んだ場合の動作

## 組み込むとどうなるか

### 1. SNSでシェアした時の見え方

#### Before（組み込む前）
- TwitterやLINEでシェアすると、デフォルトのOG画像（または画像なし）が表示される
- 診断結果の情報が伝わらない

#### After（組み込んだ後）
- TwitterやLINEでシェアすると、**診断結果が一目で分かるOG画像**が表示される
- 画像には以下が表示される：
  - 診断タイプ名（例：AAAタイプ）
  - 相性ランク（例：Sランク）
  - ランクラベル（例：神相性）
  - 一言コメント（例：最高の相性です！）
  - サービス名（例：Pairly Lab）

### 2. 実際の動作フロー

```
ユーザーが結果ページを開く
  ↓
ページのmetadataにOG画像URLが設定される
  ↓
ユーザーがTwitterやLINEでシェアボタンをクリック
  ↓
SNSがOG画像を取得（/api/og?type=...&rank=...）
  ↓
動的にOG画像が生成される
  ↓
SNSに美しいシェアカードが表示される
```

### 3. 生成されるOG画像の例

```
┌─────────────────────────────────────┐
│                                     │
│         Pairly Lab                  │ ← サービス名（補足）
│                                     │
│         AAAタイプ                   │ ← 診断タイプ名（サブ）
│                                     │
│           Sランク                   │ ← 相性ランク（メイン・大きく）
│                                     │
│           神相性                    │ ← ランクラベル
│                                     │
│    最高の相性です！                 │ ← 一言コメント（サブ）
│                                     │
└─────────────────────────────────────┘
```

### 4. 実際のコード例

#### 結果ページに組み込む場合

```typescript
// src/app/diagnoses/compatibility-18/result/page.tsx

import { Metadata } from 'next';
import { generateOGImageUrl } from '@/lib/og-image-utils';

// Server Componentとしてmetadataを設定
export async function generateMetadata({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}): Promise<Metadata> {
  // 実際の診断結果から値を取得
  const type = 'AAAタイプ'; // 実際にはuserType.nameなどから取得
  const rank = 'Sランク'; // 実際にはrank.rankなどから取得
  const rankLabel = '神相性'; // 実際にはrank.tierなどから取得
  const comment = '最高の相性です！'; // 実際にはcompatibility.messageなどから取得
  
  const ogImageUrl = generateOGImageUrl({
    type,
    rank,
    rankLabel,
    comment,
    service: 'Pairly Lab',
  });

  return {
    title: `${type} - ${rank} ${rankLabel} | Pairly Lab`,
    description: comment,
    openGraph: {
      title: `${type} - ${rank} ${rankLabel}`,
      description: comment,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${type} - ${rank} ${rankLabel}`,
      description: comment,
      images: [ogImageUrl],
    },
  };
}
```

### 5. SNS共有ボタンに組み込む場合

```typescript
// src/components/DiagnosisResult.tsx に追加

import { generateTwitterShareUrl, generateLineShareUrl } from '@/lib/og-image-utils';

// 既存のShareButtonの近くに追加
const twitterUrl = generateTwitterShareUrl(
  `${userType.name} × ${partnerType.name} - ${rank.rank}ランク ${rank.tier}`,
  shareUrl
);

const lineUrl = generateLineShareUrl(
  `${userType.name} × ${partnerType.name} - ${rank.rank}ランク ${rank.tier}`,
  shareUrl
);

// ボタンとして表示
<a href={twitterUrl} target="_blank" rel="noopener noreferrer">
  Twitterでシェア
</a>
<a href={lineUrl} target="_blank" rel="noopener noreferrer">
  LINEでシェア
</a>
```

### 6. 実際のURL例

#### OG画像URL
```
https://your-domain.com/api/og?type=AAAタイプ&rank=Sランク&rankLabel=神相性&comment=最高の相性です！&service=Pairly%20Lab
```

#### Twitter共有URL
```
https://twitter.com/intent/tweet?text=AAAタイプ%20×%20BBBタイプ%20-%20Sランク%20神相性&url=https://your-domain.com/result?...
```

#### LINE共有URL
```
https://social-plugins.line.me/lineit/share?text=AAAタイプ%20×%20BBBタイプ%20-%20Sランク%20神相性%0Ahttps://your-domain.com/result?...
```

### 7. ブラウザでの確認方法

1. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

2. **OG画像を直接確認**
   ```
   http://localhost:3000/api/og?type=AAAタイプ&rank=Sランク&rankLabel=神相性&comment=最高の相性です！
   ```
   ブラウザでこのURLを開くと、生成されたOG画像が表示されます。

3. **Twitter Card Validatorで確認**
   - https://cards-dev.twitter.com/validator にアクセス
   - 結果ページのURLを入力
   - OG画像が正しく表示されるか確認

4. **LINEで確認**
   - LINEアプリで結果ページのURLを送信
   - プレビューにOG画像が表示されるか確認

### 8. 期待される効果

- ✅ **シェア率の向上**: 見た目が良いとシェアしたくなる
- ✅ **ブランド認知**: サービス名が表示される
- ✅ **情報伝達**: 診断結果が一目で分かる
- ✅ **クリック率向上**: 興味を引くデザインでクリックしたくなる

### 9. 注意点

- **Client Componentではmetadataを設定できない**
  - 結果ページがClient Componentの場合は、親のServer Componentでmetadataを設定する必要があります
  - または、`next/head`を使用する方法もあります

- **環境変数の設定**
  - `.env.local`に`NEXT_PUBLIC_SITE_URL`を設定してください
  - 本番環境では実際のドメインを設定

- **パッケージのインストール**
  - Next.js 16では標準で動作しますが、エラーが出る場合は`@vercel/og`をインストールしてください
