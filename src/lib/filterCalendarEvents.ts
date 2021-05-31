import { calendar_v3 } from 'googleapis';

// Date型をmsなしのISO8601へ変換
const toISOStringSec = (dateTime: Date) => {
	const pad = (val: number, length: number) => {
		let p = '';
		for (let i = 0; i < length; ++i) {
			p += '0';
		}
		return (p + String(val)).slice(-1 * length);
	};
	const year = dateTime.getUTCFullYear();
	const month = dateTime.getUTCMonth() + 1;
	const days = dateTime.getUTCDate();
	const hours = dateTime.getUTCHours();
	const minutes = dateTime.getUTCMinutes();
	const seconds = dateTime.getUTCSeconds();
	return `${year}-${pad(month, 2)}-${pad(days, 2)}T${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}Z`;
};

// イベントの中から必要な情報のみを取得
export const filterCalendarEvents = (events: calendar_v3.Schema$Event[] | undefined) => {
  if (!events) return;

  return events.map(event => {
    const { id, summary = 'no title', description = '', start, end } = event;
    const startDateTime = start && (start.date || start.dateTime);
    const endDateTime = end && (end.date || end.dateTime);

    return {
      id,
      title: summary,
      description,
      start: startDateTime ? toISOStringSec(new Date(startDateTime)) : null,
      end: endDateTime ? toISOStringSec(new Date(endDateTime)) : null,
    }
  });
};