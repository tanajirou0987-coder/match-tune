<?php
declare(strict_types=1);

/**
 * Pairly Lab - Dynamic OGP generator
 *
 * Usage example:
 *   /ogp/share.php?type=徹底相性診断&rank=S&comment=最高の相性
 *
 * Requirements:
 *   - PHP GD extension with FreeType enabled
 *   - fonts/CardHeadline.ttf, fonts/CardBody.ttf
 */

mb_internal_encoding("UTF-8");

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 630;
const CARD_WIDTH = 760;
const CARD_HEIGHT = 540;

const FONT_HEADLINE = __DIR__ . "/fonts/CardHeadline.ttf";
const FONT_BODY = __DIR__ . "/fonts/CardBody.ttf";
const SERVICE_NAME = "Pairly Lab診断";

$rankStyles = [
    "SS" => ["border" => "#EED277", "badge" => "#F5E1A4", "shadow" => "#C69828", "label" => "神相性"],
    "S"  => ["border" => "#C8A8FF", "badge" => "#E0CEFF", "shadow" => "#9B7AE0", "label" => "極上バイブス"],
    "A"  => ["border" => "#8BC9FF", "badge" => "#C4E5FF", "shadow" => "#5B98D4", "label" => "高シンクロ"],
    "B"  => ["border" => "#8ED7C1", "badge" => "#C7F0E0", "shadow" => "#5DA98E", "label" => "好バランス"],
    "C"  => ["border" => "#F3B395", "badge" => "#FED9C5", "shadow" => "#D98A67", "label" => "伸びしろ"],
    "D"  => ["border" => "#F1CE7A", "badge" => "#F9E6B1", "shadow" => "#C49D33", "label" => "課題発見"],
    "DEFAULT" => ["border" => "#C9D3E3", "badge" => "#E4E9F2", "shadow" => "#98A1B3", "label" => "相性度"],
];

[$typeText, $rankText, $commentText] = [
    sanitizeText($_GET["type"] ?? "", "徹底相性診断", 60),
    sanitizeText($_GET["rank"] ?? "", "A", 4),
    sanitizeText($_GET["comment"] ?? "", "最高のシンクロ率！", 140),
];
$rankText = mb_strtoupper($rankText);
$rankStyle = $rankStyles[$rankText] ?? $rankStyles["DEFAULT"];
$rankLabel = $rankStyle["label"];

ensureFonts([FONT_HEADLINE, FONT_BODY]);

$img = imagecreatetruecolor(CANVAS_WIDTH, CANVAS_HEIGHT);
imagesavealpha($img, true);
$transparent = imagecolorallocatealpha($img, 0, 0, 0, 127);
imagefill($img, 0, 0, $transparent);

drawBackgroundGradient($img, [229, 236, 255], [209, 220, 242]);

$cardX = (int) ((CANVAS_WIDTH - CARD_WIDTH) / 2);
$cardY = (int) ((CANVAS_HEIGHT - CARD_HEIGHT) / 2);
drawCard($img, $cardX, $cardY, CARD_WIDTH, CARD_HEIGHT, $rankStyle);

drawRankBadge($img, $cardX, $cardY, $rankText, $rankLabel, $rankStyle);
drawTypeName($img, $cardX, $cardY, $typeText);
drawComment($img, $cardX, $cardY, $commentText);
drawServiceName($img, $cardX, $cardY);

header("Content-Type: image/png");
header("Cache-Control: public, max-age=300");
imagepng($img);
imagedestroy($img);
exit;

// ---- helper functions ----

/**
 * @return string
 */
function sanitizeText(string $raw, string $fallback, int $widthLimit)
{
    $text = trim($raw);
    if ($text === "") {
        $text = $fallback;
    }
    // Remove control characters except newline
    $text = preg_replace("/[\\x00-\\x09\\x0B-\\x1F\\x7F]/u", "", $text);
    return mb_strimwidth($text, 0, $widthLimit, "…", "UTF-8");
}

/**
 * @param array<int, string> $fonts
 */
function ensureFonts(array $fonts): void
{
    foreach ($fonts as $font) {
        if (!is_readable($font)) {
            http_response_code(500);
            header("Content-Type: text/plain; charset=utf-8");
            echo "Font file not found: {$font}\n";
            echo "Place the required TTF files under /ogp/fonts.";
            exit;
        }
    }
}

function drawBackgroundGradient(GdImage $img, array $topRgb, array $bottomRgb): void
{
    for ($y = 0; $y < CANVAS_HEIGHT; $y++) {
        $ratio = $y / CANVAS_HEIGHT;
        $r = (int) lerp($topRgb[0], $bottomRgb[0], $ratio);
        $g = (int) lerp($topRgb[1], $bottomRgb[1], $ratio);
        $b = (int) lerp($topRgb[2], $bottomRgb[2], $ratio);
        $color = imagecolorallocate($img, $r, $g, $b);
        imageline($img, 0, $y, CANVAS_WIDTH, $y, $color);
    }
}

function drawCard(GdImage $img, int $x, int $y, int $width, int $height, array $style): void
{
    $radius = 42;
    $shadowColor = hexToColor($img, $style["shadow"], 80);
    imagefilledrectangle(
        $img,
        $x + 18,
        $y + 28,
        $x + $width + 18,
        $y + $height + 28,
        $shadowColor
    );

    $cardColor = imagecolorallocate($img, 255, 255, 255);
    drawRoundedRect($img, $x, $y, $x + $width, $y + $height, $radius, $cardColor);

    $borderColor = hexToColor($img, $style["border"]);
    imagesetthickness($img, 8);
    drawRoundedRectOutline($img, $x, $y, $x + $width, $y + $height, $radius, $borderColor);
}

function drawRankBadge(GdImage $img, int $cardX, int $cardY, string $rank, string $label, array $style): void
{
    $badgeX = $cardX + 60;
    $badgeY = $cardY + 50;
    $badgeWidth = CARD_WIDTH - 120;
    $badgeHeight = 78;
    $badgeColor = hexToColor($img, $style["badge"]);
    drawRoundedRect($img, $badgeX, $badgeY, $badgeX + $badgeWidth, $badgeY + $badgeHeight, 26, $badgeColor);

    $text = sprintf("%s / %s", $rank, $label);
    $textColor = imagecolorallocate($img, 60, 40, 24);
    imagettftext($img, 32, 0, $badgeX + 40, $badgeY + 52, $textColor, FONT_HEADLINE, $text);
}

function drawTypeName(GdImage $img, int $cardX, int $cardY, string $text): void
{
    $fontSize = 60;
    $y = $cardY + 210;
    $color = imagecolorallocate($img, 30, 37, 54);
    $bbox = imagettfbbox($fontSize, 0, FONT_HEADLINE, $text);
    $textWidth = $bbox[2] - $bbox[0];
    $x = (int) ($cardX + (CARD_WIDTH / 2) - ($textWidth / 2));

    if ($textWidth > CARD_WIDTH - 180) {
        $fontSize = 52;
        $bbox = imagettfbbox($fontSize, 0, FONT_HEADLINE, $text);
        $textWidth = $bbox[2] - $bbox[0];
        $x = (int) ($cardX + (CARD_WIDTH / 2) - ($textWidth / 2));
    }

    imagettftext($img, $fontSize, 0, $x, $y, $color, FONT_HEADLINE, $text);
}

function drawComment(GdImage $img, int $cardX, int $cardY, string $comment): void
{
    $fontSize = 30;
    $color = imagecolorallocate($img, 85, 96, 120);
    $startX = $cardX + 90;
    $startY = $cardY + 270;
    $lineHeight = 46;
    $maxWidth = CARD_WIDTH - 180;
    $lines = wrapText($comment, $fontSize, FONT_BODY, $maxWidth);

    foreach ($lines as $index => $line) {
        imagettftext($img, $fontSize, 0, $startX, $startY + $index * $lineHeight, $color, FONT_BODY, $line);
        if ($index === 2) {
            break; // 最大3行
        }
    }
}

function drawServiceName(GdImage $img, int $cardX, int $cardY): void
{
    $fontSize = 24;
    $color = imagecolorallocate($img, 120, 134, 158);
    $y = $cardY + CARD_HEIGHT - 48;
    $bbox = imagettfbbox($fontSize, 0, FONT_BODY, SERVICE_NAME);
    $textWidth = $bbox[2] - $bbox[0];
    $x = (int) ($cardX + (CARD_WIDTH / 2) - ($textWidth / 2));
    imagettftext($img, $fontSize, 0, $x, $y, $color, FONT_BODY, SERVICE_NAME);
}

function wrapText(string $text, int $fontSize, string $fontFile, int $maxWidth): array
{
    $words = preg_split('//u', $text, -1, PREG_SPLIT_NO_EMPTY) ?: [];
    $lines = [];
    $current = "";

    foreach ($words as $char) {
        $testLine = $current . $char;
        $bbox = imagettfbbox($fontSize, 0, $fontFile, $testLine);
        $width = $bbox[2] - $bbox[0];

        if ($width > $maxWidth && $current !== "") {
            $lines[] = $current;
            $current = $char;
        } else {
            $current = $testLine;
        }
    }

    if ($current !== "") {
        $lines[] = $current;
    }

    return $lines;
}

function drawRoundedRect(GdImage $img, int $x1, int $y1, int $x2, int $y2, int $radius, int $color): void
{
    imagefilledrectangle($img, $x1 + $radius, $y1, $x2 - $radius, $y2, $color);
    imagefilledrectangle($img, $x1, $y1 + $radius, $x2, $y2 - $radius, $color);
    imagefilledellipse($img, $x1 + $radius, $y1 + $radius, $radius * 2, $radius * 2, $color);
    imagefilledellipse($img, $x2 - $radius, $y1 + $radius, $radius * 2, $radius * 2, $color);
    imagefilledellipse($img, $x1 + $radius, $y2 - $radius, $radius * 2, $radius * 2, $color);
    imagefilledellipse($img, $x2 - $radius, $y2 - $radius, $radius * 2, $radius * 2, $color);
}

function drawRoundedRectOutline(GdImage $img, int $x1, int $y1, int $x2, int $y2, int $radius, int $color): void
{
    imageline($img, $x1 + $radius, $y1, $x2 - $radius, $y1, $color);
    imageline($img, $x1 + $radius, $y2, $x2 - $radius, $y2, $color);
    imageline($img, $x1, $y1 + $radius, $x1, $y2 - $radius, $color);
    imageline($img, $x2, $y1 + $radius, $x2, $y2 - $radius, $color);
    imagearc($img, $x1 + $radius, $y1 + $radius, $radius * 2, $radius * 2, 180, 270, $color);
    imagearc($img, $x2 - $radius, $y1 + $radius, $radius * 2, $radius * 2, 270, 360, $color);
    imagearc($img, $x1 + $radius, $y2 - $radius, $radius * 2, $radius * 2, 90, 180, $color);
    imagearc($img, $x2 - $radius, $y2 - $radius, $radius * 2, $radius * 2, 0, 90, $color);
}

function hexToColor(GdImage $img, string $hex, int $alpha = 0): int
{
    $hex = ltrim($hex, "#");
    if (strlen($hex) === 3) {
        $hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
    }
    $r = hexdec(substr($hex, 0, 2));
    $g = hexdec(substr($hex, 2, 2));
    $b = hexdec(substr($hex, 4, 2));
    return imagecolorallocatealpha($img, $r, $g, $b, $alpha);
}

function lerp(float $start, float $end, float $ratio): float
{
    return $start + ($end - $start) * $ratio;
}
