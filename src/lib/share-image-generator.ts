import QRCode from "qrcode";

/**
 * 共有画像生成機能
 * Instagramストーリー比率（1080 × 1920、9:16）を厳守
 * 文字密度だけで構成された診断結果カードを描画する
 */

const WIDTH = 1080;
const HEIGHT = 1920;
const SCALE = 2;

const HORIZONTAL_MARGIN = 120;
const CONTENT_WIDTH = WIDTH - HORIZONTAL_MARGIN * 2;
const MAX_TEXT_WIDTH = CONTENT_WIDTH * 0.85;

const BACKGROUND_COLOR = "#080212";
const PANEL_BACKGROUND = "rgba(17, 13, 26, 0.94)";
const TEXT_PRIMARY = "#f9fbff";
const TEXT_SECONDARY = "#d9e0f3";
const TEXT_MUTED = "#9ca6c4";
const ACCENT_PRIMARY = "#ffd93b";
const ACCENT_SECONDARY = "#8b74ff";

const FONT_FAMILY =
  "\"Hiragino Sans\", \"Yu Gothic Medium\", \"Yu Gothic\", \"游ゴシック Medium\", \"游ゴシック\", \"Noto Sans JP\", \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
const PANEL_PADDING_X = 96;
const PANEL_PADDING_TOP = 120;
const PANEL_PADDING_BOTTOM = 130;
const CARD_RADIUS = 48;
const CARD_BORDER_COLOR = "rgba(255, 255, 255, 0.08)";

interface ShareImageData {
  userNickname: string;
  partnerNickname: string;
  score: number;
  percentileDisplay: string;
  rankInfo: {
    rank: string;
    tier: string;
    bandName: string;
  };
  rankImagePath: string;
  message?: string;
  shareUrl: string;
  diagnosisType?: string;
}

interface TextBlock {
  lines: string[];
  fontSize: number;
  fontWeight: string;
  color: string;
  spacingAfter: number;
  lineHeightMultiplier?: number;
  maxWidth?: number;
}

function getRankBandName(bandName: string): string {
  return bandName || "安心できる距離";
}

function getRankEmotionalCopy(rank: string): string {
  const emotionalCopies: Record<string, string> = {
    SS: "静かに響くシンクロ感",
    S: "軽やかに滲む親密さ",
    A: "自然体で続く距離感",
    B: "穏やかな呼吸がそろう",
    C: "自然体で続く距離感",
    D: "余白を楽しむフェーズ",
    E: "ゆっくり育てる相性",
    F: "歩幅を探るプロセス",
    G: "まだ交わらない関係",
  };
  return emotionalCopies[rank] || emotionalCopies.C;
}

function extractPercentile(percentileText: string): number {
  const match = percentileText.match(/(\d+)/);
  if (match) {
    const value = parseInt(match[1], 10);
    if (!Number.isNaN(value)) {
      return Math.min(Math.max(value, 1), 100);
    }
  }
  return 50;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  if (!text) {
    return [];
  }
  const characters = Array.from(text);
  let currentLine = "";
  const lines: string[] = [];
  characters.forEach((char) => {
    const testLine = currentLine + char;
    if (ctx.measureText(testLine).width > maxWidth && currentLine !== "") {
      lines.push(currentLine);
      currentLine = char;
    } else {
      currentLine = testLine;
    }
  });
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

function drawImageContain(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  const imgWidth = (img as HTMLImageElement).width ?? width;
  const imgHeight = (img as HTMLImageElement).height ?? height;
  const imgAspect = imgWidth / imgHeight;
  const areaAspect = width / height;

  let drawWidth = width;
  let drawHeight = height;

  if (imgAspect > areaAspect) {
    drawWidth = height * imgAspect;
    drawHeight = height;
  } else {
    drawWidth = width;
    drawHeight = width / imgAspect;
  }

  const offsetX = x + (width - drawWidth) / 2;
  const offsetY = y + (height - drawHeight) / 2;

  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

function renderTextBlock(
  ctx: CanvasRenderingContext2D,
  block: TextBlock,
  x: number,
  startY: number,
  maxWidth: number,
  render: boolean
): number {
  ctx.save();
  ctx.font = `${block.fontWeight} ${block.fontSize}px ${FONT_FAMILY}`;
  ctx.fillStyle = block.color;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const lineHeight = block.fontSize * (block.lineHeightMultiplier ?? 1.3);
  const effectiveWidth = Math.min(block.maxWidth ?? maxWidth, maxWidth);
  let consumedHeight = 0;
  for (const rawLine of block.lines) {
    const wrappedLines = wrapText(ctx, rawLine, effectiveWidth);
    for (const line of wrappedLines) {
      if (render) {
        ctx.fillText(line, x, startY + consumedHeight);
      }
      consumedHeight += lineHeight;
    }
  }
  ctx.restore();
  return consumedHeight;
}

export async function generateShareImageBlob(data: ShareImageData): Promise<Blob> {
  await document.fonts.ready;

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH * SCALE;
  canvas.height = HEIGHT * SCALE;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#1a0635");
  gradient.addColorStop(0.55, "#120327");
  gradient.addColorStop(1, BACKGROUND_COLOR);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.scale(SCALE, SCALE);

  const addGlow = (
    cx: number,
    cy: number,
    inner: number,
    outer: number,
    color: string
  ) => {
    const glow = ctx.createRadialGradient(cx, cy, inner, cx, cy, outer);
    glow.addColorStop(0, color);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  };

  ctx.save();
  ctx.globalAlpha = 0.5;
  addGlow(280, 260, 0, 480, "rgba(131, 56, 236, 0.45)");
  ctx.globalAlpha = 0.35;
  addGlow(820, 1450, 0, 560, "rgba(255, 127, 212, 0.25)");
  ctx.restore();

  const percentileText = data.percentileDisplay || "上位50%";
  const percentileValue = extractPercentile(percentileText);
  const rank = data.rankInfo.rank || "C";
  const rankMain = rank.slice(0, 1).toUpperCase();
  const rankBandName = getRankBandName(data.rankInfo.bandName);
  const emotionalCopy = data.message?.trim() || getRankEmotionalCopy(rank);
  const pairLabel = `${data.userNickname || "あなた"} × ${data.partnerNickname || "相手"}`;
  const scoreValue = Math.max(0, Math.min(Math.round(data.score ?? 0), 100));
  const shareMessage = data.message?.trim() || "";
  const percentileDisplay = data.percentileDisplay || `上位${percentileValue}%`;
  let rankImage: HTMLImageElement | null = null;
  try {
    rankImage = await loadImage(data.rankImagePath);
  } catch {
    rankImage = null;
  }

  // 共有URL（スマホでアクセス可能なURL）
  // data.shareUrlが設定されていない場合、現在のページURLまたはデフォルトURLを使用
  let shareLink = data.shareUrl?.trim();
  if (!shareLink) {
    if (typeof window !== "undefined") {
      // ブラウザ環境の場合、現在のURLを使用
      shareLink = window.location.href;
    } else {
      // サーバーサイドの場合、環境変数またはデフォルトURL
      shareLink = process.env.NEXT_PUBLIC_SITE_URL || "https://pairlylab.app";
    }
  }
  let qrCanvas: HTMLCanvasElement | null = document.createElement("canvas");
  try {
    await QRCode.toCanvas(qrCanvas, shareLink, {
      width: 260,
      margin: 0,
      color: { dark: "#0c0f16", light: "#ffffff" },
    });
  } catch {
    qrCanvas = null;
  }

  const panelWidth = CONTENT_WIDTH;
  const panelX = (WIDTH - panelWidth) / 2;
  const innerWidth = panelWidth - PANEL_PADDING_X * 2;
  const centerX = panelX + panelWidth / 2;
  const textStartX = panelX + PANEL_PADDING_X;
  const messageBlock: TextBlock | null = shareMessage
    ? {
        lines: shareMessage.split("\n"),
        fontSize: 44,
        fontWeight: "500",
        color: TEXT_PRIMARY,
        spacingAfter: 0,
        lineHeightMultiplier: 1.5,
      }
    : null;

  const pairParts = pairLabel
    .split("×")
    .map((part) => part.replace("×", "").replace(/\s{2,}/g, " ").trim())
    .filter((part) => part.length > 0);
  if (pairParts.length > 2) {
    const combined = pairParts.slice(1).join(" ");
    pairParts.splice(1, pairParts.length - 1, combined);
  }
  if (pairParts.length === 0) {
    pairParts.push(pairLabel);
  }

  ctx.save();
  let pairFontSize = 84;
  const minPairFont = 52;
  const measurePairWidth = () => {
    return Math.max(
      ...pairParts.map((part) => {
        ctx.font = `800 ${pairFontSize}px ${FONT_FAMILY}`;
        return ctx.measureText(part).width;
      })
    );
  };
  let longestWidth = measurePairWidth();
  while (longestWidth > innerWidth * 0.85 && pairFontSize > minPairFont) {
    pairFontSize -= 2;
    longestWidth = measurePairWidth();
  }
  ctx.restore();

  const headerSection = (render: boolean, startY: number): number => {
    const labelSize = 30;
    const labelLineHeight = labelSize * 1.4;
    const pairLineHeight = pairFontSize * 1.08;
    const taglineSize = 32;
    const taglineLineHeight = taglineSize * 1.35;
    const gapLabelToPair = 16;
    const gapPairToTagline = 12;
    const hasSplit = pairParts.length >= 2;
    const crossFontSize = hasSplit ? Math.max(Math.round(pairFontSize * 0.55), 34) : 0;
    const crossLineHeight = hasSplit ? crossFontSize * 1.2 : 0;
    const pairBlockHeight =
      pairLineHeight * Math.min(pairParts.length, 2) + (hasSplit ? crossLineHeight + 6 : 0);

    if (render) {
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = TEXT_MUTED;
      ctx.font = `700 ${labelSize}px ${FONT_FAMILY}`;
      ctx.fillText("Pairly Lab", centerX, startY);
      let pairY = startY + labelLineHeight + gapLabelToPair;
      ctx.fillStyle = TEXT_PRIMARY;
      ctx.font = `800 ${pairFontSize}px ${FONT_FAMILY}`;
      const firstPart = pairParts[0];
      ctx.fillText(firstPart, centerX, pairY);
      pairY += pairLineHeight;
      if (hasSplit) {
        ctx.font = `600 ${crossFontSize}px ${FONT_FAMILY}`;
        ctx.fillStyle = TEXT_MUTED;
        ctx.fillText("×", centerX, pairY - crossFontSize * 0.15);
        pairY += crossLineHeight;
        ctx.fillStyle = TEXT_PRIMARY;
        ctx.font = `800 ${pairFontSize}px ${FONT_FAMILY}`;
        ctx.fillText(pairParts[1], centerX, pairY);
        pairY += pairLineHeight;
      }
      ctx.fillStyle = TEXT_SECONDARY;
      ctx.font = `600 ${taglineSize}px ${FONT_FAMILY}`;
      ctx.fillText("Matching Rhythm Report", centerX, pairY + gapPairToTagline);
      ctx.restore();
    }

    return labelLineHeight + gapLabelToPair + pairBlockHeight + gapPairToTagline + taglineLineHeight;
  };

  const scoreCardSection = (render: boolean, startY: number): number => {
    const paddingX = 48;
    const paddingY = 40;
    const radius = 40;
    const labelSize = 26;
    const labelHeight = labelSize * 1.35;
    const numberSize = 140;
    const numberHeight = numberSize * 1.05;
    const percentileSize = 44;
    const percentileHeight = percentileSize * 1.3;
    const gapLabel = 14;
    const gapNumber = 18;
    const cardHeight = paddingY * 2 + labelHeight + gapLabel + numberHeight + gapNumber + percentileHeight;
    if (render) {
      ctx.save();
      drawRoundedRect(ctx, textStartX, startY, innerWidth, cardHeight, radius);
      const gradient = ctx.createLinearGradient(textStartX, startY, textStartX + innerWidth, startY + cardHeight);
      gradient.addColorStop(0, "rgba(255,255,255,0.08)");
      gradient.addColorStop(1, "rgba(255,255,255,0.02)");
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.font = `600 ${labelSize}px ${FONT_FAMILY}`;
      ctx.fillStyle = TEXT_MUTED;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      const textY = startY + paddingY;
      ctx.fillText("Compatibility Score", centerX, textY);
      const numberY = textY + labelHeight + gapLabel;
      const numberGradient = ctx.createLinearGradient(centerX - 40, numberY, centerX + 40, numberY + numberHeight);
      numberGradient.addColorStop(0, "#ffffff");
      numberGradient.addColorStop(1, "rgba(255,255,255,0.8)");
      ctx.font = `800 ${numberSize}px ${FONT_FAMILY}`;
      ctx.fillStyle = numberGradient;
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "center";
      const scoreText = `${scoreValue}`;
      const scoreWidth = ctx.measureText(scoreText).width;
      ctx.fillText(scoreText, centerX, numberY + numberHeight);
      ctx.font = `600 38px ${FONT_FAMILY}`;
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.textAlign = "left";
      ctx.fillText("pts", centerX + scoreWidth / 2 + 20, numberY + numberHeight - 30);
      ctx.textAlign = "center";
      ctx.font = `600 ${percentileSize}px ${FONT_FAMILY}`;
      ctx.fillStyle = TEXT_PRIMARY;
      ctx.textBaseline = "top";
      ctx.fillText(
        percentileDisplay,
        centerX,
        startY + cardHeight - paddingY - percentileHeight
      );
      ctx.restore();
    }
    return cardHeight;
  };

  const rankSection = (render: boolean, startY: number): number => {
    const paddingX = 40;
    const paddingY = 40;
    const radius = 44;
    const imageSize = 240;
    const gap = 36;
    const labelSize = 24;
    const baseBandSize = 70;
    const rankLabelSize = 30;
    const labelHeight = labelSize * 1.4;
    const textWidth = innerWidth - paddingX * 2 - imageSize - gap;
    ctx.save();
    let dynamicBandSize = baseBandSize;
    ctx.font = `800 ${dynamicBandSize}px ${FONT_FAMILY}`;
    while (ctx.measureText(rankBandName).width > textWidth && dynamicBandSize > 40) {
      dynamicBandSize -= 2;
      ctx.font = `800 ${dynamicBandSize}px ${FONT_FAMILY}`;
    }
    ctx.restore();
    const bandHeight = dynamicBandSize * 1.15;
    const rankLineHeight = rankLabelSize * 1.25;
    const textHeight = labelHeight + 12 + bandHeight + 8 + rankLineHeight;
    const topRowHeight = Math.max(imageSize, textHeight);
    const messageSpacing = messageBlock ? 32 : 0;
    const messagePaddingX = 28;
    const messagePaddingY = 28;
    let messageHeight = 0;
    if (messageBlock) {
      messageHeight =
        messagePaddingY * 2 +
        renderTextBlock(
          ctx,
          messageBlock,
          0,
          0,
          innerWidth - paddingX * 2 - messagePaddingX * 2,
          false
        );
    }
    const totalHeight = paddingY * 2 + topRowHeight + (messageBlock ? messageSpacing + messageHeight : 0);
    if (render) {
      ctx.save();
      drawRoundedRect(ctx, textStartX, startY, innerWidth, totalHeight, radius);
      const gradient = ctx.createLinearGradient(textStartX, startY, textStartX + innerWidth, startY + totalHeight);
      gradient.addColorStop(0, "rgba(0,0,0,0.4)");
      gradient.addColorStop(1, "rgba(0,0,0,0.2)");
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      const imageX = textStartX + paddingX;
      const imageY = startY + paddingY;
      ctx.save();
      drawRoundedRect(ctx, imageX, imageY, imageSize, imageSize, 32);
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.clip();
      if (rankImage) {
        drawImageContain(ctx, rankImage, imageX, imageY, imageSize, imageSize);
      } else {
        ctx.fillStyle = TEXT_PRIMARY;
        ctx.font = `800 120px ${FONT_FAMILY}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(rankMain, imageX + imageSize / 2, imageY + imageSize / 2);
      }
      ctx.restore();
      const textX = imageX + imageSize + gap;
      const textStart = startY + paddingY + (topRowHeight - textHeight) / 2;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.font = `600 ${labelSize}px ${FONT_FAMILY}`;
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillText("Pair Rank", textX, textStart);
      ctx.font = `800 ${dynamicBandSize}px ${FONT_FAMILY}`;
      ctx.fillStyle = TEXT_PRIMARY;
      const bandBlockHeight = renderTextBlock(
        ctx,
        {
          lines: [rankBandName],
          fontSize: dynamicBandSize,
          fontWeight: "800",
          color: TEXT_PRIMARY,
          spacingAfter: 0,
        },
        textX,
        textStart + labelHeight + 10,
        textWidth,
        true
      );
      ctx.font = `500 ${rankLabelSize}px ${FONT_FAMILY}`;
      ctx.fillStyle = TEXT_SECONDARY;
      const rankY = textStart + labelHeight + 10 + bandBlockHeight + 8;
      ctx.fillText(`ランク: ${rank}`, textX, rankY);

      if (messageBlock) {
        const messageX = textStartX + paddingX;
        const messageY = startY + paddingY + topRowHeight + messageSpacing;
        drawRoundedRect(
          ctx,
          messageX,
          messageY,
          innerWidth - paddingX * 2,
          messageHeight,
          28
        );
        ctx.fillStyle = "rgba(255,255,255,0.05)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
        renderTextBlock(
          ctx,
          messageBlock,
          messageX + messagePaddingX,
          messageY + messagePaddingY,
          innerWidth - paddingX * 2 - messagePaddingX * 2,
          true
        );
      }

      ctx.restore();
    }
    return totalHeight;
  };

  const footerSection = (render: boolean, startY: number): number => {
    const dividerHeight = 1;
    const paddingY = 32;
    const labelSize = 18;
    const taglineSize = 30;
    const labelHeight = labelSize * 1.4;
    const taglineHeight = taglineSize * 1.3;
    const qrSize = 150;
    const qrBoxPadding = 16;
    const qrBoxSize = qrSize + qrBoxPadding * 2;
    const qrTotalHeight = qrBoxSize + 30;
    const contentHeight = Math.max(labelHeight + 8 + taglineHeight, qrTotalHeight);
    if (render) {
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.fillRect(textStartX, startY, innerWidth, dividerHeight);
      ctx.save();
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.font = `600 ${labelSize}px ${FONT_FAMILY}`;
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillText("pairly lab", textStartX, startY + dividerHeight + paddingY);
      ctx.font = `500 ${taglineSize}px ${FONT_FAMILY}`;
      ctx.fillStyle = "rgba(255,255,255,0.78)";
      ctx.fillText(
        "2人のリズムを科学する診断",
        textStartX,
        startY + dividerHeight + paddingY + labelHeight + 8
      );
      const qrX = textStartX + innerWidth - qrBoxSize;
      const qrY = startY + dividerHeight + paddingY;
      drawRoundedRect(ctx, qrX, qrY, qrBoxSize, qrBoxSize, 24);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(0,0,0,0.35)";
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 8;
      ctx.fill();
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      if (qrCanvas) {
        ctx.drawImage(qrCanvas, qrX + qrBoxPadding, qrY + qrBoxPadding, qrSize, qrSize);
      } else {
        ctx.fillStyle = "#0f0f15";
        drawRoundedRect(ctx, qrX + qrBoxPadding, qrY + qrBoxPadding, qrSize, qrSize, 12);
        ctx.fill();
      }
      ctx.font = `600 20px ${FONT_FAMILY}`;
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.textAlign = "center";
      ctx.fillText("Scan to try", qrX + qrBoxSize / 2, qrY + qrBoxSize + 12);
      ctx.restore();
    }
    return dividerHeight + paddingY * 2 + contentHeight;
  };

  const gapHeaderToScore = 56;
  const gapScoreToRank = 60;
  const gapRankToFooter = 70;

  const headerHeight = headerSection(false, 0);
  const scoreHeight = scoreCardSection(false, 0);
  const rankHeight = rankSection(false, 0);
  const footerHeight = footerSection(false, 0);

  const contentHeight =
    headerHeight + gapHeaderToScore + scoreHeight + gapScoreToRank + rankHeight + gapRankToFooter + footerHeight;
  const panelHeight = PANEL_PADDING_TOP + contentHeight + PANEL_PADDING_BOTTOM;
  let panelY = Math.max((HEIGHT - panelHeight) / 2, 80);
  const bottomMargin = 100;
  if (panelY + panelHeight > HEIGHT - bottomMargin) {
    panelY = HEIGHT - bottomMargin - panelHeight;
  }
  const textStartY = panelY + PANEL_PADDING_TOP;

  ctx.save();
  drawRoundedRect(ctx, panelX, panelY, panelWidth, panelHeight, CARD_RADIUS);
  ctx.fillStyle = PANEL_BACKGROUND;
  ctx.fill();
  ctx.strokeStyle = CARD_BORDER_COLOR;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  drawRoundedRect(ctx, panelX, panelY, panelWidth, panelHeight, CARD_RADIUS);
  ctx.clip();
  const highlight = ctx.createLinearGradient(panelX, panelY, panelX, panelY + 200);
  highlight.addColorStop(0, "rgba(255,255,255,0.18)");
  highlight.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = highlight;
  ctx.fillRect(panelX, panelY, panelWidth, 200);
  ctx.globalAlpha = 0.08;
  ctx.font = `900 ${panelWidth * 0.9}px ${FONT_FAMILY}`;
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.fillText(rankMain, panelX + panelWidth - PANEL_PADDING_X * 0.2, panelY + panelHeight - PANEL_PADDING_BOTTOM * 0.2);
  ctx.restore();

  const accentBar = ctx.createLinearGradient(panelX, panelY, panelX, panelY + panelHeight);
  accentBar.addColorStop(0, ACCENT_PRIMARY);
  accentBar.addColorStop(1, ACCENT_SECONDARY);
  ctx.fillStyle = accentBar;
  ctx.fillRect(panelX + 16, panelY + 60, 4, panelHeight - 120);

  let currentY = textStartY;
  currentY += headerSection(true, currentY);
  currentY += gapHeaderToScore;
  currentY += scoreCardSection(true, currentY);
  currentY += gapScoreToRank;
  currentY += rankSection(true, currentY);
  currentY += gapRankToFooter;
  currentY += footerSection(true, currentY);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to generate blob"));
        }
      },
      "image/png",
      1.0
    );
  });
}

export function downloadImage(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 100);
}

export async function shareOrDownloadImage(
  blob: Blob,
  filename: string,
  shareData?: { title: string; text: string }
): Promise<void> {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile && navigator.share) {
    try {
      const file = new File([blob], filename, { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: shareData?.title || "相性診断結果",
          text: shareData?.text || "",
        });
        return;
      }
    } catch (error: unknown) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        console.log("Web Share API failed, falling back to download", error);
      }
    }
  }

  downloadImage(blob, filename);

  if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    setTimeout(() => {
      const url = URL.createObjectURL(blob);
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>相性診断結果</title>
              <style>
                body { margin: 0; padding: 20px; background: #000; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
                img { max-width: 100%; height: auto; }
                p { color: white; text-align: center; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div>
                <img src="${url}" alt="相性診断結果" />
                <p>画像を長押しして保存してください</p>
              </div>
            </body>
          </html>
        `);
        newWindow.document.close();
      }
    }, 100);
  }
}
