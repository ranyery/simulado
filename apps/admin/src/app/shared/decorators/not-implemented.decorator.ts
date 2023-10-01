import { environment } from '../../../environments/environment';

function NotImplemented(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
  if (environment.production) {
    return descriptor;
  }

  const className = target?.constructor?.name || '';
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: unknown[]) {
    console.error(`${className}: ${propertyKey} is not implemented!`);
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

export { NotImplemented };
