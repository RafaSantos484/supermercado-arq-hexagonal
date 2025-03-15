import { Utils } from "./Utils";

export class EspecificacaoProduto {
  constructor(
    private id: number,
    private descricao: string,
    private preco: number
  ) {}

  Id(value?: number) {
    if (value !== undefined) {
      this.id = value;
    }
    return this.id;
  }

  async getPreco(): Promise<number> {
    console.log("Preço: " + this.preco);
    await Utils.sleep(1000);
    return this.preco;
  }

  toString(): string {
    return `${this.id} ${this.descricao} ${this.preco}`;
  }
}
