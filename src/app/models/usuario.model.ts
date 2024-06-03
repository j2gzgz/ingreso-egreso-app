export class Usuario {
    constructor(
        public uid: string | null | undefined,
        public nombre: string,
        public email: string | null | undefined
    ) {}
}