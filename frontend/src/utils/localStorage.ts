/**
 * Get a localstorage item and parse it as a JSON
 * @param key Key to get
 * @returns Parsed value or null
 */
export function getItem<T>(key: string): T | null {
    try {
        const item = window.localStorage.getItem(key);
        if (item === null) {
            return null;
        }
        return JSON.parse(item) as T;
    } catch (error) {
        console.warn(`Error reading localStorage key “${key}”:`, error);
        return null;
    }
}

/**
 * Add or remove a localStorage item, conerting it into JSON.
 * @param key Key to set
 * @param value Value to set
 */
export function setItem<T>(key: string, value: T): void {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
    }
}

/**
 * Delete item from localstorage
 * @param key Key to delete
 */
export function removeItem(key: string): void {
    try {
        window.localStorage.removeItem(key);
    } catch (error) {
        console.warn(`Error removing localStorage key “${key}”:`, error);
    }
}

/**
 * Clean localstorage
 */
export function clearStorage(): void {
    try {
        window.localStorage.clear();
    } catch (error) {
        console.warn('Error clearing localStorage:', error);
    }
  }