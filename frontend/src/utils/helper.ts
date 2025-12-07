import { formatDistanceToNow } from 'date-fns';

export function formatRelativeDate(raw?: string | null): string {
	if (!raw || typeof raw !== 'string') return 'Unknown date';

	try {
		let cleaned = raw;

		// 1. FIX MICROSECONDS: trim to 3 digits
		//    from: 2025-12-07T17:58:09.669650
		//    to:   2025-12-07T17:58:09.669
		cleaned = cleaned.replace(/\.(\d{3})\d+$/, '.$1');

		// 2. ADD UTC ZONE if missing
		//    - raw ends with "Z" → OK
		//    - raw ends with "+00:00" → OK
		//    - no timezone → append Z
		if (!cleaned.match(/(Z|[+-]\d{2}:\d{2})$/)) {
			cleaned += 'Z';
		}

		// 3. Parse with JS Date
		const date = new Date(cleaned);

		// 4. Validate
		if (isNaN(date.getTime())) return 'Unknown date';

		// 5. Human readable
		return formatDistanceToNow(date, { addSuffix: true });
	} catch {
		return 'Unknown date';
	}
}
