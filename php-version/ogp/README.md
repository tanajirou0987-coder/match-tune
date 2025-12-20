# OGP Share Card Generator

Pairly Lab の診断結果を SNS でシェアする際に、カードゲーム風の PNG を動的に生成する PHP スクリプトです。  
Xserver（Apache + PHP）上で `php-version/ogp/share.php` をそのまま配置すれば利用できます。

## 1. 仕組み
- GD (FreeType) を利用して 1200×630 の OGP 画像を生成
- GET パラメータで文言を切り替え
  - `type` : 診断タイプ名（例：`徹底相性診断`）
  - `rank` : ランク（例：`S` / `SS` / `B` …）
  - `comment` : 一言コメント
- ランクごとのスタイル定義を `RANK_STYLES` 配列へまとめているため、色や装飾をあとから拡張しやすい構造

例: `https://example.com/ogp/share.php?type=徹底相性診断&rank=S&comment=最高の相性`

## 2. フォントの配置
GD で TTF を扱うため、以下のファイルを `php-version/ogp/fonts` に配置してください（任意の日本語フォントでOKです）。

```
php-version/ogp/fonts/
├── CardHeadline.ttf  # 太字系（診断タイプ名、ランク表示）
└── CardBody.ttf      # 本文・コメント用
```

おすすめフォント（Google Fontsなど）
- [Zen Kaku Gothic New Bold](https://fonts.google.com/specimen/Zen+Kaku+Gothic+New)
- [Zen Kaku Gothic New Regular](https://fonts.google.com/specimen/Zen+Kaku+Gothic+New)

ファイル名を上記に合わせるか、`share.php` の `FONT_HEADLINE` / `FONT_BODY` を調整してください。

## 3. OGP メタタグ例
```html
<meta property="og:title" content="Pairly Lab | 診断結果" />
<meta property="og:description" content="Sランク：最高のシンクロ率！" />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://example.com/result.php?id=123" />
<meta property="og:image" content="https://example.com/ogp/share.php?type=徹底相性診断&rank=S&comment=最高の相性" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@pairlylab" />
```

## 4. 共有 URL 例
1. **X (旧Twitter)**  
   `https://twitter.com/intent/tweet?text=徹底相性診断の結果Sランク！&url=https%3A%2F%2Fexample.com%2Fresult.php%3Fid%3D123`

2. **LINE**  
   `https://line.me/R/msg/text/?徹底相性診断の結果Sランク！%0Ahttps%3A%2F%2Fexample.com%2Fresult.php%3Fid%3D123`

3. **Discord**  
   URL をそのまま貼り付けると OGP が表示されます。  
   例: `https://example.com/result.php?id=123`

## 5. デバッグ Tips
- `php -d detect_unicode=0 ogp/share.php > test.png` などで CLI から直接 PNG を生成可能
- 500 エラーになる場合は `fonts` の読み込み可否と GD/FreeType が有効かを確認してください（`phpinfo()`で GD Support / FreeType Support が `enabled` になっていればOK）。
