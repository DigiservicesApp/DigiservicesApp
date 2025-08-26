'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  arrow,
  type Placement,
} from '@floating-ui/react';

const tooltipVariants = cva(
  'z-50 rounded-md bg-[color:var(--md-sys-color-inverse-surface)] text-[color:var(--md-sys-color-inverse-on-surface)] shadow-sm outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  {
    variants: {
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-2 text-sm',
        lg: 'px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
);

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: Placement;
  delayShow?: number;
  delayHide?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  placement = 'top',
  delayShow = 200,
  delayHide = 0,
  size,
  className,
}: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const arrowRef = React.useRef<HTMLDivElement>(null);

  const {
    x,
    y,
    refs,
    strategy,
    context,
    placement: finalPlacement,
    middlewareData,
  } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [offset(8), flip(), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    move: false,
    delay: {
      open: delayShow,
      close: delayHide,
    },
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    role: 'tooltip',
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[finalPlacement.split('-')[0]];

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      <FloatingPortal>
        {open && (
          <div
            ref={refs.setFloating}
            className={cn(tooltipVariants({ size }), className)}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: 'max-content',
            }}
            {...getFloatingProps()}
          >
            {content}
            <div
              ref={arrowRef}
              className="absolute h-2 w-2 rotate-45 bg-[color:var(--md-sys-color-inverse-surface)]"
              style={{
                left:
                  middlewareData.arrow?.x != null
                    ? `${middlewareData.arrow.x}px`
                    : '',
                top:
                  middlewareData.arrow?.y != null
                    ? `${middlewareData.arrow.y}px`
                    : '',
                right: '',
                bottom: '',
                [staticSide as string]: '-4px',
              }}
            />
          </div>
        )}
      </FloatingPortal>
    </>
  );
}

// Usage example:
/*
import { Tooltip } from './Tooltip.new';
import { Button } from './Button.new';

function Example() {
  return (
    <Tooltip
      content="This is a helpful tooltip"
      placement="top"
      size="md"
    >
      <Button>Hover me</Button>
    </Tooltip>
  );
}

// Different sizes
<Tooltip size="sm">...</Tooltip>
<Tooltip size="md">...</Tooltip>
<Tooltip size="lg">...</Tooltip>

// Different placements
<Tooltip placement="top">...</Tooltip>
<Tooltip placement="bottom">...</Tooltip>
<Tooltip placement="left">...</Tooltip>
<Tooltip placement="right">...</Tooltip>

// Custom delays
<Tooltip delayShow={500} delayHide={200}>...</Tooltip>
*/
