export class Usuario {

    static fromFirebase( {uid, nombre, email }: {uid: string, nombre: string, email: string } ) {
        return new Usuario(uid, nombre, email);
    }

    constructor(
        public uid: string | null | undefined,
        public nombre: string,
        public email: string | null | undefined
    ) {}
}