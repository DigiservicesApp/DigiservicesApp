'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow,
  autoUpdate,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  type Placement,
} from '@floating-ui/react';

const popoverVariants = cva(
  'z-50 rounded-lg bg-[color:var(--md-sys-color-surface)] text-[color:var(--md-sys-color-on-surface)] shadow-lg outline-none',
  {
    variants: {
      variant: {
        default: '',
        info: 'bg-[color:var(--md-sys-color-secondary-container)] text-[color:var(--md-sys-color-on-secondary-container)]',
        error:
          'bg-[color:var(--md-sys-color-error-container)] text-[color:var(--md-sys-color-on-error-container)]',
      },
      size: {
        sm: 'max-w-[200px] p-2 text-sm',
        md: 'max-w-[300px] p-3',
        lg: 'max-w-[400px] p-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const arrowVariants = cva('absolute rotate-45 w-2 h-2 bg-inherit', {
  variants: {
    variant: {
      default: '',
      info: 'bg-[color:var(--md-sys-color-secondary-container)]',
      error: 'bg-[color:var(--md-sys-color-error-container)]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface PopoverProps extends VariantProps<typeof popoverVariants> {
  trigger: React.ReactNode;
  content: React.ReactNode;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  modal?: boolean;
}

export function Popover({
  trigger,
  content,
  placement = 'bottom',
  open: controlledOpen,
  onOpenChange,
  variant,
  size,
  className,
  modal = false,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement>(null);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;

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

  const click = useClick(context, {
    enabled: controlledOpen === undefined,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
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
        {trigger}
      </div>
      <FloatingPortal>
        {open && (
          <div
            ref={refs.setFloating}
            className={cn(
              popoverVariants({ variant, size }),
              'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
              className
            )}
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
              className={arrowVariants({ variant })}
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
import { Popover } from './Popover.new';
import { Button } from './Button.new';

function Example() {
  return (
    <Popover
      trigger={<Button>Click me</Button>}
      content={
        <div>
          <h3 className="font-medium">Popover Title</h3>
          <p>This is the popover content.</p>
        </div>
      }
      variant="info"
      size="md"
      placement="bottom"
    />
  );
}
*/
