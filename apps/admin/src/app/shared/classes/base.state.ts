export abstract class BaseState<T> {
  abstract add(T: T): void;
  abstract addAll(T: T[]): void;
  abstract update(T: T): void;
  abstract deleteById(id: string): void;
  abstract getById(id: string): T | undefined;
  abstract getAll(): T[];
  abstract isEmpty(): boolean;
}
