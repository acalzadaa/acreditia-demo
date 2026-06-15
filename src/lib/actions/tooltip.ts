export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipOptions {
    active?: boolean;
    content: string;
    position?: TooltipPosition;
}

// Evento global que el Modal (u otros) puede disparar para limpiar todos los tooltips activos
export const TOOLTIP_DISMISS_EVENT = 'tooltip:dismiss-all';

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

    // Limpia el tooltip cuando el documento recibe un click fuera del nodo
    function handleDocumentClick(e: MouseEvent) {
        if (!tooltipEl) return;
        if (!node.contains(e.target as Node)) {
            removeTooltip();
        }
    }

    // Limpia el tooltip con Escape o cualquier tecla (opcional: solo Escape)
    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape' || e.type === 'keydown') {
            removeTooltip();
        }
    }

    // Limpia el tooltip cuando el scroll mueve la página
    function handleScroll() {
        removeTooltip();
    }

    // Limpia el tooltip cuando otro componente (ej. Modal) lo solicita globalmente
    function handleDismissAll() {
        removeTooltip();
    }

    // Limpia cuando el nodo pierde visibilidad (modal que tapa el elemento)
    let visibilityObserver: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
        visibilityObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0] && !entries[0].isIntersecting) {
                    removeTooltip();
                }
            },
            { threshold: 0 }
        );
        visibilityObserver.observe(node);
    }

    node.addEventListener('mouseenter', createTooltip);
    node.addEventListener('mouseleave', removeTooltip);
    node.addEventListener('focus', createTooltip);
    node.addEventListener('blur', removeTooltip);

    // Listeners globales de seguridad
    document.addEventListener('click', handleDocumentClick, true);
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('scroll', handleScroll, true);
    window.addEventListener(TOOLTIP_DISMISS_EVENT, handleDismissAll);

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
            visibilityObserver?.disconnect();

            node.removeEventListener('mouseenter', createTooltip);
            node.removeEventListener('mouseleave', removeTooltip);
            node.removeEventListener('focus', createTooltip);
            node.removeEventListener('blur', removeTooltip);

            document.removeEventListener('click', handleDocumentClick, true);
            document.removeEventListener('keydown', handleKeyDown, true);
            document.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener(TOOLTIP_DISMISS_EVENT, handleDismissAll);
        }
    };
}