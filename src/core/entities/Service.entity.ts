export class Service{
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly description: number,
        public readonly iconurl?: string,
    ){}
}