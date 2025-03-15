import { EspecificacaoProduto } from "./EspecificacaoProduto";
import { Utils } from "./Utils";

export class ItemDeVenda {
  constructor(private especProd: EspecificacaoProduto, private quant: number) {}

  async getSubtotal(): Promise<number> {
    const subTotal = this.quant * (await this.especProd.getPreco());
    console.log("SubTotal: " + subTotal);
    await Utils.sleep(1000);
    return subTotal;
  }
}
