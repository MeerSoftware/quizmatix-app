export default function createInstance(entity: any, ...params: any): any {
    return new entity(...params);
}