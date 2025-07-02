export class Blog {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly content: string,
        public readonly slug: string,
        public readonly coverImage?: string
    ) { }
}