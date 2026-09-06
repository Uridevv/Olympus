import { useEffect, useRef, useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.5;

interface ImageZoomModalProps {
  images: string[];
  initialIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageZoomModal({
  images,
  initialIndex,
  open,
  onOpenChange,
}: ImageZoomModalProps) {
  const [index, setIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragState = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
  });

  useEffect(() => {
    if (open) {
      setIndex(initialIndex);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [open, initialIndex]);

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => setScale((prev) => Math.min(MAX_SCALE, prev + ZOOM_STEP));

  const zoomOut = () =>
    setScale((prev) => {
      const next = Math.max(MIN_SCALE, prev - ZOOM_STEP);
      if (next === MIN_SCALE) setPosition({ x: 0, y: 0 });
      return next;
    });

  const goPrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    resetZoom();
  };

  const goNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    resetZoom();
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setScale((prev) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev + delta));
      if (next === MIN_SCALE) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleDoubleClick = () => {
    if (scale > 1) {
      resetZoom();
    } else {
      setScale(2);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      origX: position.x,
      origY: position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    setPosition({
      x: dragState.current.origX + dx,
      y: dragState.current.origY + dy,
    });
  };

  const handleMouseUp = () => {
    dragState.current.dragging = false;
  };

  if (images.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-none w-[95vw] h-[90vh] p-0 gap-0 overflow-hidden bg-neutral-950 text-white border-neutral-800"
        showCloseButton
      >
        <DialogTitle className="sr-only">Vista ampliada del producto</DialogTitle>
        <div
          className="relative h-full w-full touch-none select-none overflow-hidden"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
        >
          <div className="flex h-full w-full items-center justify-center">
            <img
              src={images[index]}
              alt=""
              draggable={false}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                cursor:
                  scale > 1
                    ? dragState.current.dragging
                      ? "grabbing"
                      : "grab"
                    : "zoom-in",
              }}
              className="max-h-full max-w-full object-contain transition-transform duration-100 will-change-transform"
            />
          </div>

          <div className="absolute top-3 left-3 z-10 flex items-center gap-2 rounded-lg bg-black/50 p-1.5 backdrop-blur">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 hover:text-white"
              onClick={zoomOut}
              disabled={scale <= MIN_SCALE}
            >
              <ZoomOut />
              <span className="sr-only">Alejar</span>
            </Button>
            <span className="min-w-12 text-center text-sm font-medium">
              {Math.round(scale * 100)}%
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 hover:text-white"
              onClick={zoomIn}
              disabled={scale >= MAX_SCALE}
            >
              <ZoomIn />
              <span className="sr-only">Acercar</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 hover:text-white"
              onClick={resetZoom}
              disabled={scale === MIN_SCALE && position.x === 0 && position.y === 0}
            >
              <RotateCcw />
              <span className="sr-only">Restablecer zoom</span>
            </Button>
          </div>

          {images.length > 1 && (
            <>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-1/2 left-3 z-10 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-white/20 hover:text-white"
                onClick={goPrev}
              >
                <ChevronLeft />
                <span className="sr-only">Imagen anterior</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-white/20 hover:text-white"
                onClick={goNext}
              >
                <ChevronRight />
                <span className="sr-only">Imagen siguiente</span>
              </Button>
              <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs font-medium backdrop-blur">
                {index + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
