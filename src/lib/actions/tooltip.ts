export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipOptions {
    active?: boolean;
    content: string;
    position?: TooltipPosition;
}

export function tooltip(node: HTMLElement, options: TooltipOptions) {
    let tooltipEl: HTMLElement | null = null;
    let showTimeout: ReturnType<typeof setTimeout> | null = null;


    function createTooltip() {
        if (!options.content || !options.active) return;

        showTimeout = setTimeout(() => {
            tooltipEl = document.createElement('div');
            tooltipEl.className = `tooltip tooltip--${options.position ?? 'top'}`;
            tooltipEl.textContent = options.content;
            document.body.appendChild(tooltipEl);

            requestAnimationFrame(() => positionTooltip());
        }, 500);
    }

    function positionTooltip() {
        if (!tooltipEl) return;

        const rect = node.getBoundingClientRect();
        const pos: TooltipPosition = options.position ?? 'top';

        const positions: Record<TooltipPosition, { top: number; left: number }> = {
            top: {
                top: rect.top + window.scrollY - tooltipEl.offsetHeight - 8,
                left: rect.left + window.scrollX + rect.width / 2 - tooltipEl.offsetWidth / 2
            },
            bottom: {
                top: rect.bottom + window.scrollY + 8,
                left: rect.left + window.scrollX + rect.width / 2 - tooltipEl.offsetWidth / 2
            },
            left: {
                top: rect.top + window.scrollY + rect.height / 2 - tooltipEl.offsetHeight / 2,
                left: rect.left + window.scrollX - tooltipEl.offsetWidth - 8
            },
            right: {
                top: rect.top + window.scrollY + rect.height / 2 - tooltipEl.offsetHeight / 2,
                left: rect.right + window.scrollX + 8
            }
        };

        tooltipEl.style.top = `${positions[pos].top}px`;
        tooltipEl.style.left = `${positions[pos].left}px`;
    }

    function removeTooltip() {
        if (showTimeout) {
            clearTimeout(showTimeout);
            showTimeout = null;
        }

        tooltipEl?.remove();
        tooltipEl = null;
    }

    node.addEventListener('mouseenter', createTooltip);
    node.addEventListener('mouseleave', removeTooltip);
    node.addEventListener('focus', createTooltip);
    node.addEventListener('blur', removeTooltip);

    return {
        update(newOptions: TooltipOptions) {
            options = newOptions;
            if (tooltipEl) {
                tooltipEl.textContent = newOptions.content;
                tooltipEl.className = `tooltip tooltip--${newOptions.position ?? 'top'}`;
                positionTooltip();
            }
        },
        destroy() {
            removeTooltip();
            node.removeEventListener('mouseenter', createTooltip);
            node.removeEventListener('mouseleave', removeTooltip);
            node.removeEventListener('focus', createTooltip);
            node.removeEventListener('blur', removeTooltip);
        }
    };
}