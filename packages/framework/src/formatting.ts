import { Moment } from 'moment';

import { EventCategory } from 'conventions/EventLogEmitter';

type LogEventFormatter = (timestamp: Moment,
                          category: EventCategory,
                          message: string,
                          origin: string | undefined,
                          tags: string[],
                          payload?: any) => string;

type CategoryLiterals = {
    [category in EventCategory]: string;
};

const categoryLiterals: CategoryLiterals = {
    NOTIFICATION: 'N',
    WARNING: 'W',
    ERROR: 'E',
    DEBUG: 'D',
};

function formatEventAsShortText(timestamp: Moment,
                                category: EventCategory,
                                message: string,
                                origin: string | undefined,
                                tags: string[],
                                payload?: any): string {
    return `${timestamp.format('HH:mm:ss.SSS')} ${categoryLiterals[category]} ${origin}: ${message}`;
}

function formatEventAsLongStrictText(timestamp: Moment,
                                     category: EventCategory,
                                     message: string,
                                     origin: string | undefined,
                                     tags: string[],
                                     payload?: any): string {
    return [
        timestamp.format('HH:mm:ss.SSS'),
        categoryLiterals[category],
        (origin || 'anonymous') + ':',
        message ,
        '[' + tags.join(', ') + ']',
    ].join(' ');
}

function formatEventAsLongFlexibleText(timestamp: Moment                             ,
                                       category: EventCategory                             ,
                                       message: string                             ,
                                       origin: string | undefined                             ,
                                       tags: string[]                             ,
                                       payload?: any): string {
    return [
        timestamp.format('HH:mm:ss.SSS'),
        categoryLiterals[category],
        origin ? origin + ':' : '',
        message,
        tags.length ? '[' + tags.join(', ') + ']' : '',
    ].join(' ');
}

function formatEventAsCompactJson(timestamp: Moment,
                                  category: EventCategory,
                                  message: string,
                                  origin: string | undefined,
                                  tags: string[],
                                  payload?: any): string {
    return JSON.stringify({
        timestamp,
        category,
        message,
        origin,
        tags,
        payload,
    });
}

function formatEventAsPrettyJson(timestamp: Moment,
                                 category: EventCategory,
                                 message: string,
                                 origin: string | undefined,
                                 tags: string[],
                                 payload?: any): string {
    return JSON.stringify({
        timestamp,
        category,
        message,
        origin,
        tags,
        payload,
    }, null, 2);
}

const BuiltInLogEventFormatters = {
    SHORT_TEXT: formatEventAsShortText,
    LONG_STRICT_TEXT: formatEventAsLongStrictText,
    LONG_FLEXIBLE_TEXT: formatEventAsLongFlexibleText,
    COMPACT_JSON: formatEventAsCompactJson,
    PRETTY_JSON: formatEventAsPrettyJson,
};

export {
    LogEventFormatter,
    BuiltInLogEventFormatters,
};
