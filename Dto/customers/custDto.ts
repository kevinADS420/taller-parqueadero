class Cust {

    private _nameUser: string;
    private _marca: string;
    private _placa: string;

    constructor(
        nameUser: string,
        marca: string,
        placa: string
    ) {
        this._nameUser = nameUser;
        this._marca = marca;
        this._placa = placa; 
    }

     // Getters
    get nameUser(): string {
        return this._nameUser;
    }

    get marca(): string {
        return this._marca;
    }
    
    get placa(): string {
        return this._placa;
    }

         // Setters
    set nameUser(nameUser: string) {
        this._nameUser = nameUser;
    }

    set marca(marca: string) {
        this._marca = marca;
    }

    set placa(placa: string) {
        this._placa = placa;
    }

}

export default  Cust;