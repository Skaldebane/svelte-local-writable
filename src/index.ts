import {
    writable,
    type Invalidator,
    type Subscriber,
    type Updater,
    type Writable,
    type Unsubscriber,
    type StartStopNotifier
} from "svelte/store";

export function localWritable<T>(key: string, defaultValue: T, start: StartStopNotifier<T> = noop) {
    return new LocalWritable(key, defaultValue, start);
}

class LocalWritable<T> implements Writable<T> {
    key: string;
    writable: Writable<T>;
    private storage = typeof localStorage !== "undefined" ? localStorage : undefined;

    constructor(key: string, defaultValue: T, start: StartStopNotifier<T> = noop) {
        this.key = key;
        const local = this.storage?.[key] as T | null;
        const value = local ?? defaultValue;
        this.storage?.setItem(key, String(value));
        this.writable = writable(value as T, start);
    }

    set(value: T) {
        this.writable.set(value);
        this.storage?.setItem(this.key, String(value));
    }

    update(updater: Updater<T>) {
        this.writable.update((value: T) => {
            const newValue = updater(value);
            this.storage?.setItem(this.key, String(newValue));
            return newValue;
        });
    }

    subscribe(run: Subscriber<T>, invalidate?: Invalidator<T> | undefined): Unsubscriber {
        return this.writable.subscribe(run, invalidate);
    }
}

const noop = () => {};
