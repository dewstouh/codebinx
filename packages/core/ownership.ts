export class OwnershipValidator {
    static check<T>(entity: T | null, userId: string, field: keyof T) {
        if (!entity || entity[field] !== userId) {
            throw new Error('Not authorized or entity not found')
        }
    }
  }