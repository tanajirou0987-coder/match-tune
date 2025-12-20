"use client";
/* eslint-disable @next/next/no-img-element */

import { forwardRef, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { getCompatibilityRank, getRankImagePath } from "@/lib/calculate";
import { generateShareImageBlob, shareOrDownloadImage } from "@/lib/share-image-generator";

interface SharePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  percentile: number;
  userNickname: string;
  partnerNickname: string;
  message: string;
}

interface ShareImageCardProps {
  imageUrl: string | null;
  loading: boolean;
  className?: string;
}

export const ShareImageCard = forwardRef<HTMLDivElement, ShareImageCardProps>(function ShareImageCard(
  { imageUrl, loading, className = "" },
  ref
) {
  return (
    <div
      ref={ref}
      className={`relative flex items-center justify-center overflow-hidden rounded-[48px] bg-[#080212] ${className}`}
      style={{ width: "100%", height: "100%" }}
    >
      {loading ? (
        <div className="text-sm font-semibold tracking-wide text-white/70">生成中...</div>
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt="Pairly Lab Share Preview"
          className="h-full w-full rounded-[48px] object-cover shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        />
      ) : (
        <div className="text-sm font-semibold tracking-wide text-white/60">プレビューを表示できません</div>
      )}
    </div>
  );
});

export default function SharePreview({
  isOpen,
  onClose,
  score,
  percentile,
  userNickname,
  partnerNickname,
  message,
}: SharePreviewProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const previewUrlRef = useRef<string | null>(null);

  const roundedPercentile = Math.round(percentile);
  const percentileDisplay = `上位${roundedPercentile}%`;
  const rankInfo = getCompatibilityRank(roundedPercentile);
  const rankImagePath = getRankImagePath(rankInfo.rank);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    if (!isOpen) {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
      setPreviewUrl(null);
      setPreviewLoading(false);
      return;
    }

    let cancelled = false;
    const renderPreview = async () => {
      try {
        setPreviewLoading(true);
        const blob = await generateShareImageBlob({
          userNickname,
          partnerNickname,
          score,
          percentileDisplay,
          rankInfo,
          rankImagePath,
          message,
          shareUrl,
        });
        if (cancelled) {
          return;
        }
        const url = URL.createObjectURL(blob);
        if (previewUrlRef.current) {
          URL.revokeObjectURL(previewUrlRef.current);
        }
        previewUrlRef.current = url;
        setPreviewUrl(url);
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to render share preview", error);
          setPreviewUrl(null);
        }
      } finally {
        if (!cancelled) {
          setPreviewLoading(false);
        }
      }
    };

    renderPreview();

    return () => {
      cancelled = true;
    };
  }, [
    isOpen,
    userNickname,
    partnerNickname,
    score,
    percentileDisplay,
    rankInfo.rank,
    rankInfo.bandName,
    rankInfo.tier,
    rankImagePath,
    message,
    shareUrl,
  ]);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const handleDownloadImage = async () => {
    try {
      setIsDownloading(true);
      const blob = await generateShareImageBlob({
        userNickname,
        partnerNickname,
        score,
        percentileDisplay,
        rankInfo,
        rankImagePath,
        message,
        shareUrl,
      });
      const filename = `pairlylab-${userNickname}-${partnerNickname}-${rankInfo.rank}.png`;
      await shareOrDownloadImage(blob, filename, {
        title: `${userNickname} × ${partnerNickname} の相性診断結果`,
        text: `${rankInfo.tier} - ${percentileDisplay}`,
      });
    } catch (error) {
      console.error("Failed to generate share image", error);
      alert("画像の生成に失敗しました。\n\nもう一度お試しください。");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-md max-h-[95vh] overflow-y-auto rounded-2xl"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-3 py-6">
              <p className="text-xs uppercase tracking-[0.45em] text-white/70">Share Card Preview</p>
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">シェア画像</h3>
            </div>
            <div className="mx-auto w-full max-w-[320px]">
              <div className="relative w-full" style={{ aspectRatio: "9 / 16" }}>
                <ShareImageCard
                  imageUrl={previewUrl}
                  loading={previewLoading}
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
            <div className="my-6 flex items-center justify-center gap-3">
              <Button
                type="button"
                onClick={handleDownloadImage}
                className="rounded-full bg-white/90 px-8 text-zinc-900 font-bold shadow-lg hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
                size="lg"
                disabled={isDownloading}
              >
                {isDownloading ? "生成中..." : "画像をダウンロード"}
              </Button>
            </div>
            <button
              onClick={onClose}
              className="absolute top-0 right-0 m-4 rounded-full bg-black/50 p-2 text-white/80 shadow-md hover:bg-black/70"
              aria-label="シェア画面を閉じる"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
