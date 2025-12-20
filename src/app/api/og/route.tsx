import { ImageResponse } from 'next/og';

/**
 * カードゲーム風OG画像生成
 * トレーディングカード / ソシャゲカード風のデザイン
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // クエリパラメータから値を取得
    const type = searchParams.get('type') || 'AAAタイプ';
    const rank = searchParams.get('rank') || 'S';
    const rankLabel = searchParams.get('rankLabel') || '神相性';
    const comment = searchParams.get('comment') || '最高の相性です！';
    const serviceName = searchParams.get('service') || 'Pairly Lab';
    
    // OG画像サイズ（Twitter推奨: 1200x630）
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // 背景：暗すぎないグラデーション
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif',
            position: 'relative',
          }}
        >
          {/* カード本体（縦長カード、中央配置） */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '680px',
              height: '520px',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '8px solid #e0e0e0',
              padding: '50px 60px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
            }}
          >
            {/* ① 上部：ランク表示（バッジ風） */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px',
              }}
            >
              {/* ランクバッジ */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '16px',
                  padding: '12px 32px',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                }}
              >
                <span
                  style={{
                    fontSize: '48px',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '0.05em',
                  }}
                >
                  {rank}
                </span>
              </div>
              
              {/* ランクラベル */}
              {rankLabel && (
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#666666',
                    letterSpacing: '0.02em',
                  }}
                >
                  {rankLabel}
                </div>
              )}
            </div>
            
            {/* ② 中央：診断タイプ名（最重要・一番大きく） */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '72px',
                  fontWeight: 800,
                  color: '#1a1a1a',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  maxWidth: '560px',
                }}
              >
                {type}
              </div>
            </div>
            
            {/* ③ 下部：一言コメント（フレーバーテキスト） */}
            <div
              style={{
                fontSize: '28px',
                fontWeight: 500,
                color: '#444444',
                textAlign: 'center',
                lineHeight: 1.5,
                marginBottom: '20px',
                maxWidth: '560px',
              }}
            >
              {comment}
            </div>
            
            {/* ④ 最下部：サービス名（小さめ） */}
            <div
              style={{
                fontSize: '18px',
                fontWeight: 500,
                color: '#999999',
                letterSpacing: '0.05em',
                textAlign: 'center',
              }}
            >
              {serviceName}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG画像生成エラー:', error);
    return new Response('OG画像の生成に失敗しました', { status: 500 });
  }
}
