import { Request, Response } from 'express';
import { google } from 'googleapis';
import { googleAuth } from '../lib/googleAuth';
import { filterCalendarEvents } from '../lib/filterCalendarEvents';

const calendarId = 'sqmurkarp0gj16shcsmfkqqsqs@group.calendar.google.com';

export const getCalendarList = (_req: Request, res: Response) => {
  googleAuth();

  const calendar = google.calendar('v3');
  try {
    calendar.events.list({
      calendarId,
      timeMin: (new Date()).toISOString(),
    }, (err, response) => {
      if (err) {
        console.error(`[ERROR] google calendar get events list error: ${err}`);
        res.status(500).json({ message: 'InternalServerError' });
      }
      if (response) {
        const calendarEvents = filterCalendarEvents(response.data.items);
        return res.json(calendarEvents);
      }
      console.warn('[WARN] google calendar get events list empty response');
      return res.status(500).json({ message: 'InternalServerError' });
    });
  } catch (err) {
    console.error(`[ERROR] getCalendarList error: ${err}`);
    return res.status(500).json({ message: 'InternalServerError' });
  }
};
