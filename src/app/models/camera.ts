export class Camera {
    cidade!: string;
    lat!: number;
    long!: number;

    constructor(cidade: string, lat: number, long: number) {
        this.cidade = cidade;
        this.lat = lat;
        this.long = long;
    }
}