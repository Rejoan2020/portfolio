'use client';

import { useEffect, useRef } from 'react';

const RECTANGLE_LIFETIME_MS = 1000;
const DRAG_THRESHOLD_PX = 10;
const GOLDEN_ANGLE = 137.508;

function tileSize() {
  return {
    width: Math.max(180, Math.min(416, Math.round(window.innerWidth * 0.208))),
    height: Math.max(128, Math.round(window.innerHeight * 0.256))
  };
}

/** True when the pointer is over an actual glyph, so a drag there should select text instead of painting. */
function startsOnText(x: number, y: number) {
  const position = document.caretPositionFromPoint?.(x, y);
  const fallbackRange = position ? null : document.caretRangeFromPoint?.(x, y);
  const node = position?.offsetNode ?? fallbackRange?.startContainer;
  const offset = position?.offset ?? fallbackRange?.startOffset;
  if (node?.nodeType !== Node.TEXT_NODE || !node.textContent || offset == null) return false;
  const text = node.textContent;
  const index = Math.min(Math.max(offset === text.length ? offset - 1 : offset, 0), text.length - 1);
  if (!text[index]?.trim()) return false;
  const range = document.createRange();
  range.setStart(node, index);
  range.setEnd(node, index + 1);
  return Array.from(range.getClientRects()).some(
    rect => x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
  );
}

type Drag = {
  pointerId: number;
  x: number;
  y: number;
  column: number;
  row: number;
  started: boolean;
  selectionAllowed: boolean;
};

/**
 * The "paint the grid" drag effect: dragging on empty space lights up
 * grid tiles along the pointer path. Hidden (and inert) when the background effect is switched off.
 */
export function AmbientBackground() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const root = document.documentElement;
    const effectsOff = () => root.dataset.effects === 'off';

    let tile = tileSize();
    let drag: Drag | null = null;
    let hue = Math.random() * 360;
    const litCells = new Set<string>();

    const light = (column: number, row: number) => {
      const key = `${column}:${row}`;
      if (litCells.has(key)) return;
      litCells.add(key);
      hue = (hue + GOLDEN_ANGLE) % 360;
      const rectangle = document.createElement('span');
      rectangle.className = 'drag-rectangle';
      Object.assign(rectangle.style, {
        left: `${column * tile.width}px`,
        top: `${row * tile.height}px`,
        width: `${tile.width}px`,
        height: `${tile.height}px`
      });
      rectangle.style.setProperty('--rect-hue', `${hue.toFixed(1)}deg`);
      layer.appendChild(rectangle);
      window.setTimeout(() => {
        rectangle.remove();
        litCells.delete(key);
      }, RECTANGLE_LIFETIME_MS);
    };

    // Bresenham walk so fast drags still light every cell they cross.
    const lightLine = (fromColumn: number, fromRow: number, toColumn: number, toRow: number) => {
      let column = fromColumn;
      let row = fromRow;
      const deltaColumn = Math.abs(toColumn - column);
      const stepColumn = column < toColumn ? 1 : -1;
      const deltaRow = -Math.abs(toRow - row);
      const stepRow = row < toRow ? 1 : -1;
      let error = deltaColumn + deltaRow;
      while (column !== toColumn || row !== toRow) {
        const doubled = 2 * error;
        let nextColumn = column;
        let nextRow = row;
        if (doubled >= deltaRow) {
          error += deltaRow;
          nextColumn += stepColumn;
        }
        if (doubled <= deltaColumn) {
          error += deltaColumn;
          nextRow += stepRow;
        }
        if (nextColumn !== column && nextRow !== row) light(nextColumn, row);
        column = nextColumn;
        row = nextRow;
        light(column, row);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || effectsOff()) return;
      const selectionAllowed = startsOnText(event.clientX, event.clientY);
      drag = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        column: Math.round(event.clientX / tile.width),
        row: Math.round(event.clientY / tile.height),
        started: false,
        selectionAllowed
      };
      if (!selectionAllowed) root.classList.add('dragging-background');
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.pointerId || effectsOff()) return;
      if (!drag.started) {
        if (Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < DRAG_THRESHOLD_PX) return;
        drag.started = true;
        if (!drag.selectionAllowed) window.getSelection()?.removeAllRanges();
        light(drag.column, drag.row);
      }
      const column = Math.round(event.clientX / tile.width);
      const row = Math.round(event.clientY / tile.height);
      lightLine(drag.column, drag.row, column, row);
      drag.column = column;
      drag.row = row;
    };

    const endDrag = (event?: PointerEvent) => {
      if (drag && (!event || event.pointerId === drag.pointerId)) {
        drag = null;
        root.classList.remove('dragging-background');
      }
    };
    const onBlur = () => endDrag();
    const preventWhileDragging = (event: Event) => {
      if (drag && !drag.selectionAllowed) event.preventDefault();
    };
    const onResize = () => {
      tile = tileSize();
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
    window.addEventListener('blur', onBlur);
    window.addEventListener('dragstart', preventWhileDragging);
    window.addEventListener('resize', onResize);
    document.addEventListener('selectstart', preventWhileDragging);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('dragstart', preventWhileDragging);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('selectstart', preventWhileDragging);
      root.classList.remove('dragging-background');
    };
  }, []);

  return <div className="ambient" aria-hidden="true" ref={layerRef} />;
}
