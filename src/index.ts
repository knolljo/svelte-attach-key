import type { Attachment } from "svelte/attachments";
import { on } from "svelte/events";

interface HotkeyModifiers {
	ctrl?: boolean;
	shift?: boolean;
	alt?: boolean;
	meta?: boolean;
	mod?: boolean;
}

interface HotkeyOptions extends HotkeyModifiers {
	global?: boolean;
	preventDefault?: boolean;
	stopPropagation?: boolean;
	ignoreInputs?: boolean;
	code?: boolean;
	enabled?: boolean;
}
/**
 * Creates an attachment that triggers an element's click when a hotkey is pressed
 *
 * @example
 * // Simple hotkey
 * <button {@attach hotkey('k')} onclick={doSomething}>Press K</button>
 *
 * @example
 * // With modifiers
 * <button {@attach hotkey('s', { ctrl: true })} onclick={save}>Save (Ctrl+S)</button>
 *
 * @example
 * // Element-scoped (only works when focused)
 * <input {@attach hotkey('Enter', { global: false })} />
 *
 * @example
 * // Use code instead of key (useful for physical layout)
 * <button {@attach hotkey('KeyW', { code: true })} onclick={moveUp}>Move Up</button>
 */
export function hotkey(
	key: string,
	options: HotkeyOptions = {},
): Attachment<HTMLElement> {
	const {
		ctrl = false,
		shift = false,
		alt = false,
		meta = false,
		mod = false,
		global = true,
		preventDefault = true,
		stopPropagation = false,
		ignoreInputs = true,
		code = false,
		enabled = true,
	} = options;

	return (node: HTMLElement) => {
		if (!enabled) return;

		function handleKeydown(event: Event): void {
			const e = event as KeyboardEvent;
			// Check if key matches (case-insensitive)
			const eventKey = code ? e.code : e.key;
			if (eventKey.toLowerCase() !== key.toLowerCase()) return;

			// Check modifier keys
			const isMac =
				typeof navigator !== "undefined" &&
				/Mac|iPod|iPhone|iPad/.test(navigator.platform);

			const expectCtrl = ctrl || (mod && !isMac);
			const expectMeta = meta || (mod && isMac);

			if (e.ctrlKey !== expectCtrl) return;
			if (e.shiftKey !== shift) return;
			if (e.altKey !== alt) return;
			if (e.metaKey !== expectMeta) return;

			// Don't trigger if typing in an input (when ignoreInputs is true)
			if (ignoreInputs) {
				const target = e.target as HTMLElement;
				const tagName = target.tagName;
				if (
					tagName === "INPUT" ||
					tagName === "TEXTAREA" ||
					tagName === "SELECT" ||
					target.isContentEditable
				) {
					return;
				}
			}
			if (preventDefault) e.preventDefault();
			if (stopPropagation) e.stopPropagation();
			node.click();
		}

		const target = global ? window : node;
		const off = on(target, "keydown", handleKeydown);

		return off;
	};
}
